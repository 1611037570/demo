<template>
  <sf-menu :list="menuList">
    <div class="flex items-center justify-center flex-col cursor-pointer" @click="handleClick">
      <div
        class="flex items-center justify-center bg-amber-200 rounded-xl"
        :style="{
          width: size + 'px',
          height: size + 'px',
        }"
      >
        <div
          class=""
          :style="{
            width: iconSize + 'px',
            height: iconSize + 'px',
          }"
        ></div>
      </div>
      <div class="h-6 flex items-center justify-center text-sm truncate text-white">
        {{ name }}
      </div>
    </div>
  </sf-menu>
</template>

<script setup lang="ts">
import { useIndexStore } from '@/stores/index'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'

const indexStore = useIndexStore()
const searchStore = useSearchStore()
const { shortcutList } = storeToRefs(indexStore)
const { openMode } = storeToRefs(searchStore)
export interface IconProps {
  /**
   * 应用大小
   */
  size?: number | string
  // 图标大小
  iconSize?: number | string
  /**
   * 应用名称
   */
  name?: number | string
  type?: 'custom' | 'default'
  index?: number
  value?: any
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 80,
  iconSize: 40,
  name: '',
  type: 'default',
  index: -1,
  value: '',
})
const menuList = computed(() => {
  if (props.type === 'custom') return []
  return [
    {
      name: '重新获取图标',
      fn: () => {},
    },
    {
      name: '删除',
      fn: () => {
        if (props.index === -1) return
        shortcutList.value.splice(props.index, 1)
      },
    },
  ]
})

const handleClick = () => {
  if (props.type !== 'default') return
  window.open(props.value, openMode.value)
}
</script>
