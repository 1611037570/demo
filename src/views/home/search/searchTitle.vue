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
  <div class="mb-2 flex w-full items-center justify-between text-sm text-gray-500">
    <div class="flex items-center">
      {{ title }}
    </div>
    <div
      class="cursor-pointer text-xs text-blue-500 transition-colors duration-200 hover:text-blue-600"
    >
      <slot name="right" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
