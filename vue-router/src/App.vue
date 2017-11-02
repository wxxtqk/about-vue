<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-link  :to="{name: 'login'}">登录</router-link>
    <router-link  to="/home">首页</router-link>
    <router-link  to="/params/dynamic">动态路由配置</router-link>
    <router-link  :to="{name: 'nameroute', params: {nameId: 123}}">命名路由</router-link>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
</style>
