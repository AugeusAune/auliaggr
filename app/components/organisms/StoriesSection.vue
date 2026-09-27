<script setup lang="ts">
import AppHeading from '../atoms/AppHeading.vue'
import AppButton from '../atoms/AppButton.vue'

interface Props {
  behanceUrl?: string
}

withDefaults(defineProps<Props>(), {
  behanceUrl: 'https://www.behance.net/gallery/241611479/PORTFOLIO-AULIA-ANGGRAENI'
})
</script>

<template>
  <section class="w-full py-16 sm:py-24 border-b border-neutral-200 bg-neutral-900 text-white relative overflow-hidden">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-10">
      <div class="flex flex-col gap-4 max-w-xl">
        <span class="text-xs font-mono font-semibold uppercase tracking-wider text-accent-cyan">
          Creative Showcase
        </span>

        <AppHeading
          as="h2"
          size="2xl"
          :spaced="true"
          class="!text-white"
        >
          More Designs. More Stories.
        </AppHeading>

        <p class="text-neutral-300 text-sm sm:text-base font-medium leading-relaxed">
          Take a closer look at my creative work and explore more projects on my Behance.
        </p>

        <div class="pt-2">
          <AppButton
            :href="behanceUrl"
            :external="true"
            variant="secondary"
            class="!bg-white !text-dark hover:!bg-neutral-100 !px-6 !py-3 font-semibold"
          >
            Graphic Design →
          </AppButton>
        </div>
      </div>

      <!-- Artistic Portrait / Graphic Card -->
      <div class="relative w-full max-w-sm aspect-[4/3] rounded-3xl bg-neutral-800 border border-neutral-700/80 overflow-hidden flex items-center justify-center p-6 shadow-2xl">
        <div class="absolute inset-0 bg-gradient-to-tr from-black/80 via-neutral-800/40 to-transparent" />
        <div class="relative z-10 flex flex-col items-center text-center gap-3">
          <span class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            ✦
          </span>
          <span class="text-xs font-mono tracking-widest text-neutral-400 uppercase">
            Curated Visuals
          </span>
          <span class="text-lg font-bold text-white tracking-tight">
            Brand Identities & Editorial Art
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
