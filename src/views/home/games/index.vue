<template>
  <!-- 容器 - 固定定位 -->
  <div class="fixed left-0 top-1/2 bottom-0 z-20 bg-amber-200 w-48">
    <div v-if="tabIndex == 1 || 1" class="fixed left-12 bottom-12 z-20" style="zoom: 0.8">
      <!-- 冥想组件 -->
      <Meditation class=""></Meditation>
      <!-- 幸运转盘组件 -->
      <LuckyWheel class=""></LuckyWheel>
      <!-- 收入组件 -->
      <Income class=""></Income>
      <!-- 木鱼组件 -->
      <WoodenFish class=""></WoodenFish>
    </div>
  </div>
</template>

<script setup>
import Income from './income.vue'
import LuckyWheel from './luckyWheel.vue'
import Meditation from './meditation.vue'
import WoodenFish from './woodenFish.vue'
</script>

<style scoped></style>
