<template>
    <div id="note-editor">
        <input type="text" v-model="activeHeader" placeholder="标题" class="form-control" disabled>
        <textarea @input="editNote" v-model="activeText" placeholder="笔记内容"></textarea>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default{
  name: 'editor',
  computed: {
    ...mapState({
      activeHeader: state => state.activeNote.header
    }),
    // 修改后的代码
    activeText: {
      get: function () {
        return this.$store.state.activeNote.text
      },
      set: function (newValue) {
        this.$store.state.activeNote.text = newValue
      }
    }
  },
  methods: {
    editNote (e) {
      this.$store.commit('EDIT_NOTE', e.target.value)
    }
  }
}
</script>
<style>
#note-editor textarea {
  height: 100%;
  border: 0;
  border-radius: 0;
  width: 100%
}
</style>