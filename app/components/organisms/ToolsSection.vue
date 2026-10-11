<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ToolSkill } from '../../types/portfolio'
import AppHeading from '../atoms/AppHeading.vue'
import ToolGroupCard from '../molecules/ToolGroupCard.vue'

interface Props {
  tools: ToolSkill[]
}

const props = defineProps<Props>()
const activeTab = ref<'All' | 'Design' | 'Development'>('All')

const tabs = ['All', 'Design', 'Development'] as const

const isDev = (tool: ToolSkill): boolean => {
  const cat = tool.category?.toLowerCase() || ''
  return cat.includes('dev') || cat.includes('backend') || cat.includes('frontend')
}

const designTools = computed(() => props.tools.filter(t => !isDev(t)))
const devTools = computed(() => props.tools.filter(t => isDev(t)))
</script>

<template>
  <section class="w-full py-14 sm:py-20 border-b border-neutral-200 bg-white" id="tools">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-8 sm:gap-10">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
        <div class="flex flex-col gap-2.5 max-w-2xl">
          <span class="text-xs font-sans font-semibold uppercase tracking-wider text-primary">
            Competencies & Stack
          </span>
          <AppHeading as="h2" size="2xl">
            Skills & Tools
          </AppHeading>
          <p class="text-neutral-600 text-sm sm:text-base font-medium">
            Core design systems & engineering toolset powering high-fidelity digital solutions.
          </p>
        </div>

        <!-- Filter Tabs -->
        <div class="flex items-center gap-1 p-1 bg-neutral-100 rounded-full border border-neutral-200/80 self-start sm:self-auto">
          <button
            v-for="tab in tabs"
            :key="tab"
            type="button"
            @click="activeTab = tab"
            :class="[
              'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer select-none',
              activeTab === tab
                ? 'bg-white text-dark font-semibold shadow-xs'
                : 'text-neutral-500 hover:text-dark'
            ]"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <!-- Grouped Skill Domains -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        <!-- Group 1: Product & Visual Design -->
        <ToolGroupCard
          v-if="activeTab === 'All' || activeTab === 'Design'"
          title="Design & Creative Systems"
          :count-label="`${designTools.length} tools`"
          :tools="designTools"
          dot-color-class="bg-primary"
          hover-border-class="hover:border-primary/50"
          hover-text-class="group-hover:text-primary"
        />

        <!-- Group 2: Engineering & Tech -->
        <ToolGroupCard
          v-if="activeTab === 'All' || activeTab === 'Development'"
          title="Engineering & Development"
          :count-label="`${devTools.length} skills`"
          :tools="devTools"
          dot-color-class="bg-emerald-500"
          hover-border-class="hover:border-emerald-500/50"
          hover-text-class="group-hover:text-emerald-600"
        />
      </div>
    </div>
  </section>
</template>
