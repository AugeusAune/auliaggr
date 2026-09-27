<script setup lang="ts">
import type { Project } from '../../types/portfolio'
import AppBadge from '../atoms/AppBadge.vue'

interface Props {
  project: Project
  featured?: boolean
}

defineProps<Props>()
</script>

<template>
  <NuxtLink
    :to="`/projects/${project.slug}`"
    class="group block relative overflow-hidden rounded-3xl bg-light border border-neutral-200 transition-all duration-300 hover:border-neutral-400 hover:bg-neutral-50/50 focus-visible:outline-2 focus-visible:outline-dark"
  >
    <!-- Visual Image / Cover from Framer -->
    <div
      class="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 flex items-center justify-center text-white"
    >
      <img
        v-if="project.coverImage"
        :src="project.coverImage"
        :alt="project.title"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
      <div
        v-else
        class="absolute inset-0 bg-gradient-to-tr from-black/80 via-neutral-900/60 to-neutral-800 transition-transform duration-500 group-hover:scale-105"
      />

      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

      <!-- Category Badge Top-Right -->
      <div class="absolute top-4 right-4 z-10">
        <AppBadge variant="default" class="!bg-black/60 !text-white !border-white/20 backdrop-blur-sm shadow-sm">
          {{ project.category.split(',')[0] }}
        </AppBadge>
      </div>
    </div>

    <!-- Metadata Content -->
    <div class="p-5 sm:p-6 flex flex-col gap-1.5 bg-light">
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
    </div>
  </NuxtLink>
</template>
