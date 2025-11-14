<script setup>
import { useShortcutStore } from '@/stores'
import SearchTitle from './searchTitle.vue'
const shortcutStore = useShortcutStore()
const { fixedList } = storeToRefs(shortcutStore)
</script>

<template>
  <SearchTitle title="已固定" icon="tabler:history" iconClass="text-sf-theme" />
  <div class="gap-4 grid grid-cols-8">
    <div
      v-for="item in fixedList"
      :key="item.id"
      class="bg-white/80 backdrop-blur-sm w-14 h-16 text-sm flex-c rounded-xl cursor-pointer flex-col overflow-hidden text-sf-text hover:bg-sf-theme-hover"
    >
      <SfMixImg :type="item.imgType" :value="item.imgValue" :size="24" />
      <div class="text-xs mt-2 px-1 w-full truncate text-center">{{ item.name }}</div>
    </div>
  </div>
</template>
<style scoped></style>
