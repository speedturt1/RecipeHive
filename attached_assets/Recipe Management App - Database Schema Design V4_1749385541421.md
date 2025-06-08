# Recipe Management App - Database Schema Design V4

## Overview
This database schema supports the freemium recipe management app with comprehensive subscription management, usage tracking, conversion analytics, ad revenue optimization, mandatory recipe images, optional cooking videos, and automated content moderation. The schema is designed for React Native + Expo cross-platform deployment with robust support for trial management, feature gating, business intelligence, and rich media content.

## Core Entities & Relationships

### 1. User Management with Subscription Support

#### users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_type ENUM('free', 'premium', 'admin') DEFAULT 'free',
    subscription_tier ENUM('free', 'premium_monthly', 'premium_yearly') DEFAULT 'free',
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    profile_image_url TEXT,
    
    -- Trial Management
    trial_start_date TIMESTAMP NULL,
    trial_end_date TIMESTAMP NULL,
    has_used_trial BOOLEAN DEFAULT FALSE,
    trial_converted BOOLEAN DEFAULT FALSE,
    trial_conversion_date TIMESTAMP NULL,
    
    -- Subscription Status
    subscription_status ENUM('trial', 'active', 'past_due', 'cancelled', 'expired') DEFAULT 'trial',
    subscription_start_date TIMESTAMP NULL,
    subscription_end_date TIMESTAMP NULL,
    subscription_cancelled_at TIMESTAMP NULL,
    subscription_cancelled_reason TEXT,
    
    -- Payment Integration
    stripe_customer_id VARCHAR(255) UNIQUE,
    stripe_subscription_id VARCHAR(255) UNIQUE,
    current_period_start TIMESTAMP NULL,
    current_period_end TIMESTAMP NULL,
    
    -- Usage Limits Tracking
    recipes_saved_count INTEGER DEFAULT 0,
    collections_count INTEGER DEFAULT 0,
    shopping_lists_count INTEGER DEFAULT 0,
    
    -- Content Moderation
    content_warning_count INTEGER DEFAULT 0,
    last_content_warning_at TIMESTAMP NULL,
    is_content_suspended BOOLEAN DEFAULT FALSE,
    content_suspension_end_date TIMESTAMP NULL,
    
    -- Cross-Platform Support
    email_verified BOOLEAN DEFAULT FALSE,
    device_tokens JSONB, -- Push notification tokens for multiple devices
    platform_preferences JSONB, -- Web/iOS/Android specific settings
    sync_timestamp TIMESTAMP DEFAULT NOW(),
    
    -- Analytics
    signup_source VARCHAR(100), -- organic, paid_ad, referral, etc.
    conversion_source VARCHAR(100), -- trial_limit, upgrade_prompt, etc.
    last_upgrade_prompt_shown TIMESTAMP,
    upgrade_prompts_shown_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_login_at TIMESTAMP,
    last_sync_at TIMESTAMP DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);
```

#### subscription_plans
```sql
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id VARCHAR(50) UNIQUE NOT NULL, -- 'premium_monthly', 'premium_yearly'
    plan_name VARCHAR(100) NOT NULL,
    price_cents INTEGER NOT NULL, -- 499 for $4.99, 3999 for $39.99
    currency VARCHAR(3) DEFAULT 'USD',
    billing_interval ENUM('month', 'year') NOT NULL,
    stripe_price_id VARCHAR(255) UNIQUE NOT NULL,
    trial_period_days INTEGER DEFAULT 14,
    features JSONB, -- Array of features included in this plan
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

#### subscription_events
```sql
CREATE TABLE subscription_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    event_type ENUM('trial_start', 'trial_converted', 'trial_expired', 'subscription_created', 'subscription_updated', 'payment_succeeded', 'payment_failed', 'subscription_cancelled', 'subscription_reactivated') NOT NULL,
    subscription_tier ENUM('free', 'premium_monthly', 'premium_yearly'),
    amount_cents INTEGER,
    currency VARCHAR(3) DEFAULT 'USD',
    stripe_event_id VARCHAR(255), -- For idempotency
    stripe_subscription_id VARCHAR(255),
    platform ENUM('web', 'ios', 'android'),
    metadata JSONB, -- Additional event data
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### user_sessions
```sql
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    subscription_tier ENUM('free', 'premium_monthly', 'premium_yearly') NOT NULL,
    platform ENUM('web', 'ios', 'android') NOT NULL,
    device_info JSONB,
    expo_push_token VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    last_activity_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Recipe Management with Media Requirements

#### recipes
```sql
CREATE TABLE recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    original_recipe_id UUID REFERENCES recipes(id) ON DELETE SET NULL,
    original_source_url TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    is_original BOOLEAN DEFAULT TRUE,
    
    -- Recipe Details
    prep_time_minutes INTEGER,
    cook_time_minutes INTEGER,
    total_time_minutes INTEGER,
    servings INTEGER DEFAULT 4,
    difficulty_level ENUM('beginner', 'intermediate', 'advanced'),
    cuisine_type VARCHAR(100),
    meal_type VARCHAR(100),
    instructions JSONB,
    nutritional_info JSONB,
    
    -- Media Requirements
    has_required_image BOOLEAN DEFAULT FALSE, -- True if public recipe has at least one image
    primary_image_id UUID, -- References recipe_images.id
    has_video BOOLEAN DEFAULT FALSE,
    video_id UUID, -- References recipe_videos.id
    
    -- Import Tracking (Premium Features)
    import_method ENUM('manual', 'ocr', 'web_scrape') DEFAULT 'manual',
    ocr_confidence_score DECIMAL(3,2),
    import_user_tier ENUM('free', 'premium_monthly', 'premium_yearly'), -- Track what tier imported this
    
    -- Content Moderation
    content_status ENUM('pending', 'approved', 'rejected', 'flagged') DEFAULT 'pending',
    moderation_score DECIMAL(3,2), -- AI confidence score
    moderation_flags JSONB, -- Specific issues found
    moderated_at TIMESTAMP,
    moderated_by VARCHAR(100), -- 'ai' or admin user ID
    
    -- Analytics
    view_count INTEGER DEFAULT 0,
    save_count INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    premium_saves_count INTEGER DEFAULT 0, -- Track premium vs free saves
    video_view_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);
```

#### recipe_images
```sql
CREATE TABLE recipe_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    original_filename VARCHAR(255),
    
    -- Storage Information
    storage_path TEXT NOT NULL, -- CDN/S3 path
    cdn_url TEXT NOT NULL, -- Public CDN URL
    thumbnail_150_url TEXT, -- 150x150 thumbnail
    thumbnail_300_url TEXT, -- 300x300 thumbnail
    thumbnail_600_url TEXT, -- 600x600 thumbnail
    
    -- Image Metadata
    file_size_bytes INTEGER,
    original_width INTEGER,
    original_height INTEGER,
    compressed_width INTEGER,
    compressed_height INTEGER,
    file_format VARCHAR(10), -- jpeg, png, webp, etc.
    compression_ratio DECIMAL(3,2), -- Original size / final size
    
    -- Upload Information
    uploaded_by_tier ENUM('free', 'premium_monthly', 'premium_yearly') NOT NULL,
    upload_method ENUM('expo_camera', 'expo_image_picker', 'web_upload', 'web_scrape', 'ocr_source'),
    upload_platform ENUM('web', 'ios', 'android'),
    
    -- Content Moderation
    content_status ENUM('pending', 'approved', 'rejected', 'flagged') DEFAULT 'pending',
    moderation_score DECIMAL(3,2), -- AI confidence score
    moderation_flags JSONB, -- Specific issues found (explicit, unrelated, etc.)
    moderated_at TIMESTAMP,
    moderated_by VARCHAR(100), -- 'ai' or admin user ID
    appeal_status ENUM('none', 'pending', 'approved', 'denied') DEFAULT 'none',
    appeal_submitted_at TIMESTAMP NULL,
    appeal_resolved_at TIMESTAMP NULL,
    
    -- Ordering and Display
    display_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    alt_text VARCHAR(255),
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);
```

#### recipe_videos
```sql
CREATE TABLE recipe_videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    original_filename VARCHAR(255),
    
    -- Storage Information
    storage_path TEXT NOT NULL, -- CDN/S3 path
    cdn_url TEXT NOT NULL, -- Public CDN URL
    thumbnail_url TEXT, -- Video thumbnail image
    preview_gif_url TEXT, -- Short preview GIF (optional)
    
    -- Video Metadata
    file_size_bytes INTEGER,
    duration_seconds INTEGER,
    width INTEGER,
    height INTEGER,
    file_format VARCHAR(10), -- mp4, mov, webm, etc.
    bitrate INTEGER,
    compression_ratio DECIMAL(3,2), -- Original size / final size
    
    -- Upload Information
    uploaded_by_tier ENUM('free', 'premium_monthly', 'premium_yearly') NOT NULL,
    upload_method ENUM('expo_camera', 'expo_image_picker', 'web_upload'),
    upload_platform ENUM('web', 'ios', 'android'),
    
    -- Content Moderation
    content_status ENUM('pending', 'approved', 'rejected', 'flagged') DEFAULT 'pending',
    moderation_score DECIMAL(3,2), -- AI confidence score
    moderation_flags JSONB, -- Specific issues found
    moderated_at TIMESTAMP,
    moderated_by VARCHAR(100), -- 'ai' or admin user ID
    appeal_status ENUM('none', 'pending', 'approved', 'denied') DEFAULT 'none',
    appeal_submitted_at TIMESTAMP NULL,
    appeal_resolved_at TIMESTAMP NULL,
    
    -- Analytics
    view_count INTEGER DEFAULT 0,
    total_watch_time_seconds INTEGER DEFAULT 0,
    completion_rate DECIMAL(3,2) DEFAULT 0, -- % of users who watch to end
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);
```

#### recipe_saves (replaces simple user_favorites)
```sql
CREATE TABLE recipe_saves (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    saved_at TIMESTAMP DEFAULT NOW(),
    user_tier_at_save ENUM('free', 'premium_monthly', 'premium_yearly') NOT NULL,
    save_source ENUM('browse', 'search', 'social', 'recommendation') DEFAULT 'browse',
    UNIQUE(user_id, recipe_id)
);
```

#### recipe_ingredients
```sql
CREATE TABLE recipe_ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient_id UUID REFERENCES ingredients(id),
    quantity DECIMAL(10,3),
    unit VARCHAR(50),
    preparation_note VARCHAR(255),
    is_optional BOOLEAN DEFAULT FALSE,
    order_index INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### ingredients
```sql
CREATE TABLE ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100),
    grocery_aisle VARCHAR(100),
    common_units TEXT[],
    nutritional_data JSONB,
    aliases TEXT[],
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

#### recipe_tags
```sql
CREATE TABLE recipe_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    tag_name VARCHAR(100) NOT NULL,
    tag_type ENUM('dietary', 'cuisine', 'cooking_method', 'occasion', 'custom'),
    created_by_tier ENUM('free', 'premium_monthly', 'premium_yearly'), -- Track who added tag
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(recipe_id, tag_name)
);
```

### 3. Content Moderation System

#### content_moderation_events
```sql
CREATE TABLE content_moderation_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content_type ENUM('recipe_image', 'recipe_video', 'profile_image') NOT NULL,
    content_id UUID NOT NULL, -- ID of the specific content (image/video)
    recipe_id UUID REFERENCES recipes(id) ON DELETE SET NULL, -- If related to recipe
    
    -- Moderation Details
    event_type ENUM('submitted', 'approved', 'rejected', 'flagged', 'appealed', 'appeal_approved', 'appeal_denied') NOT NULL,
    ai_service VARCHAR(50), -- 'google_vision', 'aws_rekognition', etc.
    confidence_score DECIMAL(3,2),
    detected_issues JSONB, -- Array of specific issues found
    
    -- Human Review
    reviewed_by_admin UUID REFERENCES users(id) ON DELETE SET NULL,
    admin_notes TEXT,
    
    -- User Communication
    user_notified BOOLEAN DEFAULT FALSE,
    notification_sent_at TIMESTAMP NULL,
    user_appeal_text TEXT,
    
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### content_warnings
```sql
CREATE TABLE content_warnings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    moderation_event_id UUID REFERENCES content_moderation_events(id) ON DELETE CASCADE,
    
    -- Warning Details
    warning_type ENUM('inappropriate_content', 'unrelated_content', 'spam', 'copyright') NOT NULL,
    warning_level INTEGER CHECK (warning_level >= 1 AND warning_level <= 3), -- Strike count
    automatic_action ENUM('none', 'content_removed', 'account_suspended') DEFAULT 'none',
    
    -- Resolution
    is_acknowledged BOOLEAN DEFAULT FALSE,
    acknowledged_at TIMESTAMP NULL,
    is_appealed BOOLEAN DEFAULT FALSE,
    appeal_result ENUM('pending', 'upheld', 'overturned') NULL,
    
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP NULL -- For temporary warnings
);
```

### 4. Collections with Freemium Limits

#### recipe_collections
```sql
CREATE TABLE recipe_collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    cover_image_url TEXT, -- Optional collection cover image
    is_public BOOLEAN DEFAULT FALSE,
    collection_order INTEGER DEFAULT 0, -- For ordering user's collections
    created_by_tier ENUM('free', 'premium_monthly', 'premium_yearly') NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

#### collection_recipes
```sql
CREATE TABLE collection_recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    collection_id UUID REFERENCES recipe_collections(id) ON DELETE CASCADE,
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    added_at TIMESTAMP DEFAULT NOW(),
    added_by_tier ENUM('free', 'premium_monthly', 'premium_yearly') NOT NULL,
    display_order INTEGER DEFAULT 0,
    UNIQUE(collection_id, recipe_id)
);
```

### 5. Social Features with Analytics

#### recipe_ratings
```sql
CREATE TABLE recipe_ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    user_tier ENUM('free', 'premium_monthly', 'premium_yearly') NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(recipe_id, user_id)
);
```

#### user_follows
```sql
CREATE TABLE user_follows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
    following_id UUID REFERENCES users(id) ON DELETE CASCADE,
    follower_tier ENUM('free', 'premium_monthly', 'premium_yearly') NOT NULL,
    following_tier ENUM('free', 'premium_monthly', 'premium_yearly') NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(follower_id, following_id)
);
```

#### recipe_shares
```sql
CREATE TABLE recipe_shares (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    shared_by_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    share_platform ENUM('facebook', 'instagram', 'twitter', 'email', 'in_app', 'copy_link'),
    user_tier ENUM('free', 'premium_monthly', 'premium_yearly') NOT NULL,
    shared_at TIMESTAMP DEFAULT NOW()
);
```

### 6. Shopping Lists with Tier Restrictions

#### shopping_lists
```sql
CREATE TABLE shopping_lists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) DEFAULT 'My Shopping List',
    is_active BOOLEAN DEFAULT TRUE, -- For free users, only 1 can be active
    created_by_tier ENUM('free', 'premium_monthly', 'premium_yearly') NOT NULL,
    auto_generated BOOLEAN DEFAULT FALSE, -- True if generated from recipes
    source_recipe_ids JSONB, -- Array of recipe IDs that contributed to this list
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    is_completed BOOLEAN DEFAULT FALSE
);
```

#### shopping_list_items
```sql
CREATE TABLE shopping_list_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shopping_list_id UUID REFERENCES shopping_lists(id) ON DELETE CASCADE,
    ingredient_id UUID REFERENCES ingredients(id),
    custom_item_name VARCHAR(255),
    quantity DECIMAL(10,3),
    unit VARCHAR(50),
    grocery_category ENUM('produce', 'meat_poultry', 'dairy_eggs', 'pantry_staples', 'frozen', 'beverages', 'bakery', 'snacks_breakfast'),
    is_purchased BOOLEAN DEFAULT FALSE,
    recipe_id UUID REFERENCES recipes(id) ON DELETE SET NULL,
    notes VARCHAR(255),
    auto_generated BOOLEAN DEFAULT FALSE, -- Premium feature tracking
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### 7. Usage Tracking & Analytics

#### user_activity_logs
```sql
CREATE TABLE user_activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES user_sessions(id) ON DELETE SET NULL,
    activity_type ENUM('recipe_view', 'recipe_save', 'recipe_save_attempt_blocked', 'recipe_share', 'search_basic', 'search_advanced_blocked', 'collection_create', 'collection_create_blocked', 'shopping_list_create', 'upgrade_prompt_shown', 'upgrade_prompt_clicked', 'trial_started', 'payment_page_viewed', 'ocr_attempt_blocked', 'scrape_attempt_blocked', 'image_upload', 'video_upload', 'content_moderation_warning', 'media_view') NOT NULL,
    entity_id UUID,
    user_tier ENUM('free', 'premium_monthly', 'premium_yearly') NOT NULL,
    platform ENUM('web', 'ios', 'android'),
    
    -- Media-specific tracking
    media_type ENUM('image', 'video') NULL,
    media_duration_seconds INTEGER NULL, -- For video viewing
    media_size_bytes INTEGER NULL,
    
    -- Conversion Tracking
    is_blocked_action BOOLEAN DEFAULT FALSE, -- True if action was blocked due to tier limits
    upgrade_prompt_shown BOOLEAN DEFAULT FALSE, -- True if upgrade prompt was shown
    conversion_funnel_step ENUM('awareness', 'interest', 'consideration', 'trial', 'purchase', 'retention'),
    
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### search_queries
```sql
CREATE TABLE search_queries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    query_text TEXT,
    search_type ENUM('basic', 'advanced') DEFAULT 'basic',
    filters JSONB,
    results_count INTEGER,
    clicked_recipe_id UUID REFERENCES recipes(id) ON DELETE SET NULL,
    user_tier ENUM('free', 'premium_monthly', 'premium_yearly') NOT NULL,
    was_blocked BOOLEAN DEFAULT FALSE, -- True if advanced search was blocked for free user
    session_id VARCHAR(255),
    platform ENUM('web', 'ios', 'android'),
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### feature_usage_stats
```sql
CREATE TABLE feature_usage_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    feature_name VARCHAR(100) NOT NULL, -- 'recipe_save', 'ocr_import', 'image_upload', 'video_upload', etc.
    usage_count INTEGER DEFAULT 0,
    last_used_at TIMESTAMP,
    user_tier ENUM('free', 'premium_monthly', 'premium_yearly') NOT NULL,
    tier_at_first_use ENUM('free', 'premium_monthly', 'premium_yearly'),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, feature_name)
);
```

#### conversion_events
```sql
CREATE TABLE conversion_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    event_type ENUM('trial_started', 'limit_hit_save', 'limit_hit_collection', 'upgrade_prompt_shown', 'upgrade_prompt_clicked', 'payment_page_viewed', 'payment_initiated', 'payment_completed', 'subscription_activated', 'trial_converted', 'content_warning_received', 'media_upload_successful') NOT NULL,
    source_feature VARCHAR(100), -- Which feature triggered the event
    user_tier_before ENUM('free', 'premium_monthly', 'premium_yearly'),
    user_tier_after ENUM('free', 'premium_monthly', 'premium_yearly'),
    platform ENUM('web', 'ios', 'android'),
    session_id UUID REFERENCES user_sessions(id) ON DELETE SET NULL,
    metadata JSONB, -- Additional context like which recipe triggered save limit
    created_at TIMESTAMP DEFAULT NOW()
);
```

### 8. Ad Revenue & Analytics

#### ad_impressions
```sql
CREATE TABLE ad_impressions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id UUID REFERENCES user_sessions(id) ON DELETE SET NULL,
    ad_unit_id VARCHAR(255) NOT NULL, -- AdMob ad unit ID
    ad_type ENUM('banner', 'interstitial', 'rewarded') NOT NULL,
    ad_placement VARCHAR(100), -- 'recipe_browse', 'search_results', 'recipe_detail'
    platform ENUM('web', 'ios', 'android') NOT NULL,
    
    -- Revenue Tracking
    revenue_cents INTEGER DEFAULT 0, -- Revenue in cents
    currency VARCHAR(3) DEFAULT 'USD',
    ad_network VARCHAR(50) DEFAULT 'admob',
    
    -- Performance
    was_clicked BOOLEAN DEFAULT FALSE,
    click_timestamp TIMESTAMP NULL,
    view_duration_seconds INTEGER,
    
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### ad_revenue_daily
```sql
CREATE TABLE ad_revenue_daily (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    platform ENUM('web', 'ios', 'android') NOT NULL,
    ad_type ENUM('banner', 'interstitial', 'rewarded') NOT NULL,
    
    -- Aggregated Metrics
    impressions_count INTEGER DEFAULT 0,
    clicks_count INTEGER DEFAULT 0,
    revenue_cents INTEGER DEFAULT 0,
    unique_users_count INTEGER DEFAULT 0,
    
    -- Calculated Metrics
    ctr DECIMAL(5,4) DEFAULT 0, -- Click-through rate
    rpm DECIMAL(10,2) DEFAULT 0, -- Revenue per mille (1000 impressions)
    
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(date, platform, ad_type)
);
```

### 9. Media Storage and Performance Analytics

#### media_storage_analytics
```sql
CREATE TABLE media_storage_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    
    -- Storage Metrics
    total_storage_gb DECIMAL(10,2) DEFAULT 0,
    image_storage_gb DECIMAL(10,2) DEFAULT 0,
    video_storage_gb DECIMAL(10,2) DEFAULT 0,
    thumbnail_storage_gb DECIMAL(10,2) DEFAULT 0,
    
    -- Upload Metrics
    images_uploaded INTEGER DEFAULT 0,
    videos_uploaded INTEGER DEFAULT 0,
    total_upload_size_gb DECIMAL(10,2) DEFAULT 0,
    
    -- Performance Metrics
    avg_image_load_time_ms INTEGER DEFAULT 0,
    avg_video_load_time_ms INTEGER DEFAULT 0,
    cdn_cache_hit_rate DECIMAL(3,2) DEFAULT 0,
    
    -- Cost Metrics
    storage_cost_cents INTEGER DEFAULT 0,
    bandwidth_cost_cents INTEGER DEFAULT 0,
    moderation_cost_cents INTEGER DEFAULT 0,
    total_media_cost_cents INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(date)
);
```

#### media_performance_logs
```sql
CREATE TABLE media_performance_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    media_type ENUM('image', 'video') NOT NULL,
    media_id UUID NOT NULL, -- References recipe_images.id or recipe_videos.id
    
    -- Performance Metrics
    load_time_ms INTEGER,
    file_size_bytes INTEGER,
    platform ENUM('web', 'ios', 'android') NOT NULL,
    connection_type VARCHAR(50), -- wifi, cellular, etc.
    
    -- User Interaction
    was_viewed BOOLEAN DEFAULT TRUE,
    view_duration_seconds INTEGER NULL, -- For videos
    interaction_type ENUM('view', 'download', 'share') DEFAULT 'view',
    
    created_at TIMESTAMP DEFAULT NOW()
);
```

### 10. Business Intelligence & KPIs

#### cohort_analysis
```sql
CREATE TABLE cohort_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cohort_month DATE NOT NULL, -- First month user signed up
    analysis_month DATE NOT NULL, -- Month being analyzed
    platform ENUM('web', 'ios', 'android') NOT NULL,
    
    -- User Counts
    new_users_count INTEGER DEFAULT 0,
    retained_users_count INTEGER DEFAULT 0,
    converted_users_count INTEGER DEFAULT 0,
    churned_users_count INTEGER DEFAULT 0,
    
    -- Media Engagement
    users_with_images INTEGER DEFAULT 0,
    users_with_videos INTEGER DEFAULT 0,
    avg_media_uploads_per_user DECIMAL(5,2) DEFAULT 0,
    
    -- Revenue Metrics
    mrr_cents INTEGER DEFAULT 0, -- Monthly Recurring Revenue
    arpu_cents INTEGER DEFAULT 0, -- Average Revenue Per User
    
    -- Calculated KPIs
    retention_rate DECIMAL(5,4) DEFAULT 0,
    conversion_rate DECIMAL(5,4) DEFAULT 0,
    churn_rate DECIMAL(5,4) DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(cohort_month, analysis_month, platform)
);
```

#### subscription_metrics_daily
```sql
CREATE TABLE subscription_metrics_daily (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    platform ENUM('web', 'ios', 'android') NOT NULL,
    
    -- User Metrics
    total_users INTEGER DEFAULT 0,
    free_users INTEGER DEFAULT 0,
    trial_users INTEGER DEFAULT 0,
    premium_monthly_users INTEGER DEFAULT 0,
    premium_yearly_users INTEGER DEFAULT 0,
    
    -- Content Metrics
    recipes_with_images INTEGER DEFAULT 0,
    recipes_with_videos INTEGER DEFAULT 0,
    content_warnings_issued INTEGER DEFAULT 0,
    
    -- Conversion Metrics
    new_signups INTEGER DEFAULT 0,
    trial_starts INTEGER DEFAULT 0,
    trial_conversions INTEGER DEFAULT 0,
    subscriptions_cancelled INTEGER DEFAULT 0,
    
    -- Revenue Metrics
    mrr_cents INTEGER DEFAULT 0,
    new_mrr_cents INTEGER DEFAULT 0,
    churned_mrr_cents INTEGER DEFAULT 0,
    
    -- Calculated KPIs
    trial_conversion_rate DECIMAL(5,4) DEFAULT 0,
    monthly_churn_rate DECIMAL(5,4) DEFAULT 0,
    ltv_to_cac_ratio DECIMAL(5,2) DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(date, platform)
);
```

### 11. Offline Sync for Cross-Platform

#### offline_sync_queue
```sql
CREATE TABLE offline_sync_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    operation_type ENUM('create', 'update', 'delete'),
    entity_type ENUM('recipe', 'recipe_save', 'shopping_list_item', 'rating', 'collection', 'recipe_image', 'recipe_video'),
    entity_id UUID,
    data_payload JSONB,
    user_tier ENUM('free', 'premium_monthly', 'premium_yearly') NOT NULL,
    platform ENUM('web', 'ios', 'android'),
    
    -- Media-specific sync data
    media_files JSONB, -- Array of media files to sync
    media_sync_status ENUM('pending', 'uploading', 'completed', 'failed') DEFAULT 'pending',
    
    -- Sync Management
    attempts INTEGER DEFAULT 0,
    max_attempts INTEGER DEFAULT 3,
    is_synced BOOLEAN DEFAULT FALSE,
    sync_priority INTEGER DEFAULT 0, -- Higher numbers sync first
    
    created_at TIMESTAMP DEFAULT NOW(),
    synced_at TIMESTAMP NULL,
    error_message TEXT
);
```

## Indexes for Performance & Analytics

```sql
-- User and subscription indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_subscription_status ON users(subscription_status);
CREATE INDEX idx_users_tier ON users(subscription_tier);
CREATE INDEX idx_users_trial_end ON users(trial_end_date) WHERE trial_end_date IS NOT NULL;
CREATE INDEX idx_users_stripe_customer ON users(stripe_customer_id);
CREATE INDEX idx_users_content_warnings ON users(content_warning_count, is_content_suspended);

-- Media content indexes
CREATE INDEX idx_recipe_images_recipe_primary ON recipe_images(recipe_id, is_primary);
CREATE INDEX idx_recipe_images_moderation ON recipe_images(content_status, moderated_at);
CREATE INDEX idx_recipe_images_upload_tier ON recipe_images(uploaded_by_tier, created_at);
CREATE INDEX idx_recipe_videos_recipe ON recipe_videos(recipe_id) WHERE is_active = TRUE;
CREATE INDEX idx_recipe_videos_moderation ON recipe_videos(content_status, moderated_at);
CREATE INDEX idx_recipe_videos_analytics ON recipe_videos(view_count, created_at);

-- Recipe content and requirements
CREATE INDEX idx_recipes_public_images ON recipes(is_public, has_required_image) WHERE is_active = TRUE;
CREATE INDEX idx_recipes_media_status ON recipes(has_required_image, has_video, is_public);
CREATE INDEX idx_recipes_content_moderation ON recipes(content_status, moderated_at);
CREATE INDEX idx_recipes_import_method_tier ON recipes(import_method, import_user_tier);

-- Usage tracking indexes
CREATE INDEX idx_recipe_saves_user_tier ON recipe_saves(user_id, user_tier_at_save);
CREATE INDEX idx_recipe_saves_count_by_user ON recipe_saves(user_id) INCLUDE (saved_at);
CREATE INDEX idx_collections_user_tier ON recipe_collections(user_id, created_by_tier);

-- Analytics indexes
CREATE INDEX idx_activity_logs_user_tier_created ON user_activity_logs(user_id, user_tier, created_at);
CREATE INDEX idx_activity_logs_type_tier_created ON user_activity_logs(activity_type, user_tier, created_at);
CREATE INDEX idx_activity_logs_blocked_actions ON user_activity_logs(is_blocked_action, user_tier, created_at) WHERE is_blocked_action = TRUE;
CREATE INDEX idx_activity_logs_media_tracking ON user_activity_logs(activity_type, media_type, created_at) WHERE media_type IS NOT NULL;

CREATE INDEX idx_conversion_events_user_type ON conversion_events(user_id, event_type, created_at);
CREATE INDEX idx_conversion_events_funnel ON conversion_events(event_type, user_tier_before, created_at);

-- Content moderation indexes
CREATE INDEX idx_content_moderation_user_date ON content_moderation_events(user_id, created_at);
CREATE INDEX idx_content_moderation_type_status ON content_moderation_events(content_type, event_type, created_at);
CREATE INDEX idx_content_warnings_user_level ON content_warnings(user_id, warning_level, created_at);
CREATE INDEX idx_content_warnings_appeals ON content_warnings(is_appealed, appeal_result, created_at);

-- Feature usage indexes
CREATE INDEX idx_feature_usage_user_feature ON feature_usage_stats(user_id, feature_name);
CREATE INDEX idx_feature_usage_tier_feature ON feature_usage_stats(user_tier, feature_name, usage_count);

-- Search analytics
CREATE INDEX idx_search_queries_tier_blocked ON search_queries(user_tier, was_blocked, created_at);
CREATE INDEX idx_search_queries_platform_tier ON search_queries(platform, user_tier, created_at);

-- Ad revenue indexes
CREATE INDEX idx_ad_impressions_user_created ON ad_impressions(user_id, created_at);
CREATE INDEX idx_ad_impressions_platform_type ON ad_impressions(platform, ad_type, created_at);
CREATE INDEX idx_ad_revenue_daily_date_platform ON ad_revenue_daily(date, platform);

-- Media performance indexes
CREATE INDEX idx_media_storage_analytics_date ON media_storage_analytics(date);
CREATE INDEX idx_media_performance_type_platform ON media_performance_logs(media_type, platform, created_at);
CREATE INDEX idx_media_performance_load_time ON media_performance_logs(load_time_ms, file_size_bytes);

-- Business intelligence indexes
CREATE INDEX idx_subscription_metrics_date_platform ON subscription_metrics_daily(date, platform);
CREATE INDEX idx_cohort_analysis_cohort_analysis ON cohort_analysis(cohort_month, analysis_month);

-- Recipe and social indexes
CREATE INDEX idx_recipes_public_tier ON recipes(is_public, is_active) INCLUDE (created_by);
CREATE INDEX idx_recipe_ratings_tier ON recipe_ratings(user_tier, created_at);

-- Shopping list indexes
CREATE INDEX idx_shopping_lists_user_active ON shopping_lists(user_id, is_active, created_by_tier);

-- Sync queue optimization
CREATE INDEX idx_sync_queue_user_synced_priority ON offline_sync_queue(user_id, is_synced, sync_priority);
CREATE INDEX idx_sync_queue_media_status ON offline_sync_queue(media_sync_status, created_at) WHERE media_files IS NOT NULL;

-- Foreign key constraints for media relationships
ALTER TABLE recipes ADD CONSTRAINT fk_recipes_primary_image 
    FOREIGN KEY (primary_image_id) REFERENCES recipe_images(id) ON DELETE SET NULL;
ALTER TABLE recipes ADD CONSTRAINT fk_recipes_video 
    FOREIGN KEY (video_id) REFERENCES recipe_videos(id) ON DELETE SET NULL;
```

## Key Database Design Decisions


### 1. Updated Shopping List System
- **Simplified source tracking**: Shopping lists now track `source_recipe_ids`
- **Auto-generation**: Based purely on selected recipes 
- **Freemium limits**: Maintained 1 active list for free users, unlimited for premium

### 2. Media Asset Management
- **Separate tables** for images and videos with comprehensive metadata tracking
- **CDN URL storage** for optimized global content delivery
- **Multiple thumbnail sizes** for different UI contexts and performance
- **Compression tracking** to monitor storage optimization effectiveness

### 3. Content Moderation Integration
- **AI moderation scores** stored with each media asset for transparency
- **Appeal system** built into the database with status tracking
- **User warning escalation** with automatic suspension after 3 strikes
- **Content status workflow** from pending → approved/rejected/flagged

### 4. Media Requirements Enforcement
- **Recipe validation** ensuring public recipes have required images
- **Primary image designation** for consistent recipe thumbnails
- **Upload tier tracking** for analytics on feature usage by subscription level

### 5. Performance Optimization
- **Lazy loading support** through efficient indexing strategies
- **Media performance logging** to identify bottlenecks and optimization opportunities
- **CDN cache tracking** for cost and performance analysis
- **Storage analytics** for proactive capacity planning

### 6. Cost Management
- **Storage tracking by date** for accurate cost attribution
- **Compression ratio monitoring** to optimize storage costs
- **Bandwidth usage analytics** for CDN cost optimization
- **Media infrastructure cost allocation** across user tiers

### 7. Freemium Integration
- **No feature restrictions** on media upload/viewing between free and premium users
- **Tier tracking** for all media uploads to understand usage patterns
- **Analytics integration** to measure media engagement impact on conversions

### 8. Cross-Platform Sync
- **Media file sync queue** for offline-first mobile experience
- **Platform-specific upload tracking** for performance optimization
- **Sync status management** for reliable media availability across devices

### 9. Business Intelligence
- **Media engagement metrics** integrated with conversion analytics
- **Storage cost tracking** as percentage of revenue
- **Content quality analytics** through moderation success rates
- **User behavior analysis** with media interaction patterns

## Storage Cost Projections Integration

Based on the cost analysis performed, this schema is designed to support:

- **Year 1**: ~1,017 GB storage, $682 annual media infrastructure cost (<1% of revenue)
- **Year 2**: ~2,034 GB storage, $3,779 annual cost (0.31% of revenue)
- **Efficient scaling** through tiered storage and aggressive compression strategies
- **Cost monitoring** through dedicated analytics tables for proactive management

