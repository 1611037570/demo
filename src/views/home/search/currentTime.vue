<template>
  <div
    class="text-5xl font-bold cursor-pointer z-10 text-white transition-all duration-300 mb-3"
    @click="updateTab"
  >
    {{ time }}
  </div>
</template>

<script setup>
import { useCurrentTime } from '@/hooks'
import { useHomeStore, useSearchStore } from '@/stores'
const searchStore = useSearchStore()
const { searchFocus } = storeToRefs(searchStore)

const homeStore = useHomeStore()
const { time } = useCurrentTime()
const { switchTab } = homeStore

const updateTab = () => {
  if (searchFocus.value) {
    return
  }
  switchTab()
}
</script>

<style lang="scss" scoped></style>
