<template lang="pug">
  .changePasswordContainer
    el-row(type="flex", justify="center")
      el-col.forgetPassword.brandTitle(:span="18")
        .title 忘记密码
    el-row(type="flex", justify="center")
      el-col.forgetPassword(:span="18")
        el-form(label-width="100px")
          el-form-item(label="新密码：")
            el-input.iptWidth(placeholder="请输入新密码", type="password", v-model="password")
          el-form-item(label="确认密码：")
            el-input.iptWidth(placeholder="请确认新密码", type="password", v-model="confrimPassword")
          el-form-item
            el-row(type="flex", justify="center")
              el-button(type="warning", @click="submit") 提交
</template>

<script>
import { mapGetters } from 'vuex'
import { UpdateMemberPassword, Decryption } from '@/api/member'
export default {
  data() {
    return {
      password: '',
      confrimPassword: '',
      memberId: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    validPassword() {
      if (!this.password || this.password !== this.confrimPassword) return false
      else return true
    },
    submit() {
      if (!this.validPassword()) {
        this.$notify.error({
          title: '错误',
          message: '密码为空或两次密码输入不一致'
        })
        return
      }
      console.log('ajax')
      const params = {
        MemberId: this.memberId,
        Password: this.password
      }
      this._UpdateMemberPassword(params)
      // 此时向后台发起请求，包含memberId， password的改密请求，完成改密逻辑
    },
    async _UpdateMemberPassword(params) {
      try {
        const { data } = await UpdateMemberPassword(params)
        if (data.result) {
          this.$notify.success({
            title: '成功',
            message: '更改密码成功'
          })
          setTimeout(() => {
            this.$router.push('/pc/index')
          }, 1500)
        }
      } catch (err) {
        this.$notify.warning({
          title: '警告',
          message: '更改密码失败'
        })
        console.log(err)
      }
    },
    async _Decryption(crypto) {
      try {
        const { data } = await Decryption({ DecryptString: crypto })
        this.memberId = data.result
      } catch (err) {
        console.log(err)
      }
    }
  },
  created() {
    this._Decryption(this.$route.query.memberId)
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
