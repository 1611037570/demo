<template>
  <div
    v-if="modeValue"
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-neutral-200 p-4 rounded-xl flex flex-col"
  >
    <!-- 标题和关闭按钮 -->
    <div class="flex justify-between items-center">
      <div class="text-2xl font-bold">123</div>
      <div class="text-2xl font-bold cursor-pointer" @click="modeValue = false">关闭</div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
const modeValue = defineModel()
</script>

<style lang="scss" scoped></style>
