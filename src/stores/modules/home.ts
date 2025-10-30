import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHomeStore = defineStore(
  'home',
  () => {
    const systemVisible = ref(false)
    const autoHideDock = ref(false)
    const tabIndex = ref(0)

    const switchTab = () => {
      tabIndex.value = tabIndex.value == 0 ? 1 : 0
    }

    return {
      tabIndex,
      switchTab,
      systemVisible,
      autoHideDock,
    }
  },
  {
    persist: {
      storage: localStorage,

      pick: ['autoHideDock'],
    },
  },
)
