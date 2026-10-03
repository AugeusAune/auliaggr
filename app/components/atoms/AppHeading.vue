<script setup lang="ts">
interface Props {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero'
  spaced?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'h2',
  size: 'lg',
  spaced: false
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'hero':
      return 'text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.08]'
    case '2xl':
      return 'text-3xl sm:text-4xl md:text-5xl font-bold leading-tight'
    case 'xl':
      return 'text-2xl sm:text-3xl font-semibold leading-snug'
    case 'lg':
      return 'text-xl sm:text-2xl font-semibold leading-snug'
    case 'md':
      return 'text-lg font-medium leading-normal'
    case 'sm':
      return 'text-base font-medium'
    case 'xs':
      return 'text-sm font-medium'
    default:
      return 'text-xl font-semibold'
  }
})
</script>

<template>
  <component
    :is="as"
    :class="[
      'text-dark font-sans',
      sizeClasses,
      spaced ? 'tracking-wider uppercase' : 'tracking-tight'
    ]"
  >
    <slot />
  </component>
</template>
