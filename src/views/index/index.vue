<template>
  <background></background>
  <div class="flex flex-col w-full h-full fixed">
    <div class="flex-1">
      <search></search>
      <box></box>
    </div>
    <quote></quote>
    <about></about>
    <copyright></copyright>
  </div>
</template>

<script setup>
import about from './components/about.vue'
import background from './components/background.vue'
import box from './components/box.vue'
import copyright from './components/copyright.vue'
import quote from './components/quote.vue'
import search from './components/search.vue'
</script>

<style scoped></style>
