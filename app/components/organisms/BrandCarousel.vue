<script setup lang="ts">
  import type { BrandPartner } from '../../types/portfolio';

  interface Props {
    brands: BrandPartner[];
  }

  const props = defineProps<Props>();

  const doubledBrands = computed(() => [
    ...props.brands,
    ...props.brands,
    ...props.brands,
  ]);
</script>

<template>
  <section
    class="w-full py-8 sm:py-10 border-b border-neutral-200 bg-white overflow-hidden"
  >
    <div
      class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center gap-6"
    >
      <span
        class="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 flex-shrink-0"
      >
        Proudly worked with:
      </span>

      <!-- Infinite marquee container -->
      <div
        class="overflow-hidden w-full relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        <div class="animate-marquee flex items-center gap-6 py-1">
          <div
            v-for="(brand, idx) in doubledBrands"
            :key="`${brand.name}-${idx}`"
            class="flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-300 h-12 min-w-[120px] shadow-2xs group"
          >
            <img
              :src="brand.logoUrl"
              :alt="brand.name"
              class="max-h-7 max-w-[100px] object-contain transition-all duration-300 opacity-75 group-hover:opacity-100"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
