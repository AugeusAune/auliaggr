<script setup lang="ts">
  import type { PortfolioProfile } from '../../types/portfolio';
  import AppButton from '../atoms/AppButton.vue';
  import AppSocialIcon from '../atoms/AppSocialIcon.vue';
  import ParticleCanvas from '../atoms/ParticleCanvas.vue';

  interface Props {
    profile: PortfolioProfile;
  }

  defineProps<Props>();
</script>

<template>
  <header
    class="relative overflow-hidden w-full pt-4 sm:pt-8 pb-6 sm:pb-10 border-b border-neutral-200 bg-white"
  >
    <ClientOnly>
      <ParticleCanvas />
    </ClientOnly>

    <div
      class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center"
    >
      <!-- ID Card Lanyard Strap & Clip Hanging from Top -->
      <div class="flex flex-col items-center select-none w-full">
        <!-- Lanyard Ribbon -->
        <div
          class="w-10 sm:w-12 h-10 sm:h-12 bg-primary rounded-t-md shadow-xs relative overflow-hidden flex items-center justify-center"
        >
          <!-- Subtle strap stitch lines -->
          <div class="absolute inset-y-0 left-1 w-px bg-white/40" />
          <div class="absolute inset-y-0 right-1 w-px bg-white/40" />
        </div>
        <!-- Lanyard Clamp Clip -->
        <div
          class="w-12 sm:w-14 h-6 sm:h-7 bg-[#171717] rounded-lg -mt-1 shadow-md z-20 flex items-center justify-center border border-neutral-700"
        >
          <div class="w-4 h-1.5 rounded-full bg-neutral-400" />
        </div>
      </div>

      <!-- Main ID Card Container -->
      <div
        class="relative w-full max-w-xl mx-auto -mt-3.5 pt-6 pb-6 sm:pb-8 px-6 sm:px-10 bg-white rounded-[32px] sm:rounded-[42px] border border-neutral-200/90 shadow-xl flex flex-col gap-6 sm:gap-7 transition-all duration-300"
      >
        <!-- Card Cutout Hole for Lanyard Clip -->
        <div
          class="w-12 h-2.5 rounded-full bg-neutral-200 mx-auto -mt-2 shadow-inner border border-neutral-300/40"
        />

        <!-- Top Accent 3-Colored Indicator Bar -->
        <div class="grid grid-cols-3 gap-2.5 w-full">
          <div class="h-1.5 rounded-full bg-primary" />
          <div class="h-1.5 rounded-full bg-primary" />
          <div class="h-1.5 rounded-full bg-neutral-200" />
        </div>

        <!-- Profile Header Row -->
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-center gap-3.5 sm:gap-4">
            <img
              v-if="profile.portraitUrl || profile.avatarUrl"
              :src="profile.portraitUrl || profile.avatarUrl"
              :alt="profile.name"
              width="64"
              height="64"
              fetchpriority="high"
              class="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
            />
            <div class="flex flex-col">
              <h2
                class="text-lg sm:text-xl font-bold text-dark tracking-tight leading-tight"
              >
                {{ profile.name }}
              </h2>
              <p class="text-xs sm:text-sm text-neutral-500 font-medium">
                {{ profile.headline }}
              </p>

              <!-- Social Links -->
              <div class="flex items-center gap-1 pt-1.5">
                <AppSocialIcon
                  v-for="social in profile.socialLinks"
                  :key="social.name"
                  :name="social.icon"
                  :url="social.url"
                  :label="`Link to ${social.name}`"
                  class="!w-6 !h-6 !text-neutral-400 hover:!text-dark transition-colors"
                />
              </div>
            </div>
          </div>

          <!-- Top-Right Status Indicator -->
          <div
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 flex-shrink-0"
          >
            <span class="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span class="text-xs font-semibold text-neutral-700">
              Let's make it happen
            </span>
          </div>
        </div>

        <!-- Main Headline -->
        <div class="flex flex-col gap-2 pt-1 text-left">
          <h1
            class="text-3xl sm:text-5xl font-extrabold text-dark tracking-tight leading-[1.08]"
          >
            Good design<br />
            is invisible.<br />
            <span
              class="inline-block my-1.5 w-10 sm:w-14 h-1 sm:h-1.5 bg-dark rounded-full"
            /><br />
            Mine isn't.
          </h1>
        </div>

        <!-- Rating & Pitch Subtitle -->
        <div class="flex flex-col gap-2">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-light border border-neutral-200 self-start text-xs font-semibold text-dark"
          >
            <span class="text-amber-500 tracking-tighter">★★★★★</span>
            <span>20+ projects</span>
          </div>
          <p
            class="text-sm sm:text-base text-neutral-600 font-medium leading-relaxed"
          >
            Visuals that stop the scroll. Interfaces that keep them there.
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-3 pt-1">
          <AppButton
            :href="profile.behanceUrl"
            :external="true"
            variant="primary"
            class="!px-6 !py-3 font-semibold rounded-full flex-1 sm:flex-initial text-center justify-center shadow-xs"
          >
            Portfolio
          </AppButton>

          <AppButton
            :href="profile.cvUrl"
            :external="true"
            variant="secondary"
            class="!px-6 !py-3 font-semibold rounded-full flex-1 sm:flex-initial text-center justify-center border border-neutral-200 hover:bg-neutral-100"
          >
            Download CV
          </AppButton>
        </div>

        <!-- Integrated Location & Availability Badge -->
        <div
          class="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-neutral-600"
        >
          <div class="flex items-center gap-2 font-medium">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{{ profile.location }}</span>
          </div>

          <a
            :href="profile.whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="font-semibold text-dark hover:text-primary transition-colors inline-flex items-center gap-1 self-start sm:self-auto"
          >
            Hire me now! →
          </a>
        </div>
      </div>
    </div>
  </header>
</template>
