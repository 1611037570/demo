import { defineStore } from 'pinia'
import { ref } from 'vue'
const default_data = {
  value: '00',
  // 创建时间
  createTime: Date.now(),
  // 最后修改时间
  endTime: Date.now(),
  id: '',
  // 置顶
  top: false,
  // 是否开启md模式
  md: false,
  // 是否开启待办模式
  todo: false,
  // 是否完成待办
  todoDone: false,
  // 背景色
  bgColor: '',
}
export const useNoteStore = defineStore(
  'note',
  () => {
    // 便签列表
    const noteList = ref([])
    // 置顶列表
    const topNoteList = computed(() => {
      return noteList.value.filter((item) => item?.top)
    })
    // 添加便签
    function addNote() {
      noteList.value.push(default_data)
    }
    return { noteList, addNote, topNoteList }
  },
  {
    persist: {
      storage: localStorage,
      pick: ['noteList'],
    },
  },
)
