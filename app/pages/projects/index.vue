<script setup lang="ts">
  import type { Project } from '../../types/portfolio';
  import { portfolioData } from '../../data/portfolio';
  import AppHeading from '../../components/atoms/AppHeading.vue';
  import ProjectCard from '../../components/molecules/ProjectCard.vue';
  import FooterSection from '../../components/organisms/FooterSection.vue';

  useSeoMeta({
    title: 'Projects - Aulia Anggraeni',
    description:
      'Explore the complete design portfolio of Aulia Anggraeni: UI/UX case studies, graphic design, mobile applications, interactive 3D designs, and digital branding.',
    ogTitle: 'Projects - Aulia Anggraeni',
    ogDescription:
      'Explore the complete design portfolio of Aulia Anggraeni: UI/UX case studies, graphic design, mobile applications, interactive 3D designs, and digital branding.',
    ogType: 'website',
  });

  const selectedCategory = ref('All');

  const categories = computed(() => [
    'All',
    'Social Media',
    'Ilustrasi',
    'Logo',
    'Magazine/Guidebook',
    'Game',
    'UI/UX',
    'Graphic Design',
    'Mobile App',
  ]);

  const matchesCategory = (project: Project, categoryName: string): boolean => {
    if (categoryName === 'All') return true;

    const catLower = categoryName.toLowerCase();
    const projectCategory = (project.category || '').toLowerCase();
    const projectTags = (project.tags || []).map((t) => t.toLowerCase());

    if (
      projectCategory.includes(catLower) ||
      projectTags.some((tag) => tag.includes(catLower))
    ) {
      return true;
    }

    if (catLower === 'ilustrasi' || catLower === 'illustration') {
      return (
        projectCategory.includes('ilustra') ||
        projectCategory.includes('illustrat') ||
        projectTags.some((t) => t.includes('illustrat') || t.includes('ilustra'))
      );
    }

    if (catLower.includes('magazine') || catLower.includes('guidebook') || catLower.includes('magazie')) {
      return (
        projectCategory.includes('magazine') ||
        projectCategory.includes('guidebook') ||
        projectCategory.includes('editorial') ||
        projectTags.some((t) => t.includes('magazine') || t.includes('guidebook') || t.includes('editorial'))
      );
    }

    if (catLower === 'game') {
      return (
        projectCategory.includes('game') ||
        projectTags.some((t) => t.includes('game') || t.includes('gamifi') || t.includes('esport'))
      );
    }

    if (catLower === 'logo') {
      return (
        projectCategory.includes('logo') ||
        projectTags.some((t) => t.includes('logo'))
      );
    }

    return false;
  };

  const filteredProjects = computed(() => {
    if (selectedCategory.value === 'All') {
      return portfolioData.projects;
    }
    return portfolioData.projects.filter((p) =>
      matchesCategory(p, selectedCategory.value)
    );
  });
</script>

<template>
  <div class="w-full flex flex-col">
    <!-- Header -->
    <header
      class="w-full pt-20 sm:pt-24 pb-12 sm:pb-16 border-b border-neutral-200"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-6">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-xs font-sans font-medium text-neutral-500 hover:text-dark transition-colors self-start"
        >
          ← Back to Overview
        </NuxtLink>

        <div class="flex flex-col gap-3 max-w-2xl">
          <AppHeading as="h1" size="2xl"> My work </AppHeading>
          <p class="text-neutral-600 text-base sm:text-lg font-medium">
            Check out some of my favorite & most recent projects.
          </p>
        </div>

        <!-- Filter Pills with Smooth Transitions -->
        <div class="flex items-center gap-2 flex-wrap pt-2">
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            @click="selectedCategory = cat"
            :class="[
              'px-4 py-2 rounded-full text-xs font-sans transition-all duration-300 min-h-[38px] flex items-center cursor-pointer select-none active:scale-95',
              selectedCategory === cat
                ? 'bg-primary text-white font-semibold shadow-xs scale-100'
                : 'bg-light text-neutral-600 font-medium hover:bg-neutral-200 hover:text-dark',
            ]"
          >
            {{ cat }}
          </button>
        </div>
      </div>
    </header>

    <!-- Projects Grid with Animation -->
    <main class="w-full py-16 sm:py-24">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <TransitionGroup
          name="project-fade"
          tag="div"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <ProjectCard
            v-for="project in filteredProjects"
            :key="project.slug"
            :project="project"
          />
        </TransitionGroup>

        <div
          v-if="filteredProjects.length === 0"
          class="py-20 text-center text-neutral-500 font-medium"
        >
          No projects found in this category.
        </div>
      </div>
    </main>

    <!-- Footer -->
    <FooterSection :profile="portfolioData.profile" />
  </div>
</template>

<style scoped>
.project-fade-move,
.project-fade-enter-active,
.project-fade-leave-active {
  transition: all 0.35s ease;
}

.project-fade-enter-from,
.project-fade-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(8px);
}

.project-fade-leave-active {
  position: absolute;
}
</style>
