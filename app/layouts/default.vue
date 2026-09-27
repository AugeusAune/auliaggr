<script setup lang="ts">
  import ParticleCanvas from '~/components/atoms/ParticleCanvas.vue';
  import NavPill from '../components/molecules/NavPill.vue';
</script>

<template>
  <div
    class="min-h-screen bg-white text-dark flex flex-col relative selection:bg-primary/25"
  >
    <!-- Floating Navigation Pill (Desktop & Mobile accessible) -->
    <header
      class="fixed top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
    >
      <NavPill />
    </header>

    <!-- Main Content -->
    <main class="flex-grow pt-16 sm:pt-20">
      <ClientOnly>
        <ParticleCanvas />
      </ClientOnly>
      <slot />
    </main>
  </div>
</template>
