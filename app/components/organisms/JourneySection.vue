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
const cardEls = ref<HTMLElement[]>([])
const currentScrollPx = ref(0)
const scrollProgress = ref(0)

const setCardRef = (el: any, index: number) => {
  if (!el) return
  cardEls.value[index] = el.$el || el
}

const isMilestoneActive = (index: number): boolean => {
  if (index === 0) {
    return scrollProgress.value > 0
  }
  const card = cardEls.value[index]
  if (!card) return false
  const dotTop = card.offsetTop + 10
  return currentScrollPx.value >= dotTop
}

const calculateScrollProgress = () => {
  if (!timelineRef.value) return
  const rect = timelineRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  // Trigger line animation as user scrolls into the timeline
  const triggerPoint = windowHeight * 0.85
  const currentScroll = triggerPoint - rect.top
  const totalHeight = rect.height - 20

  if (currentScroll <= 0) {
    currentScrollPx.value = 0
    scrollProgress.value = 0
    return
  }

  // Ensure the vertical line leading down to milestone 1 is colored as soon as timeline enters view
  const firstCardTop = cardEls.value[0]?.offsetTop || 40
  const activePx = Math.max(firstCardTop + 10, currentScroll)
  currentScrollPx.value = activePx

  const percentage = Math.min(100, Math.max(5, (activePx / totalHeight) * 100))
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
        class="relative pl-12 sm:pl-16 pt-8 sm:pt-12 space-y-14 sm:space-y-20 ml-2 sm:ml-4"
      >
        <!-- Static background track line -->
        <div class="absolute left-0 top-0 bottom-6 w-[2px] bg-neutral-200 rounded-full" />

        <!-- Scroll-driven illuminated active fill line with radiant glow -->
        <div
          class="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-primary via-primary to-primary-hover rounded-full transition-all duration-150 ease-out shadow-[0_0_8px_rgba(235,94,85,0.4)]"
          :style="{ height: `${scrollProgress}%` }"
        />

        <JourneyCard
          v-for="(item, idx) in milestones"
          :key="`${item.company}-${item.year}`"
          :ref="(el) => setCardRef(el, idx)"
          :milestone="item"
          :index="idx + 1"
          :is-active="isMilestoneActive(idx)"
        />
      </div>
    </div>
  </section>
</template>
