<template>
  <div
    class="h-10 w-10 rounded-lg bg-white/80 backdrop-blur-md flex items-center justify-center text-[10px] transition-all duration-200"
    @click="openEmail"
  >
    邮箱
  </div>
</template>

<script setup>
const openEmail = () => {
  window.open('https://mail.qq.com/')
}
</script>

<style scoped></style>
