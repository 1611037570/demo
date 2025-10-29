<script setup>
import { useSearchStore } from '@/stores'
import { storeToRefs } from 'pinia'
import SearchTitle from './searchTitle.vue'

const searchStore = useSearchStore()
const { searchHistory, searchHistoryVisible, openMode } = storeToRefs(searchStore)
const openHistory = (item) => {
  window.open(item.url, openMode.value)
}

const removeHistory = (index) => {
  searchStore.removeSearchHistory(index)
}
// 清空搜索历史
const clearHistory = () => {
  searchStore.clearSearchHistory()
}

const list = [
  {
    name: '百度',
  },
  {
    name: '抖音',
  },
  {
    name: '微博',
  },
]
</script>

<template>
  <template v-if="searchHistoryVisible && searchHistory.length">
    <search-title title="搜索历史">
      <template #right> <span @click.stop="clearHistory">清空</span> </template>
    </search-title>
    <div class="mb-3 flex flex-wrap gap-2.5">
      <div
        @click="openHistory(item)"
        v-for="(item, index) in searchHistory"
        :key="index"
        class="group relative flex max-w-48 cursor-pointer rounded-lg bg-blue-50 px-3 py-1 text-xs whitespace-nowrap transition-all duration-200 hover:bg-blue-100"
      >
        <div class="flex-1 overflow-hidden text-ellipsis">
          {{ item.value }}
        </div>
        <span
          class="ml-1.5 cursor-pointer text-gray-400 opacity-70 transition-all duration-200 group-hover:opacity-100 hover:text-red-500"
          @click.stop="removeHistory(index)"
          >×</span
        >
      </div>
    </div>
  </template>
  <search-title title="热门搜索"> </search-title>
  <div class="mb-3 flex flex-wrap gap-3">
    <div
      v-for="item in list"
      :key="item.name"
      class="cursor-pointer rounded-lg bg-blue-50 px-4 py-2 text-sm whitespace-nowrap transition-all duration-200 hover:bg-blue-100 hover:text-blue-700"
    >
      {{ item.name }}
    </div>
  </div>
  <div
    v-for="item in 10"
    :key="item"
    class="cursor-pointer rounded-lg px-3 py-1.75 text-sm whitespace-nowrap transition-all duration-200 hover:bg-blue-100 hover:text-blue-700"
  >
    {{ item }}
  </div>
</template>

<style scoped>
/* Tailwind CSS is used for styling */
</style>
