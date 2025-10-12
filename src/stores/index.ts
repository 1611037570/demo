import { generateUUID } from '@/utils/getUUID'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { default_data, list } from './index.data'
type OpenMode = '_blank' | '_self'
console.log('generateUUID', generateUUID())

export const useIndexStore = defineStore(
  'index',
  () => {
    const navList = ref(list)

    const openMode = ref<OpenMode>('_blank')

    const initNavList = () => {
      navList.value = navList.value.map((item: any) => ({
        ...default_data,
        ...item,
        id: item.id || generateUUID(),
      }))
    }

    return { navList, openMode, initNavList }
  },
  {
    // persist: {
    //   pick: ['navList'],
    // },
    persist: true,
  },
)
