<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  href?: string
  to?: string
  type?: 'button' | 'submit' | 'reset'
  external?: boolean
  disabled?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'button',
  external: false,
  disabled: false
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-light hover:bg-neutral-200 text-dark border border-neutral-200'
    case 'outline':
      return 'bg-transparent text-dark border border-neutral-300 hover:border-primary'
    case 'ghost':
      return 'bg-transparent hover:bg-neutral-100 text-dark'
    case 'primary':
    default:
      return 'bg-primary hover:bg-[#e27b79] text-white shadow-sm font-semibold'
  }
})
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="[
      'inline-flex items-center justify-center font-medium rounded-full px-5 py-2.5 text-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark disabled:opacity-50 disabled:cursor-not-allowed select-none min-h-[44px]',
      variantClasses
    ]"
    :aria-label="ariaLabel"
  >
    <slot />
  </NuxtLink>

  <a
    v-else-if="href"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="[
      'inline-flex items-center justify-center font-medium rounded-full px-5 py-2.5 text-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark disabled:opacity-50 disabled:cursor-not-allowed select-none min-h-[44px]',
      variantClasses
    ]"
    :aria-label="ariaLabel"
  >
    <slot />
  </a>

  <button
    v-else
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center font-medium rounded-full px-5 py-2.5 text-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark disabled:opacity-50 disabled:cursor-not-allowed select-none min-h-[44px]',
      variantClasses
    ]"
    :aria-label="ariaLabel"
  >
    <slot />
  </button>
</template>
