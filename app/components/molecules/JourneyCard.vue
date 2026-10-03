<script setup lang="ts">
import type { Milestone } from '../../types/portfolio'
import AppBadge from '../atoms/AppBadge.vue'

interface Props {
  milestone: Milestone
}

defineProps<Props>()
</script>

<template>
  <div class="relative flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-light border border-neutral-200 transition-all duration-300 hover:border-primary/40 hover:bg-white group shadow-2xs">
    <!-- Milestone indicator dot placed on the timeline vertical line -->
    <span
      class="absolute -left-[33px] sm:-left-[41px] top-6 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white border-2 border-primary group-hover:scale-125 group-hover:bg-primary transition-all duration-300 shadow-xs"
    />

    <div class="flex items-start gap-3.5 sm:gap-4 flex-grow">
      <!-- Company Logo / Initials Badge -->
      <div class="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-neutral-200 flex items-center justify-center p-2 flex-shrink-0 shadow-2xs overflow-hidden">
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
      <AppBadge variant="default" class="font-sans font-semibold text-xs sm:text-sm !px-3 !py-1 !bg-white !border-neutral-200 group-hover:!border-primary/30 transition-colors">
        {{ milestone.year }}
      </AppBadge>
    </div>
  </div>
</template>
