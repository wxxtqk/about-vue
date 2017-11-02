<template>
  <div class="login-container">
    <el-form  :model="login" class="login-form" ref="login" label-position="left" :rules="rules">
      <h3 class="title">灭火应急救援后台管理系统</h3>
      <el-form-item  prop="name">
        <i class="icon iconfont icon-user"></i>
        <el-input v-model="login.name" type="text" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <i class="icon iconfont icon-mima"></i>
        <el-input v-model="login.password" type="password" auto-complete="off" @keyup.enter.native="handleLogin"></el-input>
      </el-form-item>
      <el-form-item>
       <el-button type="primary" class="login-btn" style="width:100%" @click.native="handleLogin" :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {isValidUserName} from '@/utils/validate'
  export default {
    data () {
      const validatorName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入用户名'))
        } else if (!isValidUserName(value)) {
          callback(new Error('用户名不存在'))
        } else {
          callback()
        }
      }
      const validatorPassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'))
        } else if (value.length < 6) {
          callback(new Error('密码必须大于6位'))
        } else {
          callback()
        }
      }
      return {
        login: {
          name: 'admin',
          password: '123456'
        },
        rules: {
          name: [
            {required: true, trigger: 'blur', validator: validatorName}
          ],
          password: [
            {required: true, trigger: 'blur', validator: validatorPassword}
          ]
        },
        loading: false
      }
    },
    methods: {
      handleLogin () {
        this.$refs.login.validate((valid) => {
          if (valid) {
            this.loading = true
            // 执行登录操作
            this.$store.dispatch('Login', this.login).then((res) => {
              this.loading = false
              if (!res) {
                this.$message.error('用户名或者密码错误')
                return
              }
              this.$message('登录成功')
              this.$router.push({path: '/'})
            }).catch((error) => {
              this.$message('登录服务器出错')
              this.loading = false
              console.log(error)
            })
          } else {
            this.loading = false
            return false
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
  .login-container {
    height: 100vh;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input{
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      border: none;
      background: transparent;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>
