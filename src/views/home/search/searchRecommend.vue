<script setup>
import { appSource } from '@/datas/search.data'
import { useSearchStore } from '@/stores'
import { storeToRefs } from 'pinia'
import SearchList from './searchList.vue'
import SearchTitle from './searchTitle.vue'
const searchStore = useSearchStore()
const { showAppSource } = storeToRefs(searchStore)
</script>

<template>
  <SearchTitle title="应用内搜索" v-if="showAppSource" />
  <div class="flex flex-wrap gap-2" v-if="showAppSource">
    <div
      v-for="item in appSource"
      :key="item.type"
      class="px-2 py-1 rounded-lg bg-blue-300 text-white cursor-pointer transition-all duration-200 hover:bg-blue-400 hover:shadow-md transform hover:-translate-y-0.5 text-[13px] flex items-center justify-center"
      @click="goSearch(item)"
    >
      {{ item.type }}
    </div>
  </div>

  <SearchList :list="appSource" />
</template>

<style scoped></style>
