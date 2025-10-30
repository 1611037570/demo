<script setup>
import { appSource } from '@/datas/search.data'
import { useSearchStore } from '@/stores'
import { storeToRefs } from 'pinia'
import SearchList from './searchList.vue'
import SearchTitle from './searchTitle.vue'
const searchStore = useSearchStore()
const { search } = searchStore
const { showAppSource } = storeToRefs(searchStore)
</script>

<template>
  <SearchTitle title="应用内搜索" v-if="showAppSource" />
  <div class="gap-2 flex flex-wrap" v-if="showAppSource">
    <div
      v-for="item in appSource"
      :key="item.type"
      class="rounded-lg bg-blue-300 px-2 py-1 text-white hover:-translate-y-0.5 hover:bg-blue-400 hover:shadow-md flex transform cursor-pointer items-center justify-center text-[13px] transition-all duration-200"
      @click="search(item)"
    >
      {{ item.type }}
    </div>
  </div>

  <SearchList :list="appSource" />
</template>

<style scoped></style>
