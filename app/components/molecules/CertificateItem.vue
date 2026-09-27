<script setup lang="ts">
import type { Certification } from '../../types/portfolio'

interface Props {
  cert: Certification
}

defineProps<Props>()
</script>

<template>
  <div
    class="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:border-primary/40"
  >
    <div class="flex items-center gap-3 sm:gap-4">
      <div class="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary flex-shrink-0">
        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
        </svg>
      </div>

      <div class="flex flex-col">
        <h4 class="font-semibold text-dark text-sm sm:text-base">
          {{ cert.title }}
        </h4>
        <span class="text-xs text-neutral-500 font-medium">
          {{ cert.issuer }}
        </span>
      </div>
    </div>

    <span class="text-xs font-mono text-neutral-400">
      Verified
    </span>
  </div>
</template>
