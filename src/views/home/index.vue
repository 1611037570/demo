<template>
  <!-- 背景组件 -->
  <Background> </Background>
  <!-- 提示组件 -->
  <Tip></Tip>
  <!-- 时间组件 -->
  <CurrentTime></CurrentTime>

  <Transition
    enter-active-class="transition-all duration-300 linear"
    leave-active-class="transition-all duration-300 linear"
    enter-from-class="opacity-0 scale-0 "
    leave-to-class="opacity-0 scale-0 "
  >
    <!-- 搜索组件 -->
    <Search v-if="tabIndex == 0"></Search>
  </Transition>
  <Transition
    enter-active-class="transition-all duration-300 linear"
    leave-active-class="transition-all duration-300 linear"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <!-- 快捷方式组件 -->
    <Shortcut v-if="tabIndex == 1"></Shortcut>
  </Transition>
  <!-- 文案组件 -->
  <Transition
    enter-active-class="transition-all duration-300 linear"
    leave-active-class="transition-all duration-300 linear"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <Quote v-if="searchFocus"></Quote>
  </Transition>
  <!-- 设置组件 -->
  <Transition
    mode="out-in"
    enter-active-class="transition-all duration-300 linear"
    leave-active-class="transition-all duration-300 linear"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <Setting v-if="tabIndex == 1"></Setting>
  </Transition>
  <!-- dock组件 -->
  <Dock />
  <!-- 版权组件 -->
  <Copyright></Copyright>

  <!-- 游戏组件 -->
  <Transition
    mode="out-in"
    enter-active-class="transition-all duration-300 linear"
    leave-active-class="transition-all duration-300 linear"
    enter-from-class="opacity-0 scale-0"
    leave-to-class="opacity-0 scale-0 "
  >
    <div v-if="tabIndex == 1" class="fixed left-12 bottom-12 z-20 w-12 h-12" style="zoom: 0.8">
      <!-- 冥想组件 -->
      <Meditation class="absolute left-1/2 bottom-80 -translate-x-1/2"></Meditation>
      <!-- 幸运转盘组件 -->
      <LuckyWheel class="absolute left-1/2 bottom-50 -translate-x-1/2"></LuckyWheel>
      <!-- 收入组件 -->
      <Income class="absolute left-1/2 bottom-33 -translate-x-1/2"></Income>
      <!-- 木鱼组件 -->
      <WoodenFish class="absolute left-1/2 bottom-0 -translate-x-1/2"></WoodenFish>
    </div>
  </Transition>
  <!-- 游戏组件 -->
  <!-- <game></game> -->
  <SettingModal />
</template>

<script setup>
import { useHomeStore, useSearchStore } from '@/stores'
import { storeToRefs } from 'pinia'

// 基础组件 - 页面加载时需要的组件
import Background from './components/background.vue'
import CurrentTime from './components/current-time.vue'
import Tip from './components/tip.vue'

// 按需加载组件 - 使用动态导入
const SettingModal = defineAsyncComponent(() => import('./setting/modal.vue'))
const Copyright = defineAsyncComponent(() => import('./components/copyright.vue'))
const Quote = defineAsyncComponent(() => import('./components/quote.vue'))
const Setting = defineAsyncComponent(() => import('./components/setting.vue'))
const Dock = defineAsyncComponent(() => import('./dock/index.vue'))

// 游戏相关组件 - 懒加载以减少初始加载体积
const Income = defineAsyncComponent(() => import('./games/income.vue'))
// const game = defineAsyncComponent(() => import('./games/index.vue'))
const LuckyWheel = defineAsyncComponent(() => import('./games/luckyWheel.vue'))
const Meditation = defineAsyncComponent(() => import('./games/meditation.vue'))
const WoodenFish = defineAsyncComponent(() => import('./games/woodenFish.vue'))

// 主要功能组件 - 懒加载
const Search = defineAsyncComponent(() => import('./search/index.vue'))
const Shortcut = defineAsyncComponent(() => import('./shortcut/index.vue'))
const homeStore = useHomeStore()
const { tabIndex } = storeToRefs(homeStore)
const searchStore = useSearchStore()
const { searchFocus } = storeToRefs(searchStore)

import { getWeatherData } from '@/services'
getWeatherData('hello').then((res) => {
  console.log('getWeatherData res', res)
})

// getBaiduSearchData('hello', false).then((res) => {
//   console.log('getBaiduSearchData res', res)
// })
</script>
