<script setup lang="ts">
import { portfolioData } from '../../data/portfolio'
import AppHeading from '../../components/atoms/AppHeading.vue'
import AppBadge from '../../components/atoms/AppBadge.vue'
import ProjectCard from '../../components/molecules/ProjectCard.vue'
import FooterSection from '../../components/organisms/FooterSection.vue'

useSeoMeta({
  title: 'Projects - Aulia Anggraeni',
  description: 'Explore the complete design portfolio of Aulia Anggraeni: UI/UX case studies, mobile applications, interactive 3D designs, and digital branding.',
  ogTitle: 'Projects - Aulia Anggraeni',
  ogDescription: 'Explore the complete design portfolio of Aulia Anggraeni: UI/UX case studies, mobile applications, interactive 3D designs, and digital branding.',
  ogType: 'website'
})

const selectedCategory = ref('All')

const categories = computed(() => [
  'All',
  'UI/UX',
  'Mobile App',
  'AR & 3D',
  'E-Commerce'
])

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') {
    return portfolioData.projects
  }
  return portfolioData.projects.filter(p =>
    p.category.toLowerCase().includes(selectedCategory.value.toLowerCase()) ||
    p.tags?.some(tag => tag.toLowerCase().includes(selectedCategory.value.toLowerCase()))
  )
})
</script>

<template>
  <div class="w-full flex flex-col">
    <!-- Header -->
    <header class="w-full pt-8 sm:pt-16 pb-12 sm:pb-16 border-b border-neutral-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-6">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-xs font-mono font-medium text-neutral-500 hover:text-dark transition-colors self-start"
        >
          ← Back to Overview
        </NuxtLink>

        <div class="flex flex-col gap-3 max-w-2xl">
          <AppHeading as="h1" size="2xl">
            My work
          </AppHeading>
          <p class="text-neutral-600 text-base sm:text-lg font-medium">
            Check out some of my favorite & most recent projects.
          </p>
        </div>

        <!-- Filter Pills -->
        <div class="flex items-center gap-2 flex-wrap pt-2">
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            @click="selectedCategory = cat"
            :class="[
              'px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all min-h-[36px] flex items-center',
              selectedCategory === cat
                ? 'bg-primary text-dark font-semibold shadow-2xs'
                : 'bg-light text-neutral-600 hover:bg-neutral-200'
            ]"
          >
            {{ cat }}
          </button>
        </div>
      </div>
    </header>

    <!-- Projects Grid -->
    <main class="w-full py-16 sm:py-24">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <ProjectCard
            v-for="project in filteredProjects"
            :key="project.slug"
            :project="project"
          />
        </div>

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
