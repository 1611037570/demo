<template>
  <el-input v-model="modelValue" v-bind="$attrs">
    <template #prefix>
      <slot name="prefix"></slot>
    </template>
    <template #suffix>
      <slot name="suffix"></slot>
    </template>
  </el-input>
</template>

<script setup>
const modelValue = defineModel({
  default: '',
})
</script>

<style scoped>
:deep(.el-input__wrapper) {
  box-shadow: none !important;
}
:deep(.el-input__wrapper) {
  background-color: transparent !important;
}

:deep(.el-input__inner::placeholder) {
  color: var(--color-sf-text) !important;
}
</style>
