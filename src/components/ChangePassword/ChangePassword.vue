<template lang="pug">
  .changePasswordContainer
    el-row.title 更改密码
    el-row.infoRow
      el-form(label-width="100px")
        el-form-item(label="原密码：")
          el-input.iptWidth(placeholder="请输入原密码", v-model="originPassword", type="password")
        el-form-item(label="新密码：")
          el-input.iptWidth(placeholder="请输入新密码", v-model="password", type="password")
        el-form-item(label="确认密码：")
          el-input.iptWidth(placeholder="请确认新密码", v-model="confrimPassword", type="password")
        el-form-item
          el-row(type="flex", justify="center")
            el-button(type="warning", @click="submit") 提交
</template>

<script>
import { mapGetters } from 'vuex'
import { UpdateMemberPassword } from '@/api/member'
import { getUserInfoMixin } from '@/common/js/mixins'
export default {
  mixins: [getUserInfoMixin],
  data() {
    return {
      originPassword: '',
      password: '',
      confrimPassword: ''
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
      if (this.userInfo.password !== this.originPassword) {
        this.$notify.error({
          title: '错误',
          message: '原密码输入错误，请重新输入'
        })
        return
      } else if (!this.validPassword()) {
        this.$notify.error({
          title: '错误',
          message: '密码为空或两次密码输入不一致'
        })
        return
      } else if (this.password.length < 6 || this.password > 18) {
        this.$notify.warning({
          title: '警告',
          message: '输入的密码需要在6-18位之间'
        })
        return
      }
      const params = {
        memberId: this.userInfo.memberId,
        password: this.password
      }
      this._changePassword(params)
      // 此时向后台发起请求，包含memberId， password的改密请求，完成改密逻辑
    },
    async _changePassword(params) {
      try {
        const { data } = await UpdateMemberPassword(params)
        console.log('data-->', data)
        if (data.result) {
          this.$notify.success({
            title: '成功',
            message: '修改密码成功'
          })
          this.getUserInfoHandler(this.userInfo.memberId)
          setTimeout(() => {
            this.$router.push('/pc/personalcenter/myinfo')
          }, 1300)
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  created() {
    if (!this.userInfo.memberId) {
      this.$router.push('/pc/personalcenter/myinfo')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/variables.less';
.changePasswordContainer {
  padding: 15px;
  font-size: @font-size-medium-x;
  background-color: @background-extra-light-gray;
  border-radius: 4px;
  .title {
    padding-bottom: 20px;
    font-weight: bold;
  }
  .infoRow {
    margin-bottom: 20px;
    font-size: @font-size-small-x;
    line-height: 36px;
    &:last-child {
      margin-bottom: 0;
    }
    .label {
      width: 100px;
      text-align: right;
    }
    .iptWidth {
      width: 250px;
    }
  }
}
</style>
