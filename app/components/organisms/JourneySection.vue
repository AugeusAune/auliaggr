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
  <section class="w-full py-16 sm:py-24 border-b border-neutral-200">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-10 sm:gap-14">
      <div class="flex flex-col gap-3 max-w-2xl">
        <span class="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400">
          Career Timeline
        </span>
        <AppHeading as="h2" size="2xl" :spaced="true">
          My journey through design
        </AppHeading>
        <p class="text-neutral-600 text-sm sm:text-base font-medium">
          Explore the milestones and experiences that have shaped my career, year by year.
        </p>
      </div>

      <div class="flex flex-col divide-y divide-neutral-200">
        <JourneyCard
          v-for="item in milestones"
          :key="`${item.company}-${item.year}`"
          :milestone="item"
        />
      </div>
    </div>
  </section>
</template>
