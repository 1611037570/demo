import { generateUUID } from '@/utils'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { default_data, list } from '../datas/index.data'

export const useHomeStore = defineStore(
  'home',
  () => {
    // 数据列表
    const shortcutList = ref(list)
    const systemVisible = ref(false)
    const autoHideDock = ref(false)
    const tabIndex = ref(0)
    const initShortcutList = () => {
      shortcutList.value = shortcutList.value.map((item: any) => ({
        ...default_data,
        ...item,
        id: item?.id || generateUUID(),
      }))
    }

    const switchTab = () => {
      tabIndex.value = tabIndex.value == 0 ? 1 : 0
    }
    const addShortcut = (item: any) => {
      shortcutList.value.push({
        ...default_data,
        ...item,
        id: generateUUID(),
      })
    }

    return {
      shortcutList,
      tabIndex,
      initShortcutList,
      addShortcut,
      switchTab,
      systemVisible,
      autoHideDock,
    }
  },
  {
    persist: {
      pick: ['shortcutList', 'systemVisible', 'autoHideDock'],
    },
  },
)
