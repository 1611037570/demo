<script setup>
import { useNoteStore } from '@/stores'
const noteStore = useNoteStore()
const { topNoteList } = storeToRefs(noteStore)
const expand = ref(false)
</script>
<template>
  <div
    class="top-0 left-0 gap-3 py-20 pl-12 fixed z-50 flex w-[340px] transform flex-col transition-all duration-300"
    :class="[expand ? 'translate-x-[0%]' : 'translate-x-[-70%]']"
    @mouseenter="expand = true"
    @mousemove="expand = true"
    @mouseleave="expand = false"
  >
    <div
      v-for="item in topNoteList"
      :key="item.id"
      class="p-3 rounded-lg bg-white w-[240px] cursor-pointer"
    >
      <SfIcon
        v-if="item.todo"
        icon="pajamas:todo-done"
        size="5"
        @click="item.todoDone = !item.todoDone"
        boxSize="8"
        :class="[
          {
            'bg-sf-theme-hover text-sf-theme': item.todoDone,
          },
        ]"
        class="rounded-lg bg-sf-primary-hover hover:bg-sf-theme-hover hover:text-sf-theme"
      />
      {{ item.value }}12331231
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
