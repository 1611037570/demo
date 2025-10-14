import { generateUUID } from '@/utils/getUUID'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { default_data, list } from './index.data'
type OpenMode = '_blank' | '_self'

export const useIndexStore = defineStore(
  'index',
  () => {
    // 数据列表
    const dataList = ref(list)
    // 打开方式
    const openMode = ref<OpenMode>('_blank')

    const initDataList = () => {
      dataList.value = dataList.value.map((item: any) => ({
        ...default_data,
        ...item,
        id: item.id || generateUUID(),
      }))
    }

    return { dataList, openMode, initDataList }
  },
  {
    // persist: {
    //   pick: ['dataList'],
    // },
    persist: true,
  },
)
