<template>
  <!-- 便签墙 - 简化样式配置 -->
  <div
    class="inset-0 font-sans bg-gray-100 text-gray-800 fixed z-1000 h-full min-h-screen w-full overflow-hidden"
    style="
      background-image:
        linear-gradient(0deg, #eee 1px, transparent 0),
        linear-gradient(90deg, #eee 1px, transparent 0);
      background-size: 30px 30px;
    "
  >
    <!-- 简化v-for，保留核心绑定 -->
    <NoteCard
      v-for="cardRef in cards"
      v-model:topId="topId"
      :key="cardRef.id"
      :color="cardRef.color"
      :card-style="getCardStyle(cardRef)"
    />
  </div>

  <!-- 生成按钮 - 保留原样式 -->
  <button
    class="add-cards-btn px-8 py-4 text-lg font-semibold text-gray-800 bg-white bg-opacity-95 border-gray-200 shadow-lg hover:bg-white hover:shadow-xl fixed top-1/2 left-1/2 z-[999999] -translate-x-1/2 -translate-y-1/2 transform cursor-pointer rounded-full border transition-all duration-200 outline-none hover:scale-105 active:scale-95"
    @click="generateCards"
    :disabled="isGenerating"
  >
    {{ isGenerating ? `生成中...` : `生成${TOTAL_CARDS}个便签` }}
  </button>

  <!-- 加载指示器 - 保留核心功能 -->
  <div
    class="gap-4 text-gray-800 bg-white bg-opacity-95 p-5 rounded-2xl shadow-xl backdrop-blur-sm fixed top-1/2 left-1/2 z-[1000001] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center"
    :class="{ hidden: !showLoading, flex: showLoading }"
  >
    <div
      class="w-10 h-10 border-gray-200 animate-spin rounded-full border-4 border-t-[#28c840]"
    ></div>
    <span class="text-base">{{ loadingText }}</span>
  </div>
</template>

<script setup>
import { useDebounceFn, useEventListener, useWindowSize } from '@vueuse/core'
import { nextTick, ref } from 'vue'
import NoteCard from './NoteCard.vue'

// 核心可配置变量（保留，方便调整）
const TOTAL_CARDS = 500 // 总生成数量
const BATCH_SIZE = 50 // 每批渲染数量
const MAX_COLLISION_ATTEMPTS = 15 // 碰撞重试上限（简化为固定值）

// 基础常量（保留必要的尺寸配置）
const CARD_WIDTH = 220
const CARD_HEIGHT = 140
const MARGIN = 16 // 统一边距（简化水平/垂直边距）
const ANGLE_RANGE = 20 // 旋转角度范围
const rafPromise = () => new Promise((resolve) => requestAnimationFrame(resolve))
const TRANSITION_STYLE = 'transform 0.5s ease-out, opacity 0.5s ease-out' // 提取重复过渡样式

// 响应式窗口尺寸（保留核心功能）
const { width: windowWidth, height: windowHeight } = useWindowSize({
  includeScrollbar: false,
})

// 优化视口计算：避免边界为负数，确保卡片在视口内
const getViewportBounds = () => ({
  maxLeft: Math.max(MARGIN, windowWidth.value - CARD_WIDTH - MARGIN),
  maxTop: Math.max(MARGIN, windowHeight.value - CARD_HEIGHT - MARGIN),
})

// 优化碰撞检测：调整判断顺序（先排除不碰撞情况），提升循环效率
const checkCollision = (newCard, existingCards) => {
  const newLeft = newCard.targetLeft
  const newTop = newCard.targetTop
  const newRight = newLeft + CARD_WIDTH
  const newBottom = newTop + CARD_HEIGHT

  return existingCards.some((card) => {
    const cardLeft = card.targetLeft
    const cardTop = card.targetTop
    const cardRight = cardLeft + CARD_WIDTH
    const cardBottom = cardTop + CARD_HEIGHT

    // 先判断不碰撞的情况，提前返回
    return !(
      newRight < cardLeft ||
      newLeft > cardRight ||
      newBottom < cardTop ||
      newTop > cardBottom
    )
  })
}

// 优化位置计算：提取maxLeft/maxTop到循环外，避免重复计算
const getSafePosition = (existingCards) => {
  const { maxLeft, maxTop } = getViewportBounds()
  let attempts = 0
  let position = {
    targetLeft: MARGIN + Math.random() * maxLeft,
    targetTop: MARGIN + Math.random() * maxTop,
  }

  // 碰撞重试（超过次数直接返回，避免无限循环）
  while (attempts < MAX_COLLISION_ATTEMPTS && checkCollision(position, existingCards)) {
    position = {
      targetLeft: MARGIN + Math.random() * maxLeft,
      targetTop: MARGIN + Math.random() * maxTop,
    }
    attempts++
  }

  return position
}

// 响应式状态：cards改为ref数组（确保内部属性修改触发响应）
const cards = ref([])
const isGenerating = ref(false)
const loadingText = ref(`生成中... 0/${TOTAL_CARDS}`)
const showLoading = ref(false)
const topId = ref('')

// 简化卡片数据生成：去掉冗余的centerX/Y，直接使用targetLeft/Top
const createCard = (id) => ({
  id,
  angle: Math.random() * ANGLE_RANGE - ANGLE_RANGE / 2, // 简化角度计算
  targetLeft: MARGIN,
  targetTop: MARGIN,
  visible: false,
  color: `hsl(${Math.random() * 360}, 70%, 85%)`, // 补充默认颜色（原代码可能遗漏，确保color有值）
})

// 优化批量生成逻辑：用push代替数组扩展，避免创建新数组；修复响应式更新
const generateCards = async () => {
  if (isGenerating.value) return

  isGenerating.value = true
  cards.value = [] // 重置卡片数组
  showLoading.value = true
  loadingText.value = `生成中... 0/${TOTAL_CARDS}`

  try {
    const totalBatches = Math.ceil(TOTAL_CARDS / BATCH_SIZE)

    // 分批生成+渲染（优化数组更新方式）
    for (let batch = 0; batch < totalBatches; batch++) {
      const currentBatch = []
      const startIdx = batch * BATCH_SIZE
      const endIdx = Math.min(startIdx + BATCH_SIZE, TOTAL_CARDS)

      // 批量创建卡片（带碰撞检测）
      for (let i = startIdx; i < endIdx; i++) {
        const safePos = getSafePosition([...cards.value, ...currentBatch])
        currentBatch.push({
          ...createCard(i),
          ...safePos,
        })
      }

      // 优化数组更新：push比扩展运算符更高效（避免创建新数组）
      cards.value.push(...currentBatch)
      await nextTick() // 等待DOM更新

      // 批量显示（触发动画）：修改ref内部属性，确保响应式生效
      currentBatch.forEach((card) => {
        card.visible = true
      })

      // 优化进度更新：避免频繁DOM操作（每批更新一次）
      loadingText.value = `生成中... ${endIdx}/${TOTAL_CARDS}`
      await rafPromise() // 等待动画帧，避免卡顿
    }

    // 生成完成
    setTimeout(() => {
      loadingText.value = `生成完成！共${TOTAL_CARDS}个便签`
      isGenerating.value = false
      showLoading.value = false
    }, 500)
  } catch (error) {
    console.error('生成失败：', error)
    loadingText.value = '生成失败，请重试'
    setTimeout(() => (showLoading.value = false), 1500)
  }
}

// 优化窗口resize处理：先获取卡片快照，避免基于旧位置计算新位置
const handleResize = useDebounceFn(() => {
  if (cards.value.length === 0) return

  const { maxLeft, maxTop } = getViewportBounds()
  // 先获取当前卡片快照，避免遍历过程中数组变化
  const currentCards = [...cards.value]

  // 重新计算所有卡片位置（基于快照计算，避免碰撞判断出错）
  currentCards.forEach((card) => {
    const existingCards = currentCards.filter((c) => c.id !== card.id)
    const safePos = getSafePosition(existingCards)
    card.targetLeft = safePos.targetLeft
    card.targetTop = safePos.targetTop
  })

  // 批量更新卡片数组（触发一次响应式更新）
  cards.value = currentCards
}, 200)

useEventListener('resize', handleResize, { passive: true })

// 优化样式计算：去掉冗余的centerX/Y和translate，简化transform
const getCardStyle = (card) => {
  return card.visible
    ? {
        position: 'absolute', // 明确定位方式，避免依赖组件内部样式
        left: `${card.targetLeft}px`,
        top: `${card.targetTop}px`,
        opacity: 1,
        transform: `scale(1) rotate(${card.angle}deg)`,
        transition: TRANSITION_STYLE,
      }
    : {
        position: 'absolute',
        left: `${card.targetLeft}px`,
        top: `${card.targetTop}px`,
        opacity: 0,
        transform: `scale(0.1) rotate(${card.angle}deg)`,
        transition: 'none',
      }
}
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
