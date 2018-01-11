<template lang="pug">
  el-row.orderSearch(type="flex", justify="center", v-loading.body="loading", element-loading-text="正在查询")
    el-col.contentCol(:span="16")
      el-row(type="flex", justify="center", :gutter="25")
        el-col(:span="8")
          el-input(placeholder="通过手机号或订单号查询订单", v-model="mobilePhone")
        el-col(:span="3")
          el-button(@click="searchHandler") 搜索
      el-row.rowContainer(v-show="showTable")
        .listContainer
          order-list(:tableData="tableData")
    .footerWrapper
      btm-footer(ref="footer")
</template>

<script>
import BtmFooter from '@/components/BtmFooter/BtmFooter'
import OrderList from '@/components/OrderList/OrderList'
import { GetTouristOrderPaged } from '@/api/room'
import { regObj } from '@/common/js/utils'
import moment from 'moment'
export default {
  data() {
    return {
      mobilePhone: '',
      tableData: [],
      showTable: false,
      loading: false
    }
  },
  methods: {
    async searchHandler() {
      try {
        this.loading = true
        let params
        if (this.mobilePhone.match(regObj.phone)) params = { ContactPhone: this.mobilePhone }
        else params = { BookingNum: this.mobilePhone }
        console.log('?????')
        const { data } = await GetTouristOrderPaged(params)
        if (data.success) {
          data.result.items.forEach(item => {
            item.bookingTime = moment(item.bookingTime).format('YYYY-MM-DD')
          })
          this.showTable = true
          this.tableData = data.result.items
          setTimeout(() => {
            this.$refs.footer.setFooter()
          }, 500)
        } else {
          this.$notify.error({
            title: '请求失败',
            message: data.error.message
          })
        }
        this.loading = false
        console.log('data-->', data)
      } catch (err) {
        this.loading = false
        console.log(err)
      }
    }
  },
  components: {
    OrderList,
    BtmFooter
  }
}
</script>

<style lang="less" scoped>
@import "../common/less/variables.less";
.orderSearch {
  margin-top: 18px;
  margin-bottom: 150px;
  .contentCol {
    padding: 15px;
    background-color: @background-extra-light-gray;
    border-radius: 4px;
  }
  .rowContainer {
    margin-top: 15px;
  }
  .footerWrapper {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
</style>
