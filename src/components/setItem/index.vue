<template>
  <!-- 外层容器：整合布局与分割线，减少一层嵌套 -->
  <div
    class="flex items-center justify-between bg-white py-3 mx-4"
    :class="{ 'border-b border-gray-200': divider }"
  >
    <div class="flex flex-col gap-1">
      <div class="text-sm font-medium">{{ title }}</div>
      <div class="text-xs text-gray-400" v-if="info">{{ info }}</div>
    </div>
    <el-switch v-if="type === 'switch'" v-model="modeValue" @change="handleChange" />
    <el-button v-else-if="type === 'button'" @click="handleChange" type="danger">{{
      modeValue
    }}</el-button>
    <el-select
      v-else-if="type === 'select'"
      @change="handleChange"
      v-model="modeValue"
      :placeholder="config?.placeholder || '请选择'"
      :style="{ width: config?.width || '200px' }"
    >
      <el-option
        v-for="item in config?.options || []"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script setup>
const emits = defineEmits(['change'])
const props = defineProps({
  title: {
    type: String,
    default: '标题',
  },
  info: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: 'switch',
    validator: (val) => ['switch', 'button', 'select'].includes(val),
  },
  config: {
    type: Object,
    default: () => ({}),
  },
  divider: {
    type: Boolean,
    default: true,
  },
})
const modeValue = defineModel()

const handleChange = (val) => {
  emits('change', val, props.type)
}
</script>
