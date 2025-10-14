<template>
  <div class="mx-auto text-6xl font-bold pt-12">{{ time }}</div>
</template>

<script setup>
import { useCurrentTime } from '@/hooks/useCurrentTime'
const { time } = useCurrentTime()
</script>

<style scoped></style>
