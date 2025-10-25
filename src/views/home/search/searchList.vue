<script setup>
defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div
    v-for="item in 10"
    :key="item"
    class="px-3 py-1.75 rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-700 whitespace-nowrap transition-all duration-200 text-sm"
  >
    {{ item }}
  </div>
</template>

<style scoped></style>
