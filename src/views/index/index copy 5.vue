<template>
  <div class="font-inter bg-light text-dark h-full w-full overflow-x-hidden bg-sf-text">
    <!-- 顶部 Header - 保留原有滚动效果 -->
    <header
      id="navbar"
      class="transition-header fixed top-0 left-0 z-50 box-border flex h-[80px] w-full items-center bg-transparent px-4 md:px-8"
      :style="{ backgroundColor: bgColor }"
    >
      <div class="container mx-auto flex h-full w-full items-center justify-between">
        <!-- Logo -->
        <a href="#" class="flex h-full items-center space-x-2">
          <div
            class="bg-primary/20 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
          >
            <i class="fa fa-code text-primary text-xl"></i>
          </div>
          <span
            id="logoText"
            class="text-shadow text-xl font-bold transition-colors duration-300"
            :class="logoTextColor"
          >
            李明
          </span>
        </a>

        <!-- 导航菜单 - 桌面版 -->
        <nav class="hidden h-full items-center space-x-8 md:flex">
          <a
            href="#home"
            class="nav-link transition-colors duration-300"
            :class="[navTextColor, navHoverColor]"
            @click.prevent="handleNavClick('#home')"
          >
            首页
          </a>
          <a
            href="#about"
            class="nav-link transition-colors duration-300"
            :class="[navTextColor, navHoverColor]"
            @click.prevent="handleNavClick('#about')"
          >
            关于我
          </a>
          <a
            href="#skills"
            class="nav-link transition-colors duration-300"
            :class="[navTextColor, navHoverColor]"
            @click.prevent="handleNavClick('#skills')"
          >
            技能
          </a>
          <a
            href="#projects"
            class="nav-link transition-colors duration-300"
            :class="[navTextColor, navHoverColor]"
            @click.prevent="handleNavClick('#projects')"
          >
            项目
          </a>
          <a
            href="#contact"
            class="nav-link transition-colors duration-300"
            :class="[navTextColor, navHoverColor]"
            @click.prevent="handleNavClick('#contact')"
          >
            联系我
          </a>
        </nav>

        <!-- 简历按钮 -->
        <div class="hidden h-full items-center md:flex"></div>
      </div>
    </header>
    <div class="h-[8012px] w-full"></div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

// 响应式数据
const scrollPosition = ref(0)
const mobileMenuOpen = ref(false)
const showBackToTop = ref(false)

// 计算属性相关的响应式数据
const bgColor = ref('rgba(255, 255, 255, 0)')
const logoTextColor = ref('text-white')
const navTextColor = ref('text-white')
const navHoverColor = ref('hover:text-secondary')
const menuBtnColor = ref('text-white')

// 滚动事件处理
const handleScroll = () => {
  scrollPosition.value = window.scrollY
  const solidThreshold = 300

  // 计算透明度
  const opacity = Math.min(scrollPosition.value / solidThreshold, 1)
  bgColor.value = `rgba(255, 255, 255, ${opacity})`

  // 文字颜色判断
  const isDarkText = opacity > 0.5
  logoTextColor.value = isDarkText ? 'text-primary' : 'text-white'
  navTextColor.value = isDarkText ? 'text-gray-800' : 'text-white'
  navHoverColor.value = isDarkText ? 'hover:text-primary' : 'hover:text-secondary'
  menuBtnColor.value = isDarkText ? 'text-gray-800' : 'text-white'

  // 回到顶部按钮显示/隐藏
  showBackToTop.value = scrollPosition.value > 500

  // 触发滚动动画
  triggerScrollReveal()
}
// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

// 导航点击处理
const handleNavClick = (targetId) => {
  const targetElement = document.querySelector(targetId)
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth',
    })
  }

  // 关闭移动端菜单
  mobileMenuOpen.value = false
}

// 滚动动画触发
const triggerScrollReveal = () => {
  const scrollRevealElements = document.querySelectorAll('.scroll-reveal')
  scrollRevealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('active')
    }
  })
}

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
