<script setup>
import { useNoteStore } from '@/stores'
import NoteList from './components/noteList.vue'
const noteStore = useNoteStore()
const { addNote, delNote } = noteStore

const { noteList, currentIndex, noteVisible } = storeToRefs(noteStore)

function switchStatus(key) {
  noteList.value[currentIndex.value][key] = !noteList.value[currentIndex.value][key]
}
const currentNote = computed(() => noteList.value[currentIndex.value])

function del() {
  ElMessageBox.confirm('该操作将永久删除当前便签，是否继续？', '删除当前便签', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    delNote()
  })
}
</script>

<template>
  <SfModal v-model="noteVisible" v-if="noteVisible" title="便签">
    <div class="flex h-[500px] w-[600px]">
      <NoteList />
      <div class="flex flex-1 flex-col" v-if="currentIndex != null">
        <div class="gap-3 mb-3 flex">
          <SfTooltip info="固定在起始页" v-if="!currentNote.todo">
            <SfIcon
              icon="ic:round-push-pin"
              size="5"
              @click="switchStatus('top')"
              :class="{ 'bg-sf-theme-hover text-sf-theme': currentNote.top }"
              boxSize="8"
              class="rounded-lg bg-sf-primary-hover hover:bg-sf-theme-hover hover:text-sf-theme"
            />
          </SfTooltip>
          <SfTooltip :info="currentNote.todo ? '取消待办' : '设为待办'" v-if="currentIndex != null">
            <SfIcon
              @click="switchStatus('todo')"
              icon="pajamas:todo-add"
              :class="{ 'bg-sf-theme-hover text-sf-theme': currentNote.todo }"
              size="5"
              boxSize="8"
              class="rounded-lg bg-sf-primary-hover hover:bg-sf-theme-hover hover:text-sf-theme"
            />
          </SfTooltip>

          <SfTooltip info="设为Markdown" v-if="currentIndex != null">
            <SfIcon
              @click="switchStatus('md')"
              icon="ph:file-md-duotone"
              :class="{ 'bg-sf-theme-hover text-sf-theme': currentNote.md }"
              size="5"
              boxSize="8"
              class="rounded-lg bg-sf-primary-hover hover:bg-sf-theme-hover hover:text-sf-theme"
            />
          </SfTooltip>
          <SfTooltip info="设置背景颜色" v-if="currentIndex != null">
            <SfIcon
              icon="fluent-mdl2:color-solid"
              size="5"
              boxSize="8"
              class="rounded-lg bg-sf-primary-hover hover:bg-sf-theme-hover hover:text-sf-theme"
            />
          </SfTooltip>
          <SfTooltip info="删除" v-if="currentIndex != null">
            <SfIcon
              @click="del"
              icon="material-symbols:delete-outline"
              size="5"
              boxSize="8"
              class="rounded-lg bg-sf-primary-hover hover:bg-sf-theme-hover hover:text-sf-theme"
            />
          </SfTooltip>
        </div>
        <div class="w-full">
          <SfInput
            class="bg-pink-400 rounded-xl p-1 flex-1"
            v-model="currentNote.value"
            maxlength="200"
            style="width: 240px"
            placeholder="Please input"
            show-word-limit
            type="textarea"
          />
        </div>
      </div>
    </div>
  </SfModal>
</template>
<style lang="scss" scoped></style>
