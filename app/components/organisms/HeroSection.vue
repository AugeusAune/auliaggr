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
    class="relative overflow-hidden w-full pb-8 sm:pb-12 border-b border-neutral-200 bg-white"
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
          class="w-9 sm:w-11 h-8 sm:h-10 bg-primary rounded-t-md shadow-xs relative overflow-hidden flex items-center justify-center"
        >
          <!-- Strap stitch lines -->
          <div class="absolute inset-y-0 left-1 w-px bg-white/40" />
          <div class="absolute inset-y-0 right-1 w-px bg-white/40" />
        </div>

        <!-- Lanyard Clamp Clip -->
        <div
          class="w-11 sm:w-13 h-5 sm:h-6 bg-[#171717] rounded-lg -mt-1 shadow-md z-20 flex items-center justify-center border border-neutral-700"
        >
          <div class="w-3.5 h-1 rounded-full bg-neutral-400" />
        </div>
      </div>

      <!-- Main ID Card Container with 3D Flip-Drop Entrance -->
      <div
        class="hero-card-entrance relative w-full max-w-[420px] sm:max-w-[440px] mx-auto -mt-3 pt-4 pb-5 sm:pb-6 px-5 sm:px-7 bg-white rounded-[32px] sm:rounded-[40px] border border-neutral-200/90 shadow-xl flex flex-col gap-4 sm:gap-5 transition-all duration-300"
      >
        <!-- Card Cutout Hole for Lanyard Clip -->
        <div
          class="w-10 h-2 rounded-full bg-neutral-200 mx-auto -mt-1 shadow-inner border border-neutral-300/40"
        />

        <!-- Top Status Tag placed at the very top of the card -->
        <div class="flex justify-center -mt-1">
          <div
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
          >
            <span class="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span class="text-[11px] sm:text-xs font-semibold text-neutral-800">
              Let's make it happen
            </span>
          </div>
        </div>

        <!-- Top Accent 3-Colored Indicator Bar -->
        <div class="grid grid-cols-3 gap-2 w-full">
          <div class="h-1.5 rounded-full bg-primary" />
          <div class="h-1.5 rounded-full bg-primary" />
          <div class="h-1.5 rounded-full bg-neutral-200" />
        </div>

        <!-- Profile Row -->
        <div class="flex items-center gap-3.5 sm:gap-4">
          <img
            v-if="profile.portraitUrl || profile.avatarUrl"
            :src="profile.portraitUrl || profile.avatarUrl"
            :alt="profile.name"
            width="60"
            height="60"
            fetchpriority="high"
            class="w-13 h-13 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
          />
          <div class="flex flex-col min-w-0">
            <h2
              class="text-base sm:text-lg font-bold text-dark tracking-tight leading-tight truncate"
            >
              {{ profile.name }}
            </h2>
            <p class="text-xs text-neutral-500 font-medium truncate">
              {{ profile.headline }}
            </p>

            <!-- Social Links -->
            <div class="flex items-center gap-1 pt-1">
              <AppSocialIcon
                v-for="social in profile.socialLinks"
                :key="social.name"
                :name="social.icon"
                :url="social.url"
                :label="`Link to ${social.name}`"
                class="!w-5 !h-5 !text-neutral-400 hover:!text-dark transition-colors"
              />
            </div>
          </div>
        </div>

        <!-- Main Headline -->
        <div class="flex flex-col gap-1.5 pt-0.5 text-left">
          <h1
            class="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight leading-[1.1]"
          >
            Good design<br />
            is invisible.<br />
            <span
              class="inline-block my-1 w-10 sm:w-12 h-1 bg-dark rounded-full"
            /><br />
            Mine isn't.
          </h1>
        </div>

        <!-- Rating & Pitch Subtitle -->
        <div class="flex flex-col gap-1.5">
          <div
            class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-light border border-neutral-200 self-start text-[11px] font-semibold text-dark"
          >
            <span class="text-amber-500 tracking-tighter">★★★★★</span>
            <span>20+ projects</span>
          </div>
          <p
            class="text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed"
          >
            Visuals that stop the scroll. Interfaces that keep them there.
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-2.5 pt-0.5">
          <AppButton
            :href="profile.behanceUrl"
            :external="true"
            variant="primary"
            class="!px-5 !py-2.5 !text-xs sm:!text-sm font-semibold rounded-full flex-1 text-center justify-center shadow-xs"
          >
            Portfolio
          </AppButton>

          <AppButton
            :href="profile.cvUrl"
            :external="true"
            variant="secondary"
            class="!px-5 !py-2.5 !text-xs sm:!text-sm font-semibold rounded-full flex-1 text-center justify-center border border-neutral-200 hover:bg-neutral-100"
          >
            Download CV
          </AppButton>
        </div>

        <!-- Integrated Location & Availability Badge -->
        <div
          class="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2 text-[11px] sm:text-xs text-neutral-600"
        >
          <div class="flex items-center gap-1.5 font-medium truncate">
            <span
              class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"
            />
            <span class="truncate">{{ profile.location }}</span>
          </div>

          <a
            :href="profile.whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="font-semibold text-dark hover:text-primary transition-colors inline-flex items-center gap-1 flex-shrink-0"
          >
            Hire me! →
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
  .hero-card-entrance {
    animation: heroDropFlip 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    transform-origin: top center;
    perspective: 1000px;
    will-change: transform, opacity;
  }

  @keyframes heroDropFlip {
    0% {
      opacity: 0;
      transform: translateY(-75px) rotateX(40deg) scale(0.92);
    }
    50% {
      opacity: 1;
    }
    75% {
      transform: translateY(5px) rotateX(-6deg) scale(1.006);
    }
    90% {
      transform: translateY(-2px) rotateX(2deg) scale(0.998);
    }
    100% {
      opacity: 1;
      transform: translateY(0) rotateX(0deg) scale(1);
    }
  }
</style>
