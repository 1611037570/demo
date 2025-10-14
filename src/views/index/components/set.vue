<template>
  <div class="fixed top-12 right-12 z-20" @click="openSet">设置 {{ visible }}</div>
  <div
    v-if="visible"
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-neutral-200 p-4 rounded-xl"
  >
    <div class="bg-white rounded-xl w-[400px]">
      <sf-set-item
        title="打开方式"
        :config="{
          width: '122px',
          list: [
            {
              label: '新标签页',
              value: '_blank',
            },
            {
              label: '当前标签页',
              value: '_self',
            },
          ],
        }"
        v-model="openMode"
        type="select"
      />
      <sf-set-item title="数据" model-value="导出" type="button" @onClick="exportDataList" />
      <sf-set-item title="数据" model-value="导入" type="button" @onClick="importDataList" />
    </div>
  </div>
</template>

<script setup>
import { useIndexStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
const indexStore = useIndexStore()
const { openMode, dataList } = storeToRefs(indexStore)
const visible = ref(false)
// 导入数据列表
const importDataList = () => {}
const openSet = () => {
  visible.value = true
}
// 把dataList导出为json文件
const exportDataList = () => {
  const json = JSON.stringify(dataList.value)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'dataList.json'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style lang="scss" scoped></style>
