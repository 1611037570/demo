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
  <section class="relative mb-8">
    <!-- 英雄区域 -->
    <div
      class="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-sf-primary/10 to-sf-theme/5 p-6"
    >
      <!-- 背景装饰 -->
      <div class="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-sf-primary/5 blur-3xl"></div>
      <div class="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-sf-theme/5 blur-2xl"></div>

      <!-- 主要信息 -->
      <div class="relative z-10 flex flex-col items-center">
        <!-- 头像区域 -->
        <div class="relative mb-4 h-24 w-24">
          <div class="absolute inset-0 animate-ping rounded-full bg-sf-primary/30 opacity-75"></div>
          <div
            class="h-full w-full overflow-hidden rounded-full border-4 border-white/80 shadow-xl transition-all duration-700 hover:scale-110 hover:shadow-2xl hover:shadow-sf-primary/20"
          >
            <div
              class="flex h-full w-full items-center justify-center bg-gradient-to-br from-sf-primary to-sf-theme"
            >
              <SfIcon icon="ic:round-person" class="text-white" size="36" />
            </div>
          </div>
        </div>

        <!-- 名称与定位 -->
        <h1 class="mb-2 text-center text-3xl font-bold text-sf-text">亿羊</h1>
        <div class="mb-3 flex items-center justify-center gap-2 text-sm">
          <SfIcon icon="lucide:map-pin" size="4" />
          <span>现居浙江乌镇</span>
        </div>

        <!-- 个人简介 -->
        <p class="max-w-xs text-center text-sm text-sf-text-2 italic">热爱摄影的前端开发者</p>
        <!-- 标签导航 -->
        <div class="flex justify-center gap-2">
          <div
            v-for="tab in tabs"
            :key="tab.name"
            class="rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300"
          >
            {{ tab.name }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
