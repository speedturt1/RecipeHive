
#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Database Backup and Disaster Recovery Script
 * Handles automated backups and recovery procedures
 */

const BACKUP_DIR = process.env.BACKUP_DIR || './backups';
const RETENTION_DAYS = parseInt(process.env.BACKUP_RETENTION_DAYS || '30');

function ensureBackupDirectory() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    console.log(`📁 Created backup directory: ${BACKUP_DIR}`);
  }
}

function generateBackupFilename(env) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return path.join(BACKUP_DIR, `backup-${env}-${timestamp}.sql`);
}

function createBackup(env = 'production') {
  console.log(`📦 Creating backup for ${env} environment...`);
  ensureBackupDirectory();
  
  const backupFile = generateBackupFilename(env);
  const databaseUrl = env === 'production' 
    ? process.env.PRODUCTION_DATABASE_URL 
    : process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    throw new Error(`Database URL not found for environment: ${env}`);
  }
  
  try {
    // Create database dump
    execSync(`pg_dump "${databaseUrl}" > "${backupFile}"`, { stdio: 'inherit' });
    
    // Compress backup
    execSync(`gzip "${backupFile}"`, { stdio: 'inherit' });
    
    console.log(`✅ Backup created: ${backupFile}.gz`);
    return `${backupFile}.gz`;
  } catch (error) {
    console.error(`❌ Backup failed for ${env}:`, error.message);
    throw error;
  }
}

function restoreBackup(backupFile, env = 'development') {
  if (env === 'production') {
    console.error('❌ Cannot restore to production environment!');
    return;
  }
  
  console.log(`🔄 Restoring backup: ${backupFile} to ${env}...`);
  
  const databaseUrl = env === 'staging' 
    ? process.env.STAGING_DATABASE_URL 
    : process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    throw new Error(`Database URL not found for environment: ${env}`);
  }
  
  try {
    // Decompress if needed
    let sqlFile = backupFile;
    if (backupFile.endsWith('.gz')) {
      console.log('📦 Decompressing backup...');
      execSync(`gunzip -c "${backupFile}" > "${backupFile.replace('.gz', '')}"`, { stdio: 'inherit' });
      sqlFile = backupFile.replace('.gz', '');
    }
    
    // Drop existing database connections
    execSync(`psql "${databaseUrl}" -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = current_database() AND pid <> pg_backend_pid();"`, { stdio: 'inherit' });
    
    // Restore database
    execSync(`psql "${databaseUrl}" < "${sqlFile}"`, { stdio: 'inherit' });
    
    // Clean up temporary file
    if (sqlFile !== backupFile) {
      fs.unlinkSync(sqlFile);
    }
    
    console.log(`✅ Backup restored successfully to ${env}`);
  } catch (error) {
    console.error(`❌ Restore failed for ${env}:`, error.message);
    throw error;
  }
}

function cleanupOldBackups() {
  console.log(`🧹 Cleaning up backups older than ${RETENTION_DAYS} days...`);
  ensureBackupDirectory();
  
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - RETENTION_DAYS);
  
  const files = fs.readdirSync(BACKUP_DIR);
  let removedCount = 0;
  
  files.forEach(file => {
    const filePath = path.join(BACKUP_DIR, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isFile() && file.includes('backup-') && stats.mtime < cutoffDate) {
      fs.unlinkSync(filePath);
      removedCount++;
      console.log(`🗑️  Removed old backup: ${file}`);
    }
  });
  
  console.log(`✅ Cleanup completed. Removed ${removedCount} old backups.`);
}

function listBackups() {
  ensureBackupDirectory();
  
  const files = fs.readdirSync(BACKUP_DIR)
    .filter(file => file.includes('backup-'))
    .sort()
    .reverse();
  
  console.log('📋 Available backups:');
  files.forEach((file, index) => {
    const filePath = path.join(BACKUP_DIR, file);
    const stats = fs.statSync(filePath);
    const sizeKB = Math.round(stats.size / 1024);
    console.log(`  ${index + 1}. ${file} (${sizeKB} KB) - ${stats.mtime.toISOString()}`);
  });
  
  return files;
}

function scheduleBackup(env = 'production', intervalHours = 24) {
  console.log(`⏰ Scheduling automatic backups every ${intervalHours} hours for ${env}...`);
  
  const intervalMs = intervalHours * 60 * 60 * 1000;
  
  // Initial backup
  createBackup(env);
  
  // Schedule recurring backups
  setInterval(() => {
    try {
      createBackup(env);
      cleanupOldBackups();
    } catch (error) {
      console.error('Scheduled backup failed:', error);
    }
  }, intervalMs);
  
  console.log('✅ Backup scheduler started');
}

// CLI interface
const command = process.argv[2];
const param1 = process.argv[3];
const param2 = process.argv[4];

switch (command) {
  case 'create':
    createBackup(param1 || 'production');
    break;
  case 'restore':
    if (!param1) {
      console.error('❌ Backup file required for restore command');
      process.exit(1);
    }
    restoreBackup(param1, param2 || 'development');
    break;
  case 'cleanup':
    cleanupOldBackups();
    break;
  case 'list':
    listBackups();
    break;
  case 'schedule':
    scheduleBackup(param1 || 'production', parseInt(param2 || '24'));
    break;
  default:
    console.log(`
Database Backup Management

Usage: node scripts/db-backup.js <command> [parameters]

Commands:
  create [env]           Create backup for environment (default: production)
  restore <file> [env]   Restore backup to environment (default: development)
  cleanup                Remove backups older than retention period
  list                   List available backups
  schedule [env] [hours] Schedule automatic backups (default: production, 24h)

Examples:
  node scripts/db-backup.js create production
  node scripts/db-backup.js restore backup-prod-2024-01-15.sql.gz development
  node scripts/db-backup.js cleanup
  node scripts/db-backup.js schedule production 12
    `);
}
