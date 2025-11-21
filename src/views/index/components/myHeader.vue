<script setup>
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
const bgColor = ref('rgba(255, 255, 255, 0)')
const navTextColor = ref('text-white')

// 滚动事件处理
const handleScroll = () => {
  const scrollPosition = window.scrollY
  const solidThreshold = 300

  // 计算透明度
  const opacity = Math.min(scrollPosition / solidThreshold, 1)
  bgColor.value = `rgba(255, 255, 255, ${opacity})`

  //   // 文字颜色判断
  const isDarkText = opacity > 0.5
  //   logoTextColor.value = isDarkText ? 'text-primary' : 'text-white'
  navTextColor.value = isDarkText ? 'text-gray-800' : 'text-white'
  //   navHoverColor.value = isDarkText ? 'hover:text-primary' : 'hover:text-secondary'
  //   menuBtnColor.value = isDarkText ? 'text-gray-800' : 'text-white'

  //   // 回到顶部按钮显示/隐藏
  //   showBackToTop.value = scrollPosition > 500

  //   // 触发滚动动画
  //   triggerScrollReveal()
}

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // 初始化时触发一次滚动事件
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div
    style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -100;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      background-image: url(https://assets.maorx.cn/home-background.jpg);
    "
  ></div>
  <header
    class="fixed top-0 left-0 z-50 box-border flex h-[80px] w-full items-center justify-between bg-transparent px-4"
    :style="{ backgroundColor: bgColor }"
    style="transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
  >
    <a href="#" class="flex h-full items-center space-x-2">
      <span
        id="logoText"
        class="text-shadow text-xl font-bold transition-colors duration-300"
        :class="logoTextColor"
      >
        李明
      </span>
    </a>

    <div class="flex-c h-20 gap-4">
      <el-anchor direction="horizontal" class="h-full" :offset="80" @click="handleClick">
        <el-anchor-link :href="`#${item.href}`" v-for="item in navList" :key="item.href">
          <div
            class="nav-link flex-c h-20 text-lg transition-colors duration-300"
            :class="navTextColor"
          >
            {{ item.name }}
          </div>
        </el-anchor-link>
      </el-anchor>
      <SfLocale />
      <SfTheme />
    </div>
  </header>
</template>

<style lang="scss" scoped></style>
