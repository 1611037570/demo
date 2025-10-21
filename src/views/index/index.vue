<template>
  <!-- 背景组件 -->
  <background></background>
  <!-- 提示组件 -->
  <tip></tip>
  <div class="flex flex-col w-full h-full fixed z-10">
    <!-- 时间组件 -->
    <currentTime @click="switchTab"></currentTime>
    <search></search>

    <div class="flex-1 flex flex-col">
      <transition
        enter-active-class="transition-all duration-300 linear"
        leave-active-class="transition-all duration-300 linear"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <box v-if="tabIndex == 1"></box>
      </transition>
    </div>

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

    <dock @click="switchTab" />

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
  </div>
</template>

<script setup>
import { useIndexStore } from '@/stores/index'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'
import background from './components/background.vue'
import box from './components/box.vue'
import copyright from './components/copyright.vue'
import income from './components/income.vue'
import quote from './components/quote.vue'
import search from './components/search.vue'
import setting from './components/set.vue'
import currentTime from './components/time.vue'
import tip from './components/tip.vue'
import dock from './dock/index.vue'
import luckyWheel from './games/luckyWheel.vue'
import meditation from './games/meditation.vue'
import woodenFish from './games/woodenFish.vue'
const indexStore = useIndexStore()
const { tabIndex } = storeToRefs(indexStore)
tabIndex.value = 0
const searchStore = useSearchStore()
const { searchFocus } = storeToRefs(searchStore)
searchFocus.value = false

const switchTab = () => {
  tabIndex.value = tabIndex.value == 0 ? 1 : 0
}
</script>
