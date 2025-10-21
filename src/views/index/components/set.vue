<template>
  <div>
    <div class="fixed top-12 right-12 z-20" @click="openSet">设置</div>
    <sf-modal v-if="visible" v-model="visible">
      <sf-set-title title="时间" />
      <sf-set-box>
        <sf-set-item title="下班倒计时" type="switch" v-model="countDown" />
        <sf-set-item title="下班时间" model-value="09:00" type="time" v-model="startTime" />
      </sf-set-box>
      <sf-set-title title="快捷方式" />
      <sf-set-box>
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
          @change="(val) => searchStore.setOpenMode(val)"
        />
      </sf-set-box>
      <sf-set-title title="搜索设置" />
      <search />

      <sf-set-title title="数据管理" />
      <sf-set-box>
        <sf-set-item
          title="配置导出"
          info="会导出当前所有配置"
          model-value="导出"
          type="button"
          @onClick="exportDataList"
        />
        <sf-set-item
          title="配置导入"
          info="会覆盖当前所有配置"
          model-value="导入"
          type="button"
          @onClick="importDataList"
        />
        <sf-set-item
          title="快捷方式导出"
          info="仅导出所有快捷方式"
          model-value="导出"
          type="button"
          @onClick="exportDataList"
        />
        <sf-set-item
          title="快捷方式导入"
          info="仅导入所有快捷方式"
          model-value="导入"
          type="button"
          @onClick="importDataList"
        />
        <sf-set-item
          title="重置"
          info="会重置所有配置"
          model-value="重置"
          type="button"
          @onClick="resetDataList"
        />
      </sf-set-box>
    </sf-modal>
  </div>
</template>

<script setup>
import { useIndexStore } from '@/stores/index'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'
import search from '../setting/search.vue'
const indexStore = useIndexStore()
const searchStore = useSearchStore()

const { shortcutList } = storeToRefs(indexStore)
const { openMode, showSearchHistory, showAppSource } = storeToRefs(searchStore)
const visible = ref(false)
// 导入数据列表
const importDataList = () => {}
const openSet = () => {
  visible.value = true
}
// 把dataList导出为json文件
const exportDataList = () => {
  const json = JSON.stringify(shortcutList.value)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'shortcutList.json'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style lang="scss" scoped></style>
