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
    class="group flex flex-col justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-light border border-neutral-200 transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:-translate-y-1"
  >
    <div class="flex items-start justify-between gap-3">
      <div class="w-12 h-12 rounded-xl bg-white group-hover:bg-primary/5 border border-neutral-200 flex items-center justify-center p-2.5 flex-shrink-0 group-hover:border-primary/40 transition-colors shadow-2xs">
        <img
          v-if="tool.iconUrl"
          :src="tool.iconUrl"
          :alt="`${tool.name} icon`"
          class="w-full h-full object-contain"
        />
        <span v-else class="text-sm font-bold text-dark font-mono">
          {{ tool.name.substring(0, 2) }}
        </span>
      </div>

      <AppBadge
        v-if="tool.category"
        variant="primary"
        class="text-[11px] font-mono"
      >
        {{ tool.category }}
      </AppBadge>
    </div>

    <div class="flex flex-col gap-1">
      <h4 class="font-bold text-dark text-base sm:text-lg group-hover:text-primary transition-colors">
        {{ tool.name }}
      </h4>
      <p class="text-xs sm:text-sm text-neutral-500 font-medium leading-relaxed">
        {{ tool.description }}
      </p>
    </div>
  </div>
</template>
