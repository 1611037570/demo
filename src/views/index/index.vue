<template>
  <div class="font-inter bg-light text-dark w-full overflow-x-hidden">
    <MyHeader />
    <I />
    <div
      :id="item.href"
      class="h-[1233px] w-full bg-sf-theme-hover"
      v-for="item in navList"
      :key="item.href"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
import I from './components/i.vue'
import MyHeader from './components/myHeader.vue'
const navList = [
  {
    name: '关于我',
    href: 'about',
  },
  {
    name: '作品',
    href: 'work',
  },
  {
    name: '联系我',
    href: 'contact',
  },
]
</script>
