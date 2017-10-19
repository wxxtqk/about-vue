<template>
	<div id="toolbar">
		<i @click="addNote" class="glyphicon glyphicon-plus"></i>
		<i @click="tooglefavorite" class="glyphicon glyphicon-star"></i>
    <i @click="deleteNote" class="glyphicon glyphicon-remove"></i>
	</div>
</template>

<script>
export default {
  name: 'hello',
  methods: {
    // 添加
    addNote () {
      this.$store.dispatch('addNote')
    },
    // 标记为喜欢
    tooglefavorite () {
      this.$store.dispatch('addFavorite')
    },
    // 删除笔记
    deleteNote () {
      this.$store.dispatch('delNote')
    }
  }
}
</script>

<style type="text/css">

#toolbar i {
  font-size: 30px;
  margin-bottom: 35px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.5s ease;
}

#toolbar i:hover {
  opacity: 1;
}
</style>
