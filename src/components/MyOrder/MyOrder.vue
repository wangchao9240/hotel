<template lang="pug">
  .myOrder(v-loading.fullscreen="loading", v-loading.text="'正在加载'")
    el-row.title {{ title }}
    orderList(:tableData="tableData")
</template>

<script>
import { getOrder } from '@/api/member'
import { mapGetters } from 'vuex'
import moment from 'moment'
import OrderList from '@/components/OrderList/OrderList'
export default {
  data() {
    return {
      tableData: [],
      loading: false
    }
  },
  computed: {
    title() {
      switch (this.$route.query.type - 0) {
        case 0:
          return '客房订单'
        case 1:
          return '商城订单'
        case 2:
          return '积分乐园订单'
        default:
          return '客房订单'
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    async _getOrder() {
      try {
        this.loading = true
        const { data } = await getOrder(this.userInfo.memberId)
        this.loading = false
        if (data.result.items.length) {
          data.result.items.forEach(item => {
            item.bookingTime = moment(item.bookingTime).format('YYYY-MM-DD HH:mm')
          })
        }
        this.tableData = data.result.items
        console.log(this.tableData)
      } catch (err) {
        this.loading = false
        console.log(err)
      }
    }
    // computedState(rowInfo) {
    //   switch (rowInfo.orderState - 0) {
    //     case 0:
    //       return '新建'
    //     case 1:
    //       return '审核'
    //     case 2:
    //       return '取消'
    //   }
    // }
  },
  created() {
    console.log('enter')
    if (!this.userInfo.memberId) {
      this.$router.push('/pc/personalcenter/myinfo')
    }
    this._getOrder()
  },
  components: {
    OrderList
  },
  watch: {
    title(newVal) {
      // 请求数据保留位
      switch (newVal) {
        case '商城订单':
          console.log('请求商城订单方法')
          break
        case '积分乐园订单':
          console.log('请求积分乐园订单方法')
          break
        case '客房订单':
          this._getOrder()
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/variables.less';
.myOrder {
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
