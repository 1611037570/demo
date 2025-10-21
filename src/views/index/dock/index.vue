<template>
  <div
    class="flex items-center justify-center p-3 bg-white/20 mx-auto rounded-xl gap-3"
    style="-webkit-backdrop-blur: 10px; backdrop-filter: blur(10px)"
  >
    <launchpad />
    <div class="w-20 h-20 rounded-lg bg-white/80 backdrop-blur-md transition-all duration-300">
      设置
    </div>
  </div>
</template>

<script setup>
import launchpad from './launchpad.vue'
</script>

<style lang="scss" scoped></style>
