<template>
  <el-input v-model="modelValue" v-bind="$attrs" class="text-sf-text">
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
/* 输入框容器 */
:deep(.el-input__wrapper) {
  /* 移除阴影 */
  box-shadow: none;
  /* 移除背景 */
  background-color: transparent;
}

/* 输入框文本 */
:deep(.el-input__inner) {
  /* 更改文本颜色 */
  color: var(--color-sf-text);
}
/* 输入框占位符 */
:deep(.el-input__inner::placeholder) {
  /* 更改占位符颜色 */
  color: var(--color-sf-text);
}
</style>
