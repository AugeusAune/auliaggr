<script setup lang="ts">
import { portfolioData } from '../data/portfolio'
import HeroSection from '../components/organisms/HeroSection.vue'
import BrandCarousel from '../components/organisms/BrandCarousel.vue'

useSeoMeta({
  title: 'Portfolio - Aulia Anggraeni',
  description: 'Crafting meaningful and intuitive digital experiences. UI/UX design, creative design, web design, visual branding, and creative digital solutions for modern products and growing brands.',
  ogTitle: 'Portfolio - Aulia Anggraeni',
  ogDescription: 'Crafting meaningful and intuitive digital experiences. UI/UX design, creative design, web design, visual branding, and creative digital solutions for modern products and growing brands.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Portfolio - Aulia Anggraeni'
})
</script>

<template>
  <div class="w-full flex flex-col">
    <!-- Hero Section (above fold — eager) -->
    <HeroSection :profile="portfolioData.profile" />

    <!-- Brands Carousel (above fold — eager) -->
    <BrandCarousel :brands="portfolioData.brands" />

    <!-- Below-fold sections use Nuxt lazy auto-imports for code splitting -->
    <LazyJourneySection :milestones="portfolioData.journey" />
    <LazyAwardsSection :awards="portfolioData.awards" />
    <LazyProjectsSection :projects="portfolioData.projects" :limit="6" />
    <LazyToolsSection :tools="portfolioData.tools" />
    <LazyStoriesSection :behance-url="portfolioData.profile.behanceUrl" />
    <LazyCertificationsSection :certifications="portfolioData.certifications" />
    <LazyFooterSection :profile="portfolioData.profile" />
  </div>
</template>

