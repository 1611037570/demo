<template>
  <sf-set-box>
    <sf-set-item title="显示搜索历史" type="switch" v-model="searchHistoryVisible" />
    <sf-set-item title="显示应用内搜索" type="switch" v-model="showAppSource" />
  </sf-set-box>
</template>

<script setup>
import { useSearchStore } from '@/stores'
import { storeToRefs } from 'pinia'
const searchStore = useSearchStore()
const { searchHistoryVisible, showAppSource } = storeToRefs(searchStore)
</script>

<style lang="scss" scoped></style>
