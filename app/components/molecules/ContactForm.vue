<script setup lang="ts">
import AppInput from '../atoms/AppInput.vue'
import AppButton from '../atoms/AppButton.vue'

const name = ref('')
const email = ref('')
const message = ref('')
const isSubmitting = ref(false)
const submitted = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  // Guard clauses
  if (!name.value.trim()) {
    errorMessage.value = 'Please provide your name.'
    return
  }

  if (!email.value.trim() || !email.value.includes('@')) {
    errorMessage.value = 'Please provide a valid email address.'
    return
  }

  errorMessage.value = ''
  isSubmitting.value = true

  // Simulate submission delay
  await new Promise(resolve => setTimeout(resolve, 600))

  isSubmitting.value = false
  submitted.value = true
  name.value = ''
  email.value = ''
  message.value = ''
}
</script>

<template>
  <form
    class="flex flex-col gap-4 w-full"
    @submit.prevent="handleSubmit"
  >
    <div v-if="submitted" class="p-4 rounded-2xl bg-neutral-900 text-white text-sm font-medium">
      Thank you for reaching out! I'll get back to you within 24 hours.
    </div>

    <div v-else class="flex flex-col gap-4">
      <AppInput
        v-model="name"
        id="name"
        name="name"
        placeholder="Name"
        required
      />

      <AppInput
        v-model="email"
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        required
      />

      <AppInput
        v-model="message"
        id="message"
        name="message"
        multiline
        :rows="3"
        placeholder="Your project inquiry or message..."
      />

      <div v-if="errorMessage" class="text-xs text-red-500 font-medium">
        {{ errorMessage }}
      </div>

      <AppButton
        type="submit"
        variant="primary"
        :disabled="isSubmitting"
        class="w-full !py-3 !rounded-2xl"
      >
        {{ isSubmitting ? 'Sending...' : 'Send message' }}
      </AppButton>
    </div>
  </form>
</template>
