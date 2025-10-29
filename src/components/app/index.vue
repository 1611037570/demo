<template>
  <SfMenu :list="menuList">
    <div class="flex cursor-pointer flex-col items-center justify-center" @click="handleClick">
      <div
        class="flex items-center justify-center rounded-xl bg-amber-200"
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
      <div class="flex h-6 items-center justify-center truncate text-sm text-white">
        {{ name }}
      </div>
    </div>
  </SfMenu>
</template>

<script setup lang="ts">
import { useHomeStore, useSearchStore } from '@/stores'
import { storeToRefs } from 'pinia'

const homeStore = useHomeStore()
const searchStore = useSearchStore()
const { shortcutList } = storeToRefs(homeStore)
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
        console.log('删除')
        if (props.index === -1) return
        shortcutList.value.splice(props.index, 1)
        ElMessage.success('删除成功')
      },
    },
  ]
})

const handleClick = () => {
  if (props.type !== 'default') return
  window.open(props.value, openMode.value)
}
</script>
