<template lang="pug">
  .changePhone
    el-row.title {{ !userInfo.isPhoneNumberConfirmed ? '验证手机号' : '更改手机号' }}
    el-row.infoRow
      el-form(label-width="80px")
        verify-phone-block(:defaultMobilePhone="userInfo.mobilePhone", @mobilePhone="receivePhoneNum", @verifyNum="receiveVerifyNum")
        el-form-item
          el-row(type="flex", justify="center")
            el-button(type="warning", @click="submitHandler") 提交
</template>

<script>
// import { regObj } from '@/common/js/utils'
import VerifyPhoneBlock from '@/components/VerifyPhoneBlock/VerifyPhoneBlock'
import { mapGetters } from 'vuex'
import { GetUserVerifyLogByCode, UpdateUserPhone } from '@/api/member'
export default {
  data() {
    return {
      mobilePhone: '',
      verifyNum: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    receivePhoneNum(phoneNum) {
      this.mobilePhone = phoneNum
    },
    receiveVerifyNum(verifyNum) {
      this.verifyNum = verifyNum
    },
    async submitHandler() {
      // 拿到memberid， 手机号和验证码进行绑定
      console.log(this.mobilePhone, this.verifyNum)
      try {
        const params = {
          VerifyValue: this.mobilePhone,
          VerifyNum: this.verifyNum
        }
        const { data } = await GetUserVerifyLogByCode(params)
        if (data.result && data.success) {
          const data1 = await UpdateUserPhone({ MobilePhone: this.mobilePhone, MemberId: this.userInfo.memberId })
          if (data1.data.result && data1.data.success) {
            this.$notify.success({
              title: '成功',
              message: '验证手机号成功'
            })
            setTimeout(() => {
              this.$router.push('/pc/personalcenter/myinfo')
            }, 1500)
          }
        } else {
          this.$notify({
            message: '验证失败',
            type: 'warning',
            title: '失败'
          })
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  created() {
    if (!this.userInfo.memberId) this.$router.push('/pc/personalcenter/myinfo')
    // const copyUserInfo = Object.assign({}, this.userInfo)
    this.mobilePhone = this.userInfo.mobilePhone
  },
  components: {
    VerifyPhoneBlock
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/variables.less';
.changePhone {
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
