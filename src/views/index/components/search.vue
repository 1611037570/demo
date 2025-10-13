<script setup lang="ts">
import { ref } from 'vue'

const searchText = ref('')

const handleSearch = () => {
  window.open('https://www.baidu.com/s?ie=utf-8&wd=' + searchText.value)
}
</script>

<template>
  <div class="h-12 flex justify-center my-12">
    <div class="w-[680px] flex">
      <sf-input
        v-model="searchText"
        placeholder="请输入搜索内容"
        clearable
        @keyup.enter="handleSearch"
      ></sf-input>
    </div>
    <div
      class="h-12 w-24 flex items-center justify-center bg-[#409eff] text-white cursor-pointer rounded-r-lg"
      @click="handleSearch"
    >
      搜索
    </div>
  </div>
</template>
<style scoped></style>
