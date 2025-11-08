<template>
  <div class="mr-3 flex w-[200px] flex-col">
    <div @click="noteStore.addNote()">add</div>
    <div
      v-for="(item, index) in noteList"
      :key="index"
      @click="setCurrentIndex(index)"
      class="p-2 rounded-xl flex flex-col transition-all duration-300 hover:bg-sf-theme-hover"
      :class="{ 'bg-sf-theme': currentIndex === index }"
    >
      <div class="flex">
        <div class="h-5 flex items-center">
          <SfIcon
            icon="pajamas:todo-done"
            size="4"
            class="mr-1"
            v-if="item.todo"
            @click="item.todoDone = !item.todoDone"
          />
        </div>
        <div class="leading-5 text-sm" :class="{ 'line-through': item.todoDone }">
          {{ item.value }}只是打我个改善你o还带你不达瓦大能
        </div>
      </div>
      <div class="text-sm flex items-center text-sf-text-2">
        {{ dayjs(item.endTime).format('YYYY-MM-DD HH:mm') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNoteStore } from '@/stores'
import dayjs from 'dayjs'
const noteStore = useNoteStore()
const { noteList, currentIndex } = storeToRefs(noteStore)

const setCurrentIndex = (index) => {
  currentIndex.value = index
}
</script>

<style lang="scss" scoped></style>
