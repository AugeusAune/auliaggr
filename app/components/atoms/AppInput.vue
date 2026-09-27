<script setup lang="ts">
interface Props {
  modelValue?: string
  id?: string
  name?: string
  type?: string
  placeholder?: string
  required?: boolean
  multiline?: boolean
  rows?: number
  label?: string
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  required: false,
  multiline: false,
  rows: 4
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const inputClasses = computed(() => [
  'w-full px-4 py-3 rounded-2xl bg-light text-dark placeholder-neutral-400 text-sm border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white',
  props.error ? 'border-red-500' : 'border-neutral-200 hover:border-neutral-300'
])
</script>

<template>
  <div class="w-full flex flex-col gap-1.5">
    <label
      v-if="label"
      :for="id"
      class="text-xs font-medium text-neutral-600 tracking-wide uppercase font-mono"
    >
      {{ label }}
    </label>

    <textarea
      v-if="multiline"
      :id="id"
      :name="name"
      :rows="rows"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :class="inputClasses"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />

    <input
      v-else
      :id="id"
      :name="name"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :class="inputClasses"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <span v-if="error" class="text-xs text-red-500">
      {{ error }}
    </span>
  </div>
</template>
