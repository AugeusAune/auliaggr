<script setup lang="ts">
import type { Milestone } from '../../types/portfolio'
import AppBadge from '../atoms/AppBadge.vue'

interface Props {
  milestone: Milestone
  isActive?: boolean
}

withDefaults(defineProps<Props>(), {
  isActive: false
})
</script>

<template>
  <div
    class="relative flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-light border transition-all duration-300 group shadow-2xs"
    :class="[
      isActive
        ? 'border-neutral-300 bg-white shadow-xs'
        : 'border-neutral-200 hover:border-primary/40 hover:bg-white'
    ]"
  >
    <!-- Concentric milestone node anchor centered on the timeline spine -->
    <div
      class="absolute -left-[42px] sm:-left-[50px] top-[18px] w-5 h-5 rounded-full bg-white border-2 flex items-center justify-center shadow-xs transition-all duration-300 z-10"
      :class="[
        isActive
          ? 'border-primary shadow-[0_0_10px_rgba(235,94,85,0.35)] scale-110'
          : 'border-neutral-300 group-hover:border-primary group-hover:scale-110'
      ]"
      aria-hidden="true"
    >
      <span
        class="w-2 h-2 rounded-full transition-all duration-300"
        :class="[
          isActive
            ? 'bg-primary'
            : 'bg-neutral-300 group-hover:bg-primary'
        ]"
      />
    </div>

    <div class="flex items-start gap-3.5 sm:gap-4 flex-grow">
      <!-- Company Logo / Initials Badge -->
      <div
        class="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border flex items-center justify-center p-2 flex-shrink-0 shadow-2xs overflow-hidden transition-colors"
        :class="isActive ? 'border-primary/30' : 'border-neutral-200 group-hover:border-primary/30'"
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

      <div class="flex flex-col gap-1 flex-grow">
        <div class="flex items-center justify-between gap-2 sm:hidden">
          <span class="text-xs text-primary font-semibold">{{ milestone.company }}</span>
          <AppBadge variant="default" class="font-sans font-semibold text-xs !px-2.5 !py-0.5 !bg-white !border-neutral-200">
            {{ milestone.year }}
          </AppBadge>
        </div>

        <h4 class="font-bold text-dark text-base sm:text-lg group-hover:text-black transition-colors leading-snug">
          {{ milestone.role }}
        </h4>

        <p class="hidden sm:block text-neutral-500 text-xs sm:text-sm font-semibold">
          {{ milestone.company }}
        </p>

        <!-- Outcome / Result Description -->
        <p v-if="milestone.description" class="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed pt-1">
          {{ milestone.description }}
        </p>
      </div>
    </div>

    <!-- Desktop Year Badge -->
    <div class="hidden sm:flex items-center flex-shrink-0 ml-4">
      <AppBadge
        variant="default"
        class="font-sans font-semibold text-xs sm:text-sm !px-3 !py-1 !bg-white border transition-colors"
        :class="isActive ? '!border-primary/40 !text-primary' : '!border-neutral-200 group-hover:!border-primary/30'"
      >
        {{ milestone.year }}
      </AppBadge>
    </div>
  </div>
</template>
