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
  <div
    class="group relative overflow-hidden rounded-3xl bg-light border border-neutral-200 transition-all duration-300 hover:border-neutral-400 hover:bg-neutral-50/50 flex flex-col justify-between"
  >
    <!-- Visual Image / Cover from Framer -->
    <NuxtLink
      :to="`/projects/${project.slug}`"
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

      <!-- Action Buttons: Prototype & Behance Study Case -->
      <div class="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-3 border-t border-neutral-200/70">
        <a
          v-if="project.prototypeUrl || true"
          :href="project.prototypeUrl || project.externalUrl || '#'"
          target="_blank"
          rel="noopener noreferrer"
          class="prototype-btn flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl bg-white border border-neutral-200 text-dark hover:border-primary hover:text-primary transition-all duration-200 shadow-2xs select-none active:scale-95"
          aria-label="View interactive prototype"
        >
          <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
          <span>Prototype</span>
        </a>

        <a
          v-if="project.behanceUrl || project.externalUrl"
          :href="project.behanceUrl || project.externalUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="behance-btn flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl bg-primary/10 border border-primary/30 text-dark hover:bg-primary hover:text-white transition-all duration-200 shadow-2xs select-none active:scale-95"
          aria-label="View Behance study case"
        >
          <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.084 0-6.625-2.879-6.625-6.966 0-4.425 2.875-7.034 6.75-7.034 4.095 0 6.25 2.766 6.25 6.441 0 .614-.078 1.348-.156 1.75h-9.922c.156 2.375 1.625 3.844 3.906 3.844 1.703 0 2.891-.766 3.422-1.945l1.466.91zm-9.062-4.75h6.984c-.141-2.125-1.484-3.234-3.469-3.234-2.188 0-3.328 1.266-3.515 3.234zm-8.664-9.25h4.984c2.25 0 3.75 1.078 3.75 2.922 0 1.234-.734 2.156-1.797 2.547 1.484.453 2.297 1.625 2.297 3.094 0 2.297-1.859 3.437-4.234 3.437h-5v-12zm3 4.875h1.797c.922 0 1.5-.453 1.5-1.25 0-.781-.578-1.219-1.5-1.219h-1.797v2.469zm0 4.719h1.984c1.078 0 1.75-.484 1.75-1.375 0-.906-.672-1.422-1.75-1.422h-1.984v2.797z"/>
          </svg>
          <span class="truncate">Behance Study Case</span>
        </a>
      </div>
    </div>
  </div>
</template>
