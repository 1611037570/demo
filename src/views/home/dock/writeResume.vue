<template>
  <div
    class="transition-all duration-200 w-10 h-10 rounded-lg bg-white/80 backdrop-blur-md flex items-center justify-center text-[10px]"
    @click="openResume"
  >
    写简历
  </div>
  <indexModal v-if="indexVisible" />
</template>

<script setup>
import { useResumeStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent } from 'vue'

// 异步导入模态框组件
const indexModal = defineAsyncComponent(() => import('../../resume/index-modal.vue'))

const resumeStore = useResumeStore()
const { indexVisible } = storeToRefs(resumeStore)

const openResume = () => {
  indexVisible.value = true
}
</script>

<style scoped></style>
