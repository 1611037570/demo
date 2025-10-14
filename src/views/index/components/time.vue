<template>
  <div class="mx-auto mt-12 text-3xl font-bold">
    <div v-if="isCompleted" class="text-green-600">恭喜！下班啦</div>
    <div v-else class="flex text-amber-600">
      距离下班
      <div class="" v-if="timeLeft.years">{{ timeLeft.years }}年-</div>
      <div class="" v-if="timeLeft.months">{{ timeLeft.months }}月-</div>
      <div class="" v-if="timeLeft.days">{{ timeLeft.days }}日</div>
      <div class="" v-if="timeLeft.hours">{{ timeLeft.hours }}时:</div>
      <div class="" v-if="timeLeft.minutes">{{ timeLeft.minutes }}分:</div>
      <div class="" v-if="timeLeft.seconds">{{ timeLeft.seconds }}秒</div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

// 1. 参数定义（增加秒的配置）
const props = defineProps({
  year: {
    type: Number,
    validator: (v) => v === null || v > 0,
    default: null,
  },
  month: {
    type: Number,
    validator: (v) => v === null || (v >= 1 && v <= 12),
    default: null,
  },
  day: {
    type: Number,
    validator: (v) => v === null || (v >= 1 && v <= 31),
    default: null,
  },
  hour: {
    type: Number,
    validator: (v) => v >= 0 && v <= 23,
    default: 17,
  },
  minute: {
    type: Number,
    validator: (v) => v >= 0 && v <= 59,
    default: 30,
  },
  second: {
    type: Number,
    validator: (v) => v >= 0 && v <= 59,
    default: 0,
  },
})

// 2. 响应式变量
const currentTime = ref(dayjs())
const timer = ref(null)

// 3. 目标时间计算（优化：直接使用当前时间作为基础）
const targetDateTime = computed(() => {
  const now = dayjs()
  return dayjs()
    .year(props.year ?? now.year())
    .month(props.month ? props.month - 1 : now.month())
    .date(props.day ?? now.date())
    .hour(props.hour)
    .minute(props.minute)
    .second(props.second) // 加入秒
    .millisecond(0)
})

// 4. 核心：计算剩余时间（优化逻辑结构）
const timeLeft = computed(() => {
  const now = currentTime.value
  const target = targetDateTime.value

  // 若目标时间已过，返回全0
  if (now.isAfter(target)) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  // 优化：使用同一个剩余时间对象进行计算
  const remaining = target.clone()

  return {
    years: remaining.diff(now, 'year', true) | 0,
    months: remaining.subtract(remaining.diff(now, 'year'), 'year').diff(now, 'month', true) | 0,
    days: remaining.subtract(remaining.diff(now, 'month'), 'month').diff(now, 'day', true) | 0,
    hours: remaining.subtract(remaining.diff(now, 'day'), 'day').diff(now, 'hour', true) | 0,
    minutes: remaining.subtract(remaining.diff(now, 'hour'), 'hour').diff(now, 'minute', true) | 0,
    seconds:
      remaining.subtract(remaining.diff(now, 'minute'), 'minute').diff(now, 'second', true) | 0,
  }
})

// 5. 辅助计算属性
const isCompleted = computed(() => currentTime.value.isAfter(targetDateTime.value))

// 6. 定时器控制（优化：直接在setInterval中更新时间）
const startTimer = () => {
  // 立即更新
  currentTime.value = dayjs()

  // 每秒更新
  timer.value = setInterval(() => {
    currentTime.value = dayjs()
  }, 1000)
}

const stopTimer = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

// 监听完成状态，自动停止定时器
watch(isCompleted, (completed) => completed && stopTimer())

// 7. 生命周期管理
onMounted(startTimer)
onUnmounted(stopTimer)
</script>

<style scoped></style>
