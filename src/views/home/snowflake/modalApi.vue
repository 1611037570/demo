<template>
  <div class="space-y-5">
    <!-- API服务列表 -->
    <div
      v-for="item in list"
      :key="item.name"
      class="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100 overflow-hidden relative"
    >
      <!-- 装饰元素 -->
      <div
        class="absolute -right-10 -top-10 w-40 h-40 bg-blue-50 rounded-full opacity-60 -z-10"
      ></div>

      <!-- API服务名称 -->
      <div
        class="font-semibold text-lg text-blue-600 hover:text-blue-800 transition-all duration-300 cursor-pointer flex items-center gap-2 group"
        @click="openApi(item.url)"
      >
        {{ item.name }}
        <SfIcon
          icon="lucide:external-link"
          size="16"
          class="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300"
        />
      </div>

      <!-- 支持的功能列表 -->
      <div class="mt-4 flex flex-wrap gap-2.5">
        <div
          v-for="(support, index) in item.support"
          :key="index"
          class="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-all duration-300 cursor-pointer group flex items-center gap-1"
          @click="openApi(support.url)"
        >
          {{ support.name }}
          <SfIcon
            icon="lucide:arrow-up-right"
            size="12"
            class="opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-0.5 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// API服务列表数据
const list = [
  {
    name: 'roll',
    url: 'https://www.mxnzp.com/doc/list',
    support: [
      {
        name: 'IP信息',
        url: 'https://www.mxnzp.com/doc/detail?id=4',
      },
      {
        name: '天气',
        url: 'https://www.mxnzp.com/doc/detail?id=7',
      },
    ],
  },
  {
    name: '夏柔',
    url: 'https://api.aa1.cn/',
    support: [
      {
        name: '百度关键词',
        url: 'https://api.aa1.cn/doc/baidu-search.html',
      },
    ],
  },
  {
    name: 'Kairoi',
    url: 'https://api.logoi.cn/',
    support: [
      {
        name: '聚合搜索',
        url: 'https://api.logoi.cn/doc/hotlist',
      },
    ],
  },
]

/**
 * 打开API链接
 * @param {string} url - API服务地址
 */
const openApi = (url) => {
  window.open(url, '_blank')
}
</script>

<style scoped>
/* 卡片动画效果 */
div[class*='bg-white rounded-xl'] {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

div[class*='bg-white rounded-xl']:hover {
  transform: translateY(-2px);
  box-shadow:
    0 10px 25px -5px rgba(37, 99, 235, 0.1),
    0 8px 10px -6px rgba(37, 99, 235, 0.1);
}
</style>
