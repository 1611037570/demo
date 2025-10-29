<template>
  <div class="theme-dropdown fixed top-10 right-10 z-30">
    <!-- 点击触发按钮 -->
    <SfMenu :list="list">
      <div>
        {{ themeMode }}
      </div>
    </SfMenu>
  </div>
</template>

<script setup>
import { useThemeStore } from '@/stores'
import { ref } from 'vue'
const themeStore = useThemeStore()
const { themeMode } = storeToRefs(themeStore)

// 主题选项
const list = ref([
  { name: '跟随系统', value: 'default' },
  { name: '暗黑模式', value: 'dark' },
  { name: '简约白色', value: 'light' },
])
</script>

<style scoped></style>
