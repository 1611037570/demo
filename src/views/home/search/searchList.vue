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
    class="rounded-lg px-3 py-1.75 text-sm hover:bg-blue-100 hover:text-blue-700 cursor-pointer whitespace-nowrap text-sf-text transition-all duration-200"
  >
    {{ item }}
  </div>
</template>

<style scoped></style>
