<script setup lang="ts">
import type { Award } from '../../types/portfolio'

interface Props {
  award: Award
}

defineProps<Props>()
defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <div
    class="flex items-center justify-between p-5 sm:p-6 rounded-2xl bg-light border border-neutral-200 transition-all duration-300 hover:border-primary/40 hover:bg-white shadow-2xs group cursor-pointer select-none"
    role="button"
    tabindex="0"
    @click="$emit('click')"
    @keydown.enter="$emit('click')"
    @keydown.space.prevent="$emit('click')"
  >
    <div class="flex items-start gap-4">
      <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-neutral-200 text-dark flex-shrink-0 p-1.5 overflow-hidden shadow-2xs">
        <img
          v-if="award.logoUrl"
          :src="award.logoUrl"
          :alt="award.organization || award.title"
          class="w-full h-full object-contain rounded-full"
          loading="lazy"
          decoding="async"
        />
        <svg v-else class="w-5 h-5 fill-current text-primary" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      <div class="flex flex-col gap-1">
        <h4 class="font-bold text-dark text-base sm:text-lg group-hover:text-black transition-colors">
          {{ award.title }}
        </h4>
        <p v-if="award.organization" class="text-neutral-500 text-sm font-medium">
          {{ award.organization }}
        </p>
      </div>
    </div>

    <span class="text-xs sm:text-sm font-sans text-neutral-500 flex-shrink-0 ml-4 font-medium">
      {{ award.date }}
    </span>
  </div>
</template>
