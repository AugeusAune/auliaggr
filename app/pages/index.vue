<script setup lang="ts">
  import { portfolioData } from '../data/portfolio';
  import HeroSection from '../components/organisms/HeroSection.vue';
  import BrandCarousel from '../components/organisms/BrandCarousel.vue';
  import JourneySection from '../components/organisms/JourneySection.vue';
  import AwardsSection from '../components/organisms/AwardsSection.vue';
  import ProjectsSection from '../components/organisms/ProjectsSection.vue';
  import ToolsSection from '../components/organisms/ToolsSection.vue';
  import StoriesSection from '../components/organisms/StoriesSection.vue';
  import CertificationsSection from '../components/organisms/CertificationsSection.vue';
  import FooterSection from '../components/organisms/FooterSection.vue';

  useSeoMeta({
    title: 'Portfolio - Aulia Anggraeni',
    description:
      'Crafting meaningful and intuitive digital experiences. UI/UX design, creative design, web design, visual branding, and creative digital solutions for modern products and growing brands.',
    ogTitle: 'Portfolio - Aulia Anggraeni',
    ogDescription:
      'Crafting meaningful and intuitive digital experiences. UI/UX design, creative design, web design, visual branding, and creative digital solutions for modern products and growing brands.',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Portfolio - Aulia Anggraeni',
  });
</script>

<template>
  <div class="w-full flex flex-col">
    <!-- Hero Section -->
    <HeroSection :profile="portfolioData.profile" />

    <!-- Brands Carousel -->
    <BrandCarousel :brands="portfolioData.brands" />

    <!-- Career Timeline / Journey -->
    <JourneySection :milestones="portfolioData.journey" />

    <!-- Awards Section -->
    <AwardsSection :awards="portfolioData.awards" />

    <!-- Projects Section -->
    <ProjectsSection :projects="portfolioData.projects" :limit="6" />

    <!-- Tools Section -->
    <ToolsSection :tools="portfolioData.tools" />

    <!-- Stories / Behance Section -->
    <StoriesSection :behance-url="portfolioData.profile.behanceUrl" />

    <!-- Certifications Section -->
    <CertificationsSection :certifications="portfolioData.certifications" />

    <!-- Footer Section & Contact Form -->
    <FooterSection :profile="portfolioData.profile" />
  </div>
</template>
