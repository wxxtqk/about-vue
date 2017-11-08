<template>
  <el-container>
    <el-header>
      <main-header :header="account"></main-header>
    </el-header>
    <el-main>
      
    </el-main>
    <el-footer>
      <pagination :currentPage="currentPage" :total="pageCount"></pagination>
    </el-footer>
    <add-account :account="account"></add-account>
  </el-container>
</template>

<script>
import { accountList } from '@/api/account'
import mainHeader from '@/components/main-header'
import pagination from '@/components/pagination'
import addAccount from './add-account'
const SUCCES = '200'
export default {
  components: {
    mainHeader,
    pagination,
    addAccount
  },
  data () {
    return {
      accounts: [],
      currentPage: 1, // 默认第一页
      display: 10, // 一页显示多少条
      pageCount: 100,
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
          this.pageCount = response.data.total
        }
      }).catch(() => {
        this.$message({
          showClose: true,
          message: '服务器开吃饭了！请等会儿',
          type: 'error'
        })
      })
    }
  },
  created () {
    this.fetchAccount()
  }
}
</script>


