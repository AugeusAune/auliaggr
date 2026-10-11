<script setup lang="ts">
  import { portfolioData } from '../../data/portfolio';
  import AppHeading from '../../components/atoms/AppHeading.vue';
  import AppBadge from '../../components/atoms/AppBadge.vue';
  import AppButton from '../../components/atoms/AppButton.vue';
  import FooterSection from '../../components/organisms/FooterSection.vue';

  const route = useRoute();
  const slug = computed(() => route.params.slug as string);

  const project = computed(() => {
    return portfolioData.projects.find((p) => p.slug === slug.value);
  });

  // Fail-fast guard: if project not found, throw 404
  if (!project.value) {
    throw createError({
      statusCode: 404,
      statusMessage: `Project "${slug.value}" not found`,
    });
  }

  useSeoMeta({
    title: `${project.value.title} - Aulia Anggraeni`,
    description: project.value.description || project.value.subtitle,
    ogTitle: `${project.value.title} - Aulia Anggraeni`,
    ogDescription: project.value.description || project.value.subtitle,
    ogType: 'article',
  });
</script>

<template>
  <div v-if="project" class="w-full flex flex-col">
    <!-- Breadcrumb & Back -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 w-full">
      <NuxtLink
        to="/projects"
        class="inline-flex items-center gap-2 text-xs font-sans font-medium text-neutral-500 hover:text-dark transition-colors"
      >
        ← Back to all projects
      </NuxtLink>
    </div>

    <!-- Project Header & Meta -->
    <article
      class="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 w-full flex flex-col gap-10 sm:gap-14"
    >
      <!-- Project Cover Image -->
      <div
        v-if="project.coverImage"
        class="w-full aspect-[16/9] max-h-[520px] rounded-3xl overflow-hidden bg-light border border-neutral-200"
      >
        <img
          :src="project.coverImage"
          :alt="project.title"
          class="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <!-- Sidebar Metadata -->
        <aside
          class="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 flex flex-col gap-6"
        >
          <div class="flex flex-col gap-1">
            <span
              class="text-xs font-sans font-semibold text-neutral-400 uppercase tracking-wider"
              >Client</span
            >
            <span class="font-bold text-dark text-base sm:text-lg">{{
              project.client || 'Personal Project'
            }}</span>
          </div>

          <div class="flex flex-col gap-1">
            <span
              class="text-xs font-sans font-semibold text-neutral-400 uppercase tracking-wider"
              >Category</span
            >
            <span class="font-medium text-dark text-sm sm:text-base">{{
              project.category
            }}</span>
          </div>

          <div class="flex flex-col gap-1">
            <span
              class="text-xs font-sans font-semibold text-neutral-400 uppercase tracking-wider"
              >Date</span
            >
            <span class="font-medium text-neutral-700 text-sm font-sans">{{
              project.date || '2024'
            }}</span>
          </div>

          <div class="pt-2 flex flex-col gap-2.5">
            <!-- Prototype Button -->
            <AppButton
              v-if="project.prototypeUrl || project.externalUrl"
              :href="project.prototypeUrl || project.externalUrl"
              :external="true"
              variant="secondary"
              class="w-full !py-2.5 inline-flex items-center justify-center gap-2 !bg-white"
            >
              <img
                src="/images/framer/figma_logo.svg"
                alt="Figma"
                class="w-4 h-4 object-contain"
                loading="lazy"
                decoding="async"
              />
              <span>Prototype</span>
            </AppButton>

            <!-- Behance Case Study Button -->
            <AppButton
              v-if="project.behanceUrl || project.externalUrl"
              :href="project.behanceUrl || project.externalUrl"
              :external="true"
              variant="primary"
              class="w-full !py-2.5 inline-flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path
                  d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.084 0-6.625-2.879-6.625-6.966 0-4.425 2.875-7.034 6.75-7.034 4.095 0 6.25 2.766 6.25 6.441 0 .614-.078 1.348-.156 1.75h-9.922c.156 2.375 1.625 3.844 3.906 3.844 1.703 0 2.891-.766 3.422-1.945l1.466.91zm-9.062-4.75h6.984c-.141-2.125-1.484-3.234-3.469-3.234-2.188 0-3.328 1.266-3.515 3.234zm-8.664-9.25h4.984c2.25 0 3.75 1.078 3.75 2.922 0 1.234-.734 2.156-1.797 2.547 1.484.453 2.297 1.625 2.297 3.094 0 2.297-1.859 3.437-4.234 3.437h-5v-12zm3 4.875h1.797c.922 0 1.5-.453 1.5-1.25 0-.781-.578-1.219-1.5-1.219h-1.797v2.469zm0 4.719h1.984c1.078 0 1.75-.484 1.75-1.375 0-.906-.672-1.422-1.75-1.422h-1.984v2.797z"
                />
              </svg>
              <span>Case Study</span>
            </AppButton>
          </div>
        </aside>

        <!-- Main Title & Narrative -->
        <div class="lg:col-span-8 flex flex-col gap-6">
          <div class="flex items-center gap-2 flex-wrap">
            <AppBadge v-for="tag in project.tags" :key="tag" variant="default">
              {{ tag }}
            </AppBadge>
          </div>

          <AppHeading as="h1" size="2xl" :spaced="true">
            {{ project.title }}
          </AppHeading>

          <p
            class="text-xl sm:text-2xl font-medium text-neutral-800 leading-relaxed"
          >
            {{ project.subtitle }}
          </p>

          <div
            class="prose max-w-none text-neutral-600 leading-relaxed text-base sm:text-lg pt-4 border-t border-neutral-200"
          >
            <p>
              {{ project.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Feature Visual Presentation Showcase -->
      <div
        class="w-full aspect-auto md:aspect-[16/9] min-h-[280px] sm:min-h-[340px] rounded-2xl sm:rounded-3xl bg-white border border-neutral-200 flex items-center justify-center p-6 sm:p-10 md:p-12 relative overflow-hidden text-center text-dark shadow-xs"
      >
        <!-- Subtle ambient accents -->
        <div
          class="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary/10 blur-2xl pointer-events-none"
        />
        <div
          class="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-primary/10 blur-2xl pointer-events-none"
        />

        <div
          class="relative z-10 flex flex-col items-center gap-3 sm:gap-4 max-w-xl"
        >
          <span
            class="text-[11px] sm:text-xs font-sans uppercase tracking-widest text-primary font-semibold"
          >
            Interactive Showcase
          </span>
          <h2
            class="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-dark"
          >
            {{ project.title }}
          </h2>
          <p
            class="text-xs sm:text-sm md:text-base text-neutral-600 max-w-md sm:max-w-lg leading-relaxed"
          >
            Designed with high-fidelity components, user-centric wireframes, and
            tested interactive prototypes.
          </p>
          <div
            class="mt-2 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto"
          >
            <!-- Prototype Button -->
            <AppButton
              v-if="project.prototypeUrl || project.externalUrl"
              :href="project.prototypeUrl || project.externalUrl"
              :external="true"
              variant="secondary"
              class="w-full sm:w-auto !px-6 !bg-white !py-3 text-xs sm:text-sm font-semibold justify-center text-center shadow-xs inline-flex items-center gap-2"
            >
              <img
                src="/images/framer/figma_logo.svg"
                alt="Figma"
                class="w-4 h-4 object-contain"
                loading="lazy"
                decoding="async"
              />
              <span>Prototype</span>
            </AppButton>

            <!-- Behance Case Study Button -->
            <AppButton
              v-if="project.behanceUrl || project.externalUrl"
              :href="project.behanceUrl || project.externalUrl"
              :external="true"
              variant="primary"
              class="w-full sm:w-auto !px-6 !py-3 text-xs sm:text-sm font-semibold justify-center text-center shadow-xs inline-flex items-center gap-2"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path
                  d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.084 0-6.625-2.879-6.625-6.966 0-4.425 2.875-7.034 6.75-7.034 4.095 0 6.25 2.766 6.25 6.441 0 .614-.078 1.348-.156 1.75h-9.922c.156 2.375 1.625 3.844 3.906 3.844 1.703 0 2.891-.766 3.422-1.945l1.466.91zm-9.062-4.75h6.984c-.141-2.125-1.484-3.234-3.469-3.234-2.188 0-3.328 1.266-3.515 3.234zm-8.664-9.25h4.984c2.25 0 3.75 1.078 3.75 2.922 0 1.234-.734 2.156-1.797 2.547 1.484.453 2.297 1.625 2.297 3.094 0 2.297-1.859 3.437-4.234 3.437h-5v-12zm3 4.875h1.797c.922 0 1.5-.453 1.5-1.25 0-.781-.578-1.219-1.5-1.219h-1.797v2.469zm0 4.719h1.984c1.078 0 1.75-.484 1.75-1.375 0-.906-.672-1.422-1.75-1.422h-1.984v2.797z"
                />
              </svg>
              <span>Explore on Behance</span>
            </AppButton>
          </div>
        </div>
      </div>
    </article>

    <!-- Footer -->
    <FooterSection :profile="portfolioData.profile" />
  </div>
</template>
