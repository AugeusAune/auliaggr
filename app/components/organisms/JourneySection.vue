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

      <!-- Connected Timeline with Scroll Animated Line & Origin Cap -->
      <div
        ref="timelineRef"
        class="relative pl-8 sm:pl-10 space-y-6 sm:space-y-8 ml-2 sm:ml-4"
      >
        <!-- Origin Node Cap at Top of Timeline -->
        <div class="absolute -left-[5px] top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-primary/40 shadow-xs z-10 flex items-center justify-center">
          <span class="w-1.5 h-1.5 rounded-full bg-primary" />
        </div>

        <!-- Static background track line -->
        <div class="absolute left-0 top-3 bottom-6 w-[3px] bg-neutral-200 rounded-full" />

        <!-- Scroll-driven illuminated active fill line with radiant glow -->
        <div
          class="absolute left-0 top-3 w-[3px] bg-gradient-to-b from-primary via-primary to-primary-hover rounded-full transition-all duration-150 ease-out shadow-[0_0_10px_rgba(235,94,85,0.4)]"
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
