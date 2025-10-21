<template>
  <div
    class="w-full h-full bg-blue-50 fixed z-1 transition-all duration-300 bg-cover bg-center"
    :style="{
      filter: searchFocus || tabIndex == 1 ? 'blur(10px)' : 'blur(0px)',
      transform: searchFocus || tabIndex == 1 ? 'scale(1.1)' : 'scale(1)',
    }"
    style="
      background-image: url('https://cn.bing.com/th?id=OHR.SunbeamsForest_ZH-CN5358008117_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp');
    "
  ></div>
</template>

<script setup>
import { useIndexStore } from '@/stores/index'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'
const searchStore = useSearchStore()
const indexStore = useIndexStore()
const { tabIndex } = storeToRefs(indexStore)

const { searchFocus } = storeToRefs(searchStore)
</script>

<style scoped></style>
