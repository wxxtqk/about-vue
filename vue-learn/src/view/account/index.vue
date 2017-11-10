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
                <el-dropdown-item @click.native="modifyInfo(scope.row)">修改信息</el-dropdown-item>
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
    <add-account :account="account" @updateList="updateList" :userInfo="userInfo"></add-account>
    <el-dialog width="40%" title="我的好友" :before-close="handleClose"  :visible.sync="dialogFriend"  class="friend-lists">
      <el-row>
        <el-col :span="12">
          <el-input v-model="addFriend" placeholder="请输入好友名称"  @keyup.enter.native="appendFriend"></el-input>
        </el-col>
        <el-col :span="1">
          <el-button icon="el-icon-plus" @click="appendFriend"></el-button>
        </el-col>
      </el-row>
        <el-table :data="firends" style="width: 100%"  border>
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column label="用户名" prop="name" width="100"></el-table-column>
          <el-table-column label="昵称" prop="nickname" width="100"></el-table-column>
          <el-table-column label="操作">
            <template  slot-scope="scope">
              <el-button size="mini" @click="remove(scope.row)">解除与好的关系</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-dialog>
  </el-container>
</template>

<script>
import { accountList, fetchFriends, appendFriend, deleteFriend, fetchUserinfo } from '@/api/account'
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
      firends: [],
      userInfo: {},
      currentPage: 1, // 默认第一页
      display: 10, // 一页显示多少条
      pageCount: 100,
      addFriend: '', // 需要增加的好友
      selectedFriend: '', // 选中的好友
      dialogFriend: false, // 控制显示我的好友弹框
      account: {
        input: '搜索的内容',
        plholder: '请输入用户名、昵称',
        dialogVisible: false,
        type: true, // 判断是增加用户界面还是修改用户界面 true=>新增用户
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
    updateList () {
      this.currentPage = 1
      this.fetchAccount()
    },
    // 增加好友
    appendFriend () {
      let info = {
        userinfoId: this.selectedFriend,
        imFrendsId: this.addFriend
      }
      if (this.addFriend === '') {
        return
      }
      appendFriend(info).then(res => {
        res = res.data
        if (res.state === SUCCES) {
          this.$message({
            type: 'success',
            message: '添加好友成功'
          })
          // 添加完好友后做回现
          let data = {
            userinfoId: this.selectedFriend
          }
          this.adf(data)
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
      .catch(() => {
        this.$message.error('连接服务器出错')
      })
    },
    // 查看用户好友
    seeAccount (index, row) {
      this.dialogFriend = true
      this.selectedFriend = row.userInfo.userInfoId
      let data = {
        userinfoId: row.userInfo.userInfoId
      }
      this.adf(data)
    },
    handleClose () {
      this.dialogFriend = false
    },
    // 查看用户的好友
    adf (data) {
      fetchFriends(data).then((res) => {
        res = res.data
        if (res.state === SUCCES) {
          this.firends = res.data
        } else if (res.state === '400') {
          this.$message('该用户没有好友')
        } else {
          this.$message.error('获取好友失败')
        }
      })
      .catch(() => {
        this.$message.error('连接服务器出错')
      })
    },
    // 解除好友关系
    remove (row) {
      console.log(row)
      let info = {
        oneselfId: this.selectedFriend,
        friendsId: row.name
      }
      deleteFriend(info).then(res => {
        res = res.data
        if (res.state === SUCCES) {
          this.$message({
            message: '移除好友成功',
            type: 'success'
          })
          let data = {
            userinfoId: this.selectedFriend
          }
          this.adf(data)
        } else {
          this.message.error('解除好友失败')
        }
      })
      .catch(() => {
        this.message.error('连接服务器失败')
      })
    },
    // 修改用户信息
    modifyInfo (row) {
      this.account.dialogVisible = true
      this.account.type = false
      let info = {
        userinfoId: row.userInfo.userInfoId
      }
      fetchUserinfo(info).then(res => {
        res = res.data
        if (res.state === SUCCES) {
          this.userInfo = res.data
        } else {
          this.$message.error('获取用户信息失败')
        }
      })
      .catch(() => {
        this.$message.error('连接数据库失败')
      })
    }
  },
  created () {
    this.fetchAccount()
  }
}
</script>

<style lang="stylus" scoped>
.friend-lists
  text-align left
</style>


