<script setup>
defineProps({
  title: {
    type: String,
    default: '搜索历史',
  },
  icon: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="text-sm text-gray-500 w-full mb-2 flex items-center justify-between">
    <div class="flex items-center">
      {{ title }}
    </div>
    <div
      class="text-xs text-blue-500 cursor-pointer hover:text-blue-600 transition-colors duration-200"
    >
      <slot name="right" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
