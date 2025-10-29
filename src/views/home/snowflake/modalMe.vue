<template>
  <div class="mx-auto max-w-3xl space-y-8 p-6">
    <!-- 社交媒体部分 -->
    <div>
      <h2 class="mb-5 flex items-center text-xl font-bold text-blue-600">
        <SfIcon name="mdi:social" class="mr-2 text-blue-500" />
        社交媒体
      </h2>
      <div class="space-y-4">
        <div
          v-for="(platform, key) in socialMedia"
          :key="key"
          class="rounded-xl border border-blue-50 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md"
        >
          <h3
            class="mb-4 text-lg font-semibold text-blue-700 transition-colors duration-200 hover:text-blue-600"
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
              class="rounded-lg bg-blue-50 px-4 py-2 text-blue-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-100 hover:text-blue-700 hover:shadow-sm"
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
          class="mb-4 flex flex-col items-center justify-center text-lg font-semibold text-blue-700"
        >
          <div class="text-2xl font-bold transition-colors duration-200 hover:text-blue-600">
            {{ item.name }}
          </div>
          <div class="my-3 h-1 w-16 rounded-sm bg-blue-500"></div>
        </div>
        <div class="grid grid-cols-2 gap-5">
          <a
            v-for="(data, dataIndex) in item.list"
            :key="dataIndex"
            :href="data.url || '#'"
            target="_blank"
            rel="noopener noreferrer"
            class="block overflow-hidden rounded-xl border border-blue-100 bg-blue-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
          >
            <div class="flex h-36 items-center justify-center text-2xl text-blue-600">
              {{ data.name }}
            </div>
            <div class="p-4">
              <div class="font-medium text-blue-800">{{ data.name }}</div>
              <div v-if="data.desc" class="mt-1 text-sm text-blue-600">{{ data.desc }}</div>
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
