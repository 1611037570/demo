<template>
  <div
    class="text-5xl font-bold cursor-pointer z-10 text-white transition-all duration-300 mb-3"
    @click="switchTab"
  >
    {{ time }}
  </div>
</template>

<script setup>
import { useCurrentTime } from '@/hooks'
import { useHomeStore } from '@/stores'

const homeStore = useHomeStore()
const { time } = useCurrentTime()
const { switchTab } = homeStore
</script>

<style lang="scss" scoped></style>
