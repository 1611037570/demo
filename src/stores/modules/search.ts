import { defineStore } from 'pinia'
import { ref } from 'vue'

type OpenMode = '_blank' | '_self'

export const useSearchStore = defineStore(
  'search',
  () => {
    // 搜索框是否聚焦
    const searchFocus = ref(false)
    // 搜索历史
    const searchHistory = ref([])
    // 打开方式
    const openMode = ref<OpenMode>('_blank')
    // 搜索历史
    const searchHistoryVisible = ref(true)
    // 是否显示应用内搜索
    const showAppSource = ref(true)
    const currentWebIndex = ref(0)

    // 添加搜索历史记录
    const addSearchHistory = (source: any) => {
      const historyList = searchHistory.value

      // 检查并移除重复记录（若存在）
      const duplicateIndex = historyList.findIndex((item: any) => item.value == source.value)
      if (duplicateIndex !== -1) {
        historyList.splice(duplicateIndex, 1) // 移除旧的重复项
      }

      // 添加新记录到头部
      historyList.unshift(source)

      // 检查是否溢出，超过最大长度则删除最旧的记录
      if (historyList.length > 10) {
        historyList.pop()
      }
    }

    // 移除搜索历史记录
    const removeSearchHistory = (index: number) => {
      searchHistory.value.splice(index, 1)
    }

    // 清空搜索历史
    const clearSearchHistory = () => {
      searchHistory.value = []
    }

    return {
      currentWebIndex,
      searchFocus,
      searchHistory,
      searchHistoryVisible,
      openMode,
      showAppSource,
      addSearchHistory,
      removeSearchHistory,
      clearSearchHistory,
    }
  },
  {
    persist: {
      pick: ['searchFocus', 'searchHistory', 'searchHistoryVisible'],
    },
  },
)
