<script setup lang="ts">
import type { Milestone } from '../../types/portfolio'
import AppHeading from '../atoms/AppHeading.vue'
import JourneyCard from '../molecules/JourneyCard.vue'
import { useTimelineScroll } from '../../composables/useTimelineScroll'

interface Props {
  milestones: Milestone[]
}

defineProps<Props>()

const { timelineRef, setCardRef, isItemActive, lineEndPx, activeLinePx } = useTimelineScroll()
</script>

<template>
  <section class="w-full py-14 sm:py-20 border-b border-neutral-200 bg-white relative overflow-hidden" id="experience">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div
        ref="timelineRef"
        class="relative pl-8 sm:pl-12 ml-4 sm:ml-6"
      >
        <!-- Static background track line running from the very top of the section and stopping precisely at the last milestone number (05) -->
        <div
          class="absolute left-0 -top-14 sm:-top-20 w-[3px] bg-neutral-200 rounded-full"
          :style="lineEndPx > 0 ? { height: `${lineEndPx}px` } : { bottom: '0px' }"
        />

        <!-- Scroll-driven illuminated active fill line with radiant glow -->
        <div
          class="absolute left-0 -top-14 sm:-top-20 w-[3px] bg-gradient-to-b from-primary via-primary to-primary-hover rounded-full transition-all duration-150 ease-out shadow-[0_0_8px_rgba(235,94,85,0.4)]"
          :style="{ height: `${activeLinePx}px` }"
        />

        <div class="flex flex-col gap-10 sm:gap-14">
          <!-- Section Header -->
          <div class="flex flex-col gap-2.5 sm:gap-3 max-w-2xl">
            <span class="text-xs font-sans font-semibold uppercase tracking-wider text-primary">
              Career Timeline
            </span>
            <AppHeading as="h2" size="2xl">
              My journey through design
            </AppHeading>
            <p class="text-neutral-600 text-xs sm:text-sm md:text-base font-medium">
              Explore the milestones and experiences that have shaped my career, year by year.
            </p>
          </div>

          <!-- Milestones list -->
          <div class="space-y-10 sm:space-y-16 pt-2">
            <JourneyCard
              v-for="(item, idx) in milestones"
              :key="`${item.company}-${item.year}`"
              :ref="(el) => setCardRef(el, idx)"
              :milestone="item"
              :index="idx + 1"
              :is-active="isItemActive(idx)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
