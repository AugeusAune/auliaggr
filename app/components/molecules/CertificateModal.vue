<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import type { Certification } from '../../types/portfolio'

interface Props {
  certifications: Certification[]
  currentIndex: number
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select', index: number): void
}>()

const currentCert = computed(() => {
  if (!props.certifications.length) return null
  const safeIndex = Math.max(0, Math.min(props.currentIndex, props.certifications.length - 1))
  return props.certifications[safeIndex] || null
})

const handlePrev = () => {
  if (!props.certifications.length) return
  const newIndex = (props.currentIndex - 1 + props.certifications.length) % props.certifications.length
  emit('select', newIndex)
}

const handleNext = () => {
  if (!props.certifications.length) return
  const newIndex = (props.currentIndex + 1) % props.certifications.length
  emit('select', newIndex)
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!props.isOpen) return
  if (e.key === 'Escape') {
    emit('close')
    return
  }
  if (e.key === 'ArrowLeft') {
    handlePrev()
    return
  }
  if (e.key === 'ArrowRight') {
    handleNext()
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen && currentCert"
      class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      :aria-label="currentCert.title"
      @click.self="emit('close')"
    >
      <!-- Modal Box -->
      <div class="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        <!-- Top Navigation / Info Bar -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-neutral-100 bg-neutral-50/70">
          <div class="flex items-center gap-3 min-w-0 pr-4">
            <span class="px-2.5 py-1 rounded-full bg-primary/15 text-primary text-xs font-mono font-bold flex-shrink-0">
              {{ currentIndex + 1 }} / {{ certifications.length }}
            </span>
            <div class="flex flex-col min-w-0">
              <h3 class="text-sm sm:text-base font-bold text-dark truncate">
                {{ currentCert.title }}
              </h3>
              <p class="text-xs text-neutral-500 font-medium truncate">
                {{ currentCert.issuer }}
              </p>
            </div>
          </div>

          <button
            type="button"
            class="w-9 h-9 rounded-full bg-neutral-200/80 hover:bg-neutral-300 text-neutral-700 flex items-center justify-center text-sm font-bold transition-colors flex-shrink-0"
            aria-label="Close modal"
            @click="emit('close')"
          >
            ✕
          </button>
        </div>

        <!-- Image & Navigation Area -->
        <div class="relative flex-1 bg-neutral-900/5 flex items-center justify-center p-3 sm:p-6 overflow-hidden min-h-[300px]">
          <!-- Previous Button (<) -->
          <button
            type="button"
            aria-label="Previous certificate (prev)"
            class="prev-button absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 hover:bg-white text-dark shadow-lg border border-neutral-200 flex items-center justify-center text-lg sm:text-xl font-bold transition-all hover:scale-105 active:scale-95"
            @click.stop="handlePrev"
          >
            &lt;
          </button>

          <!-- Certificate Image -->
          <div class="max-w-full max-h-[65vh] flex items-center justify-center">
            <img
              v-if="currentCert.imageUrl"
              :src="currentCert.imageUrl"
              :alt="currentCert.title"
              class="max-w-full max-h-[65vh] object-contain rounded-xl shadow-md border border-neutral-200/60"
            />
            <div
              v-else
              class="w-64 h-48 rounded-xl bg-neutral-100 flex flex-col items-center justify-center text-neutral-400 gap-2 border border-neutral-200"
            >
              <span class="text-xs font-medium">Preview unavailable</span>
            </div>
          </div>

          <!-- Next Button (>) -->
          <button
            type="button"
            aria-label="Next certificate (next)"
            class="next-button absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 hover:bg-white text-dark shadow-lg border border-neutral-200 flex items-center justify-center text-lg sm:text-xl font-bold transition-all hover:scale-105 active:scale-95"
            @click.stop="handleNext"
          >
            &gt;
          </button>
        </div>

        <!-- Bottom Footer with Hint & Controls -->
        <div class="flex items-center justify-between px-5 py-3 border-t border-neutral-100 bg-white text-xs text-neutral-500 font-medium">
          <span class="hidden sm:inline">Use &lt; and &gt; or arrow keys to navigate</span>
          <span class="sm:hidden">Swipe or tap &lt; &gt;</span>
          <button
            type="button"
            class="text-primary hover:underline font-semibold"
            @click="emit('close')"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
