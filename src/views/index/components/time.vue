<template>
  <div class="mx-auto text-5xl font-bold pt-12 cursor-pointer">{{ time }}</div>
</template>

<script setup>
import { useCurrentTime } from '@/hooks/useCurrentTime'
const { time } = useCurrentTime()
</script>

<style scoped></style>
