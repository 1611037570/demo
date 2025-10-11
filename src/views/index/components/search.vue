<script setup lang="ts">
import { ref } from 'vue'

const searchText = ref('')

const handleSearch = () => {
  window.open('https://www.baidu.com/s?ie=utf-8&wd=' + searchText.value)
}
</script>

<template>
  <div class="flex">
    <el-input v-model="searchText" placeholder="请输入搜索内容" clearable></el-input>
    <el-button type="primary" @click="handleSearch">搜索</el-button>
  </div>
</template>
<style scoped></style>
