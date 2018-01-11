<template lang="pug">
  .myInfo
    el-row.title 我的信息
    el-row.infoRow
      el-col(:span="10")
        el-row(:gutter="20")
          el-col.label(:span="12") 登录名：
          el-col(:span="12")
            span(v-show="!edit") {{ userInfo.userName }}
            el-input(v-show="edit", v-model="copyInfo.userName")
    el-row.infoRow
      el-col(:span="10")
        el-row(:gutter="20")
          el-col.label(:span="12") 姓氏：
          el-col(:span="12")
            span(v-show="!edit") {{ userInfo.surName }}
            el-input(v-show="edit", v-model="copyInfo.surName")
      el-col(:span="14")
        el-row(:gutter="20")
          el-col.label(:span="12") 名字：
          el-col(:span="12")
            span(v-show="!edit") {{ userInfo.name }}
            el-input(v-show="edit", v-model="copyInfo.name")
    el-row.infoRow
      el-col(:span="10")
        el-row(:gutter="20")
          el-col.label(:span="12") 称谓：
          el-col(:span="12")
            span(v-show="!edit") {{ userInfo.gender === 40 ? '先生' : '女士' }}
            el-select(v-model="copyInfo.gender" placeholder="请选择", v-show="edit")
              el-option(
              v-for="item in genderOptions",
              :key="item.value",
              :label="item.label",
              :value="item.value"
              )
      el-col(:span="14")
        el-row(:gutter="20")
          el-col.label(:span="12") 生日：
          el-col(:span="12")
            span(v-show="!edit") {{ computedBirthday(userInfo.birthday) }}
            el-date-picker(
              v-model="copyInfo.birthday",
              :default-value="userInfo.birthday",
              v-show="edit"
            )
            //- el-input(v-show="edit", v-model="copyInfo.birthday")
    el-row.infoRow
      el-col(:span="10")
        el-row(:gutter="20")
          el-col.label(:span="12") 手机号：
          el-col(:span="12")
            el-row(:gutter="20")
              el-col(:span="18")
                span {{ userInfo.mobilePhone }}
              el-col(:span="6", v-show="edit")
                el-button(type="text", @click="hrefChangePhone") {{ !userInfo.isPhoneNumberConfirmed ? '验证手机号' : '更改手机号' }}
      el-col(:span="14")
        el-row(:gutter="20")
          el-col.label(:span="12") Email：
          el-col(:span="12")
            el-row(:gutter="20")
              el-col(:span="18")
                span {{ userInfo.email }}
              el-col(:span="6", v-show="edit")
                el-button(type="text", @click="hrefChangeEmail") 更改邮箱
    el-row.infoRow(:gutter="20", v-show="edit")
      el-col.label(:span="12") 更改密码：
      el-col(:span="12")
        el-row(:gutter="20")
          el-col(:span="6")
            el-button(type="text", @click="changePassword") 点击更改密码
    el-row.infoRow(type="flex", justify="center")
      el-button(type="warning", @click="editHandler") {{ edit ? '保存' : '编辑基本信息' }}
</template>

<script>
import moment from 'moment'
import { UpdateMemberFileAsync } from '@/api/member'
import { getUserInfoMixin } from '@/common/js/mixins'
import { mapGetters } from 'vuex'
export default {
  mixins: [getUserInfoMixin],
  data() {
    return {
      edit: false,
      copyInfo: {},
      genderOptions: [
        {
          value: 40,
          label: '先生'
        },
        {
          value: 41,
          label: '女士'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    editHandler() {
      if (this.userInfo.memberId && !this.userInfo.isEmailConfirmed) {
        this.$notify.warning({
          title: '警告',
          message: '您的账号还未激活，请前往注册时所填邮箱激活账号'
        })
        return
      }
      if (!this.edit) {
        this.edit = !this.edit
      } else {
        const params = {
          userName: this.copyInfo.userName,
          surName: this.copyInfo.surName,
          name: this.copyInfo.name,
          gender: this.copyInfo.gender,
          birthday: this.copyInfo.birthday,
          memberId: this.userInfo.memberId
        }
        this._changeUserInfo(params)
      }
    },
    async _changeUserInfo(params) {
      try {
        const { data } = await UpdateMemberFileAsync(params)
        if (data.result) {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success'
          })
          this.getUserInfoHandler(this.userInfo.memberId)
          this.copyInfo = Object.assign({}, this.userInfo)
          this.edit = !this.edit
        } else {
          this.$notify({
            title: '失败',
            message: data.error.message,
            type: 'success'
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    computedBirthday(birthday) {
      return moment(birthday).format('YYYY-MM-DD')
    },
    hrefChangePhone() {
      this.$router.push('/pc/personalcenter/changephone')
    },
    hrefChangeEmail() {
      this.$router.push('/pc/personalcenter/changeemail')
    },
    changePassword() {
      this.$router.push('/pc/personalcenter/changepassword')
    }
  },
  created() {
    if (this.userInfo.memberId) this.copyInfo = Object.assign({}, this.userInfo)
  },
  watch: {
    userInfo(newVal) {
      if (newVal.memberId) this.copyInfo = Object.assign({}, newVal)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/variables.less';
.myInfo {
  margin-bottom: 150px;
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
