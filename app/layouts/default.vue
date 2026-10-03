<script setup lang="ts">
  import NavPill from '../components/molecules/NavPill.vue';
</script>

<template>
  <div
    class="min-h-screen bg-white text-dark flex flex-col relative selection:bg-primary/25"
  >
    <!-- Main Content with safe bottom padding for fixed bottom dock -->
    <main class="flex-grow pt-0 pb-5 sm:pb-10">
      <slot />
    </main>

    <!-- Floating Navigation Pill Fixed at Bottom -->
    <header
      class="fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
    >
      <NavPill />
    </header>
  </div>
</template>
