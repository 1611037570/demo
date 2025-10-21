<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import MenuList from './MenuList.vue'
import { defaultMenuProps } from './data'
import useClick from './hooks/useClick'
import useWindowSize from './hooks/useWindowSize'
import type { MenuEmits, MenuProps } from './types'

// emit 事件
const emit = defineEmits<MenuEmits>()
// props 数据
const { model, stopPropagation, preventDefault, beforeCreateFn, fnKey, list } = withDefaults(
  defineProps<MenuProps>(),
  defaultMenuProps,
)

// 菜单元素
const menuContainer = useTemplateRef('menuContainer')
// const { width: windowWidth, height: windowHeight } = useWindowSize()
const { windowWidth, windowHeight } = useWindowSize()
// 菜单大小
const menuWidth = ref(0)
const menuHeight = ref(0)

const open = ref(false)

const handleEvent = (event: any) => {
  // 阻止事件冒泡
  if (stopPropagation) {
    event.stopPropagation()
  }
  // 阻止默认事件
  if (preventDefault) {
    event.preventDefault()
  }
}

const down = (event: any) => {
  handleEvent(event)

  if (list.length === 0) return

  //打开前事件
  if (!beforeCreateFn()) {
    return
  }
  // 打开前回调
  emit('onBeforeCreate')
  open.value = true
  // 打开后回调
  emit('onMounted')
  if (model == 'press') {
    window.addEventListener(
      'mousedown',
      () => {
        setTimeout(() => {
          end()
        }, 10)
      },
      { capture: true },
    )
  } else {
    window.addEventListener('click', end, { capture: true })
  }
  window.addEventListener('contextmenu', end, { capture: true })
}
const { clientX, clientY } = useClick(menuContainer, model, down)
const select = (item: any) => {
  // 触发点击绑定事件
  item[fnKey]?.()
  // 选中后回调
  emit('onSelected', item)
  end()
}

const end = () => {
  // 关闭前回调
  emit('onBeforeUnmount')

  open.value = false

  // 关闭后回调
  emit('onUnmounted')
  // 关闭事件
  if (model == 'press') {
    window.removeEventListener('mousedown', end, {
      capture: true,
    })
  } else {
    window.removeEventListener('click', end, { capture: true })
  }
  window.removeEventListener('contextmenu', end, { capture: true })
}

const menuPositron = computed(() => {
  const wW = windowWidth.value
  const mW = menuWidth.value
  const cX = clientX.value
  const wH = windowHeight.value
  const mH = menuHeight.value
  const cY = clientY.value

  const positionStyle: any = {}

  if (cX > windowWidth.value - mW) {
    positionStyle.right = `${wW - cX}px`
    positionStyle.transformOrigin = 'right'
  } else {
    positionStyle.left = `${cX}px`
    positionStyle.transformOrigin = 'left'
  }

  if (cY > wH - mH) {
    positionStyle.bottom = `${wH - cY}px`
    positionStyle.transformOrigin += ' bottom'
  } else {
    positionStyle.top = `${cY}px`
    positionStyle.transformOrigin += ' top'
  }

  return positionStyle
})
</script>

<template>
  <!-- 触发展开区 -->
  <div ref="menuContainer">
    <slot></slot>
    <!-- 菜单展示区 -->
    <Teleport to="body">
      <transition
        mode="out-in"
        enter-active-class="transition-all duration-200 linear"
        leave-active-class="transition-all duration-200 linear"
        enter-from-class="scale-0"
        leave-to-class="scale-0"
      >
        <div v-if="open" class="menu-container" :style="[menuPositron, menuContainerStyle]">
          <MenuList :list="list" :nameKey="nameKey" @select="select"></MenuList>
        </div>
      </transition>
    </Teleport>
  </div>
</template>
<style scoped>
.menu-container {
  position: fixed;
  overflow: hidden;
  z-index: 999999999;
}
</style>
