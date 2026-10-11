<script setup lang="ts">
  import { computed } from 'vue';
  import type { Milestone } from '../../types/portfolio';

  interface Props {
    milestone: Milestone;
    index?: number;
    isActive?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    index: 0,
    isActive: false,
  });

  const formattedIndex = computed((): string => {
    if (!props.index) return '';
    return String(props.index).padStart(2, '0');
  });

  const displayPeriod = computed((): string => {
    return props.milestone.period || props.milestone.year;
  });

  const isPresent = computed((): boolean => {
    const periodText = (
      props.milestone.period ||
      props.milestone.year ||
      ''
    ).toLowerCase();
    return periodText.includes('present');
  });
</script>

<template>
  <article
    class="relative flex flex-col gap-3.5 sm:gap-4 transition-all duration-300 group"
  >
    <!-- Sequence index centered on timeline spine with clean line gap -->
    <div
      class="absolute -left-[32px] sm:-left-[48px] -translate-x-1/2 top-1 z-10 select-none"
    >
      <span
        v-if="formattedIndex"
        class="text-xs sm:text-sm md:text-base font-semibold italic font-serif transition-colors duration-300 bg-white py-0.5 sm:py-1 px-1 rounded block"
        :class="
          isActive ? 'text-primary' : 'text-neutral-400 group-hover:text-dark'
        "
      >
        {{ formattedIndex }}
      </span>
    </div>

    <!-- Tier 1: Logo & Company / Role Title -->
    <div class="flex items-start gap-3 sm:gap-4">
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-light border border-neutral-200 flex items-center justify-center p-2 flex-shrink-0 shadow-2xs overflow-hidden transition-colors group-hover:border-primary/40"
      >
        <img
          v-if="milestone.logoUrl"
          :src="milestone.logoUrl"
          :alt="milestone.company"
          class="w-full h-full object-contain"
          loading="lazy"
          decoding="async"
        />
        <span v-else class="text-xs font-bold text-dark font-sans">
          {{ milestone.company.substring(0, 2).toUpperCase() }}
        </span>
      </div>

      <div class="flex flex-col min-w-0">
        <span
          class="text-xs font-semibold uppercase tracking-wider text-primary"
        >
          {{ milestone.company }}
        </span>
        <h3
          class="font-bold text-dark text-base sm:text-lg group-hover:text-black transition-colors leading-snug"
        >
          {{ milestone.role }}
        </h3>
      </div>
    </div>

    <!-- Tier 2: Date Period & Active Indicator -->
    <div
      class="flex items-center gap-2 flex-wrap text-xs sm:text-sm text-neutral-600 font-medium"
    >
      <div class="flex items-center gap-1.5 flex-shrink-0">
        <svg
          class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span>{{ displayPeriod }}</span>
      </div>
      <span
        v-if="isPresent"
        class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Active
      </span>
    </div>

    <!-- Tier 3: Skills / Tech Tags (Text only) -->
    <div
      v-if="milestone.skills && milestone.skills.length > 0"
      class="flex items-center gap-1.5 flex-wrap pt-0.5"
    >
      <span
        v-for="skill in milestone.skills"
        :key="skill"
        class="inline-block px-2 sm:px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-medium bg-neutral-100 text-neutral-700 border border-neutral-200/80 transition-colors group-hover:bg-neutral-50"
      >
        {{ skill }}
      </span>
    </div>

    <!-- Tier 4 & 5: Key Achievement Highlight & Narrative Description in one single column -->
    <div
      v-if="milestone.highlight || milestone.description"
      class="flex items-start gap-2 sm:gap-2.5 pt-0.5"
    >
      <svg
        v-if="milestone.highlight"
        class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0 mt-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
      </svg>
      <div class="flex flex-col gap-1.5 flex-grow min-w-0">
        <h4
          v-if="milestone.highlight"
          class="text-xs sm:text-sm font-semibold text-dark leading-snug"
        >
          {{ milestone.highlight }}
        </h4>
        <p
          v-if="milestone.description"
          class="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed"
        >
          {{ milestone.description }}
        </p>
      </div>
    </div>
  </article>
</template>
