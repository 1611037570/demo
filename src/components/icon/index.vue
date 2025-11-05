<template>
  <div
    class="relative flex cursor-pointer items-center justify-center overflow-hidden transition-all duration-300"
    :style="{
      width: `calc(var(--spacing) * ${size})`,
      height: `calc(var(--spacing) * ${size})`,
    }"
  >
    <Icon
      :icon="icon"
      width="100%"
      height="100%"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    />
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
   * 图标大小
   */
  size?: number | string
  iconSize?: number | string
}

withDefaults(defineProps<IconProps>(), {
  icon: '',
  size: 16,
})
</script>
