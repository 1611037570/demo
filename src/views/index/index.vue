<template>
  <!-- 木鱼组件 -->
  <wooden-fish></wooden-fish>
  <!-- 提示组件 -->
  <tip></tip>
  <!-- 背景组件 -->
  <background></background>
  <div class="flex flex-col w-full h-full fixed z-10">
    <div class="flex-1 flex flex-col">
      <!-- 时间组件 -->
      <currentTime></currentTime>
      <!-- 倒计时组件 -->
      <countdown></countdown>
      <search></search>
      <box></box>
    </div>
    <quote></quote>
    <about></about>
    <copyright></copyright>
    <!-- <games></games> -->
  </div>
</template>

<script setup>
import about from './components/about.vue'
import background from './components/background.vue'
import box from './components/box.vue'
import copyright from './components/copyright.vue'
import countdown from './components/countdown.vue'
import quote from './components/quote.vue'
import search from './components/search.vue'
import currentTime from './components/time.vue'
import tip from './components/tip.vue'
import woodenFish from './games/woodenFish.vue'
</script>

<style scoped></style>
