<template>
  <div class="mx-auto max-w-2xl p-6">
    <!-- 项目运行时间卡片 -->
    <div
      class="mb-8 rounded-xl border border-blue-100 bg-blue-50 p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md"
    >
      <h3 class="mb-2 text-lg font-medium text-blue-600">项目已运行</h3>
      <p
        class="text-2xl font-bold text-blue-600 transition-colors duration-200 hover:text-blue-700"
      >
        {{ runTimeDescription }}
      </p>
      <div class="mt-3 text-sm text-blue-500">自 {{ startTime }} 以来</div>
    </div>

    <!-- 项目历程标题 -->
    <h4 class="mb-5 text-lg font-medium text-blue-600">项目发展历程</h4>

    <!-- 项目历程时间线 -->
    <div class="relative">
      <!-- 时间线垂直轴 -->
      <div class="absolute top-0 bottom-0 left-4 w-px bg-blue-100"></div>

      <!-- 时间线条目 -->
      <div v-for="item in timeList" :key="item.time" class="group relative ml-12">
        <!-- 时间线圆点 -->
        <div class="absolute -left-12 mt-1.5 flex items-center justify-center">
          <div
            class="h-8 w-8 rounded-full border-4 border-white bg-blue-500 shadow-sm transition-transform duration-200 group-hover:scale-110"
          ></div>
        </div>

        <!-- 时间戳和类型标签 -->
        <div class="group mb-2 flex items-center justify-between pt-1">
          <div
            class="text-lg font-semibold text-blue-600 transition-colors duration-200 group-hover:text-blue-700"
          >
            {{ item.time }}
          </div>
          <div
            v-if="item.type && typeMap[item.type]"
            :class="[
              'rounded-full border px-2 py-1 text-xs',
              typeMap[item.type].textColor,
              typeMap[item.type].bgColor,
              typeMap[item.type].borderColor,
            ]"
          >
            {{ typeMap[item.type].name }}
          </div>
        </div>

        <!-- 描述内容 -->
        <div
          class="rounded-lg border border-blue-50 bg-white p-4 text-gray-600 shadow-sm transition-all duration-300 group-hover:border-blue-200"
        >
          {{ item.desc }}
        </div>

        <!-- 图片展示 -->
        <div v-if="item.img && item.img.length" class="mt-4">
          <ElImage
            v-for="(img, imgIndex) in item.img"
            :key="imgIndex"
            :src="img"
            class="mx-auto w-full max-w-md cursor-pointer rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg"
            :preview-src-list="item.img"
            fit="contain"
            lazy
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import startImg from '@/assets/images/start.jpg'
import dayjs from 'dayjs'

// 项目开始时间
const startTime = '2020-09-03'

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
// 项目类型映射，包含名称和颜色方案
const typeMap = {
  frame: {
    name: '架构',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-100 hover:bg-blue-200',
    borderColor: 'border-blue-300',
  },
  new: {
    name: '新增',
    textColor: 'text-green-700',
    bgColor: 'bg-green-100 hover:bg-green-200',
    borderColor: 'border-green-300',
  },
  optimize: {
    name: '优化',
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-100 hover:bg-orange-200',
    borderColor: 'border-orange-300',
  },
  fix: {
    name: '修复',
    textColor: 'text-purple-700',
    bgColor: 'bg-purple-100 hover:bg-purple-200',
    borderColor: 'border-purple-300',
  },
  del: {
    name: '删除',
    textColor: 'text-red-700',
    bgColor: 'bg-red-100 hover:bg-red-200',
    borderColor: 'border-red-300',
  },
}
// 项目发展时间线数据
const timeList = [
  {
    desc: '将起始页、雪花组件库、简历生成器合并为一个项目',
    time: '2025-11-22',
    type: 'frame',
  },
  {
    desc: '使用雪花组件库，重构项目',
    time: '2021-11-22',
    type: 'frame',
  },
  {
    desc: '新增摄影时光机，记录所拍照片。',
    time: '2023-07-18',
    type: 'new',
  },
  {
    desc: 'TypeScript重构项目',
    time: '2022-07-18',
    type: 'frame',
  },
  {
    desc: '使用Vite2重构项目',
    time: '2022-01-01',
    type: 'frame',
  },
  {
    desc: '使用Vue3Cli重构项目',
    time: '2021-11-22',
    type: 'frame',
  },
  {
    desc: '使用Vue2Cli重构项目',
    time: '2021-07-18',
    type: 'frame',
  },
  {
    desc: '引入Vue.js重构项目',
    time: '2021-01-01',
    type: 'frame',
  },
  {
    desc: '起始页1.0页面上线',
    time: '2020-11-22',
    type: 'optimize',
  },
  {
    desc: '梦开始的地方，[nannan.work]域名启用',
    time: '2020-09-03',
    img: [startImg],
    type: 'new',
  },
]
</script>
