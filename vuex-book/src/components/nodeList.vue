<template>
    <div id="notes-list">
        <div id="list-header">
            <h2>{{name}}|{{username}}</h2>
            <div class="btn-group">
                <button type="button" class="btn" :class="{'btn-primary': btntype === 'all'}" @click="show('all')">所有笔记</button>
                <button type="button" class="btn" :class="{'btn-primary': btntype === 'favor'}" @click="show('favor')">喜欢的</button>
            </div>
        </div>
        <div class="container">
            <ul class="list-group">
               <li class="list-group-item" v-for="item in notes" :class="{active: activeNote === item}" @click="setActive(item)">{{item.header}}</li class="list-group-item" >
            </ul>
        </div>
    </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  export default{
    name: 'notelist',
    data () {
      return {
        name: '笔记应用',
        username: 'may',
        btntype: 'all'
      }
    },
    computed: {
      ...mapState({
        activeNote: state => state.activeNote
      }),
      ...mapGetters({
        notes: 'getNotes'
      })
    },
    methods: {
      show: function (type) {
        this.btntype = type
        this.$store.commit('ALL_FAVOR', type)
      },
      setActive (item) {
        this.$store.commit('SET_ACTIVE', item)
      }
    }
  }
</script>
<style>
#notes-list .container {
  height: calc(100% - 137px);
  max-height: calc(100% - 137px);
  overflow: auto;
 width: 100%;
 padding: 0;
}

#notes-list .container .list-group-item {
  border: 0;
  border-radius: 0;
}
</style>