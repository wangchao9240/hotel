<template lang="pug">
  .memberLogin(:class="{'logined': userInfo && userInfo.memberId}")
    .caseLogin(v-show="!userInfo.memberId")
      el-row(type="flex", justify="center")
        span.title 会员登录
      el-row
        el-col.label(:span="8") 登录名：
        el-col(:span="16")
          el-input.glassIpt(placeholder="用户名/手机/邮箱", v-model="username")
      el-row
        el-col.label(:span="8") 密码：
        el-col(:span="16")
          el-input.glassIpt(placeholder="请输入密码", v-model="passWord", type="password")
      el-row
        el-col.label(:span="8") 验证码：
        el-col(:span="8")
          el-input.glassIpt(v-model="iptCode")
        el-col(:span="8")
          .code(@click="changeCode") {{ code }}
      //- el-row(type="flex", justify="center")
      el-row(type="flex", justify="center")
        el-button.glassBtn(type="warning", @click="loginHandler") 登录
        el-button.glassBtn(@click="signinHandler") 注册
      el-row(type="flex", justify="center")
        span.forget(@click="hrefForgetPassword") 忘记密码？
    .caseMember(v-show="userInfo.memberId")
      el-row(type="flex", justify="center")
        el-col.title(:span="10") 欢迎您，{{ userInfo.surName }}{{ userInfo.gender === 40 ? '先生' : '女士' }}
      el-row
        el-col(:span="8") 邮箱：
        el-col(:span="16") {{ userInfo.email }}
      el-row
        el-col(:span="8") 手机号：
        el-col(:span="16") {{ userInfo.mobilePhone }}
      el-row
        el-col.buttonContainer(:span="12")
          el-button.glassBtn(type="warning", @click="hrefPersonalCenter") 个人中心
        el-col.buttonContainer(:span="12")
          el-button.glassBtn(@click="logoff") 注销
</template>

<script>
import { createCode, validateCode, judgeLoginType } from '@/common/js/utils'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      username: '',
      passWord: '',
      code: '',
      iptCode: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    async loginHandler() {
      if (!this.validLogin()) return
      let params = {}
      params[judgeLoginType(this.username)] = this.username
      params.passWord = this.passWord
      this.$emit('login', params)
    },
    signinHandler() {
      this.$router.push('/pc/signin')
    },
    changeCode() {
      this.code = createCode(4)
    },
    validLogin() {
      if (!this.username) {
        this.$message({
          message: '登录名不能为空',
          type: 'warning'
        })
        return false
      } else if (!this.passWord) {
        this.$message({
          message: '密码不能为空',
          type: 'warning'
        })
        return false
      } else if (!validateCode(this.iptCode, this.code)) {
        this.$message({
          message: '输入的验证码有误',
          type: 'warning'
        })
        this.changeCode()
        return false
      }
      return true
    },
    logoff() {
      this.$emit('logoffTap')
    },
    hrefPersonalCenter() {
      this.$emit('hrefPersonalCenter')
    },
    hrefForgetPassword() {
      this.$emit('hrefForgetPassword')
    }
  },
  created() {
    this.code = createCode(4)
  }
}
</script>

<style lang="less" scoped>
@import "../../common/less/mixin.less";
@import '../../common/less/variables.less';
.memberLogin {
  width: 100%;
  height: 100%;
  font-size: @font-size-small-x;
  .label {
    line-height: 36px;
  }
  .el-row {
    margin-bottom: 20px;
    .title {
      font-size: @font-size-medium;
      font-weight: bold;
    }
    .forget {
      cursor: pointer;
      &:hover {
        color: #999;
      }
    }
    .code {
      font-family: Arial;
      font-style: italic;
      color: blue;
      font-size: 25px;
      border:0;
      padding: 2px 3px;
      letter-spacing: 3px;
      font-weight: bolder;
      float: left;
      cursor: pointer;
      width: 100px;
      height: 20px;
      line-height: 30px;
      text-align: center;
      vertical-align: middle;
    }
    &:last-child {
      margin: 0;
    }
  }
  .buttonContainer {
    text-align: center;
  }
}
</style>
