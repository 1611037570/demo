<template>
  <div class="text-xl fixed bottom-12 right-12">
    <div v-if="isCompleted" class="text-green-600">恭喜！下班啦</div>
    <div v-else class="flex text-amber-600">
      距离下班还有
      <div class="" v-if="timeLeft.years">{{ timeLeft.years }}年-</div>
      <div class="" v-if="timeLeft.months">{{ timeLeft.months }}月-</div>
      <div class="" v-if="timeLeft.days">{{ timeLeft.days }}日</div>
      <div class="" v-if="timeLeft.hours">{{ timeLeft.hours }}时:</div>
      <div class="" v-if="timeLeft.minutes">{{ timeLeft.minutes }}分:</div>
      <div class="">{{ timeLeft.seconds }}秒</div>
    </div>
    <div>
      {{ isCompleted2 ? '今天爆金币' : '距离爆金币还有' + timeLeft2.days + '天' }}
    </div>
  </div>
</template>

<script setup>
import { useCountdown } from '@/hooks/useCountdown'
const { timeLeft, isCompleted } = useCountdown()
const { timeLeft: timeLeft2, isCompleted: isCompleted2 } = useCountdown({
  day: 18,
  hour: 0,
  minute: 0,
})
</script>

<style scoped></style>
