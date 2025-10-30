<template>
  <!-- 主容器：合并根样式，移除冗余嵌套 -->
  <div
    class="bg-white border-slate-100 p-6 shadow-sm hover:shadow-md relative flex flex-col overflow-hidden border transition-all duration-300"
  >
    <!-- 装饰背景：保留视觉层次，减少定位容器 -->
    <div class="-top-10 -right-10 w-40 h-40 bg-blue-50 absolute rounded-full opacity-70"></div>
    <div class="-bottom-10 -left-10 w-40 h-40 bg-purple-50 absolute rounded-full opacity-70"></div>

    <!-- 个人信息区：用语义化标签，移除多余容器 -->
    <section class="mb-8 relative flex flex-col items-center">
      <!-- 头像区域：合并样式，增强视觉焦点 -->
      <div class="mb-5 group relative">
        <div
          class="h-28 w-28 from-blue-500 to-purple-600 shadow-lg group-hover:shadow-blue-300/20 ring-white/20 flex items-center justify-center rounded-full bg-gradient-to-br ring-4 transition-all duration-500 group-hover:scale-105"
        >
          <SfIcon icon="ic:round-person" class="text-white" size="36" />
        </div>
      </div>

      <!-- 名称与简介：优化排版间距 -->
      <h2 class="text-2xl font-bold mb-1 text-slate-800 tracking-tight">亿羊</h2>
      <p class="text-slate-500 mb-5 max-w-xs text-sm text-center">
        热爱摄影的前端开发者 | 专注交互体验与视觉呈现
      </p>

      <!-- 技能标签：增强交互反馈 -->
      <div class="gap-2 mb-6 flex flex-wrap justify-center">
        <span
          class="px-3 py-1.5 text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-full transition-colors duration-200"
          >Vue.js</span
        >
        <span
          class="px-3 py-1.5 text-xs bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-full transition-colors duration-200"
          >Tailwind CSS</span
        >
        <span
          class="px-3 py-1.5 text-xs bg-green-50 text-green-700 hover:bg-green-100 rounded-full transition-colors duration-200"
          >JavaScript</span
        >
        <span
          class="px-3 py-1.5 text-xs bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-full transition-colors duration-200"
          >摄影</span
        >
      </div>

      <!-- 统计信息：强化视觉对比 -->
      <div class="gap-6 border-slate-100 pt-4 flex w-full justify-center border-t">
        <div class="text-center">
          <p
            class="text-2xl font-bold from-blue-500 to-purple-500 bg-gradient-to-r bg-clip-text text-transparent"
          >
            12+
          </p>
          <p class="text-xs text-slate-500 mt-1">项目经验</p>
        </div>
        <div class="text-center">
          <p
            class="text-2xl font-bold from-blue-500 to-purple-500 bg-gradient-to-r bg-clip-text text-transparent"
          >
            3+
          </p>
          <p class="text-xs text-slate-500 mt-1">工作年限</p>
        </div>
        <div class="text-center">
          <p
            class="text-2xl font-bold from-blue-500 to-purple-500 bg-gradient-to-r bg-clip-text text-transparent"
          >
            5k+
          </p>
          <p class="text-xs text-slate-500 mt-1">技术文章</p>
        </div>
      </div>
    </section>

    <!-- 技术社交平台：移除外层div，用section语义化 -->
    <section class="mb-8">
      <h4 class="text-base font-medium text-slate-800 mb-3 flex items-center">
        <SfIcon icon="lucide:code" class="mr-2 h-4 w-4 text-blue-500" />
        技术平台
      </h4>
      <!-- 直接用grid布局，无外层div -->
      <div class="gap-3 grid grid-cols-2">
        <a
          v-for="(item, index) in tech.list"
          :key="index"
          @click.prevent="open(item.url)"
          class="group p-4 rounded-xl bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 hover:bg-blue-50/50 flex border transition-all duration-300 hover:translate-y-[-1px]"
        >
          <SfIcon
            :icon="index === 0 ? 'simple-icons:juejin' : 'simple-icons:github'"
            class="mr-3 h-5 w-5 text-blue-500 transition-all duration-300 group-hover:scale-110"
          />
          <span class="font-medium text-slate-800 text-sm">{{ item.name }}</span>
        </a>
      </div>
    </section>

    <!-- 摄影社交平台：精简结构，用section -->
    <section class="mb-8">
      <h4 class="text-base font-medium text-slate-800 mb-3 flex items-center justify-center">
        <SfIcon icon="lucide:camera" class="mr-2 h-4 w-4 text-purple-500" />
        摄影作品分享
      </h4>

      <!-- 摄影信息：用p标签替代div，减少嵌套 -->
      <p class="text-sm text-slate-600 mb-2">2023年6月3号 - 至今</p>
      <p class="text-sm text-slate-600 mb-3">旅拍城市</p>

      <!-- 城市列表：用span替代div，优化样式 -->
      <div class="gap-2 mb-4 flex flex-wrap">
        <span
          v-for="item in city"
          :key="item.name"
          class="px-2.5 py-1 text-sm bg-purple-50 text-purple-700 rounded-full"
        >
          {{ item.name }}
        </span>
      </div>

      <!-- 摄影平台链接：精简容器 -->
      <div class="gap-3 grid grid-cols-2">
        <a
          v-for="(item, index) in shoot.list"
          :key="index"
          @click.prevent="open(item.url)"
          class="group p-4 rounded-xl bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-purple-200 hover:bg-purple-50/50 border transition-all duration-300 hover:translate-y-[-1px]"
        >
          <SfIcon
            :icon="index === 0 ? 'simple-icons:xiaohongshu' : 'simple-icons:tiktok'"
            class="mr-3 h-5 w-5 text-purple-500 transition-all duration-300 group-hover:scale-110"
          />
          <span class="font-medium text-slate-800 text-sm">{{ item.name }}</span>
        </a>
      </div>
    </section>

    <!-- 项目经历：移除外层div，直接用section -->
    <section>
      <h3 class="text-lg font-semibold mb-5 group flex items-center">
        <SfIcon
          icon="lucide:briefcase"
          class="mr-2 h-5 w-5 text-purple-500 transition-transform duration-300 group-hover:rotate-[-12deg]"
        />
        项目经历
      </h3>

      <!-- 项目分类：直接v-for在section上，无外层div -->
      <section v-for="(category, index) in project" :key="index" class="mb-6">
        <h4 class="mb-4 text-sm font-medium text-slate-700 pl-1 flex items-center">
          <span
            class="h-1.5 w-1.5 mr-2 from-blue-500 to-purple-500 rounded-full bg-gradient-to-r"
          ></span>
          {{ category.name }}
        </h4>

        <!-- 项目列表：精简网格容器 -->
        <div class="gap-4 grid grid-cols-2">
          <article
            v-for="(item, idx) in category.list"
            :key="idx"
            @click="open(item.url)"
            class="group rounded-xl border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 cursor-pointer overflow-hidden border transition-all duration-300 hover:translate-y-[-2px]"
          >
            <!-- 图片占位区：增强视觉细节 -->
            <div
              class="h-32 relative overflow-hidden transition-opacity duration-300 group-hover:opacity-90"
              :style="{
                backgroundColor: idx % 2 === 0 ? '#e0f2fe' : '#f3e8ff',
                backgroundImage: `radial-gradient(circle at 30% 30%, rgba(59, 130, 246, ${idx % 2 === 0 ? 0.15 : 0}), transparent 50%)`,
              }"
            >
              <!-- 新增装饰图标，强化识别度 -->
              <SfIcon
                :icon="idx % 2 === 0 ? 'lucide:layout' : 'lucide:pen-tool'"
                class="top-3 right-3 h-6 w-6 absolute opacity-30 transition-opacity duration-300 group-hover:opacity-40"
                :style="{ color: idx % 2 === 0 ? '#3b82f6' : '#9333ea' }"
              />
            </div>

            <!-- 项目信息：优化间距和排版 -->
            <div class="p-3 bg-white">
              <h5 class="text-slate-800 font-medium text-sm">{{ item.name }}</h5>
              <p v-if="item.desc" class="mt-1.5 text-xs text-slate-500 line-clamp-2">
                {{ item.desc }}
              </p>
            </div>
          </article>
        </div>
      </section>
    </section>
  </div>
</template>
<script setup>
import { useSearchStore } from '@/stores/modules/search'
const searchStore = useSearchStore()
const { open } = searchStore
// 社交媒体数据
const tech = {
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
}
const shoot = {
  name: '摄影',
  list: [
    {
      name: '小红书',
      url: 'https://www.xiaohongshu.com/user/profile/6772591e00000000180175f9',
    },
    {
      name: '抖音',
      url: 'https://www.douyin.com/user/MS4wLjABAAAA2ZiMi4shkb1NyOFV-2DhkMCEUirye08iiO5tO1gq6a5RHwszFi_OdZ_ssU0B3N-u?from_tab_name=main',
    },
  ],
}
const city = [
  {
    name: '杭州',
  },
  {
    name: '嘉兴',
  },
  {
    name: '绍兴',
  },
  {
    name: '上海',
  },
  {
    name: '苏州',
  },
  {
    name: '贵阳',
  },
  {
    name: '福州',
  },
  {
    name: '平潭',
  },
  {
    name: '柳州',
  },
]
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
