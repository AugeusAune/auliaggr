<script setup lang="ts">
import type { Milestone } from '../../types/portfolio'
import AppBadge from '../atoms/AppBadge.vue'

interface Props {
  milestone: Milestone
}

defineProps<Props>()
</script>

<template>
  <div class="relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-light border border-neutral-200 transition-all duration-300 hover:border-primary/40 hover:bg-white group shadow-2xs">
    <!-- Milestone indicator dot placed on the timeline vertical line -->
    <span
      class="absolute -left-[33px] sm:-left-[41px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-primary group-hover:scale-125 group-hover:bg-primary transition-all duration-300 shadow-xs"
    />

    <div class="flex flex-col gap-1">
      <h4 class="font-bold text-dark text-base sm:text-lg group-hover:text-black transition-colors">
        {{ milestone.role }}
      </h4>
      <p class="text-neutral-500 text-sm font-medium">
        {{ milestone.company }}
      </p>
    </div>

    <div class="flex items-center">
      <AppBadge variant="default" class="font-mono text-xs sm:text-sm !px-3 !py-1 !bg-white !border-neutral-200 group-hover:!border-primary/30 transition-colors">
        {{ milestone.year }}
      </AppBadge>
    </div>
  </div>
</template>
