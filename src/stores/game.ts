import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameStore = defineStore(
  'game',
  () => {
    const fish = ref({
      count: 0,
    })

    return { fish }
  },
  {
    persist: true,
  },
)
