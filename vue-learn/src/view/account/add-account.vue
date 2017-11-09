<template>
  <el-dialog title="增加用户" :visible.sync="account.dialogVisible" width="50%" :before-close="handleClose" top="5vh" class="add-account">
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="用户姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="出生年月">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.resource">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="身份证">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="登录人所属部门编号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="民族">
        <el-select v-model="nation" placeholder="请选择">
          <el-option v-for="item in nations" :key="item.sysParamLogicId" :label="item.sysParamName" :value="item.sysParamLogicId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="籍贯">
        <v-distpicker :province="province" :city="city" :area="area" @selected="selected"></v-distpicker>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="政治面貌">
        <el-select v-model="visage" placeholder="请选择">
          <el-option v-for="item in politicalVisage" :key="item.sysParamLogicId" :label="item.sysParamName" :value="item.sysParamLogicId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学历">
        <el-select v-model="selEdu" placeholder="请选择">
          <el-option v-for="item in education" :key="item.sysParamLogicId" :label="item.sysParamName" :value="item.sysParamLogicId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="户口类型">
        <el-select v-model="house" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身体状况">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="警衔">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="行政职务名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="行政职务级别">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="专业技术职务">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="岗位状态">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload class="avatar-uploader" action="http://192.168.199.206:8089/ods-backstage-web/image/head" :show-file-list="false" :before-upload="beforeAvatarUpload" :http-request="upload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      </el-form-item>
      <el-form-item class="footer">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import VDistpicker from 'v-distpicker'
import { uploadFile, fetchSystem } from '@/api/account'
const SUCCES = '200'
export default {
  props: {
    account: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  components: {
    VDistpicker
  },
  mounted () {
    fetchSystem().then((res) => {
      res = res.data
      if (res.state === SUCCES) {
        this.education = res.data.education
        this.selEdu = this.education[0].sysParamName
        this.nations = res.data.nations
        this.nation = this.nations[0].sysParamName
        this.politicalVisage = res.data.politicalVisage
        this.visage = this.politicalVisage[0].sysParamName
      }
    })
    .catch(() => {
      this.$message.error('获取系统参数出错')
    })
  },
  data () {
    return {
      imageUrl: '',
      house: '城镇',
      nation: '',
      nations: [],
      education: [],
      selEdu: '',
      visage: '',
      politicalVisage: [],
      province: '广东省',
      city: '广州市',
      area: '海珠区',
      options: [{
        label: '城镇',
        value: '城镇'
      }, {
        label: '农村',
        value: '农村'
      }],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '0',
        desc: ''
      }
    }
  },
  methods: {
    handleClose () {
      this.account.dialogVisible = false
    },
    selected (val) {
      console.log(val)
    },
    upload (file) {
      let formdata = new FormData()
      formdata.append('file', file.file)
      uploadFile(formdata).then((res) => {
        res = res.data
        if (res.state === SUCCES) {
          this.imageUrl = res.data.url
        } else {
          this.$message.error('上传头像失败!')
        }
      })
      .catch((error) => {
        console.log(error)
      })
    },
    onSubmit () {
      // 提交到后台
      this.account.dialogVisible = false
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
