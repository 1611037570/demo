<template>
  <SfModal v-if="aboutVisible" v-model="aboutVisible">
    <SfSetContainer :list="list" v-model="activeTab" class="h-[600px]">
      <div class="h-1 w-[500px]"></div>
      <ModalProject v-if="activeTab === 'project'" />
      <ModalApi v-else-if="activeTab === 'api'" />
      <ModalMe v-else-if="activeTab === 'me'" />
      <ModalTech v-else-if="activeTab === 'tech'" />
      <ModalDonation v-else-if="activeTab === 'donation'" />
    </SfSetContainer>
  </SfModal>
</template>

<script setup>
import ModalApi from './modalApi.vue'
import ModalDonation from './modalDonation.vue'
import ModalMe from './modalMe.vue'
import ModalProject from './modalProject.vue'
import ModalTech from './modalTech.vue'
const aboutVisible = ref(true)

const list = [
  { name: '关于项目', value: 'project' },
  { name: '关于我', value: 'me' },
  { name: '接口文档', value: 'api' },
  { name: '技术栈', value: 'tech' },
  { name: '捐助我', value: 'donation' },
]
const activeTab = ref('project')
</script>

<style lang="scss" scoped></style>
