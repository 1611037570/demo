<template>
  <div
    class="hover:scale-105 transition-all duration-200 w-10 h-10 rounded-lg bg-white/80 backdrop-blur-md flex items-center justify-center text-[10px]"
    @click="openResume"
  >
    写简历
  </div>
  <indexModal v-if="indexVisible" />
</template>

<script setup>
import { useResumeStore } from '@/stores/resume'
import { storeToRefs } from 'pinia'
import indexModal from '../../resume/index-modal.vue'

const resumeStore = useResumeStore()
const { indexVisible } = storeToRefs(resumeStore)

const openResume = () => {
  indexVisible.value = true
}
</script>

<style lang="scss" scoped></style>
