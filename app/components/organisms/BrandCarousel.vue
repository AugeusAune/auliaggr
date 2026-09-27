<script setup lang="ts">
interface Props {
  brands: string[]
}

const props = defineProps<Props>()

const doubledBrands = computed(() => [...props.brands, ...props.brands, ...props.brands])
</script>

<template>
  <section class="w-full py-8 sm:py-10 border-b border-neutral-200 bg-white overflow-hidden">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center gap-6">
      <span class="text-xs font-mono font-medium uppercase tracking-wider text-neutral-500 flex-shrink-0">
        Proudly worked with:
      </span>

      <!-- Infinite marquee container -->
      <div class="overflow-hidden w-full relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div class="animate-marquee flex items-center gap-6 py-1">
          <div
            v-for="(brand, idx) in doubledBrands"
            :key="`${brand}-${idx}`"
            class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-light border border-neutral-200 text-xs sm:text-sm font-semibold text-neutral-700 whitespace-nowrap shadow-2xs hover:border-primary/40 transition-colors"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-primary" />
            {{ brand }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
