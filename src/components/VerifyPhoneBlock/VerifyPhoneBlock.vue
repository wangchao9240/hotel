<template lang="pug">
  .verifyPhoneBlock
    el-form-item(label="手机号：")
      el-input.iptWidth(v-model="mobilePhone")
    el-form-item(label="验证码：")
      el-row
        el-col(:span="4")
          el-input.verifyIpt(v-model="verifyNum")
        el-col(:span="18")
          el-button(type="primary", @click="sendAjax", :disabled="countDown") {{ countDown ? `${countDownText}s` : '发送验证码' }}
</template>

<script>
import { regObj } from '@/common/js/utils'
import { SendPhoneCode } from '@/api/member'
export default {
  props: {
    defaultMobilePhone: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      mobilePhone: '',
      countDown: false,
      countDownText: 60,
      verifyNum: ''
    }
  },
  methods: {
    validPhone() {
      if (!this.mobilePhone.match(regObj.phone)) return false
      else return true
    },
    startCountDown() {
      this.countDown = true
      const timer = setInterval(() => {
        if (this.countDownText > 0) {
          this.countDownText--
        } else {
          this.countDown = false
          clearInterval(timer)
        }
      }, 1000)
    },
    sendAjax() {
      if (!this.validPhone()) {
        this.$notify.error({
          title: '错误',
          message: '请填写正确的手机号'
        })
        return
      }
      // 这里发送获取验证码的请求，请求结果为true时则开始计时1分钟
      this._sendPhoneVerify(this.mobilePhone)
    },
    async _sendPhoneVerify(mobilePhone) {
      try {
        const { data } = await SendPhoneCode({VerifyValue: mobilePhone})
        if (!data.error) {
          this.$notify({
            type: 'success',
            title: '成功',
            message: '请求发送验证码成功'
          })
          this.startCountDown()
        } else {
          this.$notify({
            type: 'error',
            title: '失败',
            message: data.error.message
          })
        }
      } catch (err) {
        this.$notify({
          type: 'error',
          title: '失败',
          message: '该手机号已被注册过了。'
        })
      }
    }
  },
  created() {
    if (this.defaultMobilePhone) this.mobilePhone = this.defaultMobilePhone
  },
  watch: {
    mobilePhone(newVal) {
      this.$emit('mobilePhone', newVal)
    },
    verifyNum(newVal) {
      this.$emit('verifyNum', newVal)
    }
  }
}
</script>

<style lang="less" scoped>
.iptWidth {
  width: 250px;
}
.verifyIpt {
  width: 100px;
}
</style>
