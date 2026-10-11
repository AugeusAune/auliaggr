<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
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
const lineEndPx = ref(0)

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
  return currentScrollPx.value >= card.offsetTop
}

const updateLineDimensions = () => {
  if (!timelineRef.value || cardEls.value.length === 0) return
  const lastCard = cardEls.value[cardEls.value.length - 1]
  if (!lastCard) return

  const isDesktop = window.innerWidth >= 640
  const topExtensionPx = isDesktop ? 80 : 56

  // Exactly level with the last milestone number (05) - stops right at the number
  const numberOffsetPx = 24
  lineEndPx.value = lastCard.offsetTop + numberOffsetPx + topExtensionPx
}

const activeLinePx = computed((): number => {
  if (lineEndPx.value <= 0) return 0
  return Math.min(lineEndPx.value, (scrollProgress.value / 100) * lineEndPx.value)
})

const calculateScrollProgress = () => {
  if (!timelineRef.value) return
  if (lineEndPx.value <= 0) {
    updateLineDimensions()
  }
  const rect = timelineRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const isDesktop = window.innerWidth >= 640
  const topExtensionPx = isDesktop ? 80 : 56

  const totalLineHeight = lineEndPx.value > 0 ? lineEndPx.value : rect.height + topExtensionPx
  const triggerPoint = windowHeight * 0.8
  const currentScroll = triggerPoint - (rect.top - topExtensionPx)

  if (currentScroll <= 0) {
    currentScrollPx.value = 0
    scrollProgress.value = 0
    return
  }

  currentScrollPx.value = currentScroll - topExtensionPx
  const percentage = Math.min(100, Math.max(0, (currentScroll / totalLineHeight) * 100))
  scrollProgress.value = percentage
}

const handleResize = () => {
  updateLineDimensions()
  calculateScrollProgress()
}

onMounted(() => {
  nextTick(() => {
    updateLineDimensions()
    calculateScrollProgress()
  })
  window.addEventListener('scroll', calculateScrollProgress, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', calculateScrollProgress)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <section class="w-full py-14 sm:py-20 border-b border-neutral-200 bg-white relative overflow-hidden" id="experience">
    <div
      ref="timelineRef"
      class="max-w-6xl mx-auto px-4 sm:px-6 relative"
    >
      <!-- Static background track line running from the very top of the section and stopping precisely at the end of the last journey card -->
      <div
        class="absolute left-4 sm:left-6 -top-14 sm:-top-20 w-[3px] bg-neutral-200 rounded-full"
        :style="lineEndPx > 0 ? { height: `${lineEndPx}px` } : { bottom: '0px' }"
      />

      <!-- Scroll-driven illuminated active fill line with radiant glow -->
      <div
        class="absolute left-4 sm:left-6 -top-14 sm:-top-20 w-[3px] bg-gradient-to-b from-primary via-primary to-primary-hover rounded-full transition-all duration-150 ease-out shadow-[0_0_8px_rgba(235,94,85,0.4)]"
        :style="{ height: `${activeLinePx}px` }"
      />

      <div class="flex flex-col gap-10 sm:gap-14 pl-10 sm:pl-14">
        <!-- Section Header -->
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

        <!-- Milestones list -->
        <div class="space-y-14 sm:space-y-20 pt-2">
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
    </div>
  </section>
</template>
