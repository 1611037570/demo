<template>
  <!-- 提示组件 -->
  <tip></tip>
  <!-- 设置组件 -->
  <setting></setting>
  <!-- 背景组件 -->
  <background></background>
  <div class="flex flex-col w-full h-full fixed z-10">
    <div class="flex-1 flex flex-col">
      <!-- 时间组件 -->
      <currentTime></currentTime>

      <search></search>
      <box v-if="!searchFocus"></box>
    </div>
    <quote v-if="!searchFocus"></quote>
    <about></about>
    <copyright></copyright>
    <!-- <games></games> -->
  </div>
  <div v-if="!searchFocus" class="fixed left-12 bottom-12 z-20 w-12 h-12 bg-amber-200">
    <!-- 幸运转盘组件 -->
    <lucky-wheel class="absolute left-1/2 bottom-42 -translate-x-1/2"></lucky-wheel>
    <!-- 收入组件 -->
    <income class="absolute left-1/2 bottom-26 -translate-x-1/2"></income>
    <!-- 木鱼组件 -->
    <wooden-fish class="absolute left-1/2 bottom-0 -translate-x-1/2"></wooden-fish>
  </div>
</template>

<script setup>
import { useIndexStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import about from './components/about.vue'
import background from './components/background.vue'
import box from './components/box.vue'
import copyright from './components/copyright.vue'
import income from './components/income.vue'
import quote from './components/quote.vue'
import search from './components/search.vue'
import setting from './components/set.vue'
import currentTime from './components/time.vue'
import tip from './components/tip.vue'
import luckyWheel from './games/luckyWheel.vue'
import woodenFish from './games/woodenFish.vue'

const indexStore = useIndexStore()
const { searchFocus } = storeToRefs(indexStore)
</script>

<style scoped></style>
