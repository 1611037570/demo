import { generateUUID } from '@/utils/getUUID'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { default_data, list } from './index.data'
type OpenMode = '_blank' | '_self'

export const useIndexStore = defineStore(
  'index',
  () => {
    // 数据列表
    const shortcutList = ref(list)

    const tabIndex = ref(0)
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
      tabIndex,
      initShortcutList,
      addShortcut,
    }
  },
  {
    // persist: {
    //   pick: ['shortcutList'],
    // },
    persist: true,
  },
)
