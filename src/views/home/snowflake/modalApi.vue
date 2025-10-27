<template>
  <div class="max-w-2xl mx-auto p-6">
    <!-- 页面标题 -->
    <h3 class="text-xl font-semibold text-blue-600 mb-6 text-center">API服务支持</h3>

    <!-- 描述信息 -->
    <div class="text-gray-600 mb-8 text-center">
      以下是项目使用的API服务，点击服务名称或功能标签可查看详细文档
    </div>

    <!-- API服务卡片列表 -->
    <div class="space-y-6">
      <div
        v-for="item in list"
        :key="item.name"
        class="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-50 overflow-hidden group"
      >
        <!-- 背景装饰元素 -->
        <div
          class="absolute -right-12 -top-12 w-48 h-48 bg-blue-50 rounded-full opacity-50 -z-10 transition-transform duration-500 group-hover:scale-110"
        ></div>

        <!-- API服务标题 -->
        <div
          class="font-semibold text-lg text-blue-600 hover:text-blue-700 transition-all duration-200 cursor-pointer flex items-center gap-2"
          @click="openApi(item.url)"
        >
          {{ item.name }}
          <span
            class="text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
            >查看文档</span
          >
        </div>

        <!-- API功能标签列表 -->
        <div class="mt-5 flex flex-wrap gap-3">
          <span
            v-for="(support, index) in item.support"
            :key="support.name"
            class="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-all duration-200 cursor-pointer flex items-center gap-1.5 group"
            @click="openApi(support.url)"
          >
            {{ support.name }}
            <svg
              class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
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

<style scoped></style>
