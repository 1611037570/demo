<template>
  <div>
    <div
      class="h-10 w-10 rounded-lg bg-white/80 backdrop-blur-md flex items-center justify-center text-[10px] transition-all duration-200"
      @click="visible = true"
    >
      添加
    </div>
    <AppCenter v-model="visible" />
  </div>
</template>

<script setup>
import AppCenter from '@/views/home/appCenter/index.vue'

const visible = ref(false)
</script>

<style scoped></style>
