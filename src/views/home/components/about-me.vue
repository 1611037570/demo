<template>
  <div>技术分享</div>
  <div class="flex">
    <div>稀土掘金</div>
    <div>github</div>
  </div>
  <div>摄影分享</div>
  <div class="flex">
    <div>小红书</div>
    <div>抖音</div>
  </div>
</template>

<script setup>
// const
// 技术
const techShare = [
  {
    name: '稀土掘金',
    url: 'https://juejin.cn/user/2342386827791687/posts',
  },
  {
    name: 'github',
    url: 'https://github.com/1611037570',
  },
]
const work = [
  {
    name: '第一家公司',
    list: [
      {
        name: '短说社区',
        url: 'https://osx.opensns.cn/',
        desc: '1款集社区论坛、商城、学堂于一体的社交系统',
      },
      {
        name: '天天工作台',
        time: '2025-11-22',
        url: 'https://www.apps.vip/',
        desc: '副屏“操作系统”',
      },
    ],
  },
]
</script>

<style lang="scss" scoped></style>
