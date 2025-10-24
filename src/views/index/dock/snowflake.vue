<template>
  <div
    class="transition-all duration-200 w-10 h-10 rounded-lg bg-white/80 backdrop-blur-md flex items-center justify-center"
    @click="openAbout"
  >
    <el-image
      :src="snowIcon"
      class="w-7.5 h-7.5 hover:rotate-180 transition-all duration-200"
      fit="contain"
    />
  </div>
  <sf-modal v-if="aboutVisible" v-model="aboutVisible">
    <sf-set-container :list="list">
      <div class="w-[400px] h-1"></div>
      <div class="text-center py-2">
        <p class="text-sm text-gray-500 mb-1">项目已运行</p>
        <p
          class="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
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
    </sf-set-container>
  </sf-modal>
</template>

<script setup>
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import snowIcon from '@/assets/images/snow.svg'
import startImg from '@/assets/images/start.jpg'

const aboutVisible = ref(false)
const openAbout = () => {
  aboutVisible.value = true
}

const list = [
  { name: '关于项目', value: 'about' },
  { name: '关于我', value: 'about-me' },
]

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
</script>

<style scoped>
/* 添加容器悬停效果 */
.sf-set-container {
  transition: all 0.2s ease;
}

/* 确保内容区域有良好的间距 */
.text-center {
  margin: 16px 0;
}
</style>
