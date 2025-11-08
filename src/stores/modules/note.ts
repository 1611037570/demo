import { defineStore } from 'pinia'
import { ref } from 'vue'
const default_data = {
  value: '',
  // 创建时间
  createTime: Date.now(),
  // 最后修改时间
  endTime: Date.now(),
  // 标签
  tag: '',
  id: '',
  // 置顶
  top: false,
}
export const useNoteStore = defineStore(
  'note',
  () => {
    // 便签列表
    const noteList = ref([])
    // 置顶列表
    const topNoteList = computed(() => {
      return noteList.value.filter((item) => item.top)
    })
    // 添加便签
    function addNote(note) {
      noteList.value.push(note)
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
