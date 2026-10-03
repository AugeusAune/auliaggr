<script setup lang="ts">
import type { Award, Certification } from '../../types/portfolio'
import AppHeading from '../atoms/AppHeading.vue'
import AwardCard from '../molecules/AwardCard.vue'
import CertificateModal from '../molecules/CertificateModal.vue'

interface Props {
  awards: Award[]
}

const props = defineProps<Props>()
const selectedAwardIndex = ref<number | null>(null)

const modalItems = computed<Certification[]>(() =>
  props.awards.map(a => ({
    title: a.title,
    issuer: `${a.organization || 'Award'} · ${a.date}`,
    imageUrl: a.imageUrl || a.logoUrl
  }))
)

const handleOpenAward = (index: number) => {
  selectedAwardIndex.value = index
}
</script>

<template>
  <section class="w-full py-16 sm:py-24 border-b border-neutral-200 bg-neutral-50/30">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-10">
      <div class="flex flex-col gap-3 max-w-2xl">
        <span class="text-xs font-sans font-semibold uppercase tracking-wider text-neutral-400">
          Recognition
        </span>
        <AppHeading as="h2" size="2xl">
          Awards
        </AppHeading>
        <p class="text-neutral-600 text-sm sm:text-base font-medium">
          A few competitions where the work spoke for itself.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <AwardCard
          v-for="(award, idx) in awards"
          :key="award.title"
          :award="award"
          @click="handleOpenAward(idx)"
        />
      </div>
    </div>

    <!-- Award Certificate Detail Modal -->
    <CertificateModal
      :is-open="selectedAwardIndex !== null"
      :current-index="selectedAwardIndex ?? 0"
      :certifications="modalItems"
      @close="selectedAwardIndex = null"
      @select="(idx) => selectedAwardIndex = idx"
    />
  </section>
</template>
