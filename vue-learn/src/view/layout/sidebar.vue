<template>
  <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#2d3a4b" text-color="#fff" router>
    <template v-for="item in routers">
      <!-- 没有submenu -->
      <el-menu-item :index="item.redirect?item.redirect:item.path+'/'+item.children[0].path" v-if="!item.hidden&&!item.noDropdown">
        <i class="el-icon-menu"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
      <!-- 有submenu -->
      <el-submenu v-if="!item.hidden&&item.noDropdown" index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.name}}</span>
        </template>
         <el-menu-item-group>
           <!-- 子路由 -->
           <template v-for="list in item.children">
             <el-menu-item :index="item.path+'/'+list.path">
                <span slot="title">{{list.name}}</span>
             </el-menu-item>
           </template>
         </el-menu-item-group>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created () {
    console.log(this.$store.getters.routers)
  },
  mounted () {
    console.log('挂载')
  },
  updated () {
    console.log('更新')
  },
  computed: {
    ...mapGetters([
      'routers'
    ])
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
   .el-menu-vertical-demo
      text-align left
</style>