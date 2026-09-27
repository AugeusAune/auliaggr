<script setup lang="ts">
import type { Award } from '../../types/portfolio'

interface Props {
  award: Award
}

defineProps<Props>()
</script>

<template>
  <div
    class="flex items-center justify-between p-5 sm:p-6 rounded-2xl bg-light border border-neutral-200 transition-all duration-300 hover:border-neutral-300 hover:shadow-sm"
  >
    <div class="flex items-start gap-4">
      <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-neutral-200 text-dark flex-shrink-0 mt-0.5">
        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      <div class="flex flex-col gap-1">
        <h4 class="font-semibold text-dark text-base sm:text-lg">
          {{ award.title }}
        </h4>
        <p v-if="award.organization" class="text-neutral-500 text-sm font-medium">
          {{ award.organization }}
        </p>
      </div>
    </div>

    <span class="text-xs sm:text-sm font-mono text-neutral-500 flex-shrink-0 ml-4">
      {{ award.date }}
    </span>
  </div>
</template>
