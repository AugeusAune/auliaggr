<script setup lang="ts">
import type { Milestone } from '../../types/portfolio'
import AppBadge from '../atoms/AppBadge.vue'

interface Props {
  milestone: Milestone
}

defineProps<Props>()
</script>

<template>
  <div
    class="flex items-center justify-between py-4 sm:py-5 border-b border-neutral-200 transition-colors hover:bg-neutral-50/50 px-2 sm:px-4 rounded-xl"
  >
    <div class="flex flex-col gap-1">
      <h4 class="font-semibold text-dark text-base sm:text-lg">
        {{ milestone.role }}
      </h4>
      <p class="text-neutral-500 text-sm font-medium">
        {{ milestone.company }}
      </p>
    </div>

    <div class="flex items-center">
      <AppBadge variant="default" class="font-mono text-xs sm:text-sm !px-3 !py-1">
        {{ milestone.year }}
      </AppBadge>
    </div>
  </div>
</template>
