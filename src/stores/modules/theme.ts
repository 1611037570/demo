import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const themeMode = ref<'light' | 'dark'>('light')

    // 切换主题模式
    function setTheme(mode: 'light' | 'dark') {
      themeMode.value = mode
      document.documentElement.setAttribute('data-theme', themeMode.value)
    }
    function initTheme() {
      setTheme(themeMode.value)
    }

    return { themeMode, setTheme, initTheme }
  },
  {
    persist: { storage: localStorage, pick: ['themeMode'] },
  },
)
