<template>
  <div class="theme-dropdown top-10 right-10 fixed z-30">
    <!-- 点击触发按钮 -->
    <div @click="toggleTheme">
      <span>
        {{ themeMode.value === 'dark' ? '深色模式' : '浅色模式' }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { useThemeStore } from '@/stores'
const themeStore = useThemeStore()
const { setTheme } = themeStore
const { themeMode } = storeToRefs(themeStore)
const toggleTheme = () => {
  themeMode.value = themeMode.value === 'dark' ? 'light' : 'dark'
  setTheme(themeMode.value)
}
// // 主题选项
// const list = ref([
//   { name: '跟随系统', value: 'default' },
//   { name: '暗黑模式', value: 'dark' },
//   { name: '简约白色', value: 'light' },
// ])
</script>

<style scoped></style>
