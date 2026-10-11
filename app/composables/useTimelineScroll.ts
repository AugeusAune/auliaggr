import { ref, computed, onMounted, onUnmounted, nextTick, type Ref, type ComputedRef } from 'vue'

interface UseTimelineScrollReturn {
  timelineRef: Ref<HTMLElement | null>
  cardEls: Ref<HTMLElement[]>
  scrollProgress: Ref<number>
  currentScrollPx: Ref<number>
  lineEndPx: Ref<number>
  activeLinePx: ComputedRef<number>
  setCardRef: (el: unknown, index: number) => void
  isItemActive: (index: number) => boolean
}

/**
 * Composable for scroll-driven timeline progress tracking.
 * Used by JourneySection and AwardsSection to avoid duplicating
 * the same ~60-line scroll/resize/observer setup.
 *
 * @example
 * const { timelineRef, setCardRef, isItemActive, lineEndPx, activeLinePx } = useTimelineScroll()
 */
export const useTimelineScroll = (): UseTimelineScrollReturn => {
  const timelineRef = ref<HTMLElement | null>(null)
  const cardEls = ref<HTMLElement[]>([])
  const currentScrollPx = ref(0)
  const scrollProgress = ref(0)
  const lineEndPx = ref(0)
  let resizeObserver: ResizeObserver | null = null

  const setCardRef = (el: unknown, index: number) => {
    if (!el) return
    const element = (el as { $el?: HTMLElement }).$el || (el as HTMLElement)
    cardEls.value[index] = element
  }

  const isItemActive = (index: number): boolean => {
    if (index === 0) return scrollProgress.value > 0
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
    if (lineEndPx.value <= 0) updateLineDimensions()

    const rect = timelineRef.value.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const isDesktop = window.innerWidth >= 640
    const topExtensionPx = isDesktop ? 80 : 56

    const totalLineHeight = lineEndPx.value > 0
      ? lineEndPx.value
      : rect.height + topExtensionPx
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

  return {
    timelineRef,
    cardEls,
    scrollProgress,
    currentScrollPx,
    lineEndPx,
    activeLinePx,
    setCardRef,
    isItemActive,
  }
}
