<template>
  <div
    class="flex items-center justify-center p-3 bg-white/20 mx-auto rounded-xl gap-3 fixed bottom-14 left-1/2 transform -translate-x-1/2"
    style="-webkit-backdrop-blur: 10px; backdrop-filter: blur(10px)"
  >
    <launchpad />
    <div class="w-20 h-20 rounded-lg bg-white/80 backdrop-blur-md flex items-center justify-center">
      <sf-icon icon="fluent:settings-24-regular" class="w-12 h-12" size="12" />
    </div>
  </div>
</template>

<script setup>
import launchpad from './launchpad.vue'
</script>

<style lang="scss" scoped></style>
