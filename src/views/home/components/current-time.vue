<template>
  <div
    class="text-5xl font-bold cursor-pointer z-10 text-white fixed top-32 left-1/2 -translate-x-1/2"
    @click="switchTab"
  >
    {{ time }}
  </div>
</template>

<script setup>
import { useCurrentTime } from '@/hooks'
import { useHomeStore } from '@/stores/home'
const homeStore = useHomeStore()
const { switchTab } = homeStore
const { time } = useCurrentTime()
</script>

<style scoped></style>
