
/**
 * Replit PostgreSQL Setup Script
 * This script helps configure and connect to Replit's PostgreSQL service
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

function setupReplitDatabase() {
  console.log('🚀 Setting up Replit PostgreSQL for RecipeHive...\n');

  // Check if .env exists
  const envPath = path.join(process.cwd(), '.env');
  
  if (!fs.existsSync(envPath)) {
    console.log('📝 Creating .env file from template...');
    const envExamplePath = path.join(process.cwd(), '.env.example');
    if (fs.existsSync(envExamplePath)) {
      fs.copyFileSync(envExamplePath, envPath);
      console.log('✅ .env file created');
    }
  }

  // Check if DATABASE_URL is set
  require('dotenv').config();
  
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('localhost')) {
    console.log('⚠️  DATABASE_URL not properly configured for Replit PostgreSQL');
    console.log('\nTo set up your database:');
    console.log('1. Open a new tab in Replit');
    console.log('2. Type "Database" and select PostgreSQL');
    console.log('3. Click "Create Database"');
    console.log('4. Copy the DATABASE_URL from the environment variables');
    console.log('5. Paste it into your .env file');
    console.log('\nExample DATABASE_URL format:');
    console.log('DATABASE_URL="postgresql://username:password@host:5432/database"');
    return;
  }

  console.log('📊 DATABASE_URL found, proceeding with setup...\n');

  try {
    // Generate Prisma client
    console.log('🔧 Generating Prisma client...');
    execSync('npx prisma generate', { 
      stdio: 'inherit',
      env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL }
    });

    // Push database schema
    console.log('\n📤 Pushing schema to database...');
    execSync('npx prisma db push --accept-data-loss', { 
      stdio: 'inherit',
      env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL }
    });

    console.log('\n✅ Database setup completed successfully!');
    console.log('\nYour RecipeHive database is ready with:');
    console.log('- User management tables');
    console.log('- Recipe and media storage');
    console.log('- Social features (follows, ratings, collections)');
    console.log('- Analytics and subscription tracking');
    console.log('- Content moderation system');
    
    console.log('\nNext steps:');
    console.log('1. Run: node scripts/init-database.js init');
    console.log('2. Start your app: npx expo start');

  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    console.log('\nTroubleshooting:');
    console.log('- Verify your DATABASE_URL is correct');
    console.log('- Check that your Replit PostgreSQL service is running');
    console.log('- Try running: node scripts/init-database.js test');
  }
}

// Install required packages if missing
function checkDependencies() {
  console.log('📦 Checking dependencies...');
  
  try {
    require('@prisma/client');
    require('dotenv');
    console.log('✅ All dependencies found');
  } catch (error) {
    console.log('📦 Installing missing dependencies...');
    execSync('npm install dotenv', { stdio: 'inherit' });
  }
}

function main() {
  checkDependencies();
  setupReplitDatabase();
}

if (require.main === module) {
  main();
}

module.exports = { setupReplitDatabase };
