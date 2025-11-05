import { default_data, default_list } from '@/datas/home.data'
import { getUUID } from '@/utils'
import { defineStore } from 'pinia'
import pinyin from 'pinyin'

export const useShortcutStore = defineStore(
  'shortcut',
  () => {
    // 数据列表
    function getPinyin(str: string) {
      const pinyinStr: any = pinyin(str, {
        // 紧凑风格
        compact: true,
        // 多音字模式
        heteronym: false,
        // 普通风格
        style: pinyin.STYLE_NORMAL,
      })

      return pinyinStr[0].join('')
    }
    const shortcutList = ref(default_list)
    const initShortcutList = () => {
      shortcutList.value = shortcutList.value.map((item: any) => ({
        ...default_data,
        ...item,
        id: item?.id || getUUID(),
        pinyin: item?.pinyin || getPinyin(item.name),
      }))
    }
    const addShortcut = (item: any) => {
      shortcutList.value.push({
        ...default_data,
        ...item,
        id: getUUID(),
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
