<template lang="pug">
  .OrderListContainer
    el-table(
    :data="tableData",
    border,
    style="width: 100%"
    )
      el-table-column(
      prop="bookingNum",
      label="订单号",
      width="180"
      )
      el-table-column(
        prop="bookingTime"
        label="订单日期"
        width="180"
      )
      el-table-column(
        prop="orderMoney",
        label="金额"
      )
      el-table-column(
        label="状态"
      )
        template(scope="scope")
          span {{ computedState(scope.row) }}
      //- el-table-column(
      //-   prop="payMoney",
      //-   label="付款"
      //- )
      el-table-column(
      label="操作",
      width="120",
      v-if="userInfo.memberId"
      )
        template(scope="scope")
          el-button(
          @click.native.prevent="hrefComment(scope)",
          type="text"
          ) {{ scope.row.isComment ? '已评价' : '点评' }}
      el-table-column(
      label="详情",
      width="120"
      )
        template(scope="scope")
          el-button(
          @click.native.prevent="hrefDetail(scope)",
          type="text"
          ) 查看详情
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    computedState(rowInfo) {
      switch (rowInfo.orderState - 0) {
        case 0:
          return '新建'
        case 1:
          return '审核'
        case 2:
          return '取消'
      }
    },
    hrefComment(scope) {
      if (scope.row.isComment) {
        this.$router.push({
          name: 'comment',
          params: {
            id: scope.row.id
          },
          query: {
            isComment: true
          }
        })
      } else {
        this.$router.push({
          name: 'comment',
          params: {
            id: scope.row.id
          }
        })
      }
      console.log(scope)
    },
    hrefDetail(scope) {
      console.log(scope.row)
      // this.setOrderDetail(scope.row)
      this.$router.push({
        name: 'orderdetail',
        params: {
          order: scope.row.bookingNum
        }
      })
      // console.log(scope)
    },
    ...mapMutations({
      setOrderDetail: 'SET_ORDER_DETAIL'
    })
  },
  created() {
    console.log('hahah', this.userInfo.memberId)
  }
}
</script>

<style lang="less" scoped>
</style>
