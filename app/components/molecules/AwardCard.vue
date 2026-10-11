<script setup lang="ts">
  import { computed } from 'vue';
  import type { Award } from '../../types/portfolio';

  interface Props {
    award: Award;
    index?: number;
    isActive?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    index: 0,
    isActive: false,
  });

  defineEmits<{
    (e: 'click'): void;
  }>();

  const formattedIndex = computed((): string => {
    if (!props.index) return '';
    return String(props.index).padStart(2, '0');
  });
</script>

<template>
  <article
    class="relative flex flex-col gap-3.5 sm:gap-4 transition-all duration-300 group cursor-pointer select-none"
    role="button"
    tabindex="0"
    @click="$emit('click')"
    @keydown.enter="$emit('click')"
    @keydown.space.prevent="$emit('click')"
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

    <!-- Main Content Row: Logo on left, All Text + Date + Action Badge on right -->
    <div class="flex items-start gap-3 sm:gap-4">
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-light border border-neutral-200 flex items-center justify-center p-2 flex-shrink-0 shadow-2xs overflow-hidden transition-colors group-hover:border-primary/40 mt-0.5"
      >
        <img
          v-if="award.logoUrl"
          :src="award.logoUrl"
          :alt="award.organization || award.title"
          class="w-full h-full object-contain"
          loading="lazy"
          decoding="async"
        />
        <svg
          v-else
          class="w-5 h-5 fill-current text-primary"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          />
        </svg>
      </div>

      <!-- Text Column: Organization, Title, Date & View Certificate aligned together! -->
      <div class="flex flex-col min-w-0 gap-2.5 flex-grow">
        <div class="flex flex-col">
          <span
            v-if="award.organization"
            class="text-xs font-semibold uppercase tracking-wider text-primary"
          >
            {{ award.organization }}
          </span>
          <h3
            class="font-bold text-dark text-base sm:text-lg group-hover:text-black transition-colors leading-snug"
          >
            {{ award.title }}
          </h3>
        </div>

        <!-- Date & Action Link aligned with title text -->
        <div
          class="flex items-center gap-3 flex-wrap text-xs sm:text-sm text-neutral-600 font-medium"
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
            <span>{{ award.date }}</span>
          </div>

          <!-- View Certificate Action Badge -->
          <span
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-neutral-100 text-neutral-700 border border-neutral-200/80 transition-all group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20"
          >
            <span>View Certificate</span>
          </span>
        </div>
      </div>
    </div>
  </article>
</template>
