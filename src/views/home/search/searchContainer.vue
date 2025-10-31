<script setup>
import { useSearchStore } from '@/stores'
import { storeToRefs } from 'pinia'
const searchStore = useSearchStore()
const { searchFocus } = storeToRefs(searchStore)
</script>

<template>
  <div
    v-if="searchFocus"
    class="mt-3 rounded-2xl border-blue-100 p-3 shadow-lg z-30 flex w-[610px] transform flex-col border bg-sf-primary transition-all duration-300"
  ></div>
</template>

<style lang="scss" scoped></style>
