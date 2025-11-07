<script setup lang="ts">
import { useThemeStore } from '@/stores'
import LoadingComponent from '@views/status/loading.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const themeStore = useThemeStore()
const { initTheme } = themeStore
initTheme()

// https://cdn.jsdelivr.net/npm/pinyin@4.0.0/lib/umd/pinyin.min.js
// https://www.bootcdn.cn/
// https://www.jsdelivr.com/?query=vue
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
