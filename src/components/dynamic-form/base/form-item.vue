<template>
  <el-form-item :label="config.label" :prop="config.data.key">
    <template #label>
      <div class="flex items-center font-bold w-full h-full">{{ config.label }} +</div>
    </template>
    <slot />
  </el-form-item>
</template>

<script setup>
const { config } = defineProps({
  config: {
    type: Object,
  },
})
</script>

<style scoped>
:deep(.el-form-item__label) {
  height: 100% !important;
}
</style>
