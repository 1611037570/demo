<template>
  <div class="mx-auto text-4xl font-bold pt-12">
    {{ formattedTime }}
    <!-- <div class="date-text">{{ formattedDate }}</div> -->
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import { computed, onMounted, onUnmounted, ref } from 'vue'

// 响应式变量存储当前时间
const currentTime = ref(dayjs())

// 格式化时间显示 (HH:mm:ss)
const formattedTime = computed(() => {
  return currentTime.value.format('HH:mm:ss')
})

// 格式化日期显示 (YYYY年MM月DD日 dddd)
// const formattedDate = computed(() => {
//   // 配置dayjs显示中文星期
//   const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
//   const weekday = weekdays[currentTime.value.day()]
//   return `${currentTime.value.format('YYYY年MM月DD日')} ${weekday}`
// })

// 定时器引用
let timer = null

// 组件挂载时启动定时器，每秒更新一次时间
onMounted(() => {
  // 立即更新一次
  currentTime.value = dayjs()

  // 每秒更新一次
  timer = setInterval(() => {
    currentTime.value = dayjs()
  }, 1000)
})

// 组件卸载时清除定时器
onUnmounted(() => {
  if (timer !== null) {
    clearInterval(timer)
  }
})
</script>

<style scoped></style>
