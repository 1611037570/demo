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
import { useIndexStore } from '@/stores/index'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'
import settingModal from './/setting/modal.vue'
import background from './components/background.vue'
import copyright from './components/copyright.vue'
import currentTime from './components/current-time.vue'
import quote from './components/quote.vue'
import setting from './components/setting.vue'
import tip from './components/tip.vue'
import dock from './dock/index.vue'
import income from './games/income.vue'
// import game from './games/index.vue'
import luckyWheel from './games/luckyWheel.vue'
import meditation from './games/meditation.vue'
import woodenFish from './games/woodenFish.vue'
import search from './search/index.vue'
import shortcut from './shortcut/index.vue'
const indexStore = useIndexStore()
const { tabIndex } = storeToRefs(indexStore)
tabIndex.value = 0
const searchStore = useSearchStore()
const { searchFocus } = storeToRefs(searchStore)
searchFocus.value = false
</script>
