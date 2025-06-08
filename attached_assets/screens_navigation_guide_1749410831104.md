# Recipe Management App - Complete Screen List & Navigation Logic

## Screen Categories Overview

### 🔐 Authentication Screens
### 🏠 Core App Screens  
### 📸 Media Management Screens
### ⭐ Premium Feature Screens
### 👥 Social Feature Screens
### ⚙️ Settings & Management Screens
### 💳 Subscription & Conversion Screens
### 📊 Admin Screens
### 🚀 Onboarding Screens

---

## 🔐 Authentication Screens

### 1. `LandingScreen.js`
**Path**: `src/screens/LandingScreen.js`
**Purpose**: App introduction with freemium value proposition
**Navigation Logic**:
- `→ RegisterScreen` (Start Free Trial button)
- `→ LoginScreen` (Sign In button)
- Auto-redirect if already authenticated

### 2. `LoginScreen.js`
**Path**: `src/screens/auth/LoginScreen.js`
**Purpose**: User authentication
**Navigation Logic**:
- `→ HomeScreen` (successful login)
- `→ RegisterScreen` (Create Account link)
- `→ ForgotPasswordScreen` (Forgot Password link)
- `→ OnboardingScreen` (first-time users)

### 3. `RegisterScreen.js`
**Path**: `src/screens/auth/RegisterScreen.js`
**Purpose**: New user registration with automatic trial activation
**Navigation Logic**:
- `→ OnboardingScreen` (successful registration)
- `→ LoginScreen` (Already have account link)
- Auto-activate 14-day trial
- Set user tier to `trial`

### 4. `ForgotPasswordScreen.js`
**Path**: `src/screens/auth/ForgotPasswordScreen.js`
**Purpose**: Password reset functionality
**Navigation Logic**:
- `→ LoginScreen` (after reset email sent)
- `← LoginScreen` (back button)

---

## 🚀 Onboarding Screens

### 5. `OnboardingScreen.js`
**Path**: `src/screens/onboarding/OnboardingScreen.js`
**Purpose**: Welcome flow for new users
**Navigation Logic**:
- `→ TutorialScreen` (Get Started button)
- `→ HomeScreen` (Skip button)

### 6. `TutorialScreen.js`
**Path**: `src/screens/onboarding/TutorialScreen.js`
**Purpose**: Feature walkthrough
**Navigation Logic**:
- `→ PermissionsScreen` (Next button)
- `← OnboardingScreen` (Back button)

### 7. `PermissionsScreen.js`
**Path**: `src/screens/onboarding/PermissionsScreen.js`
**Purpose**: Request camera, media, and notification permissions
**Navigation Logic**:
- `→ HomeScreen` (permissions granted/skipped)
- `← TutorialScreen` (Back button)

---

## 🏠 Core App Screens

### 8. `HomeScreen.js`
**Path**: `src/screens/HomeScreen.js`
**Purpose**: Main dashboard with tier-appropriate features
**Navigation Logic**:
- `→ RecipeDetailScreen` (featured recipe cards)
- `→ RecipesScreen` (Browse All button)
- `→ CreateRecipeScreen` (Add Recipe button)
- `→ PaywallScreen` (premium feature attempt by free users)
- Display trial countdown for trial users
- Show tier-specific content and upgrade prompts

### 9. `RecipesScreen.js`
**Path**: `src/screens/RecipesScreen.js`
**Purpose**: Recipe browsing with ads for free users
**Navigation Logic**:
- `→ RecipeDetailScreen` (recipe card tap)
- `→ SearchScreen` (search bar)
- `→ AdvancedSearchScreen` (premium only)
- `→ CreateRecipeScreen` (+ button)
- `→ UpgradePromptScreen` (advanced features for free users)
- Show banner ads for free users
- Interstitial ads between browsing sessions

### 10. `RecipeDetailScreen.js`
**Path**: `src/screens/RecipeDetailScreen.js`
**Purpose**: Full recipe view with media gallery
**Navigation Logic**:
- `→ EditRecipeScreen` (edit button - if owner)
- `→ GalleryScreen` (image tap)
- `→ VideoPlayerScreen` (video tap)
- `→ PaywallScreen` (save attempt when limit reached - 10 saves max)
- `→ PaywallScreen` (social features, comments, user profiles)
- `→ PaywallScreen` (collections or shopping list access)
- Save limit enforcement: 10 recipes max for free users
- Social features require premium subscription

### 11. `CreateRecipeScreen.js`
**Path**: `src/screens/CreateRecipeScreen.js`
**Purpose**: Recipe creation with mandatory images for public recipes
**Navigation Logic**:
- `→ MediaUploadScreen` (Add Photos/Videos button)
- `→ ImageEditorScreen` (edit uploaded images)
- `→ RecipeDetailScreen` (after successful creation)
- `→ PaywallScreen` (OCR/import attempts by free users)
- Require at least one image for public recipes
- Content moderation for all uploads

### 12. `EditRecipeScreen.js`
**Path**: `src/screens/EditRecipeScreen.js`
**Purpose**: Recipe editing with media management
**Navigation Logic**:
- `→ MediaUploadScreen` (Add/Edit Media)
- `→ ImageEditorScreen` (edit images)
- `→ RecipeDetailScreen` (save changes)
- `← RecipeDetailScreen` (cancel)

### 13. `SearchScreen.js`
**Path**: `src/screens/SearchScreen.js`
**Purpose**: Basic text search for all users
**Navigation Logic**:
- `→ RecipeDetailScreen` (search result tap)
- `→ AdvancedSearchScreen` (premium only)
- `→ UpgradePromptScreen` (advanced filters for free users)
- Show search suggestions
- Track search queries for analytics

### 14. `CollectionsScreen.js`
**Path**: `src/screens/CollectionsScreen.js`
**Purpose**: Recipe collections management (Premium Only)
**Navigation Logic**:
- `→ CollectionDetailScreen` (collection tap)
- `→ PaywallScreen` (if accessed by free user)
- Premium users only: unlimited collections
- Free users: Immediate paywall redirect

### 15. `CollectionDetailScreen.js`
**Path**: `src/screens/CollectionDetailScreen.js`
**Purpose**: View collection contents (Premium Only)
**Navigation Logic**:
- `→ RecipeDetailScreen` (recipe tap)
- `→ PaywallScreen` (if accessed by free user)
- Edit collection name/description
- Remove recipes from collection

### 16. `ShoppingListScreen.js`
**Path**: `src/screens/ShoppingListScreen.js`
**Purpose**: Shopping list management (Premium Only)
**Navigation Logic**:
- `→ PaywallScreen` (if accessed by free user)
- `→ RecipeDetailScreen` (recipe tap from list source)
- Premium users only: unlimited lists with smart categorization
- Free users: Immediate paywall redirect

---

## 📸 Media Management Screens

### 17. `MediaUploadScreen.js`
**Path**: `src/screens/MediaUploadScreen.js`
**Purpose**: Unified media upload interface
**Navigation Logic**:
- `→ ImageEditorScreen` (edit before upload)
- `← CreateRecipeScreen` (back to recipe)
- `← EditRecipeScreen` (back to recipe)
- Support drag-and-drop, camera, and gallery
- Real-time upload progress
- Content moderation feedback

### 18. `ImageEditorScreen.js`
**Path**: `src/screens/ImageEditorScreen.js`
**Purpose**: In-app image editing tools
**Navigation Logic**:
- `← MediaUploadScreen` (save/cancel)
- Crop, rotate, and filter tools
- Real-time preview
- Maintains original quality

### 19. `VideoPlayerScreen.js`
**Path**: `src/screens/VideoPlayerScreen.js`
**Purpose**: Full-screen video playback
**Navigation Logic**:
- `← RecipeDetailScreen` (close button)
- Video controls and playback analytics
- Track viewing duration for engagement metrics

### 20. `GalleryScreen.js`
**Path**: `src/screens/GalleryScreen.js`
**Purpose**: Image gallery with zoom/swipe
**Navigation Logic**:
- `← RecipeDetailScreen` (close button)
- Swipe between images
- Zoom and pan functionality

---

## ⭐ Premium Feature Screens

### 21. `OCRScanScreen.js`
**Path**: `src/screens/premium/OCRScanScreen.js`
**Purpose**: Camera OCR for recipe scanning (Premium Only)
**Navigation Logic**:
- `→ CreateRecipeScreen` (with OCR data)
- `→ PaywallScreen` (if accessed by free user)
- `← HomeScreen/RecipesScreen` (cancel)
- Subscription validation required
- Camera integration with text extraction

### 22. `WebScrapingScreen.js`
**Path**: `src/screens/premium/WebScrapingScreen.js`
**Purpose**: Import recipes from web URLs (Premium Only)
**Navigation Logic**:
- `→ CreateRecipeScreen` (with scraped data)
- `→ PaywallScreen` (if accessed by free user)
- `← HomeScreen/RecipesScreen` (cancel)
- URL validation and parsing
- Automatic image and ingredient extraction

### 23. `AdvancedSearchScreen.js`
**Path**: `src/screens/premium/AdvancedSearchScreen.js`
**Purpose**: Advanced search filters (Premium Only)
**Navigation Logic**:
- `→ RecipeDetailScreen` (search results)
- `→ PaywallScreen` (if accessed by free user)
- `← SearchScreen` (back)
- Ingredient, dietary, cuisine filters
- Cook time and difficulty filtering

### 24. `OfflineRecipesScreen.js`
**Path**: `src/screens/premium/OfflineRecipesScreen.js`
**Purpose**: Offline recipe management (Premium Only)
**Navigation Logic**:
- `→ RecipeDetailScreen` (offline recipe)
- `← ProfileScreen` (settings)
- Download/sync management
- Storage usage tracking

---

## 👥 Social Feature Screens (Premium Only)

### 25. `SocialFeedScreen.js`
**Path**: `src/screens/social/SocialFeedScreen.js`
**Purpose**: Community recipe feed (Premium Only)
**Navigation Logic**:
- `→ RecipeDetailScreen` (recipe posts)
- `→ UserProfileScreen` (user avatar tap)
- `→ CommentsScreen` (comment button)
- `→ PaywallScreen` (if accessed by free user)
- Premium subscription validation required
- Following feed and trending recipes

### 26. `UserProfileScreen.js`
**Path**: `src/screens/social/UserProfileScreen.js`
**Purpose**: View other users' profiles (Premium Only)
**Navigation Logic**:
- `→ RecipeDetailScreen` (user's recipes)
- `→ FollowersScreen` (followers count)
- `→ FollowingScreen` (following count)
- `→ PaywallScreen` (if accessed by free user)
- Follow/unfollow functionality
- User's recipe collection

### 27. `FollowersScreen.js`
**Path**: `src/screens/social/FollowersScreen.js`
**Purpose**: View user's followers (Premium Only)
**Navigation Logic**:
- `→ UserProfileScreen` (follower tap)
- `← UserProfileScreen` (back)
- `→ PaywallScreen` (if accessed by free user)
- Follow/unfollow from list

### 28. `FollowingScreen.js`
**Path**: `src/screens/social/FollowingScreen.js`
**Purpose**: View who user is following (Premium Only)
**Navigation Logic**:
- `→ UserProfileScreen` (following tap)
- `← UserProfileScreen` (back)
- `→ PaywallScreen` (if accessed by free user)
- Unfollow functionality

### 29. `CommentsScreen.js`
**Path**: `src/screens/social/CommentsScreen.js`
**Purpose**: Recipe comments and discussions (Premium Only)
**Navigation Logic**:
- `→ UserProfileScreen` (commenter tap)
- `← RecipeDetailScreen` (back)
- `→ PaywallScreen` (if accessed by free user)
- Comment creation and moderation

---

## 💳 Subscription & Conversion Screens

### 30. `PaywallScreen.js`
**Path**: `src/screens/conversion/PaywallScreen.js`
**Purpose**: Premium upgrade modal
**Navigation Logic**:
- `→ SubscriptionScreen` (upgrade buttons)
- `← Previous Screen` (close/cancel)
- Context-aware messaging based on blocked feature
- Pricing display ($4.99/month, $39.99/year)

### 31. `SubscriptionScreen.js`
**Path**: `src/screens/auth/SubscriptionScreen.js`
**Purpose**: Payment processing and plan selection
**Navigation Logic**:
- `→ PaymentSuccessScreen` (successful payment)
- `→ HomeScreen` (payment failure with retry)
- `← PaywallScreen` (cancel)
- Stripe integration with billing management

### 32. `TrialExpiredScreen.js`
**Path**: `src/screens/conversion/TrialExpiredScreen.js`
**Purpose**: Trial expiration handling
**Navigation Logic**:
- `→ SubscriptionScreen` (upgrade button)
- Feature degradation to free tier
- Cannot be dismissed without action

### 33. `UpgradePromptScreen.js`
**Path**: `src/screens/conversion/UpgradePromptScreen.js`
**Purpose**: Contextual upgrade suggestions
**Navigation Logic**:
- `→ PaywallScreen` (learn more)
- `→ SubscriptionScreen` (direct upgrade)
- `← Previous Screen` (dismiss)
- Feature-specific messaging

### 34. `PaymentSuccessScreen.js`
**Path**: `src/screens/conversion/PaymentSuccessScreen.js`
**Purpose**: Payment confirmation and feature unlock
**Navigation Logic**:
- `→ HomeScreen` (get started button)
- Welcome message with premium feature highlights
- Immediate tier upgrade and feature access

---

## ⚙️ Settings & Management Screens

### 35. `ProfileScreen.js`
**Path**: `src/screens/ProfileScreen.js`
**Purpose**: User profile with subscription status
**Navigation Logic**:
- `→ SettingsScreen` (settings button)
- `→ SubscriptionManagementScreen` (subscription status)
- `→ EditRecipeScreen` (own recipes)
- Display tier badge and trial countdown
- User's recipe statistics

### 36. `SettingsScreen.js`
**Path**: `src/screens/settings/SettingsScreen.js`
**Purpose**: Main settings hub
**Navigation Logic**:
- `→ AccountSettingsScreen`
- `→ SubscriptionManagementScreen`
- `→ NotificationSettingsScreen`
- `→ PrivacySettingsScreen`
- `→ HelpSupportScreen`
- `→ AboutScreen`
- `← ProfileScreen` (back)

### 37. `AccountSettingsScreen.js`
**Path**: `src/screens/settings/AccountSettingsScreen.js`
**Purpose**: Account management
**Navigation Logic**:
- Profile editing functionality
- Password change
- Email verification
- Account deletion option

### 38. `SubscriptionManagementScreen.js`
**Path**: `src/screens/settings/SubscriptionManagementScreen.js`
**Purpose**: Billing and subscription control
**Navigation Logic**:
- `→ SubscriptionScreen` (plan changes)
- Plan upgrade/downgrade options
- Billing history
- Cancellation management
- Next billing date display

### 39. `NotificationSettingsScreen.js`
**Path**: `src/screens/settings/NotificationSettingsScreen.js`
**Purpose**: Push notification preferences
**Navigation Logic**:
- `← SettingsScreen` (back)
- Toggle notifications by type
- Quiet hours configuration

### 40. `PrivacySettingsScreen.js`
**Path**: `src/screens/settings/PrivacySettingsScreen.js`
**Purpose**: Privacy and data control
**Navigation Logic**:
- `← SettingsScreen` (back)
- Profile visibility settings
- Data download/deletion
- Content sharing preferences

### 41. `HelpSupportScreen.js`
**Path**: `src/screens/settings/HelpSupportScreen.js`
**Purpose**: Customer support and FAQs
**Navigation Logic**:
- `← SettingsScreen` (back)
- FAQ sections
- Contact support forms
- Troubleshooting guides

### 42. `AboutScreen.js`
**Path**: `src/screens/settings/AboutScreen.js`
**Purpose**: App information and legal
**Navigation Logic**:
- `← SettingsScreen` (back)
- Version information
- Terms of service
- Privacy policy links

---

## 📊 Admin Screens

### 43. `AdminDashboardScreen.js`
**Path**: `src/screens/admin/AdminDashboardScreen.js`
**Purpose**: Admin overview with key metrics
**Navigation Logic**:
- `→ ContentModerationScreen`
- `→ UserManagementScreen`
- `→ AnalyticsScreen`
- Subscription metrics dashboard
- Content moderation alerts
- Revenue analytics

### 44. `ContentModerationScreen.js`
**Path**: `src/screens/admin/ContentModerationScreen.js`
**Purpose**: Content review and moderation
**Navigation Logic**:
- `→ RecipeDetailScreen` (flagged content)
- `← AdminDashboardScreen` (back)
- Flagged content queue
- User warning management
- Appeal review system

### 45. `UserManagementScreen.js`
**Path**: `src/screens/admin/UserManagementScreen.js`
**Purpose**: User account administration
**Navigation Logic**:
- `→ UserProfileScreen` (user details)
- `← AdminDashboardScreen` (back)
- Subscription status overview
- User suspension/ban tools
- Support ticket management

### 46. `AnalyticsScreen.js`
**Path**: `src/screens/admin/AnalyticsScreen.js`
**Purpose**: Business intelligence and metrics
**Navigation Logic**:
- `← AdminDashboardScreen` (back)
- Conversion funnel analytics
- Revenue reporting
- User behavior metrics
- A/B testing results

---

## Navigation Flow Patterns

### **Free User Journey**
```
LandingScreen → RegisterScreen → OnboardingScreen → HomeScreen
                                                    ↓
RecipesScreen ←→ RecipeDetailScreen ←→ PaywallScreen (save limit/premium features)
     ↓                                      ↓
SearchScreen (basic only)              SubscriptionScreen
     ↓                                      ↓
PaywallScreen (collections/shopping)   PaymentSuccessScreen
                                            ↓
                                   HomeScreen (premium unlocked)
```

### **Premium User Journey**
```
All Free Features +
     ↓
CollectionsScreen ←→ CollectionDetailScreen
     ↓
ShoppingListScreen (unlimited lists)
     ↓
OCRScanScreen ←→ CreateRecipeScreen
     ↓
WebScrapingScreen ←→ EditRecipeScreen
     ↓
AdvancedSearchScreen ←→ RecipeDetailScreen
     ↓
SocialFeedScreen ←→ CommentsScreen ←→ UserProfileScreen
     ↓
OfflineRecipesScreen (unlimited storage)
```

### **Conversion Triggers**
- **Save Limit Hit**: `RecipeDetailScreen → PaywallScreen` (10 recipe limit)
- **Collections Access**: `HomeScreen/RecipesScreen → PaywallScreen`
- **Shopping Lists Access**: `RecipeDetailScreen → PaywallScreen`
- **Advanced Search**: `SearchScreen → PaywallScreen`
- **OCR Attempt**: `CreateRecipeScreen → PaywallScreen`
- **Social Features**: `RecipeDetailScreen → PaywallScreen`
- **Web Scraping**: `CreateRecipeScreen → PaywallScreen`
- **Trial Expiration**: `Any Screen → TrialExpiredScreen`

### **Admin Flow**
```
LoginScreen (admin) → AdminDashboardScreen
                            ↓
     ContentModerationScreen ←→ UserManagementScreen
                            ↓
                    AnalyticsScreen
```

### **Error Handling**
- **Network Issues**: Show retry options and offline mode
- **Content Moderation**: Display warning with appeal option
- **Payment Failures**: Redirect to billing with retry
- **Permission Denied**: Guide to settings with explanation

---

## Screen Priority for Development

### **Phase 1 (MVP Core)**
1. `LandingScreen` - Value proposition
2. `LoginScreen` & `RegisterScreen` - Authentication
3. `HomeScreen` - Main dashboard
4. `RecipesScreen` - Recipe browsing
5. `RecipeDetailScreen` - Core viewing
6. `PaywallScreen` - Conversion foundation

### **Phase 2 (Freemium Features)**
7. `CreateRecipeScreen` - Content creation
8. `MediaUploadScreen` - Image handling
9. `SubscriptionScreen` - Payment processing
10. `PaywallScreen` - Enhanced conversion with more triggers
11. Various upgrade prompt flows

### **Phase 3 (Premium Features)**
12. `CollectionsScreen` - Recipe organization
13. `ShoppingListScreen` - List management
14. `OCRScanScreen` - Premium scanning
15. `WebScrapingScreen` - Import functionality
16. `AdvancedSearchScreen` - Enhanced search
17. `SocialFeedScreen` - Community features

### **Phase 4 (Polish & Admin)**
16. Settings screens suite
17. Admin dashboard suite
18. Advanced media screens
19. Onboarding flow
20. Error handling screens

This comprehensive screen structure supports the **stricter freemium business model** with more aggressive upgrade paths, maintains feature parity across platforms, and provides robust content management with media-first user experience. **Free users are limited to browsing, basic search, and saving 10 recipes only** - all other features require premium subscription to drive higher conversion rates.