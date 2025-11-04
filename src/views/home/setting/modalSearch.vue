<template>
  <sf-set-box>
    <sf-set-item title="显示搜索历史" type="switch" v-model="searchHistoryVisible" />
    <sf-set-item title="显示应用内搜索" type="switch" v-model="appSourceVisible" />
    <sf-set-item title="显示快捷方式" type="switch" v-model="shortcutVisible" />
    <sf-set-item title="显示热门搜索" type="switch" v-model="hotSourceVisible" />
  </sf-set-box>
</template>

<script setup>
import { useSearchStore } from '@/stores'
import { storeToRefs } from 'pinia'
const searchStore = useSearchStore()
const { searchHistoryVisible, appSourceVisible, shortcutVisible, hotSourceVisible } =
  storeToRefs(searchStore)
</script>

<style lang="scss" scoped></style>
