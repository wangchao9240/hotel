<template lang="pug">
  .verifyEmailBlock
    .formContainer(v-show="!sended")
      el-form-item(label="请输入邮箱：")
        el-input.iptWidth(v-model="email", placeholder="请输入邮箱")
      el-form-item(label="")
        el-button(type="primary", @click="sendEmail") {{ submit ? '提交' : '发送激活邮件' }}
    .successContainer(v-show="sended")
      i.el-icon-check
      span 一封邮件已成功发送到{{ email }}，请前往邮箱查看
</template>

<script>
import { regObj } from '@/common/js/utils'
export default {
  props: {
    submit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sended: false,
      email: ''
    }
  },
  methods: {
    validEmail() {
      if (!this.email || !this.email.match(regObj.email)) return false
      else return true
    },
    sendEmail() {
      if (!this.validEmail()) {
        this.$notify.error({
          title: '错误',
          message: '请填写正确的邮箱'
        })
        return
      }
      // 这里进行ajax请求 发送的参数是用户名和输入的邮箱，如果成功则提示发送成功，如果出现错误则提示
      // console.log('发送邮件')
      this.$emit('sended', this.email)
    },
    sendedHandler() {
      this.sended = true
    }
  },
  watch: {
    email(newVal) {
      this.$emit('email', newVal)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/variables.less';
.iptWidth {
  width: 250px;
}
.successContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  .el-icon-check {
    color: @color-text-success-green;
    font-size: 30px;
  }
}
</style>
