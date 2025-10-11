<template>
  <div @click="updateQuote" class="mx-auto px-6">
    <div class="relative cursor-pointer p-6 text-gray-700 text-4xl bg-gray-50 rounded-xl mb-4">
      {{ quote }}
    </div>
  </div>
</template>

<script setup>
import { getRandomQuote } from '@/utils/getRandomQuote'
import { ref } from 'vue'
const quote = ref('愿这份简历 能把你带到想去的地方！')
const updateQuote = () => {
  quote.value = getRandomQuote()
}
</script>

<style scoped></style>
