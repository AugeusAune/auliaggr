<script setup lang="ts">
interface Props {
  brands: string[]
}

defineProps<Props>()
</script>

<template>
  <section class="w-full py-8 sm:py-10 border-b border-neutral-200 bg-neutral-50/50 overflow-hidden">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center gap-6">
      <span class="text-xs font-mono font-medium uppercase tracking-wider text-neutral-500 flex-shrink-0">
        Proudly worked with:
      </span>

      <!-- Infinite marquee / flex list of brands -->
      <div class="flex items-center gap-6 sm:gap-8 flex-wrap overflow-x-auto no-scrollbar py-1">
        <div
          v-for="brand in brands"
          :key="brand"
          class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 text-xs sm:text-sm font-semibold text-neutral-700 whitespace-nowrap shadow-2xs"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-neutral-400" />
          {{ brand }}
        </div>
      </div>
    </div>
  </section>
</template>
