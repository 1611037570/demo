<template>
  <el-tooltip :effect="themeMode" :content="info" placement="top">
    <slot>
      <SfIcon icon="mingcute:question-line" size="4" />
    </slot>
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
