<template>
  <div>
    <button @click="add">增加</button>
    <ul v-if="lists.length">
      <li v-for="item in lists">
        <span>{{item.id}}</span>
        <span>{{item.text}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'hello',
  computed: {
    localComputed () {
      return mapState({
        // 箭头函数可使代码简练
        count: state => state.count,
        // 传字符串参数 'count' 等同于 `state => state.count`
        countAilas: 'count'
      })
    }
  },
  data () {
    return {
      lists: []
    }
  },
  methods: {
    add () {
      this.$store.commit('sumCount')
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
