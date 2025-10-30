import { default_data, list } from '@/datas/home.data'
import { generateUUID } from '@/utils'
import { defineStore } from 'pinia'

export const useShortcutStore = defineStore(
  'shortcut',
  () => {
    // 数据列表
    const shortcutList = ref(list)
    const initShortcutList = () => {
      shortcutList.value = shortcutList.value.map((item: any) => ({
        ...default_data,
        ...item,
        id: item?.id || generateUUID(),
      }))
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
      initShortcutList,
      addShortcut,
    }
  },
  {
    persist: {
      storage: localStorage,
      pick: ['shortcutList'],
    },
  },
)
