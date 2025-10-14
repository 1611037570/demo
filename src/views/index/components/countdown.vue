<template>
  <div class="mx-auto text-xl font-bold">
    <div v-if="isCompleted" class="text-green-600">恭喜！下班啦</div>
    <div v-else class="flex text-amber-600">
      距离下班
      <div class="" v-if="timeLeft.years">{{ timeLeft.years }}年-</div>
      <div class="" v-if="timeLeft.months">{{ timeLeft.months }}月-</div>
      <div class="" v-if="timeLeft.days">{{ timeLeft.days }}日</div>
      <div class="" v-if="timeLeft.hours">{{ timeLeft.hours }}时:</div>
      <div class="" v-if="timeLeft.minutes">{{ timeLeft.minutes }}分:</div>
      <div class="">{{ timeLeft.seconds }}秒</div>
    </div>
  </div>
</template>

<script setup>
import { useCountdown } from '@/hooks/useCountdown'
const { timeLeft, isCompleted } = useCountdown()
</script>

<style scoped></style>
