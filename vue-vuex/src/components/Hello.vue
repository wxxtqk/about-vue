<template>
  <div>
  <h4>实现module功能</h4>
  <button @click="add">增加</button>
  <span>module中的count: {{sumCount}}</span><br>
  <span>rootState中的count：{{rootStateCount}}</span><br>
  <span>rootState和state中count相加{{sumCountAll}}</span>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
export default {
  name: 'hello',
  computed: {
    ...mapState({
      sumCount: state => state.a.count,
      rootStateCount: rootState => rootState.a.count
    }),
    ...mapGetters({
      sumCountAll: 'sumWithRootCount'
    })
  },
  methods: {
    add () {
      this.$store.dispatch('incrementIfOddOnRootSum')
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
