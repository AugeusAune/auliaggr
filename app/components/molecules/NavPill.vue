<script setup lang="ts">
  import AppButton from '../atoms/AppButton.vue';

  interface Props {
    whatsappUrl?: string;
  }

  withDefaults(defineProps<Props>(), {
    whatsappUrl: 'https://wa.me/62895330188539',
  });

  const route = useRoute();
</script>

<template>
  <nav
    class="inline-flex items-center gap-2 sm:gap-4 px-3.5 sm:px-4 py-2 rounded-full bg-white/85 backdrop-blur-xl border border-neutral-200/90 shadow-xl shadow-black/10 transition-all duration-300 hover:shadow-2xl hover:bg-white active:scale-95"
    aria-label="Main Navigation"
  >
    <!-- Logo / Home Link -->
    <NuxtLink
      to="/"
      aria-label="Go to homepage"
      class="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-white hover:bg-primary-hover transition-colors"
    >
      <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 3l9 8h-3v10h-4v-6h-4v6H6V11H3z" />
      </svg>
    </NuxtLink>

    <!-- Nav Links -->
    <div class="flex items-center gap-1 sm:gap-3 text-sm font-medium">
      <NuxtLink
        to="/projects"
        :class="[
          'px-3 py-1.5 rounded-full transition-colors',
          route.path.startsWith('/projects')
            ? 'text-dark font-semibold bg-primary/15'
            : 'text-neutral-600 hover:text-dark hover:bg-neutral-50',
        ]"
      >
        Projects
      </NuxtLink>
    </div>

    <!-- Contact Button -->
    <AppButton
      :href="whatsappUrl"
      :external="true"
      variant="primary"
      class="!py-1.5 !px-4 !text-xs !min-h-[36px]"
    >
      Contact
    </AppButton>
  </nav>
</template>
