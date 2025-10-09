<template>
  <div>
    {{ quote }}
  </div>
</template>

<script setup>
import { getRandomQuote } from '@/utils/getQuotation'
const quote = ref('')
const updateQuote = () => {
  quote.value = getRandomQuote()
}
</script>

<style lang="scss" scoped></style>
