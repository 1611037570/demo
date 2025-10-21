import { defineStore } from 'pinia'
import { ref } from 'vue'

type OpenMode = '_blank' | '_self'

export const useSearchStore = defineStore(
  'search',
  () => {
    // 搜索配置
    const searchConfig = ref({
      placeholder: '搜索',
      // 历史记录
      history: [],
    })
    // 搜索框是否聚焦
    const searchFocus = ref(false)
    // 搜索历史
    const searchHistory = ref([])
    // 打开方式
    const openMode = ref<OpenMode>('_blank')
    // 是否显示搜索历史
    const showSearchHistory = ref(true)
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

    // 设置搜索框聚焦状态
    const setSearchFocus = (focus: boolean) => {
      searchFocus.value = focus
    }

    // 设置打开方式
    const setOpenMode = (mode: OpenMode) => {
      openMode.value = mode
    }
    // 设置搜索历史禁用状态
    const setShowSearchHistory = (disabled: boolean) => {
      showSearchHistory.value = disabled
    }
    // 设置是否显示应用内搜索
    const setShowAppSource = (show: boolean) => {
      showAppSource.value = show
    }
    return {
      currentWebIndex,
      searchFocus,
      searchHistory,
      showSearchHistory,
      openMode,
      showAppSource,
      addSearchHistory,
      removeSearchHistory,
      clearSearchHistory,
      setSearchFocus,
      setOpenMode,
      setShowSearchHistory,
      setShowAppSource,
    }
  },
  {
    persist: true,
  },
)
