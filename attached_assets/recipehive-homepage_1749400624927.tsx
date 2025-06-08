import React, { useState } from 'react';
import { Camera, Search, Users, Bookmark, ShoppingCart, Zap, Image, Video, Smartphone } from 'lucide-react';

const RecipeHiveHomepage = () => {
  const productSummary = {
    title: "Your Recipe Collection, Perfected",
    description: "Transform scattered recipe links, photos, and handwritten cards into one beautifully organized digital cookbook with stunning visuals."
  };

  const keyFeatures = [
    {
      icon: <Image className="w-8 h-8 text-blue-600" />,
      title: "My Recipe Collection",
      description: "Every recipe features beautiful images with optional cooking videos. Save unlimited recipes and browse with confidence knowing exactly what each dish should look like.",
      tier: "All Users"
    },
    {
      icon: <Camera className="w-8 h-8 text-amber-600" />,
      title: "Smart Recipe Import",
      description: "Scan handwritten recipes with OCR technology or import directly from any cooking website. Transform any recipe source into your organized digital collection.",
      tier: "Premium"
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-green-600" />,
      title: "Intelligent Shopping Lists",
      description: "Generate organized grocery lists automatically from your recipes. Smart categorization by store aisle makes shopping faster and more efficient.",
      tier: "Premium"
    },
    {
      icon: <Search className="w-8 h-8 text-purple-600" />,
      title: "Advanced Search & Discovery",
      description: "Find recipes instantly with powerful filters for ingredients, dietary needs, cuisine type, and cooking time. Premium users get AI-powered recommendations.",
      tier: "Premium Search"
    },
    {
      icon: <Users className="w-8 h-8 text-rose-600" />,
      title: "Social Cooking Community",
      description: "Follow favorite food creators, share your own recipes with photos and videos, and get inspired by a community of passionate home cooks.",
      tier: "Premium Social"
    }
  ];

  const getTierBadge = (tier) => {
    if (tier === "All Users") {
      return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">Free + Premium</span>;
    } else if (tier.includes("Premium")) {
      return <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">Premium</span>;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">RH</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900">RecipeHive</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors">
                Sign In
              </button>
              <button className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="mb-8">
            <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {productSummary.title}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-4">
              {productSummary.description}
            </p>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Plus, generate smart shopping lists that organize ingredients by store aisle, making your grocery trips faster and more efficient.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              Start 14-Day Free Trial
            </button>
            <button className="w-full sm:w-auto px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold text-lg hover:border-slate-400 hover:bg-slate-50 transition-all duration-200 flex items-center justify-center space-x-2">
              <Smartphone className="w-5 h-5" />
              <span>Download Free App</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-slate-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Free Forever Plan</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Works on All Devices</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Cancel Anytime</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Everything You Need for Recipe Success
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From free recipe browsing to premium import tools, RecipeHive grows with your cooking journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {keyFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-gray-200">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    {feature.icon}
                  </div>
                  {getTierBadge(feature.tier)}
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Feature Usage Stats or Social Proof could go here */}
        </div>
      </section>
    </div>
  );
};

export default RecipeHiveHomepage;