<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: 'linkedin' | 'behance' | 'dribbble' | 'instagram' | string
  url: string
  label?: string
}

const props = defineProps<Props>()

const iconSrc = computed((): string => {
  const n = props.name.trim().toLowerCase()
  if (n === 'instagram' || n === 'ig') return '/logo/ig.svg'
  if (n === 'linkedin') return '/logo/linkedin.svg'
  if (n === 'behance') return '/logo/behance.svg'
  if (n === 'dribbble' || n === 'dribble') return '/logo/dribbble.svg'
  return `/logo/${n}.svg`
})
</script>

<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="label || `Link to ${name}`"
    class="w-10 h-10 rounded-full flex items-center justify-center text-dark hover:text-dark bg-light hover:bg-primary/20 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary group"
  >
    <img
      :src="iconSrc"
      :alt="label || name"
      class="w-4 h-4 object-contain transition-transform group-hover:scale-110"
      loading="lazy"
      decoding="async"
    />
  </a>
</template>

