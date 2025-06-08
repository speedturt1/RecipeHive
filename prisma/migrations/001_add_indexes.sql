
-- User and subscription indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_subscription_status ON users(subscription_status);
CREATE INDEX IF NOT EXISTS idx_users_tier ON users(subscription_tier);
CREATE INDEX IF NOT EXISTS idx_users_trial_end ON users(trial_end_date) WHERE trial_end_date IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer ON users(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_users_content_warnings ON users(content_warning_count, is_content_suspended);

-- Media content indexes
CREATE INDEX IF NOT EXISTS idx_recipe_images_recipe_primary ON recipe_images(recipe_id, is_primary);
CREATE INDEX IF NOT EXISTS idx_recipe_images_moderation ON recipe_images(content_status, moderated_at);
CREATE INDEX IF NOT EXISTS idx_recipe_images_upload_tier ON recipe_images(uploaded_by_tier, created_at);
CREATE INDEX IF NOT EXISTS idx_recipe_videos_recipe ON recipe_videos(recipe_id) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_recipe_videos_moderation ON recipe_videos(content_status, moderated_at);
CREATE INDEX IF NOT EXISTS idx_recipe_videos_analytics ON recipe_videos(view_count, created_at);

-- Recipe content and requirements
CREATE INDEX IF NOT EXISTS idx_recipes_public_images ON recipes(is_public, has_required_image) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_recipes_media_status ON recipes(has_required_image, has_video, is_public);
CREATE INDEX IF NOT EXISTS idx_recipes_content_moderation ON recipes(content_status, moderated_at);
CREATE INDEX IF NOT EXISTS idx_recipes_import_method_tier ON recipes(import_method, import_user_tier);

-- Usage tracking indexes
CREATE INDEX IF NOT EXISTS idx_recipe_saves_user_tier ON recipe_saves(user_id, user_tier_at_save);
CREATE INDEX IF NOT EXISTS idx_recipe_saves_count_by_user ON recipe_saves(user_id) INCLUDE (saved_at);
CREATE INDEX IF NOT EXISTS idx_collections_user_tier ON recipe_collections(user_id, created_by_tier);

-- Analytics indexes
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_tier_created ON user_activity_logs(user_id, user_tier, created_at);
CREATE INDEX IF NOT EXISTS idx_activity_logs_type_tier_created ON user_activity_logs(activity_type, user_tier, created_at);
CREATE INDEX IF NOT EXISTS idx_activity_logs_blocked_actions ON user_activity_logs(is_blocked_action, user_tier, created_at) WHERE is_blocked_action = TRUE;
CREATE INDEX IF NOT EXISTS idx_activity_logs_media_tracking ON user_activity_logs(activity_type, media_type, created_at) WHERE media_type IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_conversion_events_user_type ON conversion_events(user_id, event_type, created_at);
CREATE INDEX IF NOT EXISTS idx_conversion_events_funnel ON conversion_events(event_type, user_tier_before, created_at);

-- Content moderation indexes
CREATE INDEX IF NOT EXISTS idx_content_moderation_user_date ON content_moderation_events(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_content_moderation_type_status ON content_moderation_events(content_type, event_type, created_at);
CREATE INDEX IF NOT EXISTS idx_content_warnings_user_level ON content_warnings(user_id, warning_level, created_at);
CREATE INDEX IF NOT EXISTS idx_content_warnings_appeals ON content_warnings(is_appealed, appeal_result, created_at);

-- Feature usage indexes
CREATE INDEX IF NOT EXISTS idx_feature_usage_user_feature ON feature_usage_stats(user_id, feature_name);
CREATE INDEX IF NOT EXISTS idx_feature_usage_tier_feature ON feature_usage_stats(user_tier, feature_name, usage_count);

-- Search analytics
CREATE INDEX IF NOT EXISTS idx_search_queries_tier_blocked ON search_queries(user_tier, was_blocked, created_at);
CREATE INDEX IF NOT EXISTS idx_search_queries_platform_tier ON search_queries(platform, user_tier, created_at);

-- Ad revenue indexes
CREATE INDEX IF NOT EXISTS idx_ad_impressions_user_created ON ad_impressions(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_ad_impressions_platform_type ON ad_impressions(platform, ad_type, created_at);
CREATE INDEX IF NOT EXISTS idx_ad_revenue_daily_date_platform ON ad_revenue_daily(date, platform);

-- Media performance indexes
CREATE INDEX IF NOT EXISTS idx_media_storage_analytics_date ON media_storage_analytics(date);
CREATE INDEX IF NOT EXISTS idx_media_performance_type_platform ON media_performance_logs(media_type, platform, created_at);
CREATE INDEX IF NOT EXISTS idx_media_performance_load_time ON media_performance_logs(load_time_ms, file_size_bytes);

-- Business intelligence indexes
CREATE INDEX IF NOT EXISTS idx_subscription_metrics_date_platform ON subscription_metrics_daily(date, platform);
CREATE INDEX IF NOT EXISTS idx_cohort_analysis_cohort_analysis ON cohort_analysis(cohort_month, analysis_month);

-- Recipe and social indexes
CREATE INDEX IF NOT EXISTS idx_recipes_public_tier ON recipes(is_public, is_active) INCLUDE (created_by);
CREATE INDEX IF NOT EXISTS idx_recipe_ratings_tier ON recipe_ratings(user_tier, created_at);

-- Shopping list indexes
CREATE INDEX IF NOT EXISTS idx_shopping_lists_user_active ON shopping_lists(user_id, is_active, created_by_tier);

-- Sync queue optimization
CREATE INDEX IF NOT EXISTS idx_sync_queue_user_synced_priority ON offline_sync_queue(user_id, is_synced, sync_priority);
CREATE INDEX IF NOT EXISTS idx_sync_queue_media_status ON offline_sync_queue(media_sync_status, created_at) WHERE media_files IS NOT NULL;

-- Check constraints
ALTER TABLE recipe_ratings ADD CONSTRAINT chk_rating_range CHECK (rating >= 1 AND rating <= 5);
ALTER TABLE content_warnings ADD CONSTRAINT chk_warning_level_range CHECK (warning_level >= 1 AND warning_level <= 3);
