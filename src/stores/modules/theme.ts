import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const themeMode = ref<'light' | 'dark'>('light')
    const follow = ref(true)
    const mediaQuery = ref<MediaQueryList | null>(null)

    // 获取系统主题
    const getSystemTheme = (): 'light' | 'dark' => {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    // 主题变化处理函数
    const handleThemeChange = (e: MediaQueryListEvent) => {
      console.log('系统主题变化', e.matches)
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light')
                                  themeMode.value = e.matches ? 'dark' : 'light'
    }

    // 切换主题模式
    function setTheme(mode: 'light' | 'dark') {
      // 移除旧的媒体查询监听
      mediaQuery.value?.removeEventListener('change', handleThemeChange)
      mediaQuery.value = null
      // 自动模式下设置监听
      if (follow.value) {
        // 创建新的媒体查询监听
        mediaQuery.value = window.matchMedia('(prefers-color-scheme: dark)')
        // 监听系统主题变化
        mediaQuery.value.addEventListener('change', handleThemeChange)
      }
      // 设置新模式并应用主题
      themeMode.value = follow.value ? getSystemTheme() : mode
      document.documentElement.setAttribute('data-theme', themeMode.value)
    }
    function initTheme() {
      onMounted(() => {
        setTheme(themeMode.value)
      })
    }

    return { themeMode, setTheme, initTheme }
  },
  {
    persist: { storage: localStorage, pick: ['themeMode'] },
  },
)
