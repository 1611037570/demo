<script setup>
defineProps({
  title: {
    type: String,
    default: '搜索历史',
  },
  info: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  iconClass: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="mb-3 flex h-[32px] w-full items-center justify-between">
    <div class="font-bold flex h-full items-center text-[15px] text-sf-text">
      <SfIcon v-if="icon" :icon="icon" class="mr-2" :class="iconClass" size="5" />
      <div class="mr-2">
        {{ title }}
      </div>
      <SfTooltip :info="info" v-if="info" />
    </div>
    <div
      class="text-xs text-blue-500 hover:text-blue-600 cursor-pointer transition-colors duration-200"
    >
      <slot name="right" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
