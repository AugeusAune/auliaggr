<script setup lang="ts">
import { portfolioData } from '../../data/portfolio'
import AppHeading from '../../components/atoms/AppHeading.vue'
import AppBadge from '../../components/atoms/AppBadge.vue'
import AppButton from '../../components/atoms/AppButton.vue'
import FooterSection from '../../components/organisms/FooterSection.vue'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const project = computed(() => {
  return portfolioData.projects.find(p => p.slug === slug.value)
})

// Fail-fast guard: if project not found, throw 404
if (!project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Project "${slug.value}" not found`
  })
}

useSeoMeta({
  title: `${project.value.title} - Aulia Anggraeni`,
  description: project.value.description || project.value.subtitle,
  ogTitle: `${project.value.title} - Aulia Anggraeni`,
  ogDescription: project.value.description || project.value.subtitle,
  ogType: 'article'
})
</script>

<template>
  <div v-if="project" class="w-full flex flex-col">
    <!-- Breadcrumb & Back -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 w-full">
      <NuxtLink
        to="/projects"
        class="inline-flex items-center gap-2 text-xs font-sans font-medium text-neutral-500 hover:text-dark transition-colors"
      >
        ← Back to all projects
      </NuxtLink>
    </div>

    <!-- Project Header & Meta -->
    <article class="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 w-full flex flex-col gap-10 sm:gap-14">
      <!-- Project Cover Image -->
      <div v-if="project.coverImage" class="w-full aspect-[16/9] max-h-[520px] rounded-3xl overflow-hidden bg-light border border-neutral-200">
        <img
          :src="project.coverImage"
          :alt="project.title"
          class="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <!-- Sidebar Metadata -->
        <aside class="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-light border border-neutral-200 flex flex-col gap-6">
          <div class="flex flex-col gap-1">
            <span class="text-xs font-sans font-semibold text-neutral-400 uppercase tracking-wider">Client</span>
            <span class="font-bold text-dark text-base sm:text-lg">{{ project.client || 'Personal Project' }}</span>
          </div>

          <div class="flex flex-col gap-1">
            <span class="text-xs font-sans font-semibold text-neutral-400 uppercase tracking-wider">Category</span>
            <span class="font-medium text-dark text-sm sm:text-base">{{ project.category }}</span>
          </div>

          <div class="flex flex-col gap-1">
            <span class="text-xs font-sans font-semibold text-neutral-400 uppercase tracking-wider">Date</span>
            <span class="font-medium text-neutral-700 text-sm font-sans">{{ project.date || '2024' }}</span>
          </div>

          <div v-if="project.externalUrl" class="pt-2">
            <AppButton
              :href="project.externalUrl"
              :external="true"
              variant="primary"
              class="w-full !py-3"
            >
              Visit website / Behance →
            </AppButton>
          </div>
        </aside>

        <!-- Main Title & Narrative -->
        <div class="lg:col-span-8 flex flex-col gap-6">
          <div class="flex items-center gap-2 flex-wrap">
            <AppBadge
              v-for="tag in project.tags"
              :key="tag"
              variant="default"
            >
              {{ tag }}
            </AppBadge>
          </div>

          <AppHeading as="h1" size="2xl" :spaced="true">
            {{ project.title }}
          </AppHeading>

          <p class="text-xl sm:text-2xl font-medium text-neutral-800 leading-relaxed">
            {{ project.subtitle }}
          </p>

          <div class="prose max-w-none text-neutral-600 leading-relaxed text-base sm:text-lg pt-4 border-t border-neutral-200">
            <p>
              {{ project.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Feature Visual Presentation Showcase -->
      <div class="w-full aspect-[16/9] rounded-3xl bg-light border border-neutral-200 flex items-center justify-center p-8 sm:p-12 relative overflow-hidden text-center text-dark shadow-sm">
        <div class="relative z-10 flex flex-col items-center gap-4 max-w-xl">
          <span class="text-xs font-sans uppercase tracking-widest text-primary font-semibold">
            Interactive Showcase
          </span>
          <h2 class="text-2xl sm:text-4xl font-bold tracking-tight text-dark">
            {{ project.title }}
          </h2>
          <p class="text-sm sm:text-base text-neutral-600">
            Designed with high-fidelity components, user-centric wireframes, and tested interactive prototypes.
          </p>
          <AppButton
            v-if="project.externalUrl"
            :href="project.externalUrl"
            :external="true"
            variant="primary"
            class="mt-2 !px-6 !py-3 font-semibold"
          >
            Explore Case Study on Behance
          </AppButton>
        </div>
      </div>
    </article>

    <!-- Footer -->
    <FooterSection :profile="portfolioData.profile" />
  </div>
</template>
