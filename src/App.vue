<script setup lang="ts">
import LoadingComponent from '@views/status/loading.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <Suspense>
      <!-- 默认插槽 -->
      <template #default>
        <RouterView v-slot="{ Component }">
          <Component :is="Component || LoadingComponent" />
        </RouterView>
      </template>
      <!-- 占位插槽 -->
      <template #fallback>
        <LoadingComponent />
      </template>
    </Suspense>
  </ElConfigProvider>
</template>

<style scoped></style>
