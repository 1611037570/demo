<template>
  <button
    class="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
  >
    <Icon :icon="icon" :size="size" />
    <span v-if="text">{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

export interface IconProps {
  /**
   * Iconify 图标名称
   */
  icon?: string

  /**
   * 按钮文本
   */
  text?: string

  /**
   * 图标大小
   */
  size?: number | string
}

withDefaults(defineProps<IconProps>(), {
  icon: '',
  text: '',
  size: 16,
})
</script>
