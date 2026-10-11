<script setup lang="ts">
import { ref } from 'vue'
import type { Project } from '../../types/portfolio'
import AppBadge from '../atoms/AppBadge.vue'

interface Props {
  project: Project
  featured?: boolean
}

defineProps<Props>()
const isHovered = ref(false)
</script>

<template>
  <div
    class="group relative overflow-hidden rounded-3xl bg-light border border-neutral-200 transition-all duration-300 hover:border-neutral-400 hover:bg-neutral-50/50 flex flex-col justify-between"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Visual Image / Cover with Hover Video or GIF Preview -->
    <NuxtLink
      :to="`/projects/${project.slug}`"
      class="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 flex items-center justify-center text-white"
    >
      <!-- Base Cover Image -->
      <img
        v-if="project.coverImage"
        :src="project.coverImage"
        :alt="project.title"
        class="absolute inset-0 w-full h-full object-cover transition-all duration-500"
        :class="[
          isHovered && (project.previewVideoUrl || project.previewGifUrl)
            ? 'opacity-0 scale-105'
            : 'opacity-100 group-hover:scale-105'
        ]"
        loading="lazy"
        decoding="async"
      />
      <div
        v-else
        class="absolute inset-0 bg-gradient-to-tr from-black/80 via-neutral-900/60 to-neutral-800 transition-transform duration-500 group-hover:scale-105"
      />

      <!-- Motion Preview: Video on Hover -->
      <video
        v-if="project.previewVideoUrl"
        :src="project.previewVideoUrl"
        autoplay
        loop
        muted
        playsinline
        class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        :class="isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      />

      <!-- Motion Preview: GIF on Hover -->
      <img
        v-else-if="project.previewGifUrl"
        :src="project.previewGifUrl"
        :alt="`${project.title} animated preview`"
        class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        :class="isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'"
        loading="lazy"
        decoding="async"
      />

      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

      <!-- Category Badge Top-Right -->
      <div class="absolute top-4 right-4 z-10">
        <AppBadge variant="default" class="!bg-black/60 !text-white !border-white/20 backdrop-blur-sm shadow-sm font-sans font-medium">
          {{ project.category.split(',')[0] }}
        </AppBadge>
      </div>
    </NuxtLink>

    <!-- Metadata Content -->
    <div class="p-5 sm:p-6 flex flex-col gap-4 bg-light flex-grow justify-between">
      <NuxtLink
        :to="`/projects/${project.slug}`"
        class="flex flex-col gap-1.5 focus-visible:outline-2 focus-visible:outline-dark"
      >
        <div class="flex items-center justify-between gap-2">
          <h4 class="font-bold text-dark text-lg group-hover:text-black transition-colors">
            {{ project.title }}
          </h4>
          <span class="text-neutral-400 group-hover:text-dark group-hover:translate-x-1 transition-all text-sm font-semibold">
            →
          </span>
        </div>
        <p class="text-neutral-600 text-sm line-clamp-2">
          {{ project.subtitle }}
        </p>
      </NuxtLink>

      <!-- Action Row: Round Prototype & Behance Buttons + Case Study Link -->
      <div class="flex items-center justify-between gap-2 pt-3 border-t border-neutral-200/70">
        <NuxtLink
          :to="`/projects/${project.slug}`"
          class="text-xs font-semibold text-neutral-600 hover:text-dark transition-colors inline-flex items-center gap-1"
        >
          View Case Study
        </NuxtLink>

        <div class="flex items-center gap-2">
          <!-- Circular Figma Prototype Button -->
          <a
            v-if="project.prototypeUrl || project.externalUrl"
            :href="project.prototypeUrl || project.externalUrl || '#'"
            target="_blank"
            rel="noopener noreferrer"
            class="prototype-btn w-9 h-9 rounded-full inline-flex items-center justify-center bg-white border border-neutral-200 text-dark hover:border-primary hover:text-primary transition-all duration-200 shadow-2xs select-none active:scale-95 p-2"
            title="Figma Prototype"
            aria-label="View Figma prototype"
          >
            <img
              src="/logo/figma.svg"
              alt="Figma"
              class="w-3.5 h-3.5 object-contain"
              loading="lazy"
              decoding="async"
            />
          </a>

          <!-- Circular Behance Button -->
          <a
            v-if="project.behanceUrl || project.externalUrl"
            :href="project.behanceUrl || project.externalUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="behance-btn w-9 h-9 rounded-full inline-flex items-center justify-center bg-white border border-neutral-200 text-dark hover:border-primary transition-all duration-200 shadow-2xs select-none active:scale-95 p-2"
            title="Behance Case Study"
            aria-label="View Behance study case"
          >
            <img
              src="/logo/behance.svg"
              alt="Behance"
              class="w-3.5 h-3.5 object-contain"
              loading="lazy"
              decoding="async"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
