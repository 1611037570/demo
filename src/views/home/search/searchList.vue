<script setup>
import { useSearchStore } from '@/stores'
import { useEventListener } from '@vueuse/core'
const searchStore = useSearchStore()
const { searchValue, currentIndex } = storeToRefs(searchStore)

const { list, update } = defineProps({
  list: {
    type: Array,
    default: () => ['123', '456', '789', '012', '345', '678', '901', '234', '567', '890'],
  },
  update: {
    type: Boolean,
    default: false,
  },
})

const style = ['#E63946', '#FB8500', '#FFB703']

const listLength = computed(() => list.length)

// 切换选中项的函数
const setCurrentIndex = (index) => {
  currentIndex.value = index
  if (update) {
    searchValue.value = list[index]
  }
}

// 处理键盘事件
const handleKeydown = (event) => {
  console.log('event.key', event.key)

  let newIndex = currentIndex.value
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    newIndex = currentIndex.value <= 0 ? listLength.value - 1 : currentIndex.value - 1
    setCurrentIndex(newIndex)
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    newIndex = currentIndex.value >= listLength.value - 1 ? 0 : currentIndex.value + 1
    setCurrentIndex(newIndex)
  }
}

// 使用vueuse的useEventListener自动管理事件监听生命周期
useEventListener(document, 'keydown', handleKeydown)
</script>

<template>
  <div
    v-for="(item, index) in list"
    :key="item"
    class="rounded-lg px-2 py-1.5 text-sm hover:bg-blue-100 hover:text-blue-700 flex cursor-pointer items-center whitespace-nowrap text-sf-text transition-all duration-200"
    :class="{ 'bg-blue-100 text-sf-theme': currentIndex === index }"
    @click="setCurrentIndex(index)"
  >
    <div class="flex flex-1 items-center overflow-hidden">
      <div
        class="w-6 h-6 mr-3 text-xs text-white font-bold shadow-xl inline-flex items-center justify-center rounded-[6px] transition-colors duration-200"
        :style="{
          background: index < style.length ? style[index] : ' var(--color-sf-theme-hover) ',
        }"
      >
        {{ index + 1 }}
      </div>
      <div class="mr-3 flex-1 overflow-hidden text-ellipsis">
        {{ item }}
      </div>
    </div>
    <div class="flex items-center">
      {{ index === currentIndex ? '回车搜索' : '123123213' }}
    </div>
  </div>
</template>

<style scoped></style>
