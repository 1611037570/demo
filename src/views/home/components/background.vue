<template>
  <div
    @click="handleClick"
    @contextmenu.prevent="handleContextMenu"
    class="fixed top-0 right-0 bottom-0 left-0 h-full w-full bg-blue-50 bg-cover bg-center transition-all duration-200"
    :class="[searchFocus ? 'z-50' : 'z-1']"
    :style="{
      filter: searchFocus || tabIndex == 1 ? 'blur(10px)' : 'blur(0px)',
      transform:
        searchFocus && tabIndex == 1
          ? 'scale(1.2)'
          : searchFocus || tabIndex == 1
            ? 'scale(1.1)'
            : 'scale(1)',
      backgroundImage: `url(${bg})`,
    }"
  ></div>
</template>

<script setup>
// background-image: url('https://cn.bing.com/th?id=OHR.SunbeamsForest_ZH-CN5358008117_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp');
import bg from '@/assets/images/background.jpg'
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
  if (tabIndex.value == 1 && searchFocus.value) {
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
