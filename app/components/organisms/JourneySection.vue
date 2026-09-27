<script setup lang="ts">
import type { Milestone } from '../../types/portfolio'
import AppHeading from '../atoms/AppHeading.vue'
import JourneyCard from '../molecules/JourneyCard.vue'

interface Props {
  milestones: Milestone[]
}

defineProps<Props>()
</script>

<template>
  <section class="w-full py-16 sm:py-24 border-b border-neutral-200 bg-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-10 sm:gap-14">
      <div class="flex flex-col gap-3 max-w-2xl">
        <span class="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
          Career Timeline
        </span>
        <AppHeading as="h2" size="2xl" :spaced="true">
          My journey through design
        </AppHeading>
        <p class="text-neutral-600 text-sm sm:text-base font-medium">
          Explore the milestones and experiences that have shaped my career, year by year.
        </p>
      </div>

      <!-- Connected Timeline with Continuous Line -->
      <div class="relative pl-6 sm:pl-8 border-l-2 border-primary/20 space-y-6 sm:space-y-8 ml-3 sm:ml-4">
        <JourneyCard
          v-for="item in milestones"
          :key="`${item.company}-${item.year}`"
          :milestone="item"
        />
      </div>
    </div>
  </section>
</template>
