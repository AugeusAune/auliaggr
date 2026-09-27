<script setup lang="ts">
interface Props {
  variant?: 'default' | 'cyan' | 'blue' | 'coral' | 'primary' | 'outline'
}

withDefaults(defineProps<Props>(), {
  variant: 'default'
})
</script>

<template>
  <span
    :class="[
      'inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium transition-colors select-none',
      variant === 'default' && 'bg-light text-neutral-700 border border-neutral-200',
      variant === 'cyan' && 'bg-accent-cyan/15 text-neutral-900 border border-accent-cyan/30',
      variant === 'blue' && 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20',
      (variant === 'coral' || variant === 'primary') && 'bg-primary/20 text-neutral-900 border border-primary/40',
      variant === 'outline' && 'bg-transparent text-neutral-600 border border-neutral-300'
    ]"
  >
    <slot />
  </span>
</template>
