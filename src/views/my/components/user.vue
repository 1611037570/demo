<script setup>
const tabs = [
  {
    name: '独立开发者',
  },
  {
    name: '前端工程师',
  },
  {
    name: '人像摄影师',
  },
]
</script>

<template>
  <!-- 个人信息区 -->
  <section class="mb-8 relative">
    <!-- 英雄区域 -->
    <div
      class="rounded-2xl p-6 mb-6 relative overflow-hidden bg-gradient-to-br from-sf-primary/10 to-sf-theme/5"
    >
      <!-- 背景装饰 -->
      <div class="-top-10 -right-10 h-40 w-40 blur-3xl absolute rounded-full bg-sf-primary/5"></div>
      <div class="-bottom-10 -left-10 h-32 w-32 blur-2xl absolute rounded-full bg-sf-theme/5"></div>

      <!-- 主要信息 -->
      <div class="relative z-10 flex flex-col items-center">
        <!-- 头像区域 -->
        <div class="h-24 w-24 mb-4 relative">
          <div class="inset-0 animate-ping absolute rounded-full bg-sf-primary/30 opacity-75"></div>
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
          <span>现居浙江乌镇</span>
        </div>

        <!-- 个人简介 -->
        <p class="max-w-xs text-sm text-center text-sf-text-2 italic">热爱摄影的前端开发者</p>
        <!-- 标签导航 -->
        <div class="gap-2 flex justify-center">
          <div
            v-for="tab in tabs"
            :key="tab.name"
            class="px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300"
          >
            {{ tab.name }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
