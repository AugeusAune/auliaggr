<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { Milestone } from '../../types/portfolio'
import AppHeading from '../atoms/AppHeading.vue'
import JourneyCard from '../molecules/JourneyCard.vue'

interface Props {
  milestones: Milestone[]
}

defineProps<Props>()

const timelineRef = ref<HTMLElement | null>(null)
const scrollProgress = ref(0)

const calculateScrollProgress = () => {
  if (!timelineRef.value) return
  const rect = timelineRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  // Start line animation when top of timeline reaches middle of viewport
  const triggerPoint = windowHeight * 0.75
  const currentScroll = triggerPoint - rect.top
  const totalHeight = rect.height - 40
  if (currentScroll <= 0) {
    scrollProgress.value = 0
    return
  }
  const percentage = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100))
  scrollProgress.value = percentage
}

onMounted(() => {
  window.addEventListener('scroll', calculateScrollProgress, { passive: true })
  calculateScrollProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', calculateScrollProgress)
})
</script>

<template>
  <section class="w-full py-14 sm:py-20 border-b border-neutral-200 bg-white" id="experience">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-10 sm:gap-14">
      <div class="flex flex-col gap-3 max-w-2xl">
        <span class="text-xs font-sans font-semibold uppercase tracking-wider text-primary">
          Career Timeline
        </span>
        <AppHeading as="h2" size="2xl">
          My journey through design
        </AppHeading>
        <p class="text-neutral-600 text-sm sm:text-base font-medium">
          Explore the milestones and experiences that have shaped my career, year by year.
        </p>
      </div>

      <!-- Connected Timeline with Scroll Animated Line -->
      <div
        ref="timelineRef"
        class="relative pl-8 sm:pl-10 space-y-6 sm:space-y-8 ml-2 sm:ml-4"
      >
        <!-- Static background track line -->
        <div class="absolute left-0 top-6 bottom-6 w-0.5 bg-neutral-200 rounded-full" />
        <!-- Scroll-driven illuminated active fill line -->
        <div
          class="absolute left-0 top-6 w-0.5 bg-primary rounded-full transition-all duration-150 ease-out shadow-xs"
          :style="{ height: `${scrollProgress}%` }"
        />

        <JourneyCard
          v-for="item in milestones"
          :key="`${item.company}-${item.year}`"
          :milestone="item"
        />
      </div>
    </div>
  </section>
</template>
