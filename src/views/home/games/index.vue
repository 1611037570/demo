<template>
  <!-- 容器 - 固定定位 -->
  <div class="fixed left-0 top-1/2 bottom-0 z-20 bg-amber-200 w-48">
    <div v-if="tabIndex == 1 || 1" class="fixed left-12 bottom-12 z-20" style="zoom: 0.8">
      <!-- 冥想组件 -->
      <meditation class=""></meditation>
      <!-- 幸运转盘组件 -->
      <lucky-wheel class=""></lucky-wheel>
      <!-- 收入组件 -->
      <income class=""></income>
      <!-- 木鱼组件 -->
      <wooden-fish class=""></wooden-fish>
    </div>
  </div>
</template>

<script setup>
import income from './income.vue'
import luckyWheel from './luckyWheel.vue'
import meditation from './meditation.vue'
import woodenFish from './woodenFish.vue'
</script>

<style scoped></style>
