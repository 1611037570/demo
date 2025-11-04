<script setup>
import { useSearchStore } from '@/stores'
import { storeToRefs } from 'pinia'
import Item from './item.vue'
import SearchList from './searchList.vue'
import SearchTitle from './searchTitle.vue'

const searchStore = useSearchStore()
const { searchHistory, searchHistoryVisible, openMode, hotSource, hotSourceVisible } =
  storeToRefs(searchStore)
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

const hotList = [
  {
    name: '百度',
    value: '百度',
  },
  {
    name: '抖音',
    value: '抖音',
  },
  {
    name: '微博',
    value: '微博',
  },
]
</script>

<template>
  <template v-if="searchHistoryVisible && searchHistory.length">
    <search-title title="搜索历史" icon="tabler:history" iconClass="text-sf-theme">
      <template #right> <span @click.stop="clearHistory">清空全部</span> </template>
    </search-title>
    <div class="mb-3 gap-2 flex flex-wrap">
      <Item @click="openHistory(item)" v-for="(item, index) in searchHistory" :key="index">
        <div class="flex-1 overflow-hidden text-ellipsis text-sf-text">
          {{ item.value }}
        </div>

        <template #right>
          <SfIcon
            icon="formkit:close"
            class="ml-1.5 hover:text-red-500"
            size="4"
            @click.stop="removeHistory(index)"
          />
        </template>
      </Item>
    </div>
  </template>

  <SearchTitle title="热门搜索" icon="bxs:hot" iconClass="text-red-400" v-if="hotSourceVisible">
    <template #right>
      <SfTab :list="hotList" v-model="hotSource" />
    </template>
  </SearchTitle>
  <SearchList v-if="hotSourceVisible" />
</template>

<style scoped>
/* Tailwind CSS is used for styling */
</style>
