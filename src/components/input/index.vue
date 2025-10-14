<template>
  <el-input v-model="modelValue" v-bind="$attrs" />
</template>

<script setup>
const modelValue = defineModel({
  default: '',
})
</script>

<style lang="scss" scoped></style>
