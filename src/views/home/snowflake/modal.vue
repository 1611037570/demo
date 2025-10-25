<template>
  <SfModal v-if="aboutVisible" v-model="aboutVisible">
    <SfSetContainer :list="list" v-model="activeTab">
      <div class="w-[400px] h-1"></div>
      <ModalProject v-if="activeTab === 'project'" />
      <ModalApi v-else-if="activeTab === 'api'" />
    </SfSetContainer>
  </SfModal>
</template>

<script setup>
import ModalApi from './modalApi.vue'
import ModalProject from './modalProject.vue'
const aboutVisible = ref(true)

const list = [
  { name: '关于项目', value: 'project' },
  { name: '关于我', value: 'about-me' },
  { name: '接口文档', value: 'api' },
  { name: '技术栈', value: 'tech-stack' },
]
const activeTab = ref('project')
</script>

<style lang="scss" scoped></style>
