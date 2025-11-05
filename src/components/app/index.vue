<template>
  <SfMenu
    :list="menuList"
    class="flex cursor-pointer flex-col items-center justify-center"
    @click="handleClick"
  >
    <div
      class="rounded-xl bg-amber-200 flex items-center justify-center"
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
    <div class="h-6 text-sm flex items-center justify-center truncate">
      {{ name }}
    </div>
  </SfMenu>
</template>

<script setup lang="ts">
import { useSearchStore, useShortcutStore } from '@/stores'
import { storeToRefs } from 'pinia'

const searchStore = useSearchStore()
const shortcutStore = useShortcutStore()
const { shortcutList } = storeToRefs(shortcutStore)
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
      name: '分享',
      fn: () => {
        const data: any = {
          ...shortcutList.value[props.index],
        }
        // 需要过滤掉id
        delete data.id
        const json = JSON.stringify(data, null, 2)
        const blob = new Blob([json], {
          type: 'application/json; charset=utf-8',
        })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = data.name + '——快捷方式分享.json'
        a.click()
        // 清理资源
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      },
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
