<template>
  <div class="fixed top-12 right-12 z-20" @click="openSet">设置</div>
  <sf-modal v-if="visible" v-model="visible">
    <h2>时间</h2>
    <set-box>
      <sf-set-item title="下班倒计时" type="switch" v-model="countDown" />
      <sf-set-item title="下班时间" model-value="09:00" type="time" v-model="startTime" />
    </set-box>
    <set-box>
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
    </set-box>
  </sf-modal>
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
