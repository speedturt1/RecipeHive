
#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Database Migration Management Script
 * Handles schema migrations for development, staging, and production
 */

const environments = {
  development: process.env.DATABASE_URL,
  staging: process.env.STAGING_DATABASE_URL,
  production: process.env.PRODUCTION_DATABASE_URL
};

function runMigration(env = 'development') {
  console.log(`🚀 Running database migration for ${env} environment...`);
  
  try {
    // Generate migration
    execSync('npx prisma migrate dev --name auto_migration', { 
      stdio: 'inherit',
      env: { ...process.env, DATABASE_URL: environments[env] }
    });
    
    // Generate Prisma client
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    console.log(`✅ Migration completed successfully for ${env}`);
  } catch (error) {
    console.error(`❌ Migration failed for ${env}:`, error.message);
    process.exit(1);
  }
}

function resetDatabase(env = 'development') {
  if (env === 'production') {
    console.error('❌ Cannot reset production database!');
    return;
  }
  
  console.log(`🔄 Resetting ${env} database...`);
  
  try {
    execSync('npx prisma migrate reset --force', { 
      stdio: 'inherit',
      env: { ...process.env, DATABASE_URL: environments[env] }
    });
    console.log(`✅ Database reset completed for ${env}`);
  } catch (error) {
    console.error(`❌ Database reset failed for ${env}:`, error.message);
    process.exit(1);
  }
}

function deployMigration(env = 'production') {
  console.log(`🚀 Deploying migration to ${env}...`);
  
  try {
    execSync('npx prisma migrate deploy', { 
      stdio: 'inherit',
      env: { ...process.env, DATABASE_URL: environments[env] }
    });
    console.log(`✅ Migration deployed successfully to ${env}`);
  } catch (error) {
    console.error(`❌ Migration deployment failed for ${env}:`, error.message);
    process.exit(1);
  }
}

// CLI interface
const command = process.argv[2];
const environment = process.argv[3] || 'development';

switch (command) {
  case 'migrate':
    runMigration(environment);
    break;
  case 'reset':
    resetDatabase(environment);
    break;
  case 'deploy':
    deployMigration(environment);
    break;
  default:
    console.log(`
Database Migration Management

Usage: node scripts/db-migrate.js <command> [environment]

Commands:
  migrate   Create and apply new migration (dev/staging)
  reset     Reset database (dev/staging only)
  deploy    Deploy migrations to environment

Environments:
  development (default)
  staging
  production

Examples:
  node scripts/db-migrate.js migrate development
  node scripts/db-migrate.js deploy production
  node scripts/db-migrate.js reset development
    `);
}
