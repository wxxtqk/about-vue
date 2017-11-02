<template>
  <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#2d3a4b" text-color="#fff" router>
      <el-menu-item index="/home/account" :route="{path: '/home/account'}">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/home/water" :route="{path: '/home/water'}">
        <i class="el-icon-menu"></i>
        <span slot="title">水源管理</span>
      </el-menu-item>
    </el-menu>
</template>

<<script>
export default {
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

