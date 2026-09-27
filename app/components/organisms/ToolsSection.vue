<script setup lang="ts">
import type { ToolSkill } from '../../types/portfolio'
import AppHeading from '../atoms/AppHeading.vue'
import ToolProgress from '../molecules/ToolProgress.vue'

interface Props {
  tools: ToolSkill[]
}

defineProps<Props>()
</script>

<template>
  <section class="w-full py-16 sm:py-24 border-b border-neutral-200 bg-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-10">
      <div class="flex flex-col gap-3 max-w-2xl">
        <span class="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
          Tech & Software
        </span>
        <AppHeading as="h2" size="2xl" :spaced="true">
          Tools
        </AppHeading>
        <p class="text-neutral-600 text-sm sm:text-base font-medium">
          Core technologies, design systems & creative toolset powering high-fidelity designs.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <ToolProgress
          v-for="tool in tools"
          :key="tool.name"
          :tool="tool"
        />
      </div>
    </div>
  </section>
</template>
