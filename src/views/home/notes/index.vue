<script setup>
import { useNoteStore } from '@/stores'
const noteStore = useNoteStore()
const { noteList } = storeToRefs(noteStore)

const noteVisible = ref(true)
</script>

<template>
  <SfModal v-model="noteVisible" v-if="noteVisible">
    <div class="flex h-[500px] w-[600px]">
      <div class="flex w-[200px] flex-col">1</div>
      <div class="flex flex-1 flex-col">
        <div class="gap-3 flex">
          <div>置顶</div>
          <div>设为待办</div>
          <div>Md</div>
          <div>颜色</div>
          <div>删除</div>
        </div>
        <div class="bg-pink-400 w-full flex-1"></div>
      </div>
    </div>
  </SfModal>
</template>
<style lang="scss" scoped></style>
