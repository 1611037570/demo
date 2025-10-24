<template>
  <div
    class="transition-all duration-200 w-10 h-10 rounded-lg bg-white/80 backdrop-blur-md flex items-center justify-center"
    @click="openAbout"
  >
    <el-image
      src="/public/favicon.ico"
      class="w-7.5 h-7.5 hover:rotate-180 transition-all duration-200"
      fit="contain"
    />
  </div>
  <sf-modal v-if="aboutVisible" v-model="aboutVisible">
    <sf-set-container :list="list">1</sf-set-container>
  </sf-modal>
</template>

<script setup>
const aboutVisible = ref(false)
const openAbout = () => {
  aboutVisible.value = true
}
const list = [
  {
    name: '关于项目',
    value: 'about',
  },
  {
    name: '关于我',
    value: 'about-me',
  },
]
</script>

<style lang="scss" scoped></style>
