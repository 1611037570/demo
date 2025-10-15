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
    // 打开方式
    const openMode = ref<OpenMode>('_blank')
    // 搜索框是否聚焦
    const searchFocus = ref(false)
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

    return { shortcutList, openMode, searchFocus, initShortcutList, addShortcut }
  },
  {
    // persist: {
    //   pick: ['shortcutList'],
    // },
    persist: true,
  },
)
