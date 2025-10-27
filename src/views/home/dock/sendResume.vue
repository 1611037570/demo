<template>
  <div
    class="transition-all duration-200 w-10 h-10 rounded-lg bg-white/80 backdrop-blur-md flex items-center justify-center text-[10px]"
    @click="sendResume"
  >
    投简历
  </div>
</template>

<script setup>
const sendResume = () => {
  window.open('https://www.zhipin.com/')
}
</script>

<style scoped></style>
