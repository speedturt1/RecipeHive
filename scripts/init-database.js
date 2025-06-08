
#!/usr/bin/env node

const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');

/**
 * Database Initialization Script for Replit PostgreSQL
 * This script sets up the database schema and runs initial migrations
 */

async function initializeDatabase() {
  console.log('🚀 Initializing RecipeHive database...');

  try {
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL environment variable is not set');
      console.log('Please set up your Replit PostgreSQL database and copy the connection string to .env');
      process.exit(1);
    }

    console.log('📡 Testing database connection...');
    
    // Test connection
    const prisma = new PrismaClient();
    try {
      await prisma.$connect();
      console.log('✅ Database connection successful');
    } catch (error) {
      console.error('❌ Database connection failed:', error.message);
      console.log('\nTroubleshooting:');
      console.log('1. Check your DATABASE_URL in .env file');
      console.log('2. Ensure your Replit PostgreSQL database is running');
      console.log('3. Verify the connection string format');
      process.exit(1);
    } finally {
      await prisma.$disconnect();
    }

    // Generate Prisma client
    console.log('🔧 Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });

    // Push schema to database
    console.log('📊 Pushing database schema...');
    execSync('npx prisma db push', { stdio: 'inherit' });

    // Run seed data
    console.log('🌱 Seeding database with initial data...');
    execSync('npx prisma db seed', { stdio: 'inherit' });

    console.log('✅ Database initialization completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Run your app with: npx expo start');
    console.log('2. Check the database schema in Replit\'s Database panel');
    console.log('3. Monitor database performance with: node scripts/db-monitor.js');

  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    console.log('\nCommon solutions:');
    console.log('- Ensure DATABASE_URL is correctly set in .env');
    console.log('- Check Replit PostgreSQL service is running');
    console.log('- Verify database permissions');
    process.exit(1);
  }
}

async function testConnection() {
  console.log('🔍 Testing database connection...');
  
  try {
    const prisma = new PrismaClient();
    await prisma.$connect();
    
    // Test basic query
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log('✅ Connection successful!');
    console.log('📊 PostgreSQL version:', result[0].version);
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    process.exit(1);
  }
}

async function resetDatabase() {
  console.log('🔄 Resetting database...');
  
  try {
    execSync('npx prisma migrate reset --force', { stdio: 'inherit' });
    console.log('✅ Database reset completed');
  } catch (error) {
    console.error('❌ Database reset failed:', error.message);
    process.exit(1);
  }
}

// CLI interface
const command = process.argv[2];

switch (command) {
  case 'init':
    initializeDatabase();
    break;
  case 'test':
    testConnection();
    break;
  case 'reset':
    resetDatabase();
    break;
  default:
    console.log(`
RecipeHive Database Initialization

Usage: node scripts/init-database.js <command>

Commands:
  init    Initialize database with schema and seed data
  test    Test database connection
  reset   Reset database (removes all data)

Examples:
  node scripts/init-database.js init
  node scripts/init-database.js test
`);
}
