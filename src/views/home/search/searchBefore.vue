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
    <div class="flex flex-wrap gap-2.5 mb-3">
      <div
        @click="openHistory(item)"
        v-for="(item, index) in searchHistory"
        :key="index"
        class="bg-blue-50 px-3 py-1 rounded-lg cursor-pointer hover:bg-blue-100 whitespace-nowrap transition-all duration-200 text-xs max-w-48 group relative flex"
      >
        <div class="overflow-hidden text-ellipsis flex-1">
          {{ item.value }}
        </div>
        <span
          class="text-gray-400 cursor-pointer ml-1.5 hover:text-red-500 transition-all duration-200 opacity-70 group-hover:opacity-100"
          @click.stop="removeHistory(index)"
          >×</span
        >
      </div>
    </div>
  </template>
  <search-title title="热门搜索"> </search-title>
  <div class="flex flex-wrap gap-3 mb-3">
    <div
      v-for="item in list"
      :key="item.name"
      class="bg-blue-50 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-100 transition-all duration-200 text-sm whitespace-nowrap hover:text-blue-700"
    >
      {{ item.name }}
    </div>
  </div>
  <div
    v-for="item in 10"
    :key="item"
    class="px-3 py-1.75 rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-700 whitespace-nowrap transition-all duration-200 text-sm"
  >
    {{ item }}
  </div>
</template>

<style scoped>
/* Tailwind CSS is used for styling */
</style>
