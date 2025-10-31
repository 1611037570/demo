<script setup>
import { useSearchStore, useShortcutStore } from '@/stores'
import Item from './item.vue'
import SearchTitle from './searchTitle.vue'
const shortcutStore = useShortcutStore()
const searchStore = useSearchStore()
const { searchValue } = storeToRefs(searchStore)
const { open } = searchStore
const { shortcutList } = storeToRefs(shortcutStore)
// 匹配的快捷键
const matchShortcut = computed(() => {
  if (!searchValue.value) return []

  // 找到所有匹配的快捷键
  return shortcutList.value.filter((item) => item.name.includes(searchValue.value))
})
</script>

<template>
  <SearchTitle
    title="你的快捷方式"
    info="快捷方式是你已添加网站的链接，你可以通过输入快捷方式名直接打开。"
    icon="material-symbols:article-shortcut-rounded"
    iconClass=" text-emerald-400"
  />
  <div v-if="matchShortcut.length" class="gap-3 mb-3 flex flex-wrap">
    <Item v-for="item in matchShortcut" :key="item.name" @click="open(item.url)">
      {{ item.name }}
    </Item>
  </div>
  <div v-else class="mb-3 text-sm text-center">暂无快捷方式</div>
</template>

<style lang="scss" scoped></style>
