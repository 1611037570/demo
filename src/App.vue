<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <!-- <router-view /> -->
    <sf-dynamic-form />
  </ElConfigProvider>
</template>
