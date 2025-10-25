<template>
  <div class="fixed bottom-0 left-0 right-0 w-full h-48 group z-1">
    <div
      class="flex items-center justify-center p-2.5 bg-white/20 mx-auto rounded-xl gap-3 fixed transform -translate-x-1/2 left-1/2 transition-all duration-500 z-20 cursor-pointer"
      :class="[autoHideDock ? 'group-hover:bottom-[50px] -bottom-[100px]' : 'bottom-[50px]']"
      style="-webkit-backdrop-blur: 10px; backdrop-filter: blur(10px)"
    >
      <Launchpad />
      <Background />
      <div
        class="transition-all duration-200 w-10 h-10 rounded-lg bg-white/80 backdrop-blur-md flex items-center justify-center group"
        @click="openSet"
      >
        <SfIcon
          icon="fluent:settings-24-regular"
          size="8"
          class="hover:rotate-180 transition-all duration-200"
        />
      </div>
      <WriteResume />

      <div
        class="transition-all duration-200 w-10 h-10 rounded-lg bg-white/80 backdrop-blur-md flex items-center justify-center text-[10px]"
        @click="sendResume"
      >
        投简历
      </div>
      <Snowflake />
    </div>
  </div>
</template>

<script setup>
import { useHomeStore } from '@/stores'
import { storeToRefs } from 'pinia'
import Snowflake from '../snowflake/index.vue'
import Background from './background.vue'
import Launchpad from './launchpad.vue'
import WriteResume from './writeResume.vue'

const homeStore = useHomeStore()
const { systemVisible, autoHideDock } = storeToRefs(homeStore)
const openSet = () => {
  systemVisible.value = true
}
const sendResume = () => {
  window.open('https://www.zhipin.com/')
}
</script>

<style lang="scss" scoped></style>
