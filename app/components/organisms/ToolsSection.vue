<script setup lang="ts">
import type { ToolSkill } from '../../types/portfolio'
import AppHeading from '../atoms/AppHeading.vue'
import ToolProgress from '../molecules/ToolProgress.vue'

interface Props {
  tools: ToolSkill[]
}

const props = defineProps<Props>()
const activeTab = ref('All')

const tabs = computed(() => ['All', 'Design', 'Development'])

const filteredTools = computed(() => {
  if (activeTab.value === 'All') return props.tools
  if (activeTab.value === 'Design') {
    return props.tools.filter(t =>
      t.category?.toLowerCase().includes('design') ||
      t.category?.toLowerCase().includes('motion') ||
      t.category?.toLowerCase().includes('visual')
    )
  }
  return props.tools.filter(t =>
    t.category?.toLowerCase().includes('dev') ||
    t.category?.toLowerCase().includes('framework') ||
    t.category?.toLowerCase().includes('backend') ||
    t.category?.toLowerCase().includes('frontend') ||
    t.category?.toLowerCase().includes('tech')
  )
})
</script>

<template>
  <section class="w-full py-16 sm:py-24 border-b border-neutral-200 bg-white" id="tools">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-10">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div class="flex flex-col gap-3 max-w-2xl">
          <span class="text-xs font-sans font-semibold uppercase tracking-wider text-primary">
            Tech & Software
          </span>
          <AppHeading as="h2" size="2xl">
            Skills & Tools
          </AppHeading>
          <p class="text-neutral-600 text-sm sm:text-base font-medium">
            Core design systems & engineering toolset powering high-fidelity digital solutions.
          </p>
        </div>

        <!-- Filter tabs for tools & dev skills -->
        <div class="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-full border border-neutral-200 self-start sm:self-auto">
          <button
            v-for="tab in tabs"
            :key="tab"
            type="button"
            @click="activeTab = tab"
            :class="[
              'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
              activeTab === tab
                ? 'bg-white text-dark font-semibold shadow-xs'
                : 'text-neutral-500 hover:text-dark'
            ]"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <ToolProgress
          v-for="tool in filteredTools"
          :key="tool.name"
          :tool="tool"
        />
      </div>
    </div>
  </section>
</template>
