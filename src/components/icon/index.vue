<template>
  <div class="flex items-center justify-center cursor-pointer" :class="[`w-${size}`, `h-${size}`]">
    <Icon :icon="icon" width="100%" height="100%" />
    <span v-if="text">{{ text }}</span>
  </div>
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
  iconSize?: number | string
}

withDefaults(defineProps<IconProps>(), {
  icon: '',
  text: '',
  size: 16,
})
</script>
