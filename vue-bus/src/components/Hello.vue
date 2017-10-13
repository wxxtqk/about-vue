<template>
  <div class="hello">
    <div class="brothers-no-vuex">
      <h4>兄弟组件传递值，不使用vuex</h4>
      <child-one></child-one>
      <child-two></child-two>
    </div>
  </div>
</template>

<script>
import childOne from './sub/child-one'
import childTwo from './sub/child-two'
export default {
  name: 'hello',
  data () {
    return {
      count: 0
    }
  },
  methods: {
    sumCount () {
      this.count++
    }
  },
  components: {childOne, childTwo}
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
.brothers-no-vuex{
  border: 1px solid #ddd;
  height: 300px;
}
</style>
