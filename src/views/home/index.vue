<template>
  <!-- 背景组件 -->
  <background> </background>
  <!-- 提示组件 -->
  <tip></tip>
  <!-- 时间组件 -->
  <currentTime></currentTime>

  <transition
    enter-active-class="transition-all duration-300 linear"
    leave-active-class="transition-all duration-300 linear"
    enter-from-class="opacity-0 scale-0 "
    leave-to-class="opacity-0 scale-0 "
  >
    <!-- 快捷方式组件 -->
    <shortcut v-if="tabIndex == 1"></shortcut>
    <!-- 搜索组件 -->
    <search v-else></search>
  </transition>
  <!-- 文案组件 -->
  <transition
    enter-active-class="transition-all duration-300 linear"
    leave-active-class="transition-all duration-300 linear"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <quote v-if="searchFocus"></quote>
  </transition>
  <!-- 设置组件 -->
  <transition
    mode="out-in"
    enter-active-class="transition-all duration-300 linear"
    leave-active-class="transition-all duration-300 linear"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <setting v-if="tabIndex == 1"></setting>
  </transition>
  <!-- dock组件 -->
  <dock />
  <!-- 版权组件 -->
  <copyright></copyright>

  <!-- 游戏组件 -->
  <transition
    mode="out-in"
    enter-active-class="transition-all duration-300 linear"
    leave-active-class="transition-all duration-300 linear"
    enter-from-class="opacity-0 scale-0"
    leave-to-class="opacity-0 scale-0 "
  >
    <div v-if="tabIndex == 1" class="fixed left-12 bottom-12 z-20 w-12 h-12" style="zoom: 0.8">
      <!-- 冥想组件 -->
      <meditation class="absolute left-1/2 bottom-80 -translate-x-1/2"></meditation>
      <!-- 幸运转盘组件 -->
      <lucky-wheel class="absolute left-1/2 bottom-50 -translate-x-1/2"></lucky-wheel>
      <!-- 收入组件 -->
      <income class="absolute left-1/2 bottom-33 -translate-x-1/2"></income>
      <!-- 木鱼组件 -->
      <wooden-fish class="absolute left-1/2 bottom-0 -translate-x-1/2"></wooden-fish>
    </div>
  </transition>
  <!-- 游戏组件 -->
  <!-- <game></game> -->
  <settingModal />
</template>

<script setup>
import { useHomeStore, useSearchStore } from '@/stores'
import { storeToRefs } from 'pinia'

// 基础组件 - 页面加载时需要的组件
import background from './components/background.vue'
import currentTime from './components/current-time.vue'
import tip from './components/tip.vue'

// 按需加载组件 - 使用动态导入
const settingModal = defineAsyncComponent(() => import('.//setting/modal.vue'))
const copyright = defineAsyncComponent(() => import('./components/copyright.vue'))
const quote = defineAsyncComponent(() => import('./components/quote.vue'))
const setting = defineAsyncComponent(() => import('./components/setting.vue'))
const dock = defineAsyncComponent(() => import('./dock/index.vue'))

// 游戏相关组件 - 懒加载以减少初始加载体积
const income = defineAsyncComponent(() => import('./games/income.vue'))
// const game = defineAsyncComponent(() => import('./games/index.vue'))
const luckyWheel = defineAsyncComponent(() => import('./games/luckyWheel.vue'))
const meditation = defineAsyncComponent(() => import('./games/meditation.vue'))
const woodenFish = defineAsyncComponent(() => import('./games/woodenFish.vue'))

// 主要功能组件 - 懒加载
const search = defineAsyncComponent(() => import('./search/index.vue'))
const shortcut = defineAsyncComponent(() => import('./shortcut/index.vue'))
const homeStore = useHomeStore()
const { tabIndex } = storeToRefs(homeStore)
const searchStore = useSearchStore()
const { searchFocus } = storeToRefs(searchStore)

tabIndex.value = 0

searchFocus.value = false
</script>
