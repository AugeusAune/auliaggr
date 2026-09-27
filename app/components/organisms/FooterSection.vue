<script setup lang="ts">
import type { PortfolioProfile } from '../../types/portfolio'
import AppHeading from '../atoms/AppHeading.vue'
import AppSocialIcon from '../atoms/AppSocialIcon.vue'
import ContactForm from '../molecules/ContactForm.vue'

interface Props {
  profile: PortfolioProfile
}

defineProps<Props>()

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <footer class="w-full bg-white pt-16 sm:pt-24 pb-28 border-t border-neutral-200">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
        <!-- Profile Column -->
        <div class="lg:col-span-5 flex flex-col gap-6">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-dark font-bold text-xl flex-shrink-0">
              AA
            </div>
            <div class="flex flex-col">
              <h3 class="font-bold text-dark text-lg sm:text-xl">
                {{ profile.name }}
              </h3>
              <p class="text-neutral-500 text-sm font-medium">
                {{ profile.headline }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2 pt-2">
            <AppSocialIcon
              v-for="social in profile.socialLinks"
              :key="social.name"
              :name="social.icon"
              :url="social.url"
              :label="`Link to ${social.name}`"
            />
          </div>

          <div class="flex flex-col gap-2 pt-4 text-sm text-neutral-600">
            <div class="font-medium text-dark font-mono text-xs uppercase tracking-wider">
              Let's chat!
            </div>
            <div class="flex flex-col gap-1">
              <a
                :href="profile.whatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-dark hover:underline transition-colors"
              >
                {{ profile.phone }}
              </a>
              <a
                :href="`mailto:${profile.email}`"
                class="hover:text-dark hover:underline transition-colors"
              >
                {{ profile.email }}
              </a>
            </div>
          </div>
        </div>

        <!-- Contact Form Column -->
        <div class="lg:col-span-7 flex flex-col gap-6">
          <div class="flex items-center gap-4">
            <div class="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-light border-2 border-primary/30 flex-shrink-0 shadow-sm">
              <img
                src="/images/framer/aulia.png"
                alt="Aulia Anggraeni"
                class="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="flex flex-col gap-1">
              <AppHeading as="h2" size="xl">
                Contact
              </AppHeading>
              <p class="text-neutral-600 text-sm font-medium">
                Fill out the form, or reach out directly. I’ll respond within 24 hours.
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>

      <!-- Copyright Bar -->
      <div class="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
        <p>{{ profile.copyright }}</p>
        <div class="flex items-center gap-4">
          <button
            type="button"
            @click="scrollToTop"
            class="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-dark transition-colors cursor-pointer group"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <span class="transition-transform group-hover:-translate-y-0.5">↑</span>
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>
