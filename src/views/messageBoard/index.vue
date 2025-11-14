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
        :item="card"
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
import { getRandomItem } from '@/utils'
import { useResizeObserver } from '@vueuse/core'

import { nextTick, ref, shallowRef } from 'vue'
import Card from './card.vue'
import { colors, fixedList, list } from './data'

// 核心配置
const TOTAL_CARDS = 200
const BATCH_SIZE = 50
const MAX_COLLISION_RETRIES = 15
const CARD_WIDTH = 220
const CARD_HEIGHT = 140
const CARD_MARGIN = 16
const MAX_ROTATE_ANGLE = 20

const waitForNextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve))

// 响应式状态
const cards = shallowRef([])
const isGenerating = ref(false)
const showLoading = ref(false)
const loadingText = ref(`生成中... 0/${TOTAL_CARDS}`)
const topId = ref('')
const noteWallContainer = ref(null)
const containerSize = ref({ width: 0, height: 0 })

// 监听容器大小
useResizeObserver(noteWallContainer, (entries) => {
  if (entries[0]) {
    const { width, height } = entries[0].contentRect
    containerSize.value = { width, height }
  }
})

// 获取有效区域
const getViewportValidArea = () => {
  const width = containerSize.value.width || 800
  const height = containerSize.value.height || 600
  return {
    maxLeft: width - CARD_WIDTH - CARD_MARGIN,
    maxTop: height - CARD_HEIGHT - CARD_MARGIN,
    centerX: width / 2 - CARD_WIDTH / 2,
    centerY: height / 2 - CARD_HEIGHT / 2,
  }
}

// 碰撞检测
const isCardCollided = (a, b) =>
  a.targetLeft < b.targetLeft + CARD_WIDTH &&
  a.targetLeft + CARD_WIDTH > b.targetLeft &&
  a.targetTop < b.targetTop + CARD_HEIGHT &&
  a.targetTop + CARD_HEIGHT > b.targetTop

const generateRandomPosition = (maxLeft, maxTop) => ({
  targetLeft: CARD_MARGIN + Math.random() * maxLeft,
  targetTop: CARD_MARGIN + Math.random() * maxTop,
})

const getSafeCardPosition = (existingCards) => {
  const { maxLeft, maxTop } = getViewportValidArea()
  let retries = 0
  let pos = generateRandomPosition(maxLeft, maxTop)
  
  while (retries < MAX_COLLISION_RETRIES && existingCards.some(card => isCardCollided(pos, card))) {
    pos = generateRandomPosition(maxLeft, maxTop)
    retries++
  }
  return pos
}

// 创建便签
const createSingleCard = (id, centerX, centerY) => ({
  id,
  angle: (Math.random() - 0.5) * MAX_ROTATE_ANGLE,
  centerX,
  centerY,
  targetLeft: centerX,
  targetTop: centerY,
  visible: false,
})

// 生成便签
const generateCards = async () => {
  if (isGenerating.value) return
  
  isGenerating.value = true
  cards.value = []
  showLoading.value = true
  loadingText.value = `生成中... 0/${TOTAL_CARDS}`

  try {
    const { centerX, centerY } = getViewportValidArea()
    const totalBatches = Math.ceil(TOTAL_CARDS / BATCH_SIZE)

    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
      const [startId, endId] = calculateBatchRange(batchIndex)
      const currentBatch = createBatchCards(startId, endId, centerX, centerY)

      cards.value = [...cards.value, ...currentBatch]
      await nextTick()
      currentBatch.forEach(card => card.visible = true)

      loadingText.value = `生成中... ${endId}/${TOTAL_CARDS}`
      await waitForNextFrame()
    }

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

const calculateBatchRange = (batchIndex) => {
  const startId = batchIndex * BATCH_SIZE
  return [startId, Math.min(startId + BATCH_SIZE, TOTAL_CARDS)]
}

const createBatchCards = (startId, endId, centerX, centerY) => {
  const batchCards = []
  const existingCards = [...cards.value, ...batchCards]
  let fixedIdx = 0, listIdx = 0

  for (let cardId = startId; cardId < endId; cardId++) {
    let content = '', type = 'random'
    
    if (fixedIdx < fixedList.length) {
      content = fixedList[fixedIdx]
      type = 'fixed'
      fixedIdx++
    } else if (listIdx < list.length) {
      content = list[listIdx]
      listIdx++
    } else {
      content = getRandomItem(list)
    }

    batchCards.push({
      ...createSingleCard(cardId, centerX, centerY),
      ...getSafeCardPosition(existingCards),
      content,
      color: getRandomItem(colors),
      type,
    })
  }
  return batchCards
}



// 计算便签样式
const getCardStyle = (card) => {
  const offsetX = card.targetLeft - card.centerX
  const offsetY = card.targetTop - card.centerY
  
  return {
    left: `${card.centerX}px`,
    top: `${card.centerY}px`,
    opacity: card.visible ? 1 : 0,
    transform: card.visible 
      ? `scale(1) rotate(${card.angle}deg) translate(${offsetX}px, ${offsetY}px)`
      : `scale(0.1) rotate(${card.angle}deg)`,
    transition: card.visible ? 'transform 0.5s ease-out, opacity 0.5s ease-out' : 'none',
  }
}
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
