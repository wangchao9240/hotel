<template lang="pug">
  .mallOrder(v-loading.fullscreen="loading")
    el-row.title {{ title }}
    .OrderListContainer
      el-table(
      :data="tableData",
      border,
      style="width: 100%"
      )
        el-table-column(
        prop="orderNumber",
        label="订单号",
        width="180"
        )
        el-table-column(
          prop="billDate"
          label="订单日期"
          width="180"
        )
        el-table-column(
          prop="amount",
          label="订单总额"
        )
        el-table-column(
          label="备注",
          prop="comment"
        )
</template>

<script>
import { GetMallOrderPaged, GetIntegrealOrderPaged } from '@/api/mall'
import Cookies from 'js-cookie'
import moment from 'moment'
export default {
  data() {
    return {
      loading: false,
      tableData: []
    }
  },
  computed: {
    title() {
      switch (this.$route.query.type - 0) {
        case 1:
          return '商城订单'
        case 2:
          return '积分乐园订单'
        default:
          return '积分乐园订单'
      }
    }
  },
  methods: {
    async _GetMallOrderPaged() {
      this.loading = true
      try {
        const params = {
          MemberNum: Cookies.get('MemberId'),
          OrderNum: null
        }
        let res
        console.log('名字--->', this.title)
        if (this.title === '商城订单') {
          res = await GetMallOrderPaged(params)
        } else {
          res = await GetIntegrealOrderPaged(params)
        }
        const data = res.data
        if (data.success) {
          data.result.items.forEach(item => {
            item.billDate = moment(item.billDate).format('YYYY-MM-DD')
          })
          this.tableData = data.result.items
        } else {
          this.$notify.wraning({
            title: '提示',
            message: '网络错误'
          })
        }
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    }
  },
  created() {
    this._GetMallOrderPaged()
  },
  watch: {
    title(newVal) {
      console.log(newVal)
      this._GetMallOrderPaged()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/variables.less';
.mallOrder {
  margin-bottom: 150px;
  padding: 15px;
  font-size: @font-size-medium-x;
  background-color: @background-extra-light-gray;
  border-radius: 4px;
  .title {
    padding-bottom: 20px;
    font-weight: bold;
  }
}
</style>
