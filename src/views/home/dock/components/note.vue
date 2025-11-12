<template>
  <div
    class="h-10 w-10 rounded-lg bg-white/80 backdrop-blur-md flex items-center justify-center text-[10px] transition-all duration-200"
    @click="openNote"
  >
    便签
  </div>
</template>

<script setup>
import { useNoteStore } from '@/stores'
const noteStore = useNoteStore()
const { noteVisible } = storeToRefs(noteStore)

const openNote = () => {
  noteVisible.value = true
}
</script>

<style scoped></style>
