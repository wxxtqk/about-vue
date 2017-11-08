<template>
    <el-row>
        <el-col :span="11">
          <el-input :placeholder="header.plholder" prefix-icon="el-icon-search" v-model="header.input"></el-input>
        </el-col>
        <el-col :span="12" >
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button type="primary" @click="addAccount">{{header.btn}}</el-button>
        </el-col>
    </el-row>
</template>

<script>
export default {
  props: {
    header: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    search () {
      console.log('搜索')
    },
    addAccount () {
      this.header.dialogVisible = true
    }
  }
}
</script>

