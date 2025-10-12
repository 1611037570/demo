<template>
  <div>
    <div>
      <el-button type="primary" @click="exportNavList">导出</el-button>
      <el-button type="primary" @click="exportNavList">导入</el-button>
    </div>
  </div>
</template>

<script setup>
// 把navList导出为json文件
const exportNavList = () => {
  const json = JSON.stringify(navList.value)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'navList.json'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style lang="scss" scoped></style>
