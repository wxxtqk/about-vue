<template>
  <div>
    <button @click="add">增加</button>
    <button @click="addType">给store新增加属性</button>
    {{count}}
    <ul v-if="listLen">
      <li v-for="item in lists">
        <span>{{item.id}}</span>
        <span>{{item.text}}</span>
      </li>
    </ul>
    <span>数组长度{{listLen}}</span>
    <hr>
    <span>{{newValue}}</span>
    <hr>
    <h4>返回一个通过id查询的值</h4>
    <ul v-if="doneTodosId">
      <li v-for="item in doneTodosId">{{item.id}}</li>
      <li v-for="item in doneTodosId">{{item.text}}</li>
    </ul>

    <!-- 组合action -->
    <button @click="action">action结合</button><br/>
    <span>{{actionA}}</span><br/>
    <span>{{actionB}}</span><br/>
  </div>
</template>

<script>
import {mapState, mapGetters,mapActions} from 'vuex'
import Vue from 'vue'
export default {
  name: 'hello',
  computed: {
      // 箭头函数可使代码简练
      // 传字符串参数 'count' 等同于 `state => state.count`
      ...mapState({
        count: state => state.count,
        newValue: state => state.newType,
        actionA: 'actionA',
        actionB:'actionB'
      }),
      ...mapGetters({
        lists: 'doneTodos',
        listLen: 'doneTodosLen',
      }),
      // 返回一个通过id查询的值
      doneTodosId () {
       return this.$store.getters.doneTodosId(2)
      }
  },
  methods: {
    // ---------------------直接调用mutations方法(0)------------------
    // add () {
    //   this.$store.commit({
    //     type: 'SUM_COUNT',
    //     amount: 10
    //   })
    // },
    // ---------------------使用actions方法执行异步操作(1)-------------
    add () {
      // dispatch 表示分派的意思
      this.$store.dispatch({
        type: 'sumCount',
        amount: 10
      })
    },
    // ---------------------使用actions方法执行异步操作(3),mapActions-------------
    // ...mapActions ({
    //   add: 'sumCount'
    // }),
    addType () {
      // 第一种 给store新增加属性,要在前面引入vue
      Vue.set(this.$store.state, 'newType', '动态的给strore添加值第一种方式')
      // 第二种 给store新增加属性
      this.$store.state.obj = {...this.$store.state.obj, newProp: '动态的给strore添加值第二种方式'}
    },
    action () {
      this.$store.dispatch('actionA', {
        actionA: '1000ms后执行了mutation中的ACTION_A'
      })
      .then(() => {
        this.$store.dispatch('actionB', {
        actionB: 'ACTION_A执行完后在隔1000ms执行ACTION_B'
        })
      })
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
