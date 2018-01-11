<template lang="pug">
  .changeEmail
    el-row.title 更改邮箱
    el-row.infoRow
      el-form(label-width="100px")
        verify-email-block(@sended="sendEmailHandler", ref="verifyEmail", :submit="true")
</template>

<script>
import VerifyEmailBlock from '@/components/VerifyEmailBlock/VerifyEmailBlock'
import { UpdateMemberEmail } from '@/api/member'
import { getUserInfoMixin } from '@/common/js/mixins'
import { mapGetters } from 'vuex'
export default {
  mixins: [getUserInfoMixin],
  methods: {
    async _UpdateMemberEmail(email) {
      try {
        const params = {
          Email: email,
          MemberId: this.userInfo.memberId
        }
        const { data } = await UpdateMemberEmail(params)
        if (data.result) {
          this.$notify({
            type: 'success',
            message: '修改成功',
            title: '成功'
          })
          this.getUserInfoHandler(this.userInfo.memberId)
          setTimeout(() => {
            this.$router.push('/pc/personalcenter/myinfo')
          }, 1500)
        }
      } catch (err) {
        console.log(err)
      }
    },
    sendEmailHandler(email) {
      console.log(email)
      this._UpdateMemberEmail(email)
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    if (!this.userInfo.memberId) {
      this.$router.push('/pc/personalcenter/myinfo')
    }
  },
  components: {
    VerifyEmailBlock
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/variables.less';
.changeEmail {
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
  }
}
</style>
