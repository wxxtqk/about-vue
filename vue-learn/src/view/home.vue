<template>
    <el-container style="height:100%">
        <el-header class="el-header">Header</el-header>
        <el-container>
            <el-aside width="200px" class="el-aside">
                <sidebar></sidebar>
            </el-aside>
            <el-main>
                <app-main></app-main>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import sidebar from './layout/sidebar'
import appMain from './layout/app-mian'
export default {
  components: {
    sidebar,
    appMain
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
    bg-color = #2d3a4b
    .el-header
        background bg-color
    .el-aside
        background bg-color
</style>
