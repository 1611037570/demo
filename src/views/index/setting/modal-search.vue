<template>
  <sf-set-box>
    <sf-set-item
      title="显示搜索历史"
      type="switch"
      v-model="showSearchHistory"
      @change="(val) => searchStore.setShowSearchHistory(val)"
    />
    <sf-set-item
      title="显示应用内搜索"
      type="switch"
      v-model="showAppSource"
      @change="(val) => searchStore.setShowAppSource(val)"
    />
  </sf-set-box>
</template>

<script setup>
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'
const searchStore = useSearchStore()
const { showSearchHistory, showAppSource } = storeToRefs(searchStore)
</script>

<style lang="scss" scoped></style>
