<template>
  <div class="text-sm font-bold p-3">{{ title }}</div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped></style>
