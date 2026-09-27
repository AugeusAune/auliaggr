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

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: name.value.trim(),
        email: email.value.trim(),
        message: message.value.trim()
      }
    })

    submitted.value = true
    name.value = ''
    email.value = ''
    message.value = ''
  } catch (err: any) {
    errorMessage.value = err?.data?.statusMessage || err?.statusMessage || err?.message || 'Failed to send message. Please try again later.'
  } finally {
    isSubmitting.value = false
  }
}

const handleReset = () => {
  submitted.value = false
  errorMessage.value = ''
}
</script>

<template>
  <form
    class="flex flex-col gap-4 w-full"
    @submit.prevent="handleSubmit"
  >
    <div v-if="submitted" class="p-6 rounded-2xl bg-primary/10 border border-primary/30 flex flex-col gap-3">
      <div class="text-neutral-900 text-sm font-semibold">
        Thank you for reaching out!
      </div>
      <p class="text-neutral-600 text-xs leading-relaxed">
        Your message has been sent successfully. I will get back to you within 24 hours.
      </p>
      <AppButton
        variant="outline"
        size="sm"
        class="self-start mt-1 !text-xs !py-1.5 !px-3"
        @click="handleReset"
      >
        Send another message
      </AppButton>
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
