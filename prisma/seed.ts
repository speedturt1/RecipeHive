
import { PrismaClient, UserType, SubscriptionTier, SubscriptionStatus, Platform, ContentStatus, DifficultyLevel } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clean existing data in development
  if (process.env.NODE_ENV === 'development') {
    console.log('🧹 Cleaning existing data...');
    await cleanDatabase();
  }

  // Seed subscription plans
  console.log('💳 Seeding subscription plans...');
  await seedSubscriptionPlans();

  // Seed users
  console.log('👥 Seeding users...');
  const users = await seedUsers();

  // Seed ingredients
  console.log('🥕 Seeding ingredients...');
  const ingredients = await seedIngredients();

  // Seed recipes
  console.log('🍳 Seeding recipes...');
  const recipes = await seedRecipes(users, ingredients);

  // Seed user interactions
  console.log('❤️ Seeding user interactions...');
  await seedUserInteractions(users, recipes);

  // Seed analytics data
  console.log('📊 Seeding analytics data...');
  await seedAnalyticsData(users, recipes);

  console.log('✅ Database seeding completed!');
}

async function cleanDatabase() {
  const tablenames = await prisma.$queryRaw<Array<{ tablename: string }>>`
    SELECT tablename FROM pg_tables WHERE schemaname='public'
  `;

  for (const { tablename } of tablenames) {
    if (tablename !== '_prisma_migrations') {
      try {
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`);
      } catch (error) {
        console.log(`Note: Could not truncate ${tablename}, might not exist yet.`);
      }
    }
  }
}

async function seedSubscriptionPlans() {
  const plans = [
    {
      planId: 'free',
      planName: 'Free Plan',
      priceCents: 0,
      currency: 'USD',
      billingInterval: 'month' as const,
      stripePriceId: 'price_free',
      trialPeriodDays: 0,
      features: {
        recipeSaves: 10,
        collections: 1,
        shoppingLists: 1,
        ocrImport: false,
        webScraping: false,
        advancedSearch: false,
        adFree: false
      }
    },
    {
      planId: 'premium_monthly',
      planName: 'Premium Monthly',
      priceCents: 499,
      currency: 'USD',
      billingInterval: 'month' as const,
      stripePriceId: 'price_premium_monthly',
      trialPeriodDays: 14,
      features: {
        recipeSaves: -1, // unlimited
        collections: -1,
        shoppingLists: -1,
        ocrImport: true,
        webScraping: true,
        advancedSearch: true,
        adFree: true
      }
    },
    {
      planId: 'premium_yearly',
      planName: 'Premium Yearly',
      priceCents: 3999,
      currency: 'USD',
      billingInterval: 'year' as const,
      stripePriceId: 'price_premium_yearly',
      trialPeriodDays: 14,
      features: {
        recipeSaves: -1,
        collections: -1,
        shoppingLists: -1,
        ocrImport: true,
        webScraping: true,
        advancedSearch: true,
        adFree: true
      }
    }
  ];

  for (const plan of plans) {
    await prisma.subscriptionPlan.upsert({
      where: { planId: plan.planId },
      update: plan,
      create: plan
    });
  }
}

async function seedUsers() {
  const users = [];

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@recipehive.com',
      passwordHash: '$2a$10$example.hash.here',
      userType: UserType.admin,
      subscriptionTier: SubscriptionTier.premium_yearly,
      subscriptionStatus: SubscriptionStatus.active,
      firstName: 'Admin',
      lastName: 'User',
      emailVerified: true,
      isActive: true
    }
  });
  users.push(admin);

  // Create premium users
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        passwordHash: '$2a$10$example.hash.here',
        userType: UserType.premium,
        subscriptionTier: faker.helpers.arrayElement([SubscriptionTier.premium_monthly, SubscriptionTier.premium_yearly]),
        subscriptionStatus: SubscriptionStatus.active,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        profileImageUrl: faker.image.avatar(),
        emailVerified: true,
        subscriptionStartDate: faker.date.past({ years: 1 }),
        isActive: true,
        signupSource: faker.helpers.arrayElement(['organic', 'paid_ad', 'referral'])
      }
    });
    users.push(user);
  }

  // Create free users
  for (let i = 0; i < 15; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        passwordHash: '$2a$10$example.hash.here',
        userType: UserType.free,
        subscriptionTier: SubscriptionTier.free,
        subscriptionStatus: SubscriptionStatus.active,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        profileImageUrl: faker.image.avatar(),
        emailVerified: faker.datatype.boolean(),
        recipesSavedCount: faker.number.int({ min: 0, max: 10 }),
        collectionsCount: faker.number.int({ min: 0, max: 1 }),
        isActive: true,
        signupSource: faker.helpers.arrayElement(['organic', 'paid_ad', 'referral'])
      }
    });
    users.push(user);
  }

  return users;
}

async function seedIngredients() {
  const ingredientData = [
    { name: 'Salt', category: 'Seasonings', groceryAisle: 'Pantry', commonUnits: ['tsp', 'tbsp', 'pinch'] },
    { name: 'Black Pepper', category: 'Seasonings', groceryAisle: 'Pantry', commonUnits: ['tsp', 'tbsp', 'pinch'] },
    { name: 'Olive Oil', category: 'Oils', groceryAisle: 'Pantry', commonUnits: ['tbsp', 'cup', 'ml'] },
    { name: 'Garlic', category: 'Vegetables', groceryAisle: 'Produce', commonUnits: ['clove', 'tsp', 'tbsp'] },
    { name: 'Onion', category: 'Vegetables', groceryAisle: 'Produce', commonUnits: ['piece', 'cup', 'slice'] },
    { name: 'Tomatoes', category: 'Vegetables', groceryAisle: 'Produce', commonUnits: ['piece', 'cup', 'can'] },
    { name: 'Chicken Breast', category: 'Protein', groceryAisle: 'Meat', commonUnits: ['lb', 'piece', 'oz'] },
    { name: 'Ground Beef', category: 'Protein', groceryAisle: 'Meat', commonUnits: ['lb', 'oz'] },
    { name: 'Eggs', category: 'Protein', groceryAisle: 'Dairy', commonUnits: ['piece', 'dozen'] },
    { name: 'Milk', category: 'Dairy', groceryAisle: 'Dairy', commonUnits: ['cup', 'ml', 'liter'] },
    { name: 'Cheese', category: 'Dairy', groceryAisle: 'Dairy', commonUnits: ['cup', 'oz', 'slice'] },
    { name: 'Flour', category: 'Baking', groceryAisle: 'Pantry', commonUnits: ['cup', 'lb', 'oz'] },
    { name: 'Sugar', category: 'Baking', groceryAisle: 'Pantry', commonUnits: ['cup', 'tsp', 'tbsp'] },
    { name: 'Rice', category: 'Grains', groceryAisle: 'Pantry', commonUnits: ['cup', 'lb'] },
    { name: 'Pasta', category: 'Grains', groceryAisle: 'Pantry', commonUnits: ['cup', 'lb', 'oz'] }
  ];

  const ingredients = [];
  for (const data of ingredientData) {
    const ingredient = await prisma.ingredient.create({
      data: {
        name: data.name,
        category: data.category,
        groceryAisle: data.groceryAisle,
        commonUnits: data.commonUnits,
        nutritionalData: {
          calories: faker.number.int({ min: 5, max: 500 }),
          protein: faker.number.float({ min: 0, max: 50 }),
          carbs: faker.number.float({ min: 0, max: 50 }),
          fat: faker.number.float({ min: 0, max: 30 })
        }
      }
    });
    ingredients.push(ingredient);
  }

  return ingredients;
}

async function seedRecipes(users: any[], ingredients: any[]) {
  const recipes = [];
  const recipeTemplates = [
    { title: 'Classic Spaghetti Carbonara', cuisine: 'Italian', difficulty: DifficultyLevel.intermediate },
    { title: 'Chicken Tikka Masala', cuisine: 'Indian', difficulty: DifficultyLevel.advanced },
    { title: 'Caesar Salad', cuisine: 'American', difficulty: DifficultyLevel.beginner },
    { title: 'Beef Tacos', cuisine: 'Mexican', difficulty: DifficultyLevel.beginner },
    { title: 'Chocolate Chip Cookies', cuisine: 'American', difficulty: DifficultyLevel.beginner },
    { title: 'Thai Green Curry', cuisine: 'Thai', difficulty: DifficultyLevel.intermediate },
    { title: 'French Onion Soup', cuisine: 'French', difficulty: DifficultyLevel.intermediate },
    { title: 'Japanese Ramen', cuisine: 'Japanese', difficulty: DifficultyLevel.advanced },
    { title: 'Greek Moussaka', cuisine: 'Greek', difficulty: DifficultyLevel.advanced },
    { title: 'Simple Pancakes', cuisine: 'American', difficulty: DifficultyLevel.beginner }
  ];

  for (const template of recipeTemplates) {
    const user = faker.helpers.arrayElement(users);
    const recipe = await prisma.recipe.create({
      data: {
        title: template.title,
        description: faker.lorem.paragraphs(2),
        createdBy: user.id,
        isPublic: faker.datatype.boolean(),
        isOriginal: true,
        prepTimeMinutes: faker.number.int({ min: 10, max: 60 }),
        cookTimeMinutes: faker.number.int({ min: 15, max: 120 }),
        totalTimeMinutes: faker.number.int({ min: 25, max: 180 }),
        servings: faker.number.int({ min: 2, max: 8 }),
        difficultyLevel: template.difficulty,
        cuisineType: template.cuisine,
        mealType: faker.helpers.arrayElement(['breakfast', 'lunch', 'dinner', 'snack', 'dessert']),
        instructions: {
          steps: [
            faker.lorem.sentence(),
            faker.lorem.sentence(),
            faker.lorem.sentence()
          ]
        },
        hasRequiredImage: faker.datatype.boolean(),
        hasVideo: faker.datatype.boolean({ probability: 0.3 }),
        contentStatus: ContentStatus.approved,
        viewCount: faker.number.int({ min: 0, max: 1000 }),
        saveCount: faker.number.int({ min: 0, max: 100 }),
        shareCount: faker.number.int({ min: 0, max: 50 })
      }
    });

    // Add recipe ingredients
    const recipeIngredientCount = faker.number.int({ min: 3, max: 8 });
    const selectedIngredients = faker.helpers.arrayElements(ingredients, recipeIngredientCount);
    
    for (const ingredient of selectedIngredients) {
      await prisma.recipeIngredient.create({
        data: {
          recipeId: recipe.id,
          ingredientId: ingredient.id,
          quantity: faker.number.float({ min: 0.5, max: 5 }),
          unit: faker.helpers.arrayElement(ingredient.commonUnits),
          isOptional: faker.datatype.boolean({ probability: 0.2 })
        }
      });
    }

    // Add recipe tags
    const tags = faker.helpers.arrayElements(['vegetarian', 'gluten-free', 'dairy-free', 'quick', 'healthy', 'comfort-food'], faker.number.int({ min: 1, max: 3 }));
    for (const tag of tags) {
      await prisma.recipeTag.create({
        data: {
          recipeId: recipe.id,
          tagName: tag,
          tagType: 'dietary',
          createdByTier: user.subscriptionTier
        }
      });
    }

    recipes.push(recipe);
  }

  return recipes;
}

async function seedUserInteractions(users: any[], recipes: any[]) {
  // Recipe saves
  for (const user of users) {
    const saveCount = user.subscriptionTier === SubscriptionTier.free 
      ? faker.number.int({ min: 0, max: 10 })
      : faker.number.int({ min: 0, max: 30 });
    
    const recipesToSave = faker.helpers.arrayElements(recipes, saveCount);
    
    for (const recipe of recipesToSave) {
      await prisma.recipeSave.create({
        data: {
          userId: user.id,
          recipeId: recipe.id,
          userTierAtSave: user.subscriptionTier,
          saveSource: faker.helpers.arrayElement(['browse', 'search', 'social', 'recommendation'])
        }
      });
    }
  }

  // Recipe ratings
  for (let i = 0; i < 100; i++) {
    const user = faker.helpers.arrayElement(users);
    const recipe = faker.helpers.arrayElement(recipes);
    
    try {
      await prisma.recipeRating.create({
        data: {
          userId: user.id,
          recipeId: recipe.id,
          rating: faker.number.int({ min: 1, max: 5 }),
          reviewText: faker.datatype.boolean({ probability: 0.3 }) ? faker.lorem.paragraph() : null,
          userTier: user.subscriptionTier
        }
      });
    } catch (error) {
      // Skip duplicate ratings
    }
  }

  // User follows
  for (let i = 0; i < 20; i++) {
    const follower = faker.helpers.arrayElement(users);
    const following = faker.helpers.arrayElement(users.filter(u => u.id !== follower.id));
    
    try {
      await prisma.userFollow.create({
        data: {
          followerId: follower.id,
          followingId: following.id,
          followerTier: follower.subscriptionTier,
          followingTier: following.subscriptionTier
        }
      });
    } catch (error) {
      // Skip duplicate follows
    }
  }

  // Recipe collections
  for (const user of users) {
    const collectionCount = user.subscriptionTier === SubscriptionTier.free ? 1 : faker.number.int({ min: 1, max: 5 });
    
    for (let i = 0; i < collectionCount; i++) {
      const collection = await prisma.recipeCollection.create({
        data: {
          userId: user.id,
          name: faker.helpers.arrayElement(['Favorites', 'Quick Meals', 'Healthy Options', 'Weekend Projects', 'Comfort Food']),
          description: faker.lorem.sentence(),
          isPublic: faker.datatype.boolean({ probability: 0.3 }),
          createdByTier: user.subscriptionTier
        }
      });

      // Add recipes to collection
      const recipesToAdd = faker.helpers.arrayElements(recipes, faker.number.int({ min: 1, max: 10 }));
      for (const recipe of recipesToAdd) {
        await prisma.collectionRecipe.create({
          data: {
            collectionId: collection.id,
            recipeId: recipe.id,
            addedByTier: user.subscriptionTier
          }
        });
      }
    }
  }
}

async function seedAnalyticsData(users: any[], recipes: any[]) {
  // User activity logs
  for (let i = 0; i < 500; i++) {
    const user = faker.helpers.arrayElement(users);
    const recipe = faker.helpers.arrayElement(recipes);
    
    await prisma.userActivityLog.create({
      data: {
        userId: user.id,
        activityType: faker.helpers.arrayElement(['recipe_view', 'recipe_save', 'search_basic', 'collection_create']),
        entityId: recipe.id,
        userTier: user.subscriptionTier,
        platform: faker.helpers.arrayElement([Platform.web, Platform.ios, Platform.android]),
        isBlockedAction: user.subscriptionTier === SubscriptionTier.free ? faker.datatype.boolean({ probability: 0.1 }) : false,
        createdAt: faker.date.past({ years: 1 })
      }
    });
  }

  // Search queries
  for (let i = 0; i < 200; i++) {
    const user = faker.helpers.arrayElement(users);
    
    await prisma.searchQuery.create({
      data: {
        userId: user.id,
        queryText: faker.helpers.arrayElement(['chicken', 'pasta', 'healthy', 'quick', 'vegetarian']),
        searchType: user.subscriptionTier === SubscriptionTier.free ? 'basic' : faker.helpers.arrayElement(['basic', 'advanced']),
        resultsCount: faker.number.int({ min: 5, max: 50 }),
        userTier: user.subscriptionTier,
        wasBlocked: user.subscriptionTier === SubscriptionTier.free ? faker.datatype.boolean({ probability: 0.05 }) : false,
        platform: faker.helpers.arrayElement([Platform.web, Platform.ios, Platform.android]),
        createdAt: faker.date.past({ years: 1 })
      }
    });
  }

  // Feature usage stats
  for (const user of users) {
    const features = ['recipe_save', 'collection_create', 'search', 'image_upload'];
    
    for (const feature of features) {
      await prisma.featureUsageStat.create({
        data: {
          userId: user.id,
          featureName: feature,
          usageCount: faker.number.int({ min: 1, max: 50 }),
          lastUsedAt: faker.date.past({ years: 1 }),
          userTier: user.subscriptionTier,
          tierAtFirstUse: user.subscriptionTier
        }
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
