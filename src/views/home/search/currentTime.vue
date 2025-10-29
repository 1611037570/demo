<template>
  <div class="mb-3 text-5xl font-bold z-10 cursor-pointer" @click="updateTab">
    <span>
      {{ time }}
    </span>
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
