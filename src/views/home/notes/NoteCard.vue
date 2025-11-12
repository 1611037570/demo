<template>
  <div
    class="rounded-xl shadow-md border-opacity-5 hover:shadow-lg absolute transform-gpu cursor-pointer overflow-hidden border will-change-transform select-none"
    :style="[cardStyle, cardStyle1]"
    @click="handleClick"
  >
    <div
      class="font-semibold text-black/72 p-4 text-base flex h-full w-full flex-1 items-center justify-center text-center break-words whitespace-normal"
    >
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { getRandomItem } from '@/utils'
import { useId } from 'vue'
import { colors, list } from './data'
const id = useId()
const topId = defineModel('topId')
function handleClick() {
  console.log('id:', id)
  topId.value = id
}
const props = defineProps({
  cardStyle: {
    type: Object,
    required: true,
  },
})

const message = getRandomItem(list)
const zIndex = Math.floor(Math.random() * 10)
const backgroundColor = getRandomItem(colors)
const cardStyle1 = computed(() => {
  return {
    background: backgroundColor,
    zIndex: topId.value === id ? 9999999 : zIndex,
  }
})
</script>

<style scoped></style>
