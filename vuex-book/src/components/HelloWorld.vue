<template>
  <div id="app">
   <toolbar></toolbar>
   <node-list></node-list>
   <edit></edit>
  </div>
</template>

<script>
import toolbar from './toolbar'
import nodeList from './nodeList'
import edit from './edit'
export default {
  name: 'HelloWorld',
  components: {
    toolbar, nodeList, edit
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Raleway:400,300);
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
html, #app {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  border: 0;
  height: 100%;
  max-height: 100%;
  position: relative;
}
#app{
  height: 100%;
}
#toolbar {
  float: left;
  width: 80px;
  height: 100%;
  background-color: #30414D;
  color: #767676;
  padding: 35px 25px 25px 25px;
}
#notes-list {
  float: left;
  width: 300px;
  height: 100%;
  background-color: #F5F5F5;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
}
#note-editor {
  min-width: 600px;
  height: 100%;
  margin-left: 380px;
  float: left;
}
</style>
