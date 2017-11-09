<template>
  <el-container>
    <el-header>
      <main-header :header="account"></main-header>
    </el-header>
    <el-main>
      <el-table :data="accounts" style="width: 100%" border>
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column property="userAccount" label="用户名" width="120" align="center"> </el-table-column>
        <el-table-column property="userInfo.userInfoName" label="昵称" width="120" align="center"> </el-table-column>
        <el-table-column property="userInfo.imGroupName" label="分组" width="120" align="center"> </el-table-column>
        <el-table-column property="createTime|filterDate" label="创建时间"> </el-table-column>
        <el-table-column label="操作" width="200">
          <template  slot-scope="scope">
            <el-dropdown split-button  trigger="click" size="medium">
            操作
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="seeAccount(scope.$index, scope.row)">查看用户好友</el-dropdown-item>
                <el-dropdown-item >修改信息</el-dropdown-item>
                <el-dropdown-item >重置密码</el-dropdown-item>
                <el-dropdown-item >删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
    </el-footer>
    <add-account :account="account"></add-account>
    <el-dialog width="40%" title="我的好友" :before-close="handleClose"  :visible.sync="dialogFriend">
      <el-row>
        <el-col :span="12">
          <el-input v-model="addFriend" placeholder="请输入好友名称"></el-input>
        </el-col>
        <el-col :span="1">
          <el-button icon="el-icon-plus"></el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </el-container>
</template>

<script>
import { accountList } from '@/api/account'
import mainHeader from '@/components/main-header'
import addAccount from './add-account'
const SUCCES = '200'
export default {
  components: {
    mainHeader,
    addAccount
  },
  data () {
    return {
      accounts: [],
      currentPage: 1, // 默认第一页
      display: 10, // 一页显示多少条
      pageCount: 100,
      addFriend: '',
      dialogFriend: false, // 控制显示我的好友弹框
      account: {
        input: '搜索的内容',
        plholder: '请输入用户名、昵称',
        dialogVisible: false,
        btn: '新增用户'
      }
    }
  },
  methods: {
    // 获取用户列表
    fetchAccount () {
      accountList(this.currentPage, this.display).then((response) => {
        response = response.data
        if (response.state === SUCCES) {
          this.accounts = response.data.rows
          // this.pageCount = response.data.total
        }
      }).catch(() => {
        this.$message({
          showClose: true,
          message: '服务器开吃饭了！请等会儿',
          type: 'error'
        })
      })
    },
    // 查看用户好友
    seeAccount (index, row) {
      this.dialogFriend = true
      console.log(index)
      console.log(row)
    },
    handleClose () {
      this.dialogFriend = false
    }
  },
  created () {
    this.fetchAccount()
  }
}
</script>


