<script setup>
defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})
const style = ['#FF5759', '#5D98FE', '#FBB619']
</script>

<template>
  <div
    v-for="(item, index) in 10"
    :key="item"
    class="rounded-lg px-3 py-1.75 text-sm hover:bg-blue-100 hover:text-blue-700 cursor-pointer whitespace-nowrap text-sf-text transition-all duration-200"
  >
    <span
      class="w-6 h-6 mr-3 e font-medium text-xs inline-flex items-center justify-center rounded-full transition-colors duration-200"
      :style="{ background: index < style.length ? style[index] : '' }"
      :class="index < style.length ? 'text-white' : 'bg-blue-200 text-sf-text'"
      >{{ index + 1 }}</span
    >
    {{ item }}
  </div>
</template>

<style scoped></style>
