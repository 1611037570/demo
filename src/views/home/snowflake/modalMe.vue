<template>
  <div class="max-w-3xl mx-auto p-6 space-y-8">
    <!-- 社交媒体部分 -->
    <div>
      <h2 class="text-xl font-bold mb-5 text-blue-600 flex items-center">
        <SfIcon name="mdi:social" class="mr-2 text-blue-500" />
        社交媒体
      </h2>
      <div class="space-y-4">
        <div
          v-for="(platform, key) in socialMedia"
          :key="key"
          class="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-blue-50"
        >
          <h3
            class="text-lg font-semibold mb-4 text-blue-700 hover:text-blue-600 transition-colors duration-200"
          >
            {{ platform.name }}平台
          </h3>
          <div class="flex flex-wrap gap-3">
            <a
              v-for="data in platform.list"
              :key="data.name"
              :href="data.url"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
            >
              {{ data.name }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 项目部分 -->
    <template v-for="(item, index) in project" :key="index">
      <div class="mt-8">
        <div
          class="text-lg font-semibold mb-4 text-blue-700 flex flex-col items-center justify-center"
        >
          <div class="text-2xl font-bold hover:text-blue-600 transition-colors duration-200">
            {{ item.name }}
          </div>
          <div class="w-16 h-1 rounded-sm bg-blue-500 my-3"></div>
        </div>
        <div class="grid grid-cols-2 gap-5">
          <a
            v-for="(data, dataIndex) in item.list"
            :key="dataIndex"
            :href="data.url || '#'"
            target="_blank"
            rel="noopener noreferrer"
            class="block bg-blue-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-blue-100 hover:border-blue-200"
          >
            <div class="h-36 flex items-center justify-center text-2xl text-blue-600">
              {{ data.name }}
            </div>
            <div class="p-4">
              <div class="font-medium text-blue-800">{{ data.name }}</div>
              <div v-if="data.desc" class="text-sm text-blue-600 mt-1">{{ data.desc }}</div>
            </div>
          </a>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
// 社交媒体数据
const socialMedia = {
  tech: {
    name: '技术',
    list: [
      {
        name: '稀土掘金',
        url: 'https://juejin.cn/user/2342386827791687/posts',
      },
      {
        name: 'GitHub',
        url: 'https://github.com/1611037570',
      },
    ],
  },
  shoot: {
    name: '摄影',
    list: [
      {
        name: '小红书',
        url: 'https://www.xiaohongshu.com/user/profile/6473337565433758721',
      },
      {
        name: '抖音',
        url: 'https://www.douyin.com/user/6473337565433758721',
      },
    ],
  },
}

// 项目经历数据
const project = [
  {
    name: '我的作品',
    list: [
      {
        name: '起始页',
      },
      {
        name: '简历生成器',
        desc: '快速创建你的简历',
      },
      {
        name: '雪花组件库',
        desc: '组件库',
      },
    ],
  },
  {
    name: '参与开发',
    list: [
      {
        name: '短说社区',
        url: 'https://osx.opensns.cn/',
        desc: '一款集社区论坛、商城、学堂于一体的社交系统',
      },
      {
        name: '天天工作台',
        url: 'https://www.apps.vip/',
        desc: '副屏"操作系统"',
      },
    ],
  },
]
</script>
