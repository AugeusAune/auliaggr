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
  <section class="w-full py-16 sm:py-24 border-b border-neutral-200 bg-white text-dark relative overflow-hidden">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-10">
      <div class="flex flex-col gap-4 max-w-xl">
        <span class="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
          Creative Showcase
        </span>

        <AppHeading
          as="h2"
          size="2xl"
          :spaced="true"
        >
          More Designs. More Stories.
        </AppHeading>

        <p class="text-neutral-600 text-sm sm:text-base font-medium leading-relaxed">
          Take a closer look at my creative work and explore more projects on my Behance.
        </p>

        <div class="pt-2">
          <AppButton
            :href="behanceUrl"
            :external="true"
            variant="primary"
            class="!px-6 !py-3 font-semibold"
          >
            Graphic Design →
          </AppButton>
        </div>
      </div>

      <!-- Artistic Portrait / Graphic Card with Authentic Framer Background -->
      <div class="group relative w-full max-w-md aspect-[4/3] rounded-3xl bg-neutral-900 border border-neutral-200 overflow-hidden flex items-end p-6 sm:p-8 shadow-xs">
        <img
          src="/images/framer/showcase_bg.png"
          alt="Curated Visuals & Graphic Design Showcase"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div class="relative z-10 flex flex-col items-start text-left gap-2 text-white">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-mono tracking-wider uppercase text-white border border-white/30">
            ✦ Curated Visuals
          </span>
          <span class="text-xl font-bold tracking-tight text-white">
            Brand Identities & Editorial Art
          </span>
          <span class="text-xs text-white/80 font-medium">
            Explore 15+ editorial illustrations, branding kits & campaign designs.
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
