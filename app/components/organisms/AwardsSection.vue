<script setup lang="ts">
import type { Award } from '../../types/portfolio'
import AppHeading from '../atoms/AppHeading.vue'
import AwardCard from '../molecules/AwardCard.vue'

interface Props {
  awards: Award[]
}

defineProps<Props>()
</script>

<template>
  <section class="w-full py-16 sm:py-24 border-b border-neutral-200 bg-neutral-50/30">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-10">
      <div class="flex flex-col gap-3 max-w-2xl">
        <span class="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400">
          Recognition
        </span>
        <AppHeading as="h2" size="2xl" :spaced="true">
          Awards
        </AppHeading>
        <p class="text-neutral-600 text-sm sm:text-base font-medium">
          A few competitions where the work spoke for itself.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <AwardCard
          v-for="award in awards"
          :key="award.title"
          :award="award"
        />
      </div>
    </div>
  </section>
</template>
