<template>
  <div
    @click="handleClick"
    @contextmenu.prevent="handleContextMenu"
    class="w-full h-full top-0 left-0 right-0 bottom-0 bg-blue-50 fixed z-1 transition-all duration-200 bg-cover bg-center"
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
import { useHomeStore, useSearchStore } from '@/stores'
import { storeToRefs } from 'pinia'
const searchStore = useSearchStore()
const homeStore = useHomeStore()
const { tabIndex } = storeToRefs(homeStore)

const { searchFocus } = storeToRefs(searchStore)

const handleClick = () => {
  if (tabIndex.value == 0) {
    return
  }
  tabIndex.value = 0
}
const handleContextMenu = () => {
  if (tabIndex.value == 1) {
    return
  }
  tabIndex.value = 1
}
</script>

<style scoped></style>
