<script setup lang="ts">
import type { ToolSkill } from '../../types/portfolio'

interface Props {
  title: string
  countLabel: string
  tools: ToolSkill[]
  dotColorClass: string
  hoverBorderClass: string
  hoverTextClass: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-4 p-5 sm:p-6 rounded-3xl bg-neutral-50/70 border border-neutral-200/80 shadow-2xs transition-all">
    <div class="flex items-center justify-between pb-3 border-b border-neutral-200/60">
      <div class="flex items-center gap-2.5">
        <span :class="['w-2.5 h-2.5 rounded-full', dotColorClass]" />
        <h3 class="font-bold text-dark text-base sm:text-lg">
          {{ title }}
        </h3>
      </div>
      <span class="text-xs font-sans font-semibold text-neutral-400">
        {{ countLabel }}
      </span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      <div
        v-for="tool in tools"
        :key="tool.name"
        :class="[
          'group flex items-center gap-3 p-3 rounded-2xl bg-white border border-neutral-200/70 hover:shadow-xs transition-all duration-200',
          hoverBorderClass
        ]"
      >
        <div class="w-9 h-9 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-center p-1.5 flex-shrink-0 group-hover:scale-105 transition-transform">
          <img
            v-if="tool.iconUrl"
            :src="tool.iconUrl"
            :alt="tool.name"
            class="w-full h-full object-contain"
            loading="lazy"
            decoding="async"
          />
          <span v-else class="text-xs font-bold text-dark font-sans">
            {{ tool.name.substring(0, 2) }}
          </span>
        </div>

        <div class="flex flex-col min-w-0">
          <span :class="['font-bold text-dark text-xs sm:text-sm truncate transition-colors', hoverTextClass]">
            {{ tool.name }}
          </span>
          <span class="text-[11px] text-neutral-500 font-medium truncate">
            {{ tool.category }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
