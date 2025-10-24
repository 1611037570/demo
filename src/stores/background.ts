import { defineStore } from 'pinia'

export const useBackgroundStore = defineStore(
  'background',
  () => {
    const backgroundVisible = ref(false)

    return { backgroundVisible }
  },
  {
    persist: {
      pick: ['backgroundVisible'],
    },
  },
)
