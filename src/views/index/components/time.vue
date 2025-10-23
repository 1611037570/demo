<template>
  <div class="mx-auto text-5xl font-bold pt-32 mb-8 cursor-pointer z-10" @click="switchTab">
    {{ time }}
  </div>
</template>

<script setup>
import { useCurrentTime } from '@/hooks/useCurrentTime'
import { useIndexStore } from '@/stores/index'
const indexStore = useIndexStore()
const { switchTab } = indexStore
const { time } = useCurrentTime()
</script>

<style scoped></style>
