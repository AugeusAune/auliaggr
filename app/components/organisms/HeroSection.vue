<script setup lang="ts">
import type { PortfolioProfile } from '../../types/portfolio'
import AppButton from '../atoms/AppButton.vue'
import AppSocialIcon from '../atoms/AppSocialIcon.vue'
import AppHeading from '../atoms/AppHeading.vue'
import ParticleCanvas from '../atoms/ParticleCanvas.vue'

interface Props {
  profile: PortfolioProfile
}

defineProps<Props>()
</script>

<template>
  <header class="relative overflow-hidden w-full pt-10 sm:pt-16 pb-12 sm:pb-20 border-b border-neutral-200">
    <ClientOnly>
      <ParticleCanvas />
    </ClientOnly>
    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-10 sm:gap-14">
      <!-- Top Profile Row -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div class="flex items-center gap-4">
          <img
            v-if="profile.portraitUrl || profile.avatarUrl"
            :src="profile.portraitUrl || profile.avatarUrl"
            :alt="profile.name"
            class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-neutral-200 shadow-sm flex-shrink-0"
          />
          <div class="flex flex-col gap-0.5">
            <h2 class="text-xl sm:text-2xl font-bold text-dark">
              {{ profile.name }}
            </h2>
            <p class="text-neutral-500 font-medium text-sm sm:text-base">
              {{ profile.headline }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <AppSocialIcon
            v-for="social in profile.socialLinks"
            :key="social.name"
            :name="social.icon"
            :url="social.url"
            :label="`Link to ${social.name}`"
          />
        </div>
      </div>

      <!-- Main Headline & Subtitle -->
      <div class="flex flex-col gap-6">
        <div class="text-sm font-mono uppercase tracking-widest text-neutral-500">
          {{ profile.subheadline }}
        </div>

        <AppHeading
          as="h1"
          size="hero"
          :spaced="true"
          class="text-dark max-w-5xl leading-[1.05]"
        >
          Good design is invisible. — Mine isn't.
        </AppHeading>
      </div>

      <!-- Action Row & Pitch -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-4">
        <div class="flex flex-col gap-2 max-w-xl">
          <span class="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500">
            20+ projects
          </span>
          <p class="text-lg sm:text-xl text-neutral-700 font-medium leading-relaxed">
            Visuals that stop the scroll. Interfaces that keep them there.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <AppButton
            :href="profile.behanceUrl"
            :external="true"
            variant="primary"
            class="!px-6 !py-3"
          >
            Portfolio
          </AppButton>

          <AppButton
            :href="profile.cvUrl"
            :external="true"
            variant="secondary"
            class="!px-6 !py-3"
          >
            Download CV
          </AppButton>
        </div>
      </div>

      <!-- Availability / Location Banner -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-light border border-neutral-200">
        <div class="flex items-center gap-3">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span class="text-sm font-medium text-neutral-700">
            {{ profile.location }}
          </span>
        </div>

        <AppButton
          :href="profile.whatsappUrl"
          :external="true"
          variant="ghost"
          class="text-xs sm:text-sm !p-0 font-semibold text-dark hover:underline"
        >
          Hire me now! →
        </AppButton>
      </div>
    </div>
  </header>
</template>
