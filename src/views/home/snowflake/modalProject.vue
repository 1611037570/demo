<template>
  <div class="text-center py-2">
    <p class="text-sm text-gray-500 mb-1">项目已运行</p>
    <p class="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-200">
      {{ runTimeDescription }}
    </p>
  </div>
  <div v-for="item in timeList" :key="item.time" class="mb-4">
    <p class="text-lg font-bold text-blue-600">{{ item.time }}</p>
    <p class="text-sm text-gray-500">{{ item.desc }}</p>
    <template v-if="item.img && item.img.length">
      <el-image
        v-for="(img, index) in item.img"
        :key="index"
        :src="img"
        class="w-80 h-100"
        :preview-src-list="item.img"
        fit="contain"
      />
    </template>
  </div>
</template>

<script setup>
import startImg from '@/assets/images/start.jpg'

import dayjs from 'dayjs'
const startTime = '2020-11-22'

// 计算项目运行天数
const runDays = computed(() => {
  const start = dayjs(startTime)
  const now = dayjs()
  return now.diff(start, 'day')
})

// 计算项目运行时间的详细描述
const runTimeDescription = computed(() => {
  const start = dayjs(startTime)
  const now = dayjs()

  const years = now.diff(start, 'year')
  const months = now.diff(start.add(years, 'year'), 'month')
  const days = now.diff(start.add(years, 'year').add(months, 'month'), 'day')

  let description = `${runDays.value}天`

  // 如果超过一年，显示更详细的信息
  if (years > 0) {
    description += `（${years}年${months}个月${days}天）`
  } else if (months > 0) {
    description += `（${months}个月${days}天）`
  }

  return description
})
const timeList = [
  {
    desc: '第一个正式版上线',
    time: '2025-11-22',
  },
  {
    desc: '使用vue2cli重构',
    time: '2022-11-22',
  },
  {
    desc: '引入vue.js',
    time: '2021-01-01',
  },
  {
    desc: '第一个正式版上线',
    time: '2020-11-22',
  },
  {
    desc: '梦开始的地方',
    time: '2020-09-03',
    img: [startImg],
  },
]
</script>

<style lang="scss" scoped></style>
