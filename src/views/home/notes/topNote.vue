<script setup>
import { useNoteStore } from '@/stores'
const noteStore = useNoteStore()
const { topNoteList } = storeToRefs(noteStore)
</script>

<template>
  <div class="top-12 left-12">
    123
    <div v-for="item in topNoteList" :key="item.id">
      {{ item.value }}
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
