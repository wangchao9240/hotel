<template lang="pug">
  .forgetPasswordContainer
    el-row(type="flex", justify="center")
      el-col.forgetPassword.brandTitle(:span="18")
        .title 忘记密码
    el-row(type="flex", justify="center")
      el-col.forgetPassword(:span="18")
        el-form(label-width="150px")
          el-form-item(label="用户名：", v-show="!showNext")
            el-input.iptWidth(v-model="username")
          el-form-item(label="找回方式：", v-show="!sended && showNext")
            el-radio.radio(v-model="chooseType", label="1", v-show="phoneConfirmed") 通过手机号找回
            el-radio.radio(v-model="chooseType", label="2", v-show="emailConfirmed") 通过邮箱找回
          verify-phone-block(@mobilePhone="receivePhone", @verifyNum="receiveVerify", v-show="chooseType - 0 === 1 && showNext && phoneConfirmed")
          verify-email-block(v-show="chooseType - 0 === 2 && showNext && emailConfirmed", @email="emailHandler", @sended="sendedHandler", ref="verifyEmail")
        el-row(type="flex", justify="center", v-show="chooseType - 0 === 1 && showNext")
          el-button(type="warning", @click="submitHandler") 提交
        el-row(type="flex", justify="center", v-show="!showNext")
          el-button(type="warning", @click="saveUserName") 下一步
</template>

<script>
import VerifyPhoneBlock from '@/components/VerifyPhoneBlock/VerifyPhoneBlock'
import VerifyEmailBlock from '@/components/VerifyEmailBlock/VerifyEmailBlock'
import { GetPhoneAndEmailVerify, GetPhoneAndCodeVerify, SendEmailUser } from '@/api/member'
export default {
  data() {
    return {
      chooseType: '1',
      mobilePhone: '',
      verifyNum: '',
      sended: false,
      username: '',  // 用户先填写用户名，之后再找回
      showNext: false,
      phoneConfirmed: true,
      emailConfirmed: true,
      showChange: false,
      password: '',
      memberId: '',
      email: ''
    }
  },
  methods: {
    receivePhone(mobilePhone) {
      this.mobilePhone = mobilePhone
    },
    receiveVerify(verifyNum) {
      this.verifyNum = verifyNum
    },
    emailHandler(email) {
      this.email = email
    },
    submitHandler() {
      if (this.chooseType - 0 === 1) {  // 如果选择通过手机号找回
        console.log(this.mobilePhone, this.verifyNum)
        // -----------
        const params = {
          MobilePhone: this.mobilePhone,
          VerifyNum: this.verifyNum,
          UserName: this.username
        }
        this._GetPhoneAndCodeVerify(params)
        // -------------
        // username通过url上面的params拿到
        // 这里给后台发送请求，通过路由上的username、mobilePhone和verifyNum三个参数验证是否通过 如果通过则传回memberId进行改密逻辑
      }
    },
    saveUserName() {
      // 在这里发送用户名到服务器，查询该账号的绑定状态
      this._GetPhoneAndEmailVerify(this.username)
    },
    async _GetPhoneAndEmailVerify(userName) {
      try {
        const { data } = await GetPhoneAndEmailVerify({ userName })
        console.log('data-->', data)
        if (data.success) {
          this.phoneConfirmed = data.result.isPhoneNumberConfirmed
          this.emailConfirmed = data.result.isEmailConfirmed
          this.showNext = true
        } else {
          this.$notify({
            type: 'warning',
            message: '该用户名暂未注册',
            title: '警告'
          })
          return
        }
      } catch (err) {
        console.log(err)
      }
    },
    sendedHandler() {
      const params = {
        Email: this.email,
        UserName: this.username
      }
      this._SendEmailUser(params)
    },
    async _SendEmailUser(params) {
      try {
        const { data } = await SendEmailUser(params)
        if (data.result) {
          this.sended = true
          this.$refs.verifyEmail.sendedHandler()
        }
      } catch (err) {
        console.log(err)
      }
    },
    async _GetPhoneAndCodeVerify(params) {
      try {
        const { data } = await GetPhoneAndCodeVerify(params)
        if (!data.result.memberId) {
          this.$notify.error({
            title: '警告',
            message: '验证失败'
          })
          return
        } else {
          this.memberId = data.result.memberId
          this.$router.push({
            name: 'changepassword',
            query: {
              memberId: this.memberId
            }
          })
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  components: {
    VerifyPhoneBlock,
    VerifyEmailBlock
  }
}
</script>

<style lang="less" scoped>
@import '../common/less/variables.less';
.forgetPassword {
  margin-top: 20px;
  padding: 15px;
  border-radius: 4px;
  background-color: @background-extra-light-gray;
  &.brandTitle {
    background-color: @background-footer;
    color: #555;
  }
  .title {
    font-weight: bold;
  }
  .iptWidth {
    width: 250px;
  }
  .verifyIpt {
    width: 100px;
  }
}
</style>
