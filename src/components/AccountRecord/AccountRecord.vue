<template lang="pug">
  .accountRecord
    el-row.title 积分记录
    el-row.total 总积分：{{ count }}
    el-row
      el-col
        el-table(
        :data="tableData",
        border,
        style="width: 100%"
        )
          el-table-column(
          prop="happenTime",
          label="领取时间",
          )
          el-table-column(
          prop="sourceTag",
          label="来源"
          )
          el-table-column(
            prop="dealType",
            label="类型"
          )
            template(scope="scope")
              span {{ scope.row.dealType - 0 === 0 ? '支出' : '收入' }}
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { GetJfAccountByUserName, GetJfAccountByUser } from '@/api/member'
export default {
  data() {
    return {
      count: 0,
      tableData: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    async _GetJfAccountByUserName() {
      try {
        const params = {
          MemberId: this.userInfo.memberId
        }
        const { data } = await GetJfAccountByUserName(params)
        if (data.error) {
          this.$notify({
            title: '警告',
            message: data.error.message,
            type: 'error'
          })
          return
        }
        this.count = data.result
      } catch (err) {
        console.log(err)
      }
    },
    async _GetJfAccountByUser() {
      try {
        const params = {
          MemberId: this.userInfo.memberId
        }
        const { data } = await GetJfAccountByUser(params)
        if (data.error) {
          this.$notify({
            title: '警告',
            message: data.error.message,
            type: 'error'
          })
          return
        }
        data.result.items.forEach((item) => {
          item.happenTime = moment(item.happenTime).format('YYYY-MM-DD')
        })
        console.log('data--->', data)
        // this.tableData = data.result.items
      } catch (err) {
        console.log(err)
      }
    }
  },
  created() {
    if (!this.userInfo.memberId) {
      this.$router.push('/pc/personalcenter/myinfo')
      return
    }
    this._GetJfAccountByUserName()
    this._GetJfAccountByUser()
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/variables.less';
.accountRecord {
  margin-bottom: 150px;
  padding: 15px;
  font-size: @font-size-medium-x;
  background-color: @background-extra-light-gray;
  border-radius: 4px;
  .title {
    padding-bottom: 20px;
    font-weight: bold;
  }
  .total {
    margin-bottom: 20px;
  }
}
</style>
