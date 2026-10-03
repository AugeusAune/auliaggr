<script setup lang="ts">
import type { Certification } from '../../types/portfolio'
import AppHeading from '../atoms/AppHeading.vue'
import AppButton from '../atoms/AppButton.vue'
import CertificateItem from '../molecules/CertificateItem.vue'
import CertificateModal from '../molecules/CertificateModal.vue'

interface Props {
  certifications: Certification[]
}

const props = defineProps<Props>()

const isExpanded = ref(false)
const selectedCertIndex = ref<number | null>(null)

const visibleCertifications = computed(() => {
  if (isExpanded.value) {
    return props.certifications
  }
  return props.certifications.slice(0, 6)
})

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const handleOpenModal = (cert: Certification) => {
  const index = props.certifications.findIndex(c => c.title === cert.title)
  selectedCertIndex.value = index !== -1 ? index : 0
}
</script>

<template>
  <section class="w-full py-16 sm:py-24 border-b border-neutral-200 bg-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-10">
      <div class="flex flex-col gap-3 max-w-2xl">
        <span class="text-xs font-sans font-semibold uppercase tracking-wider text-primary">
          Credentials
        </span>
        <AppHeading as="h2" size="2xl">
          Certification
        </AppHeading>
        <p class="text-neutral-600 text-sm sm:text-base font-medium">
          Courses, competitions, professional licenses, and achievements.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CertificateItem
          v-for="(cert, index) in visibleCertifications"
          :key="`${cert.title}-${index}`"
          :cert="cert"
          @click="handleOpenModal(cert)"
        />
      </div>

      <!-- Expand / Collapse All Certifications Toggle -->
      <div v-if="certifications.length > 6" class="flex justify-center pt-2">
        <AppButton
          variant="secondary"
          class="!px-6 !py-2.5 text-sm font-semibold hover:border-primary/40"
          @click="toggleExpand"
        >
          <span>{{ isExpanded ? 'Show Less' : `View All Certifications (${certifications.length})` }}</span>
          <span class="ml-1.5 transition-transform" :class="{ 'rotate-180': isExpanded }">↓</span>
        </AppButton>
      </div>
    </div>

    <!-- Certificate Image Preview Modal with Navigation -->
    <CertificateModal
      :is-open="selectedCertIndex !== null"
      :current-index="selectedCertIndex ?? 0"
      :certifications="certifications"
      @close="selectedCertIndex = null"
      @select="(idx) => selectedCertIndex = idx"
    />
  </section>
</template>
