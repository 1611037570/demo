<template>
  <div
    class="w-10 h-10 rounded-lg bg-white/80 backdrop-blur-md flex items-center justify-center"
    @click="openAbout"
  >
    <ElImage
      :src="snowIcon"
      class="w-7.5 h-7.5 hover:rotate-180 transition-all duration-200"
      fit="contain"
    />
    <Modal v-if="aboutVisible" />
  </div>
</template>

<script setup>
import snowIcon from '@/assets/images/snow.svg'
import Modal from './modal.vue'

const aboutVisible = ref(false)

const openAbout = () => {
  aboutVisible.value = true
}
</script>

<style scoped>
/* 添加容器悬停效果 */
.sf-set-container {
  transition: all 0.2s ease;
}

/* 确保内容区域有良好的间距 */
.text-center {
  margin: 16px 0;
}
</style>
