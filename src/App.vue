<script setup lang="ts">
import LoadingComponent from '@views/status/loading.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view v-slot="{ Component }">
      <component :is="Component || LoadingComponent" />
    </router-view>
  </el-config-provider>
</template>

<style scoped></style>
