<template>
  <el-dialog title="增加用户" :visible.sync="account.dialogVisible" width="50%" :before-close="handleClose" top="5vh" class="add-account">
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="用户账号">
        <el-input v-model="form.userAccount" :disabled="!account.type"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" v-if="account.type">
        <el-input v-model="form.userPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" v-if="account.type">
        <el-input v-model="validatePassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="用户姓名">
        <el-input v-model="form.userInfoName"></el-input>
      </el-form-item>
      <el-form-item label="出生年月">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;" format="yyyy - MM - dd"  value-format="yyyy-MM-dd"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="身份证">
        <el-input v-model="form.station"></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="form.telephone"></el-input>
      </el-form-item>
      <el-form-item label="登录人所属部门编号">
        <el-input v-model="form.degree"></el-input>
      </el-form-item>
      <el-form-item label="民族">
        <el-select v-model="form.familyName" placeholder="请选择">
          <el-option v-for="item in nations" :key="item.sysParamLogicId" :label="item.sysParamName" :value="item.sysParamLogicId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="籍贯">
        <v-distpicker :province="form.province" :city="form.city" :area="form.area" @selected="selected"></v-distpicker>
      </el-form-item>
      <el-form-item label="政治面貌">
        <el-select v-model="form.politicalName" placeholder="请选择">
          <el-option v-for="item in politicalVisage" :key="item.sysParamLogicId" :label="item.sysParamName" :value="item.sysParamLogicId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学历">
        <el-select v-model="form.educationName" placeholder="请选择">
          <el-option v-for="item in education" :key="item.sysParamLogicId" :label="item.sysParamName" :value="item.sysParamLogicId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="户口类型">
        <el-select v-model="form.registeredType" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身体状况">
        <el-select v-model="form.healthState" placeholder="请选择">
          <el-option v-for="item in healthStates" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="警衔">
        <el-input v-model="form.armedOliceRank"></el-input>
      </el-form-item>
      <el-form-item label="行政职务名称">
        <el-input v-model="form.administrativeName"></el-input>
      </el-form-item>
      <el-form-item label="行政职务级别">
        <el-input v-model="form.administrativeLevel"></el-input>
      </el-form-item>
      <el-form-item label="专业技术职务">
        <el-input v-model="form.technicalPositionPost"></el-input>
      </el-form-item>
      <el-form-item label="岗位状态">
        <el-select v-model="form.cadreState">
          <el-option v-for="item in cadreStates" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload class="avatar-uploader" action="http://192.168.199.206:8089/ods-backstage-web/image/head" :show-file-list="false" :before-upload="beforeAvatarUpload" :http-request="upload">
            <img v-if="form.headImage" :src="form.headImage" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item class="footer">
        <el-button type="primary" @click="onSubmit" v-if="account.type">立即创建</el-button>
        <el-button type="primary" @click="modify" v-if="!account.type">修改</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import VDistpicker from 'v-distpicker'
import { uploadFile, fetchSystem, addAccount, modifyInfo } from '@/api/account'
const SUCCES = '200'
export default {
  props: {
    account: {
      type: Object,
      default: function () {
        return {}
      }
    },
    userInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  components: {
    VDistpicker
  },
  computed: {
    form () {
      if (!this.account.type) {
        console.log('+++')
        return this.userInfo
      } else {
        console.log('-----')
        return this.deaultform
      }
    }
  },
  mounted () {
    fetchSystem().then((res) => {
      res = res.data
      if (res.state === SUCCES) {
        this.education = res.data.education
        this.form.educationName = this.education[0].sysParamName
        this.nations = res.data.nations
        this.form.familyName = this.nations[0].sysParamName
        this.politicalVisage = res.data.politicalVisage
        this.form.politicalName = this.politicalVisage[0].sysParamName
      }
    })
    .catch(() => {
      this.$message.error('获取系统参数出错')
    })
  },
  data () {
    return {
      nations: [],
      education: [],
      validatePassword: '',
      politicalVisage: [],
      options: [{
        label: '城镇',
        value: '城镇'
      }, {
        label: '农村',
        value: '农村'
      }],
      cadreStates: [{
        label: '在岗',
        value: '在岗'
      }, {
        label: '不在岗',
        value: '不在岗'
      }],
      healthStates: [{
        label: '优',
        value: '优'
      }, {
        label: '良',
        valeu: '良'
      }, {
        label: '差',
        value: '差'
      }],
      deaultform: {
        userAccount: '',
        userPassword: '',
        userInfoName: '',
        birthday: '',
        station: '',
        telephone: '',
        degree: '',
        familyName: '',
        politicalName: '',
        registeredType: '城镇',
        educationName: '',
        healthState: '优',
        armedOliceRank: '',
        administrativeName: '',
        administrativeLevel: '',
        technicalPositionPost: '',
        cadreState: '在岗',
        gender: '0',
        desc: '',
        province: '广东省',
        city: '广州市',
        area: '海珠区',
        headImage: ''
      }
    }
  },
  methods: {
    handleClose () {
      this.account.dialogVisible = false
    },
    // 用户籍贯
    selected (obj) {
      this.area = obj.area.value
      this.city = obj.area.value
      this.province = obj.area.value
    },
    upload (file) {
      let formdata = new FormData()
      formdata.append('file', file.file)
      uploadFile(formdata).then((res) => {
        res = res.data
        if (res.state === SUCCES) {
          this.form.headImage = res.data.url
        } else {
          this.$message.error('上传头像失败!')
        }
      })
      .catch((error) => {
        console.log(error)
      })
    },
    // 新增用户
    onSubmit () {
      // 提交到后台
      addAccount(this.form).then((res) => {
        res = res.data
        if (res.state === SUCCES) {
          this.$emit('updateList')
          this.account.dialogVisible = false
        } else {
          this.$message.error(res.message)
        }
      })
      .catch(() => {
        this.$message.error('连接数据库失败')
      })
    },
    // 修改用户信息
    modify () {
      modifyInfo(this.form).then((res) => {
        res = res.data
        if (res.state === SUCCES) {
          this.$emit('updateList')
          this.account.dialogVisible = false
          this.$message('修改信息成功')
        } else {
          this.$message.error(res.message)
        }
      })
      .catch(() => {
        this.$message.error('连接数据库失败')
      })
    },
    // 取消
    cancel () {
      this.account.dialogVisible = false
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="stylus">
.add-account
  text-align left
  .avatar-uploader
    div
      border 1px dashed #d9d9d9
      border-radius 6px
      cursor pointer
      position relative
      overflow hidden
    div:hover
      border-color #409EFF
    .avatar-uploader-icon
      font-size 28px
      color #8c939d
      width 150px
      height 150px
      line-height 150px
      text-align center
    .avatar
      width 150px
      height 150px
      display block
  .footer
    text-align center
</style>
