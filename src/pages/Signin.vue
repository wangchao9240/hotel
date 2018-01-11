<template lang="pug">
  transition(name="el-fade-in")
    .signinContainer
      el-row(type="flex", justify="center")
        el-col.title(:span="16") 会员注册
      el-row(type="flex", justify="center")
        el-col.signInfoContainer(:span="16")
          el-form(:model="signinForm", label-width="130px", :rules="formRules")
            el-form-item(label="登录名", required, prop="username")
              el-col(:span="12")
                el-input(v-model="signinForm.username")
            el-form-item(label="姓", required, prop="surName")
              el-col(:span="12")
                el-input(v-model="signinForm.surName")
            el-form-item(label="名", required, prop="name")
              el-col(:span="12")
                el-input(v-model="signinForm.name")
            el-form-item(label="称谓", required, prop="gender")
              el-col(:span="12")
                el-select.sexSelect(v-model="signinForm.gender", placeholder="请选择称谓")
                  el-option(
                  v-for="item in sexOptions",
                  :key="item.value",
                  :label="item.label",
                  :value="item.value"
                  )
            el-form-item(label="生日", required, prop="birthday")
              el-col(:span="12")
                el-date-picker.birthadyPicker(
                v-model="signinForm.birthday",
                type="date",
                placeholder="请选择生日",
                :picker-options="birthdayPicker",
                :default-value="defaultDate",
                :editable="false"
                )
            el-form-item(label="手机号", required, prop="mobilePhone")
              el-col(:span="12")
                el-input(v-model="signinForm.mobilePhone")
            el-form-item(label="Email", required, prop="email")
              el-col(:span="12")
                el-input(v-model="signinForm.email")
            el-form-item(label="密码", required, prop="password")
              el-col(:span="12")
                el-input(v-model="signinForm.password", type="password")
            el-form-item(label="确认密码", required, prop="rePassword")
              el-col(:span="12")
                el-input(v-model="signinForm.rePassword", type="password")
            el-form-item(label="推介会员注册邮箱", prop="PromoteMemberNum")
              el-col(:span="12")
                el-input(v-model="signinForm.PromoteMemberNum")
          el-row.agree(type="flex", justify="center")
            el-checkbox(v-model="readAgree") 我已阅读并同意 《服务协议》 和 《隐私政策》
          el-row(type="flex", justify="center")
            el-button(type="warning", :disabled="!readAgree", @click="signin") 注册
</template>

<script>
import moment from 'moment'
import { regObj } from '@/common/js/utils'
import { signinPost, SendEmailToUser, ValidationRegistration, ValidationPromoteMember } from '@/api/member'
export default {
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value.match(regObj.phone)) return callback(new Error('请输入正确的手机号'))
    }
    const validateConfirmPassword = (rule, value, callback) => {
      if (this.signinForm.password !== value) callback(new Error('两次输入密码不一致!'))
    }
    return {
      signinForm: {
        username: '',
        surName: '',
        name: '',
        gender: 40,
        birthday: '',
        mobilePhone: '',
        email: '',
        password: '',
        rePassword: '',
        PromoteMemberNum: ''
      },
      formRules: {
        username: [{ required: true, message: '登录名不能为空', trigger: 'blur' }],
        surName: [{ required: true, message: '姓氏不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '名字不能为空', trigger: 'blur' }],
        mobilePhone: [{ validator: validatePhone, trigger: 'blur' }],
        email: [{ type: 'email', required: true, message: '请填写正确的邮箱', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { max: 18, min: 6, message: '密码长度应在6-18位之间' }],
        rePassword: [{ required: true, message: '请确认密码', trigger: 'blur' }, { validator: validateConfirmPassword, message: '两次输入的密码不一致', trigger: 'blur' }]
      },
      readAgree: false,
      sexOptions: [
        {
          value: 40,
          label: '先生'
        },
        {
          value: 41,
          label: '女士'
        }
      ],
      birthdayPicker: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7
        }
      },
      defaultDate: new Date(moment('1995-1-1').unix() * 1000)
    }
  },
  methods: {
    validSignin() {
      if (!this.signinForm.username || this.signinForm.username.length < 6 || this.signinForm.username.length > 20) {
        this.$message({
          message: '登录名不能为空且长度在6-20之间',
          type: 'warning'
        })
        return false
      } else if (!this.signinForm.surName) {
        this.$message({
          message: '姓氏不能为空',
          type: 'warning'
        })
        return false
      } else if (!this.signinForm.name) {
        this.$message({
          message: '名字不能为空',
          type: 'warning'
        })
        return false
      } else if (!this.signinForm.birthday) {
        this.$message({
          message: '生日不能为空',
          type: 'warning'
        })
        return false
      } else if (!this.signinForm.mobilePhone.match(regObj.phone)) {
        this.$message({
          message: '请填写正确的手机号',
          type: 'warning'
        })
        return false
      } else if (!this.signinForm.email.match(regObj.email)) {
        this.$message({
          message: '请填写正确的邮箱',
          type: 'warning'
        })
        return false
      } else if (!this.signinForm.password || this.signinForm.password !== this.signinForm.rePassword) {
        this.$message({
          message: '密码不能为空且两次密码填写需一致',
          type: 'warning'
        })
        return false
      } else if (this.signinForm.password.length < 6 || this.signinForm.password.length > 18) {
        this.$message({
          message: '输入的密码应在6-18位之间',
          type: 'warning'
        })
        return false
      }
      return true
    },
    async signin() {
      if (!this.validSignin()) return
      this.signinForm.birthday = moment(this.signinForm.birthday).format('YYYY-MM-DD')
      try {
        const res = await ValidationRegistration({ UserName: this.signinForm.username, MobilePhone: this.signinForm.mobilePhone, Email: this.signinForm.email })
        let res1
        if (this.signinForm.PromoteMemberNum) {
          res1 = await ValidationPromoteMember({ PromoteMemberNum: this.signinForm.PromoteMemberNum })
        }
        console.log('res1----', res1)
        if ((res.data.result.tipMessage !== '验证通过！') || (res1 && res1.data.result.tipMessage !== '验证通过')) {
          if (res1) {
            console.log('enter!!!')
            this.$message.warning(res1.data.result.tipMessage)
          } else {
            this.$message.warning(res.data.result.tipMessage)
          }
          return
        }
        const { data } = await signinPost(this.signinForm)
        if (data.err) {
          this.$message({
            message: data.error,
            type: 'error'
          })
          return
        }
        if (data.success) {
          this.$message({
            message: '注册成功',
            type: 'success'
          })
          const params = {
            emailConfirmationCode: data.result.emailConfirmationCode,
            userName: this.signinForm.username,
            passWord: this.signinForm.password,
            email: this.signinForm.email,
            memberId: data.result.memberId
          }
          this._getVerifyEmail(params)
          setTimeout(() => {
            this.$router.push('/pc/index')
          }, 1500)
        }
      } catch (err) {
        console.log(err)
      }
    },
    async _getVerifyEmail(params) {
      try {
        const { data } = await SendEmailToUser(params)
        if (data.error) {
          this.$notify({
            title: '警告',
            message: data.error.message,
            type: 'error'
          })
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/less/variables.less';
.title {
  margin: 0 20px;
  padding: 20px;
  font-size: @font-size-large;
  font-weight: bold;
  border-radius: 4px;
}
.signInfoContainer {
  background-color: @background-extra-light-gray;
  padding: 20px;
  border-radius: 4px;
  .el-form-item {
    padding-left: 20%;
  }
  .agree {
    padding: 15px 0;
  }
}
.birthadyPicker, .sexSelect {
  width: 100%;
}
</style>
