<template>
  <!-- 木鱼组件 -->
  <wooden-fish></wooden-fish>
  <!-- 提示组件 -->
  <tip></tip>
  <!-- 设置组件 -->
  <setting></setting>
  <!-- 背景组件 -->
  <background></background>
  <div class="flex flex-col w-full h-full fixed z-10">
    <div class="flex-1 flex flex-col">
      <!-- 幸运转盘组件 -->
      <lucky-wheel></lucky-wheel>
      <!-- 时间组件 -->
      <currentTime></currentTime>
      <!-- 倒计时组件 -->
      <countdown></countdown>
      <search></search>
      <box v-if="!searchFocus"></box>
    </div>
    <quote v-if="!searchFocus"></quote>
    <about></about>
    <copyright></copyright>
    <!-- <games></games> -->
  </div>
</template>

<script setup>
import { useIndexStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import about from './components/about.vue'
import background from './components/background.vue'
import box from './components/box.vue'
import copyright from './components/copyright.vue'
import countdown from './components/countdown.vue'
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
