<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ToolSkill } from '../../types/portfolio'
import AppHeading from '../atoms/AppHeading.vue'

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
        <div
          v-if="activeTab === 'All' || activeTab === 'Design'"
          class="flex flex-col gap-4 p-5 sm:p-6 rounded-3xl bg-neutral-50/70 border border-neutral-200/80 shadow-2xs transition-all"
        >
          <div class="flex items-center justify-between pb-3 border-b border-neutral-200/60">
            <div class="flex items-center gap-2.5">
              <span class="w-2.5 h-2.5 rounded-full bg-primary" />
              <h3 class="font-bold text-dark text-base sm:text-lg">
                Design & Creative Systems
              </h3>
            </div>
            <span class="text-xs font-sans font-semibold text-neutral-400">
              {{ designTools.length }} tools
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div
              v-for="tool in designTools"
              :key="tool.name"
              class="group flex items-center gap-3 p-3 rounded-2xl bg-white border border-neutral-200/70 hover:border-primary/50 hover:shadow-xs transition-all duration-200"
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
                <span class="font-bold text-dark text-xs sm:text-sm truncate group-hover:text-primary transition-colors">
                  {{ tool.name }}
                </span>
                <span class="text-[11px] text-neutral-500 font-medium truncate">
                  {{ tool.category }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Group 2: Engineering & Tech -->
        <div
          v-if="activeTab === 'All' || activeTab === 'Development'"
          class="flex flex-col gap-4 p-5 sm:p-6 rounded-3xl bg-neutral-50/70 border border-neutral-200/80 shadow-2xs transition-all"
        >
          <div class="flex items-center justify-between pb-3 border-b border-neutral-200/60">
            <div class="flex items-center gap-2.5">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h3 class="font-bold text-dark text-base sm:text-lg">
                Engineering & Development
              </h3>
            </div>
            <span class="text-xs font-sans font-semibold text-neutral-400">
              {{ devTools.length }} skills
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div
              v-for="tool in devTools"
              :key="tool.name"
              class="group flex items-center gap-3 p-3 rounded-2xl bg-white border border-neutral-200/70 hover:border-emerald-500/50 hover:shadow-xs transition-all duration-200"
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
                <span class="font-bold text-dark text-xs sm:text-sm truncate group-hover:text-emerald-600 transition-colors">
                  {{ tool.name }}
                </span>
                <span class="text-[11px] text-neutral-500 font-medium truncate">
                  {{ tool.category }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
