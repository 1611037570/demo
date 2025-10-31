<template>
  <el-tooltip :effect="themeMode" :content="info" placement="top">
    <SfIcon icon="mingcute:question-line" size="4" />
  </el-tooltip>
</template>

<script setup>
import { useThemeStore } from '@/stores'
const themeStore = useThemeStore()
const { themeMode } = storeToRefs(themeStore)

defineProps({
  info: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped></style>
