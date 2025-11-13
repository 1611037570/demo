<template>
  <SfViewContainer title="许愿墙">
    <!-- 便签墙 - 简化样式配置 -->
    <div
      ref="noteWallContainer"
      class="font-sans bg-gray-100 text-gray-800 relative h-full w-full overflow-hidden"
      style="
        background-image:
          linear-gradient(0deg, #eee 1px, transparent 0),
          linear-gradient(90deg, #eee 1px, transparent 0);
        background-size: 30px 30px;
      "
    >
      <!-- 便签卡片渲染 -->
      <Card
        v-for="card in cards"
        v-model:topId="topId"
        :key="card.id"
        :color="card.color"
        :card-style="getCardStyle(card)"
      />
      <!-- 生成按钮 -->
      <button
        class="add-cards-btn px-8 py-4 text-lg font-semibold text-gray-800 bg-white bg-opacity-95 border-gray-200 shadow-lg hover:bg-white hover:shadow-xl fixed top-1/2 left-1/2 z-[999999] -translate-x-1/2 -translate-y-1/2 transform cursor-pointer rounded-full border transition-all duration-200 outline-none hover:scale-105 active:scale-95"
        @click="generateCards"
        :disabled="isGenerating"
      >
        {{ isGenerating ? `生成中...` : `生成${TOTAL_CARDS}个便签` }}
      </button>
      <!-- 加载指示器 -->
      <div
        class="gap-4 text-gray-800 bg-white bg-opacity-95 p-5 rounded-2xl shadow-xl backdrop-blur-sm fixed top-1/2 left-1/2 z-[1000001] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center"
        :class="{ hidden: !showLoading, flex: showLoading }"
      >
        <div
          class="w-10 h-10 border-gray-200 animate-spin rounded-full border-4 border-t-[#28c840]"
        ></div>
        <span class="text-base">{{ loadingText }}</span>
      </div>
    </div>
  </SfViewContainer>
</template>

<script setup>
import { useResizeObserver } from '@vueuse/core'
import { getRandomItem } from '@/utils'

import { nextTick, ref, shallowRef } from 'vue'
import Card from './card.vue'
import { colors, list ,fixedList} from './data'

/**
 * 算法优化。
 * 1、先根据TOTAL_CARDS创建数组，创建过程每个元素都添加fixedList，再添加list，当数量不够后，从list中随机添加。
 */
// ================================= 核心配置常量（可直接调整）=================================
const TOTAL_CARDS = 200 // 便签总生成数量
const BATCH_SIZE = 50 // 每批渲染数量（避免一次性渲染卡顿）
const MAX_COLLISION_RETRIES = 15 // 碰撞重试上限（防止无限循环）

// 便签基础样式配置
const CARD_WIDTH = 220 // 便签宽度
const CARD_HEIGHT = 140 // 便签高度
const CARD_MARGIN = 16 // 便签与视口/其他便签的边距
const MAX_ROTATE_ANGLE = 20 // 最大旋转角度（-10° 到 10°）

// 工具函数：等待下一动画帧（用于平滑渲染）
const waitForNextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve))

// ================================= 响应式状态 =================================
const cards = shallowRef([]) // 便签数组（浅响应式优化性能）
const isGenerating = ref(false) // 生成状态锁
const showLoading = ref(false) // 加载指示器显示状态
const loadingText = ref(`生成中... 0/${TOTAL_CARDS}`) // 加载提示文本
const topId = ref('') // 置顶便签ID
const noteWallContainer = ref(null) // 便签墙容器引用
const containerSize = ref({ width: 0, height: 0 }) // 容器尺寸

// ================================= 视口相关计算 =================================
// 使用ResizeObserver监听容器大小变化
useResizeObserver(noteWallContainer, (entries) => {
  if (entries[0]) {
    const { width, height } = entries[0].contentRect
    containerSize.value = { width, height }
  }
})

/**
 * 获取容器边界信息（便签可放置的有效区域）
 * @returns {Object} 有效区域参数
 * - maxLeft: 左边界最大可放置坐标
 * - maxTop: 上边界最大可放置坐标
 * - centerX: 容器水平中心
 * - centerY: 容器垂直中心
 */
const getViewportValidArea = () => {
  // 如果容器尺寸未初始化，使用默认值
  const width = containerSize.value.width || 800
  const height = containerSize.value.height || 600

  return {
    maxLeft: width - CARD_WIDTH - CARD_MARGIN,
    maxTop: height - CARD_HEIGHT - CARD_MARGIN,
    centerX: width / 2 - CARD_WIDTH / 2,
    centerY: height / 2 - CARD_HEIGHT / 2,
  }
}

// ================================= 碰撞检测与位置计算 =================================
/**
 * 检测两个便签是否碰撞（矩形重叠判断）
 * @param {Object} newCard 新便签位置信息
 * @param {Object} existingCard 已存在便签位置信息
 * @returns {boolean} 是否碰撞
 */
const isCardCollided = (newCard, existingCard) => {
  // 矩形重叠条件：x轴有交集 且 y轴有交集
  const xOverlap =
    newCard.targetLeft < existingCard.targetLeft + CARD_WIDTH &&
    newCard.targetLeft + CARD_WIDTH > existingCard.targetLeft
  const yOverlap =
    newCard.targetTop < existingCard.targetTop + CARD_HEIGHT &&
    newCard.targetTop + CARD_HEIGHT > existingCard.targetTop
  return xOverlap && yOverlap
}

/**
 * 获取安全位置（无碰撞的随机位置）
 * @param {Array} existingCards 已存在的便签数组
 * @returns {Object} 安全位置（targetLeft, targetTop）
 */
const getSafeCardPosition = (existingCards) => {
  const { maxLeft, maxTop } = getViewportValidArea()
  let currentRetries = 0
  let safePosition = generateRandomPosition(maxLeft, maxTop)

  // 碰撞重试：超过次数则直接返回（允许少量重叠，避免卡死）
  while (currentRetries < MAX_COLLISION_RETRIES && isCollidedWithAny(safePosition, existingCards)) {
    safePosition = generateRandomPosition(maxLeft, maxTop)
    currentRetries++
  }

  return safePosition
}

/**
 * 生成随机位置（在有效区域内）
 * @param {number} maxLeft 左边界最大值
 * @param {number} maxTop 上边界最大值
 * @returns {Object} 随机位置
 */
const generateRandomPosition = (maxLeft, maxTop) => ({
  targetLeft: CARD_MARGIN + Math.random() * maxLeft,
  targetTop: CARD_MARGIN + Math.random() * maxTop,
})

/**
 * 检测新位置是否与任意已存在便签碰撞
 * @param {Object} newPosition 新位置
 * @param {Array} existingCards 已存在便签
 * @returns {boolean} 是否碰撞
 */
const isCollidedWithAny = (newPosition, existingCards) => {
  return existingCards.some((card) => isCardCollided(newPosition, card))
}

// ================================= 便签数据处理 =================================
/**
 * 创建单个便签数据
 * @param {number} id 便签唯一ID
 * @param {number} centerX 视口中心X坐标
 * @param {number} centerY 视口中心Y坐标
 * @returns {Object} 便签数据
 */
const createSingleCard = (id, centerX, centerY) => ({
  id,
  angle: (Math.random() - 0.5) * MAX_ROTATE_ANGLE, // 随机旋转角度（-10° 到 10°）
  centerX, // 视口中心X（动画起始点）
  centerY, // 视口中心Y（动画起始点）
  targetLeft: centerX, // 目标左坐标
  targetTop: centerY, // 目标上坐标
  visible: false, // 初始隐藏（用于动画触发）
})

/**
 * 批量生成便签（核心生成逻辑）
 */
const generateCards = async () => {
  // 防止重复触发
  if (isGenerating.value) return

  // 初始化状态
  isGenerating.value = true
  cards.value = []
  showLoading.value = true
  loadingText.value = `生成中... 0/${TOTAL_CARDS}`

  try {
    const { centerX, centerY } = getViewportValidArea()
    const totalBatches = Math.ceil(TOTAL_CARDS / BATCH_SIZE) // 总批次数

    // 分批生成（避免一次性渲染大量DOM卡顿）
    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
      const [startId, endId] = calculateBatchRange(batchIndex)
      const currentBatch = createBatchCards(startId, endId, centerX, centerY)

      // 添加到数组并更新DOM
      cards.value = [...cards.value, ...currentBatch]
      await nextTick() // 等待DOM更新

      // 触发当前批次便签显示动画
      triggerBatchVisible(currentBatch)

      // 更新加载进度
      loadingText.value = `生成中... ${endId}/${TOTAL_CARDS}`
      await waitForNextFrame() // 等待动画帧，保证平滑
    }

    // 生成完成后关闭加载提示
    setTimeout(() => {
      loadingText.value = `生成完成！共${TOTAL_CARDS}个便签`
      isGenerating.value = false
      showLoading.value = false
    }, 100)
  } catch (error) {
    console.error('便签生成失败：', error)
    loadingText.value = '生成失败，请重试'
    setTimeout(() => (showLoading.value = false), 1500)
  }
}

/**
 * 计算当前批次的ID范围
 * @param {number} batchIndex 批次索引
 * @returns {[number, number]} [起始ID, 结束ID]
 */
const calculateBatchRange = (batchIndex) => {
  const startId = batchIndex * BATCH_SIZE
  const endId = Math.min(startId + BATCH_SIZE, TOTAL_CARDS)
  return [startId, endId]
}

/**
 * 创建单批次便签（带碰撞检测）
 * @param {number} startId 起始ID
 * @param {number} endId 结束ID
 * @param {number} centerX 视口中心X
 * @param {number} centerY 视口中心Y
 * @returns {Array} 批次便签数组
 */
const createBatchCards = (startId, endId, centerX, centerY) => {
  const batchCards = []
  // 已存在的便签（用于碰撞检测）
  const existingCards = [...cards.value, ...batchCards]
  
  // 用于存储所有便签的内容池
  const contentPool = []
  let currentFixedIndex = 0
  let currentListIndex = 0

  for (let cardId = startId; cardId < endId; cardId++) {
    const safePosition = getSafeCardPosition(existingCards)
    
    // 根据要求创建便签数据
    let content = ''
    
    // 首先使用fixedList中的内容（如果还有剩余）
    if (currentFixedIndex < fixedList.length) {
      content = fixedList[currentFixedIndex]
      currentFixedIndex++
    }
    // 然后使用list中的内容（如果还有剩余）
    else if (currentListIndex < list.length) {
      content = list[currentListIndex]
      currentListIndex++
    }
    // 当内容不足时，从list中随机选择
    else {
      content = getRandomItem(list)
    }
    
    // 随机选择颜色
    const color = getRandomItem(colors)
    
    batchCards.push({
      ...createSingleCard(cardId, centerX, centerY),
      ...safePosition,
      content,
      color
    })
  }

  return batchCards
}

/**
 * 触发批次便签显示（开启动画）
 * @param {Array} batchCards 批次便签数组
 */
const triggerBatchVisible = (batchCards) => {
  batchCards.forEach((card) => (card.visible = true))
}

// ================================= 便签样式计算 =================================
/**
 * 计算单个便签的样式（动画状态控制）
 * @param {Object} card 便签数据
 * @returns {Object} 样式对象
 */
const getCardStyle = (card) => {
  // 计算从中心到目标位置的偏移量
  const offsetX = card.targetLeft - card.centerX
  const offsetY = card.targetTop - card.centerY

  // 显示状态（触发入场动画）
  if (card.visible) {
    return {
      left: `${card.centerX}px`,
      top: `${card.centerY}px`,
      opacity: 1,
      transform: `scale(1) rotate(${card.angle}deg) translate(${offsetX}px, ${offsetY}px)`,
      transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
    }
  }

  // 隐藏状态（初始状态，无过渡）
  return {
    left: `${card.centerX}px`,
    top: `${card.centerY}px`,
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
