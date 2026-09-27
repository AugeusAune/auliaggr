<script setup lang="ts">
import type { Certification } from '../../types/portfolio'
import AppHeading from '../atoms/AppHeading.vue'
import CertificateItem from '../molecules/CertificateItem.vue'

interface Props {
  certifications: Certification[]
}

defineProps<Props>()
</script>

<template>
  <section class="w-full py-16 sm:py-24 border-b border-neutral-200">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-10">
      <div class="flex flex-col gap-3 max-w-2xl">
        <span class="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400">
          Credentials
        </span>
        <AppHeading as="h2" size="2xl">
          Certification
        </AppHeading>
        <p class="text-neutral-600 text-sm sm:text-base font-medium">
          Courses, competitions, and achievements.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CertificateItem
          v-for="(cert, index) in certifications"
          :key="`${cert.title}-${index}`"
          :cert="cert"
        />
      </div>
    </div>
  </section>
</template>
