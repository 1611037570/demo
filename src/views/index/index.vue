<template>
  <div class="flex flex-col w-full h-full">
    <div class="flex-1">
      <search></search>
      <box></box>
    </div>
    <quote></quote>
    <copyright></copyright>
  </div>
</template>

<script setup>
import box from './components/box.vue'
import copyright from './components/copyright.vue'
import quote from './components/quote.vue'
import search from './components/search.vue'
</script>

<style scoped></style>
