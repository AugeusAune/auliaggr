<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import type { Award, Certification } from '../../types/portfolio'
import AppHeading from '../atoms/AppHeading.vue'
import AwardCard from '../molecules/AwardCard.vue'
import CertificateModal from '../molecules/CertificateModal.vue'

interface Props {
  awards: Award[]
}

const props = defineProps<Props>()
const selectedAwardIndex = ref<number | null>(null)

const timelineRef = ref<HTMLElement | null>(null)
const cardEls = ref<HTMLElement[]>([])
const currentScrollPx = ref(0)
const scrollProgress = ref(0)
const lineEndPx = ref(0)
let resizeObserver: ResizeObserver | null = null

const modalItems = computed<Certification[]>(() =>
  props.awards.map(a => ({
    title: a.title,
    issuer: `${a.organization || 'Award'} · ${a.date}`,
    imageUrl: a.imageUrl || a.logoUrl
  }))
)

const handleOpenAward = (index: number) => {
  selectedAwardIndex.value = index
}

const setCardRef = (el: any, index: number) => {
  if (!el) return
  cardEls.value[index] = el.$el || el
}

const isAwardActive = (index: number): boolean => {
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

  const numberOffsetPx = isDesktop ? 24 : 18
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
  if (typeof ResizeObserver !== 'undefined' && timelineRef.value) {
    resizeObserver = new ResizeObserver(() => {
      updateLineDimensions()
      calculateScrollProgress()
    })
    resizeObserver.observe(timelineRef.value)
  }
  window.addEventListener('scroll', calculateScrollProgress, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  window.removeEventListener('scroll', calculateScrollProgress)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <section class="w-full py-14 sm:py-20 border-b border-neutral-200 bg-white relative overflow-hidden" id="awards">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div
        ref="timelineRef"
        class="relative pl-8 sm:pl-12 ml-4 sm:ml-6"
      >
        <!-- Static background track line -->
        <div
          class="absolute left-0 -top-14 sm:-top-20 w-[3px] bg-neutral-200 rounded-full"
          :style="lineEndPx > 0 ? { height: `${lineEndPx}px` } : { bottom: '0px' }"
        />

        <!-- Scroll-driven illuminated active fill line -->
        <div
          class="absolute left-0 -top-14 sm:-top-20 w-[3px] bg-gradient-to-b from-primary via-primary to-primary-hover rounded-full transition-all duration-150 ease-out shadow-[0_0_8px_rgba(235,94,85,0.4)]"
          :style="{ height: `${activeLinePx}px` }"
        />

        <div class="flex flex-col gap-10 sm:gap-14">
          <!-- Section Header -->
          <div class="flex flex-col gap-2.5 sm:gap-3 max-w-2xl">
            <span class="text-xs font-sans font-semibold uppercase tracking-wider text-primary">
              Recognition
            </span>
            <AppHeading as="h2" size="2xl">
              Honors & awards
            </AppHeading>
            <p class="text-neutral-600 text-xs sm:text-sm md:text-base font-medium">
              Explore the competitions and recognitions where my design work made an impact.
            </p>
          </div>

          <!-- Awards timeline list -->
          <div class="space-y-10 sm:space-y-16 pt-2">
            <AwardCard
              v-for="(award, idx) in awards"
              :key="award.title"
              :ref="(el) => setCardRef(el, idx)"
              :award="award"
              :index="idx + 1"
              :is-active="isAwardActive(idx)"
              @click="handleOpenAward(idx)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Award Certificate Detail Modal -->
    <CertificateModal
      :is-open="selectedAwardIndex !== null"
      :current-index="selectedAwardIndex ?? 0"
      :certifications="modalItems"
      @close="selectedAwardIndex = null"
      @select="(idx) => selectedAwardIndex = idx"
    />
  </section>
</template>
