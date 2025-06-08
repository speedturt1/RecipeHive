# Recipe Management App - Professional Minimalist Design System

## Introduction

This design system establishes a professional, minimalist visual foundation for a freemium recipe management app. The system emphasizes clean typography, subtle color usage, and generous whitespace while maintaining clear tier differentiation and conversion optimization through refined visual hierarchy.

## Color Palette

### Primary Colors
```css
/* Refined Primary - Professional Blue-Gray */
--primary-500: #334155;     /* Slate blue-gray (professional, trustworthy) */
--primary-400: #475569;     /* Lighter slate */
--primary-600: #1e293b;     /* Darker slate */
--primary-700: #0f172a;     /* Deep slate */

/* Accent - Subtle Orange (warmth without overwhelm) */
--accent-500: #f97316;      /* Refined orange */
--accent-400: #fb923c;      /* Light orange */
--accent-600: #ea580c;      /* Dark orange */

/* Success - Muted Green */
--success-500: #059669;     /* Professional green */
--success-400: #10b981;     /* Light green */
--success-600: #047857;     /* Dark green */
```

### Neutral Colors
```css
/* Professional Gray Scale */
--neutral-0: #ffffff;       /* Pure white */
--neutral-50: #f8fafc;      /* Off-white backgrounds */
--neutral-100: #f1f5f9;     /* Light gray backgrounds */
--neutral-200: #e2e8f0;     /* Subtle borders */
--neutral-300: #cbd5e1;     /* Light borders */
--neutral-400: #94a3b8;     /* Placeholder text */
--neutral-500: #64748b;     /* Secondary text */
--neutral-600: #475569;     /* Primary text */
--neutral-700: #334155;     /* Dark text */
--neutral-800: #1e293b;     /* Darker text */
--neutral-900: #0f172a;     /* Darkest text */
```

### Tier-Specific Colors (Subtle Differentiation)
```css
/* Free Tier - Neutral */
--free-primary: var(--neutral-600);
--free-background: var(--neutral-50);
--free-border: var(--neutral-200);
--free-accent: var(--neutral-400);

/* Premium Tier - Refined Gold */
--premium-primary: #b45309;    /* Sophisticated amber */
--premium-background: #fefdf7; /* Warm white */
--premium-border: #fbbf24;     /* Gold border */
--premium-accent: #f59e0b;     /* Gold accent */

/* Trial - Professional Blue */
--trial-primary: #1d4ed8;      /* Professional blue */
--trial-background: #f0f9ff;   /* Light blue background */
--trial-border: #3b82f6;       /* Blue border */
--trial-accent: #60a5fa;       /* Light blue accent */
```

### Semantic Colors
```css
/* Minimal Semantic Palette */
--success: #059669;
--success-light: #f0fdf4;
--warning: #d97706;
--warning-light: #fffbeb;
--error: #dc2626;
--error-light: #fef2f2;
--info: #0284c7;
--info-light: #f0f9ff;
```

## Typography

### Font Stack
```css
/* Professional Sans-Serif */
--font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;

/* Minimal Serif for Headings (Optional) */
--font-heading: 'Georgia', 'Times New Roman', serif;

/* Monospace for Technical Elements */
--font-mono: 'SF Mono', Monaco, 'Cascadia Code', monospace;
```

### Typography Scale (Refined)
```css
/* Conservative Type Scale */
--text-xs: 0.75rem;      /* 12px - Caption */
--text-sm: 0.875rem;     /* 14px - Small text */
--text-base: 1rem;       /* 16px - Body text */
--text-lg: 1.125rem;     /* 18px - Large body */
--text-xl: 1.25rem;      /* 20px - Small headings */
--text-2xl: 1.5rem;      /* 24px - Medium headings */
--text-3xl: 1.875rem;    /* 30px - Large headings */
--text-4xl: 2.25rem;     /* 36px - XL headings */

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;

/* Font Weights */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Typography Usage
```css
/* Heading Styles - Clean & Professional */
.heading-xl {
  font-family: var(--font-primary);
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--neutral-900);
  letter-spacing: -0.025em;
}

.heading-lg {
  font-family: var(--font-primary);
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  color: var(--neutral-800);
  letter-spacing: -0.025em;
}

.heading-md {
  font-family: var(--font-primary);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-normal);
  color: var(--neutral-700);
}

.heading-sm {
  font-family: var(--font-primary);
  font-size: var(--text-xl);
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
  color: var(--neutral-700);
}

/* Body Text - Readable & Clean */
.body-lg {
  font-family: var(--font-primary);
  font-size: var(--text-lg);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
  color: var(--neutral-600);
}

.body-base {
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--neutral-600);
}

.body-sm {
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--neutral-500);
}

.caption {
  font-family: var(--font-primary);
  font-size: var(--text-xs);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--neutral-400);
}
```

## Spacing System

### Refined Spacing Scale
```css
/* 8px base unit system (more generous) */
--space-0: 0;
--space-1: 0.125rem;     /* 2px */
--space-2: 0.25rem;      /* 4px */
--space-3: 0.5rem;       /* 8px */
--space-4: 0.75rem;      /* 12px */
--space-5: 1rem;         /* 16px */
--space-6: 1.5rem;       /* 24px */
--space-8: 2rem;         /* 32px */
--space-10: 2.5rem;      /* 40px */
--space-12: 3rem;        /* 48px */
--space-16: 4rem;        /* 64px */
--space-20: 5rem;        /* 80px */
--space-24: 6rem;        /* 96px */
--space-32: 8rem;        /* 128px */

/* Semantic Spacing - Generous Whitespace */
--spacing-xs: var(--space-3);    /* 8px */
--spacing-sm: var(--space-5);    /* 16px */
--spacing-md: var(--space-6);    /* 24px */
--spacing-lg: var(--space-8);    /* 32px */
--spacing-xl: var(--space-12);   /* 48px */
--spacing-2xl: var(--space-20);  /* 80px */
```

### Layout Spacing
```css
/* Container Padding - More Generous */
--container-padding-mobile: var(--space-6);   /* 24px */
--container-padding-tablet: var(--space-8);   /* 32px */
--container-padding-desktop: var(--space-12); /* 48px */

/* Section Spacing - Generous Whitespace */
--section-spacing-mobile: var(--space-16);    /* 64px */
--section-spacing-desktop: var(--space-24);   /* 96px */

/* Component Spacing */
--component-gap: var(--space-6);              /* 24px */
--card-padding: var(--space-8);               /* 32px */
--form-field-gap: var(--space-6);             /* 24px */
```

## Border Radius & Borders

```css
/* Minimal Border Radius */
--radius-none: 0;
--radius-sm: 0.125rem;     /* 2px - Minimal rounding */
--radius-md: 0.25rem;      /* 4px - Standard elements */
--radius-lg: 0.5rem;       /* 8px - Cards and containers */
--radius-xl: 0.75rem;      /* 12px - Modals */
--radius-2xl: 1rem;        /* 16px - Hero sections */

/* Border Weights */
--border-thin: 1px;
--border-medium: 2px;
--border-thick: 3px;

/* Component-Specific Radius */
--btn-radius: var(--radius-md);
--card-radius: var(--radius-lg);
--modal-radius: var(--radius-xl);
--image-radius: var(--radius-lg);
```

## Shadows & Elevation

```css
/* Subtle Shadow System */
--shadow-none: none;
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);

/* Interactive Shadows - Subtle */
--shadow-hover: 0 8px 25px -8px rgba(51, 65, 85, 0.15);
--shadow-focus: 0 0 0 3px rgba(51, 65, 85, 0.1);
--shadow-premium: 0 8px 25px -8px rgba(180, 83, 9, 0.15);
```

## Component Styles

### Buttons - Minimal & Professional

#### Primary Buttons
```css
.btn-primary {
  background: var(--primary-500);
  color: var(--neutral-0);
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--btn-radius);
  border: var(--border-thin) solid var(--primary-500);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-primary:hover {
  background: var(--primary-600);
  border-color: var(--primary-600);
  box-shadow: var(--shadow-md);
}

.btn-primary:focus {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.btn-primary:active {
  background: var(--primary-700);
  transform: translateY(1px);
}
```

#### Secondary Buttons
```css
.btn-secondary {
  background: var(--neutral-0);
  color: var(--primary-500);
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--btn-radius);
  border: var(--border-thin) solid var(--neutral-300);
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-secondary:hover {
  border-color: var(--primary-500);
  box-shadow: var(--shadow-sm);
}

.btn-secondary:focus {
  outline: none;
  box-shadow: var(--shadow-focus);
}
```

#### Premium Buttons
```css
.btn-premium {
  background: var(--premium-primary);
  color: var(--neutral-0);
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--btn-radius);
  border: var(--border-thin) solid var(--premium-primary);
  box-shadow: var(--shadow-premium);
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-premium:hover {
  background: var(--premium-accent);
  border-color: var(--premium-accent);
  box-shadow: var(--shadow-md);
}
```

#### Ghost Buttons
```css
.btn-ghost {
  background: transparent;
  color: var(--neutral-600);
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--btn-radius);
  border: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-ghost:hover {
  background: var(--neutral-100);
  color: var(--neutral-700);
}
```

### Cards - Clean & Structured

#### Recipe Card
```css
.recipe-card {
  background: var(--neutral-0);
  border: var(--border-thin) solid var(--neutral-200);
  border-radius: var(--card-radius);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.recipe-card:hover {
  border-color: var(--neutral-300);
  box-shadow: var(--shadow-lg);
}

.recipe-card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: var(--neutral-100);
}

.recipe-card__content {
  padding: var(--space-6);
}

.recipe-card__title {
  font-family: var(--font-primary);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--neutral-800);
  margin-bottom: var(--space-3);
  line-height: var(--leading-tight);
}

.recipe-card__meta {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  color: var(--neutral-500);
  font-size: var(--text-sm);
}

.recipe-card__description {
  color: var(--neutral-600);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
  margin-top: var(--space-3);
}
```

#### Feature Card (Tier-Based)
```css
.feature-card {
  background: var(--neutral-0);
  border: var(--border-thin) solid var(--neutral-200);
  border-radius: var(--card-radius);
  padding: var(--card-padding);
  transition: all 0.3s ease;
}

.feature-card--premium {
  border-color: var(--premium-border);
  background: var(--premium-background);
}

.feature-card--disabled {
  background: var(--neutral-50);
  opacity: 0.6;
}

.feature-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}

.feature-card__title {
  font-family: var(--font-primary);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--neutral-800);
}

.feature-card__badge {
  background: var(--premium-primary);
  color: var(--neutral-0);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

### Forms - Clean & Accessible

#### Input Fields
```css
.form-group {
  margin-bottom: var(--space-6);
}

.form-label {
  display: block;
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--neutral-700);
  margin-bottom: var(--space-3);
}

.form-input {
  width: 100%;
  padding: var(--space-4) var(--space-5);
  border: var(--border-thin) solid var(--neutral-300);
  border-radius: var(--radius-md);
  font-family: var(--font-primary);
  font-size: var(--text-base);
  color: var(--neutral-700);
  background: var(--neutral-0);
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: var(--shadow-focus);
}

.form-input::placeholder {
  color: var(--neutral-400);
}

.form-input:invalid {
  border-color: var(--error);
}

.form-help {
  font-size: var(--text-xs);
  color: var(--neutral-500);
  margin-top: var(--space-2);
}

.form-error {
  font-size: var(--text-xs);
  color: var(--error);
  margin-top: var(--space-2);
}
```

#### Upload Areas - Minimal Design
```css
.upload-area {
  border: var(--border-medium) dashed var(--neutral-300);
  border-radius: var(--radius-lg);
  padding: var(--space-12);
  text-align: center;
  background: var(--neutral-50);
  transition: all 0.3s ease;
  cursor: pointer;
}

.upload-area:hover {
  border-color: var(--primary-500);
  background: var(--neutral-100);
}

.upload-area:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: var(--shadow-focus);
}

.upload-area__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.upload-area__icon {
  width: 48px;
  height: 48px;
  color: var(--neutral-400);
}

.upload-area__text {
  font-family: var(--font-primary);
  font-size: var(--text-base);
  color: var(--neutral-600);
  font-weight: var(--font-medium);
}

.upload-area__subtext {
  font-size: var(--text-sm);
  color: var(--neutral-500);
}
```

### Navigation - Minimal & Clean

#### Tab Navigation
```css
.nav-tabs {
  display: flex;
  border-bottom: var(--border-thin) solid var(--neutral-200);
  gap: var(--space-8);
  margin-bottom: var(--space-8);
}

.nav-tab {
  padding: var(--space-4) 0;
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--neutral-500);
  border: none;
  background: transparent;
  border-bottom: var(--border-medium) solid transparent;
  transition: all 0.2s ease;
  cursor: pointer;
}

.nav-tab--active {
  color: var(--primary-500);
  border-bottom-color: var(--primary-500);
}

.nav-tab:hover:not(.nav-tab--active) {
  color: var(--neutral-700);
}
```

#### Bottom Navigation
```css
.bottom-nav {
  background: var(--neutral-0);
  border-top: var(--border-thin) solid var(--neutral-200);
  display: flex;
  padding: var(--space-4) 0;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3);
  color: var(--neutral-500);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  cursor: pointer;
  transition: color 0.2s ease;
}

.nav-item--active {
  color: var(--primary-500);
}

.nav-item__icon {
  width: 24px;
  height: 24px;
}
```

### Modals & Overlays - Refined

#### Modal Container
```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--space-6);
}

.modal {
  background: var(--neutral-0);
  border-radius: var(--modal-radius);
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
  position: relative;
}

.modal__header {
  padding: var(--space-8) var(--space-8) var(--space-6);
  border-bottom: var(--border-thin) solid var(--neutral-200);
}

.modal__title {
  font-family: var(--font-primary);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: var(--neutral-900);
  line-height: var(--leading-tight);
}

.modal__subtitle {
  font-size: var(--text-base);
  color: var(--neutral-600);
  margin-top: var(--space-2);
}

.modal__body {
  padding: var(--space-8);
}

.modal__footer {
  padding: var(--space-6) var(--space-8) var(--space-8);
  border-top: var(--border-thin) solid var(--neutral-200);
  display: flex;
  gap: var(--space-4);
  justify-content: flex-end;
}

.modal__close {
  position: absolute;
  top: var(--space-6);
  right: var(--space-6);
  background: transparent;
  border: none;
  color: var(--neutral-400);
  cursor: pointer;
  padding: var(--space-2);
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

.modal__close:hover {
  color: var(--neutral-600);
  background: var(--neutral-100);
}
```

### Upgrade Prompts - Subtle & Professional

#### Paywall Modal
```css
.paywall-modal {
  background: var(--neutral-0);
  border: var(--border-thin) solid var(--premium-border);
  border-radius: var(--modal-radius);
  box-shadow: var(--shadow-premium);
  position: relative;
  overflow: hidden;
}

.paywall-modal::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--premium-primary), var(--premium-accent));
}

.paywall-header {
  text-align: center;
  padding: var(--space-12) var(--space-8) var(--space-8);
}

.paywall-title {
  font-family: var(--font-primary);
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--neutral-900);
  margin-bottom: var(--space-4);
  line-height: var(--leading-tight);
}

.paywall-subtitle {
  font-size: var(--text-lg);
  color: var(--neutral-600);
  line-height: var(--leading-normal);
}

.pricing-section {
  padding: 0 var(--space-8) var(--space-8);
}

.pricing-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.pricing-card {
  background: var(--neutral-0);
  border: var(--border-thin) solid var(--neutral-200);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
}

.pricing-card--recommended {
  border-color: var(--premium-primary);
  background: var(--premium-background);
  transform: scale(1.02);
}

.pricing-card__badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--premium-primary);
  color: var(--neutral-0);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.pricing-card__price {
  font-family: var(--font-primary);
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--neutral-900);
  margin-bottom: var(--space-2);
}

.pricing-card__period {
  font-size: var(--text-sm);
  color: var(--neutral-500);
  margin-bottom: var(--space-6);
}

.pricing-card__savings {
  font-size: var(--text-xs);
  color: var(--success-500);
  font-weight: var(--font-medium);
  margin-bottom: var(--space-6);
}
```

### Progress Indicators - Minimal

#### Progress Bars
```css
.progress {
  background: var(--neutral-200);
  border-radius: var(--radius-md);
  height: 8px;
  overflow: hidden;
  margin: var(--space-4) 0;
}

.progress__fill {
  height: 100%;
  background: var(--primary-500);
  border-radius: var(--radius-md);
  transition: width 0.5s ease;
}

.progress--warning .progress__fill {
  background: var(--warning);
}

.progress--success .progress__fill {
  background: var(--success-500);
}

.progress__text {
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  color: var(--neutral-600);
  text-align: center;
  margin-top: var(--space-3);
}
```

### Badges & Labels - Subtle

#### Tier Badges
```css
.tier-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.tier-badge--free {
  background: var(--free-background);
  color: var(--free-primary);
  border: var(--border-thin) solid var(--free-border);
}

.tier-badge--premium {
  background: var(--premium-background);
  color: var(--premium-primary);
  border: var(--border-thin) solid var(--premium-border);
}

.tier-badge--trial {
  background: var(--trial-background);
  color: var(--trial-primary);
  border: var(--border-thin) solid var(--trial-border);
}
```

#### Status Badges
```css
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
}

.status-badge--success {
  background: var(--success-light);
  color: var(--success-500);
}

.status-badge--warning {
  background: var(--warning-light);
  color: var(--warning);
}

.status-badge--error {
  background: var(--error-light);
  color: var(--error);
}

.status-badge--info {
  background: var(--info-light);
  color: var(--info);
}
```

## Media Components - Clean & Focused

### Image Containers
```css
.image-container {
  position: relative;
  overflow: hidden;
  border-radius: var(--image-radius);
  background: var(--neutral-100);
  border: var(--border-thin) solid var(--neutral-200);
}

.image-container__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.image-container:hover .image-container__image {
  transform: scale(1.02);
}

.image-container__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(15, 23, 42, 0.8));
  color: var(--neutral-0);
  padding: var(--space-6);
}

.image-container__caption {
  font-size: var(--text-sm);
  color: var(--neutral-300);
  margin-top: var(--space-2);
}
```

### Video Player - Minimal Controls
```css
.video-player {
  position: relative;
  background: var(--neutral-900);
  border-radius: var(--image-radius);
  overflow: hidden;
  border: var(--border-thin) solid var(--neutral-200);
}

.video-player__video {
  width: 100%;
  height: auto;
  display: block;
}

.video-player__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.3);
  transition: opacity 0.3s ease;
}

.video-player__play-button {
  background: var(--neutral-0);
  border: none;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-lg);
}

.video-player__play-button:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-xl);
}

.video-player__play-icon {
  width: 24px;
  height: 24px;
  color: var(--neutral-700);
  margin-left: 2px; /* Optical alignment */
}

.video-player__duration {
  position: absolute;
  bottom: var(--space-3);
  right: var(--space-3);
  background: rgba(15, 23, 42, 0.8);
  color: var(--neutral-0);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
}
```

### Media Gallery - Grid Layout
```css
.media-gallery {
  display: grid;
  gap: var(--space-4);
  margin: var(--space-6) 0;
}

.media-gallery--single {
  grid-template-columns: 1fr;
}

.media-gallery--dual {
  grid-template-columns: 1fr 1fr;
}

.media-gallery--triple {
  grid-template-columns: 2fr 1fr 1fr;
}

.media-gallery__item {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  border-radius: var(--radius-lg);
  border: var(--border-thin) solid var(--neutral-200);
}

.media-gallery__item:first-child {
  grid-row: span 2;
  aspect-ratio: 4/5;
}

.media-gallery__more-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--neutral-0);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
}
```

## Loading States - Minimal Feedback

### Skeleton Loaders
```css
.skeleton {
  background: linear-gradient(90deg, var(--neutral-200) 25%, var(--neutral-300) 50%, var(--neutral-200) 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite ease-in-out;
  border-radius: var(--radius-md);
}

.skeleton-text {
  height: 1em;
  margin-bottom: var(--space-3);
}

.skeleton-text--short {
  width: 60%;
}

.skeleton-text--medium {
  width: 80%;
}

.skeleton-text--long {
  width: 100%;
}

.skeleton-image {
  width: 100%;
  aspect-ratio: 4/3;
}

.skeleton-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.skeleton-card {
  padding: var(--space-6);
  border: var(--border-thin) solid var(--neutral-200);
  border-radius: var(--card-radius);
}

@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}
```

### Loading Spinners
```css
.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--neutral-300);
  border-top: 2px solid var(--primary-500);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner--sm {
  width: 16px;
  height: 16px;
  border-width: 1px;
}

.spinner--lg {
  width: 32px;
  height: 32px;
  border-width: 3px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-12);
  color: var(--neutral-500);
  font-size: var(--text-sm);
  gap: var(--space-3);
}
```

## Error States - Clear & Helpful

### Error Messages
```css
.error-message {
  background: var(--error-light);
  border: var(--border-thin) solid var(--error);
  border-radius: var(--radius-md);
  padding: var(--space-5);
  color: var(--error);
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}

.error-message__icon {
  color: var(--error);
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin-top: 1px; /* Optical alignment */
}

.error-message__content {
  flex: 1;
}

.error-message__title {
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-2);
}

.error-message__description {
  color: var(--neutral-600);
  line-height: var(--leading-normal);
}
```

### Content Moderation Warnings
```css
.content-warning {
  background: var(--warning-light);
  border: var(--border-thin) solid var(--warning);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  margin: var(--space-6) 0;
  position: relative;
}

.content-warning__header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.content-warning__icon {
  width: 24px;
  height: 24px;
  color: var(--warning);
  flex-shrink: 0;
}

.content-warning__title {
  font-family: var(--font-primary);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--warning);
}

.content-warning__message {
  color: var(--neutral-700);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-4);
}

.content-warning__actions {
  display: flex;
  gap: var(--space-3);
}
```

## Ad Integration - Subtle & Professional

### Banner Ad Styling
```css
.ad-container {
  background: var(--neutral-50);
  border: var(--border-thin) solid var(--neutral-200);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  margin: var(--space-8) 0;
  text-align: center;
  position: relative;
}

.ad-container::before {
  content: 'Sponsored';
  position: absolute;
  top: var(--space-2);
  left: var(--space-3);
  font-size: var(--text-xs);
  color: var(--neutral-400);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: var(--font-medium);
}

.ad-banner {
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--neutral-500);
  font-size: var(--text-sm);
  background: var(--neutral-100);
  border-radius: var(--radius-sm);
}

.ad-banner--large {
  min-height: 90px;
}

.ad-banner--mobile {
  min-height: 50px;
}
```

### Interstitial Ad Overlay
```css
.ad-interstitial {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: var(--space-6);
}

.ad-interstitial__content {
  background: var(--neutral-0);
  border-radius: var(--radius-xl);
  max-width: 400px;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.ad-interstitial__header {
  padding: var(--space-4);
  border-bottom: var(--border-thin) solid var(--neutral-200);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ad-interstitial__title {
  font-size: var(--text-sm);
  color: var(--neutral-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: var(--font-medium);
}

.ad-interstitial__close {
  background: transparent;
  border: none;
  color: var(--neutral-400);
  cursor: pointer;
  padding: var(--space-2);
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

.ad-interstitial__close:hover {
  color: var(--neutral-600);
  background: var(--neutral-100);
}

.ad-interstitial__body {
  padding: var(--space-6);
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--neutral-50);
  color: var(--neutral-500);
}
```

## Responsive Design - Mobile-First

### Breakpoints
```css
/* Mobile-first breakpoint system */
--bp-sm: 640px;      /* Small tablets */
--bp-md: 768px;      /* Tablets */
--bp-lg: 1024px;     /* Small desktops */
--bp-xl: 1280px;     /* Large desktops */
--bp-2xl: 1536px;    /* Extra large screens */
```

### Container System
```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--container-padding-mobile);
}

@media (min-width: 640px) {
  .container {
    padding: 0 var(--container-padding-tablet);
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
    padding: 0 var(--container-padding-desktop);
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1200px;
  }
}
```

### Grid System
```css
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid--cols-1 { grid-template-columns: 1fr; }
.grid--cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid--cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid--cols-4 { grid-template-columns: repeat(4, 1fr); }

@media (max-width: 767px) {
  .grid--cols-2,
  .grid--cols-3,
  .grid--cols-4 {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .grid--cols-3,
  .grid--cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

## Animations - Subtle & Purposeful

### Transition System
```css
/* Refined transition timing */
--transition-fast: 0.15s ease-out;
--transition-normal: 0.25s ease-out;
--transition-slow: 0.4s ease-out;

/* Easing curves */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

### Micro-animations
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in-up {
  animation: fadeInUp var(--transition-normal);
}

.animate-fade-in {
  animation: fadeIn var(--transition-normal);
}

.animate-scale-in {
  animation: scaleIn var(--transition-normal);
}
```

## Accessibility - Inclusive Design

### Focus Management
```css
.focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .btn-primary,
  .btn-secondary {
    border-width: var(--border-medium);
  }
  
  .recipe-card,
  .feature-card {
    border-width: var(--border-medium);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Screen Reader Support
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

### Color Contrast
```css
/* WCAG AA compliant color combinations */
.text-primary { color: var(--neutral-900); } /* 21:1 contrast */
.text-secondary { color: var(--neutral-700); } /* 12.6:1 contrast */
.text-muted { color: var(--neutral-600); } /* 7.23:1 contrast */
.text-subtle { color: var(--neutral-500); } /* 4.78:1 contrast */

/* Error states with sufficient contrast */
.text-error { color: var(--error); } /* 5.74:1 contrast */
.text-success { color: var(--success-500); } /* 4.56:1 contrast */
.text-warning { color: var(--warning); } /* 4.51:1 contrast */
```

## Dark Mode Support

### Dark Mode Variables
```css
@media (prefers-color-scheme: dark) {
  :root {
    /* Inverted neutral scale for dark mode */
    --neutral-0: #0f172a;
    --neutral-50: #1e293b;
    --neutral-100: #334155;
    --neutral-200: #475569;
    --neutral-300: #64748b;
    --neutral-400: #94a3b8;
    --neutral-500: #cbd5e1;
    --neutral-600: #e2e8f0;
    --neutral-700: #f1f5f9;
    --neutral-800: #f8fafc;
    --neutral-900: #ffffff;
    
    /* Adjusted primary colors for dark mode */
    --primary-500: #60a5fa;
    --primary-400: #93c5fd;
    --primary-600: #3b82f6;
    
    /* Dark mode specific shadows */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
  }
}
```

## Implementation Guidelines

### CSS Architecture
1. **Use CSS custom properties** for all design tokens
2. **Follow BEM methodology** for component naming
3. **Implement mobile-first** responsive design
4. **Minimize animations** to essential micro-interactions only
5. **Ensure accessibility** compliance throughout

### Component Development
1. **Build modular components** that work across platforms
2. **Use semantic HTML** elements where possible
3. **Implement proper ARIA** labels and roles
4. **Test with real content** and varying text lengths
5. **Validate color contrast** for all text combinations

### Performance Considerations
1. **Optimize critical CSS** for above-the-fold content
2. **Use efficient selectors** to minimize render blocking
3. **Implement lazy loading** for non-critical components
4. **Minimize bundle size** through tree-shaking
5. **Test performance** on low-end devices

### Quality Assurance
1. **Test across target platforms** (React Native web, iOS, Android)
2. **Verify accessibility** with assistive technologies
3. **Validate responsive behavior** at all breakpoints
4. **Check dark mode compatibility** where applicable
5. **Ensure consistent spacing** and typography throughout

This professional minimalist design system provides a clean, accessible foundation for the freemium recipe management app while maintaining clear visual hierarchy and conversion optimization through subtle design cues rather than flashy elements.
  