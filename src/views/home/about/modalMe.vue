<template>
  <!-- 主容器：使用自定义Snowflake颜色变量 -->
  <ElScrollbar
    class="p-6 shadow-sm hover:shadow-md rounded-xl relative flex flex-1 flex-col overflow-hidden border border-sf-primary-hover/10 bg-sf-primary transition-all duration-300"
  >
    <div class="">
      <!-- 装饰背景：增强视觉层次感 -->
      <div
        class="-top-10 -right-10 w-40 h-40 blur-sm absolute rounded-full bg-sf-primary-hover/5 opacity-70"
      ></div>
      <div
        class="-bottom-10 -left-10 w-40 h-40 blur-sm absolute rounded-full bg-sf-theme-hover/5 opacity-70"
      ></div>

      <!-- 个人信息区 -->
      <section class="mb-8 relative">
        <!-- 英雄区域 -->
        <div
          class="rounded-2xl p-6 mb-6 relative overflow-hidden bg-gradient-to-br from-sf-primary/10 to-sf-theme/5"
        >
          <!-- 背景装饰 -->
          <div
            class="-top-10 -right-10 h-40 w-40 blur-3xl absolute rounded-full bg-sf-primary/5"
          ></div>
          <div
            class="-bottom-10 -left-10 h-32 w-32 blur-2xl absolute rounded-full bg-sf-theme/5"
          ></div>

          <!-- 主要信息 -->
          <div class="relative z-10 flex flex-col items-center">
            <!-- 头像区域 -->
            <div class="h-24 w-24 mb-4 relative">
              <div
                class="inset-0 animate-ping absolute rounded-full bg-sf-primary/30 opacity-75"
              ></div>
              <div
                class="border-white/80 shadow-xl hover:shadow-2xl h-full w-full overflow-hidden rounded-full border-4 transition-all duration-700 hover:scale-110 hover:shadow-sf-primary/20"
              >
                <div
                  class="flex h-full w-full items-center justify-center bg-gradient-to-br from-sf-primary to-sf-theme"
                >
                  <SfIcon icon="ic:round-person" class="text-white" size="36" />
                </div>
              </div>
            </div>

            <!-- 名称与定位 -->
            <h1 class="text-3xl font-bold mb-2 text-center text-sf-text">亿羊</h1>
            <div class="gap-2 text-sm mb-3 flex items-center justify-center">
              <SfIcon icon="lucide:map-pin" size="4" />
              <span>浙江杭州</span>
            </div>

            <!-- 个人简介 -->
            <p class="max-w-xs text-sm text-center text-sf-text-2 italic">热爱摄影的前端开发者</p>
          </div>
        </div>

        <!-- 技能展示 -->
        <div class="mb-6">
          <h3 class="mb-4 text-lg font-semibold gap-2 flex items-center text-sf-text">
            <SfIcon icon="lucide:sparkles" class="h-5 w-5 text-sf-primary" />
            <span>专业技能</span>
          </h3>
          <div class="gap-3 grid grid-cols-2">
            <div
              class="group bg-white/80 backdrop-blur-sm rounded-xl p-3 hover:shadow-md hover:-translate-y-0.5 border border-sf-primary-hover/10 transition-all duration-300 hover:border-sf-primary/30"
            >
              <div class="text-base font-medium mb-1 text-sf-primary">Vue.js</div>
              <div class="h-1.5 w-full overflow-hidden rounded-full bg-sf-primary/10">
                <div
                  class="h-full w-[90%] rounded-full bg-gradient-to-r from-sf-primary to-sf-theme"
                ></div>
              </div>
            </div>
            <div
              class="group bg-white/80 backdrop-blur-sm rounded-xl p-3 hover:shadow-md hover:-translate-y-0.5 border border-sf-primary-hover/10 transition-all duration-300 hover:border-sf-primary/30"
            >
              <div class="text-base font-medium mb-1 text-sf-theme">Tailwind CSS</div>
              <div class="h-1.5 w-full overflow-hidden rounded-full bg-sf-primary/10">
                <div
                  class="h-full w-[85%] rounded-full bg-gradient-to-r from-sf-primary to-sf-theme"
                ></div>
              </div>
            </div>
            <div
              class="group bg-white/80 backdrop-blur-sm rounded-xl p-3 hover:shadow-md hover:-translate-y-0.5 border border-sf-primary-hover/10 transition-all duration-300 hover:border-sf-primary/30"
            >
              <div class="text-base font-medium text-green-600 mb-1">JavaScript</div>
              <div class="h-1.5 w-full overflow-hidden rounded-full bg-sf-primary/10">
                <div
                  class="h-full w-[88%] rounded-full bg-gradient-to-r from-sf-primary to-sf-theme"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 统计数据 -->
        <div
          class="rounded-xl bg-white/80 backdrop-blur-sm p-4 relative overflow-hidden border border-sf-primary-hover/10"
        >
          <!-- 装饰元素 -->
          <div class="top-0 right-0 h-20 w-20 absolute -z-10 rounded-bl-full bg-sf-primary/5"></div>

          <h3 class="mb-4 text-lg font-semibold gap-2 flex items-center text-sf-text">
            <SfIcon icon="lucide:bar-chart" class="h-5 w-5 text-sf-primary" />
            <span>经验概览</span>
          </h3>

          <div class="gap-3 grid grid-cols-3">
            <div
              class="p-3 rounded-lg group flex flex-col items-center bg-sf-primary/5 transition-all duration-300 hover:bg-sf-primary/10"
            >
              <div
                class="text-3xl font-bold mb-1 text-sf-primary transition-transform duration-300 group-hover:scale-110"
              >
                12+
              </div>
              <div class="text-xs text-center text-sf-text-2">项目经验</div>
            </div>
            <div
              class="p-3 rounded-lg group flex flex-col items-center bg-sf-theme/5 transition-all duration-300 hover:bg-sf-theme/10"
            >
              <div
                class="text-3xl font-bold mb-1 text-sf-theme transition-transform duration-300 group-hover:scale-110"
              >
                3+
              </div>
              <div class="text-xs text-center text-sf-text-2">工作年限</div>
            </div>
            <div
              class="p-3 rounded-lg group flex flex-col items-center bg-sf-primary/5 transition-all duration-300 hover:bg-sf-primary/10"
            >
              <div
                class="text-3xl font-bold mb-1 text-sf-primary transition-transform duration-300 group-hover:scale-110"
              >
                5k+
              </div>
              <div class="text-xs text-center text-sf-text-2">技术文章</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 技术社交平台 -->
      <section class="mb-8">
        <h4 class="text-base font-medium mb-3 group flex items-center text-sf-text">
          <SfIcon
            icon="lucide:code"
            class="mr-2 h-4 w-4 text-sf-primary transition-transform duration-300 group-hover:rotate-6"
          />
          技术平台
        </h4>
        <div class="gap-3 grid grid-cols-2">
          <a
            v-for="(item, index) in tech.list"
            :key="index"
            @click.prevent="open(item.url)"
            class="group p-4 rounded-xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1 relative flex overflow-hidden border border-sf-primary-hover/20 transition-all duration-300 hover:border-sf-primary/30 hover:bg-sf-primary/5"
          >
            <SfIcon
              :icon="index === 0 ? 'simple-icons:juejin' : 'simple-icons:github'"
              class="mr-3 h-5 w-5 text-sf-primary transition-all duration-300 group-hover:scale-110"
            />
            <span
              class="font-medium text-sm text-sf-text transition-colors duration-300 group-hover:text-sf-primary"
              >{{ item.name }}</span
            >
            <div
              class="inset-0 absolute bg-gradient-to-r from-sf-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            ></div>
          </a>
        </div>
      </section>

      <!-- 摄影社交平台 -->
      <section class="mb-8">
        <h4 class="text-base font-medium mb-3 group flex items-center justify-center text-sf-text">
          <SfIcon
            icon="lucide:camera"
            class="mr-2 h-4 w-4 text-sf-theme transition-transform duration-300 group-hover:scale-110"
          />
          摄影作品分享
        </h4>

        <p class="text-sm mb-2 text-center text-sf-text-2">2023年6月3号 - 至今</p>
        <p class="text-sm mb-3 text-center text-sf-text-2">旅拍城市</p>

        <!-- 城市列表：增强动画 -->
        <div class="gap-2 mb-4 flex flex-wrap justify-center">
          <span
            v-for="item in city"
            :key="item.name"
            class="px-2.5 py-1 text-sm rounded-full bg-sf-theme/5 text-sf-theme transition-all duration-200 hover:scale-105 hover:bg-sf-theme/15"
          >
            {{ item.name }}
          </span>
        </div>

        <!-- 摄影平台链接 -->
        <div>全部摄影作品</div>
        <div class="gap-3 grid grid-cols-2">
          <a
            v-for="(item, index) in shoot.list"
            :key="index"
            @click.prevent="open(item.url)"
            class="group p-4 rounded-xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1 relative flex overflow-hidden border border-sf-theme-hover/20 transition-all duration-300 hover:border-sf-theme/30 hover:bg-sf-theme/5"
          >
            <SfIcon
              :icon="index === 0 ? 'simple-icons:xiaohongshu' : 'simple-icons:tiktok'"
              class="mr-3 h-5 w-5 text-sf-theme transition-all duration-300 group-hover:scale-110"
            />
            <span
              class="font-medium text-sm text-sf-text transition-colors duration-300 group-hover:text-sf-theme"
              >{{ item.name }}</span
            >
            <div
              class="inset-0 absolute bg-gradient-to-r from-sf-theme/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            ></div>
          </a>
        </div>
      </section>

      <!-- 项目经历 -->
      <section>
        <h3 class="text-lg font-semibold mb-5 group flex items-center">
          <SfIcon
            icon="lucide:briefcase"
            class="mr-2 h-5 w-5 text-sf-theme transition-transform duration-300 group-hover:rotate-[-12deg]"
          />
          项目经历
        </h3>

        <section v-for="(category, index) in project" :key="index" class="mb-6">
          <h4 class="mb-4 text-sm font-medium pl-1 flex items-center text-sf-text-2">
            <span
              class="h-1.5 w-1.5 mr-2 rounded-full bg-gradient-to-r from-sf-primary to-sf-theme"
            ></span>
            {{ category.name }}
          </h4>

          <!-- 项目列表：增强视觉效果 -->
          <div class="gap-4 grid grid-cols-2">
            <article
              v-for="(item, idx) in category.list"
              :key="idx"
              @click="open(item.url)"
              class="group rounded-xl shadow-sm hover:shadow-md hover:-translate-y-2 cursor-pointer overflow-hidden border border-sf-primary-hover/20 transition-all duration-300 hover:border-sf-primary-hover/40"
            >
              <!-- 图片占位区 -->
              <div
                class="h-32 relative overflow-hidden transition-all duration-300 group-hover:opacity-90"
                :class="{
                  'bg-sf-primary-hover/5': idx % 2 === 0,
                  'bg-sf-theme-hover/5': idx % 2 === 1,
                  'project-bg-primary': idx % 2 === 0,
                  'project-bg-theme': idx % 2 === 1,
                }"
              >
                <!-- 装饰图标 -->
                <SfIcon
                  :icon="idx % 2 === 0 ? 'lucide:layout' : 'lucide:pen-tool'"
                  class="top-3 right-3 h-6 w-6 absolute opacity-30 transition-all duration-300 group-hover:scale-110 group-hover:opacity-50"
                  :class="idx % 2 === 0 ? 'text-sf-primary' : 'text-sf-theme'"
                />

                <!-- 悬停时显示的遮罩效果 -->
                <div
                  class="inset-0 from-black/10 absolute bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                ></div>
              </div>

              <!-- 项目信息 -->
              <div class="p-3 bg-white">
                <h5
                  class="font-medium text-sm text-sf-text transition-colors duration-300 group-hover:text-sf-primary"
                >
                  {{ item.name }}
                </h5>
                <p
                  v-if="item.desc"
                  class="mt-1.5 text-xs line-clamp-2 text-sf-text-2 transition-colors duration-300 group-hover:text-sf-text"
                >
                  {{ item.desc }}
                </p>
                <!-- 链接指示 -->
                <div v-if="item.url" class="mt-2 flex justify-end">
                  <SfIcon
                    icon="lucide:external-link"
                    class="h-3 w-3 group-hover:translate-x-0.5 text-sf-text-3 transition-all duration-300 group-hover:text-sf-primary"
                  />
                </div>
              </div>
            </article>
          </div>
        </section>
      </section>
    </div>
  </ElScrollbar>
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
<style scoped>
/* 项目背景渐变效果 */
.project-bg-primary {
  background-image: radial-gradient(
    circle at 30% 30%,
    var(--color-sf-primary) / 15,
    transparent 50%
  );
}

.project-bg-theme {
  background-image: radial-gradient(circle at 30% 30%, var(--color-sf-theme) / 15, transparent 50%);
}
</style>
