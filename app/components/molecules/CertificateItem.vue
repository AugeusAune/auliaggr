<script setup lang="ts">
import type { Certification } from '../../types/portfolio'

interface Props {
  cert: Certification
}

defineProps<Props>()
defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <div
    class="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white border border-neutral-200 transition-all duration-300 hover:border-primary/60 hover:bg-neutral-50/60 hover:shadow-sm group shadow-2xs cursor-pointer select-none"
    role="button"
    tabindex="0"
    @click="$emit('click')"
    @keydown.enter="$emit('click')"
    @keydown.space.prevent="$emit('click')"
  >
    <div class="flex items-center gap-3 sm:gap-4 overflow-hidden">
      <!-- Certificate Image Thumbnail -->
      <div v-if="cert.imageUrl" class="w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-200">
        <img
          :src="cert.imageUrl"
          :alt="cert.title"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div v-else class="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary flex-shrink-0">
        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
        </svg>
      </div>

      <div class="flex flex-col min-w-0">
        <h4 class="font-semibold text-dark text-xs sm:text-sm truncate group-hover:text-black transition-colors">
          {{ cert.title }}
        </h4>
        <span class="text-xs text-neutral-500 font-medium truncate">
          {{ cert.issuer }}
        </span>
      </div>
    </div>

    <span class="text-xs font-sans font-medium text-neutral-400 flex-shrink-0 ml-2">
      Verified
    </span>
  </div>
</template>
