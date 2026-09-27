<script setup lang="ts">
import type { ToolSkill } from '../../types/portfolio'
import AppBadge from '../atoms/AppBadge.vue'

interface Props {
  tool: ToolSkill
}

defineProps<Props>()
</script>

<template>
  <div
    class="flex flex-col gap-3 p-5 rounded-2xl bg-light border border-neutral-200 transition-all hover:border-neutral-300"
  >
    <div class="flex items-center justify-between">
      <div class="flex flex-col">
        <h4 class="font-bold text-dark text-base">
          {{ tool.name }}
        </h4>
        <span class="text-xs text-neutral-500 font-medium">
          {{ tool.description }}
        </span>
      </div>

      <AppBadge variant="default" class="font-mono font-semibold">
        {{ tool.percentage }}
      </AppBadge>
    </div>

    <!-- Progress track -->
    <div class="w-full h-1.5 rounded-full bg-neutral-200 overflow-hidden">
      <div
        class="h-full bg-dark rounded-full transition-all duration-500"
        :style="{ width: tool.percentage }"
      />
    </div>
  </div>
</template>
