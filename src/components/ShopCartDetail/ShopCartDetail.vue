<template lang="pug">
  el-row.shopCartDetailContainer(type="flex", justify="center")
    el-col(:span="18")
      .title 我的购物车
      el-row
      el-row.empty(type="flex", justify="center", v-show="!tableData.length") 客观您的购物车还空空如也...
      el-table(:data="tableData", style="width: 100%", v-show="tableData.length")
        el-table-column(
        label="商品图片",
        width="180")
          template(scope="scope")
            img.itemImg(:src="scope.row.pictureUrl")
        el-table-column(
        prop="commodityName",
        label="商品名称",
        width="180")
        el-table-column(
        prop="price",
        label="单价（元）")
        el-table-column(
        prop="amount",
        label="商品数量")
          template(scope="scope")
            el-input-number.numberIpt(v-model="scope.row.amount", :min="1", :disabled="orderConfirm")
        el-table-column(
        label="小计（元）")
          template(scope="scope")
            span {{ scope.row.amount * scope.row.price }}
        el-table-column(
        label="操作"
        )
          template(scope="scope")
            el-button(@click="deleteHandler(scope.row)", v-show="!orderConfirm") 删除
            span(v-show="orderConfirm") 不可操作
      el-row.btnConatiner(type="flex", justify="space-between", v-show="tableData.length")
        .tipCount
          span 总价：
          span.price ￥{{ totalPrice }}
        el-button.submitBtn(@click="submitOrder", v-show="tableData.length && !orderConfirm") 提交订单
      el-form.contactContainer(ref="form", :model="form", label-width="80px", v-show="orderConfirm")
        el-row(type="flex")
          el-form-item(label="联系人")
            el-input.iptWidth(v-model="form.contact")
          el-form-item(label="联系电话")
            el-input.iptWidth(v-model="form.mobilePhone")
        el-form-item(label="备注")
          el-input.iptWidth.area(v-model="form.comment", type="textarea")
      el-row.submitOrder(type="flex", justify="center", v-show="orderConfirm")
        el-button(type="warning", @click="submitOrderHandler") 确认提交
</template>

<script>
import { GetShoppingPaged, DeleteShoppingCar, InsertIntegralOrder, ImmediatelyExchange, ImmediatelyOrder, InsertOrUpdateOrder } from '@/api/mall'
import Cookies from 'js-cookie'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      tableData: [],
      form: {
        contact: '',
        mobilePhone: '',
        comment: ''
      }
    }
  },
  computed: {
    totalPrice() {
      let total = 0
      this.tableData.forEach(item => {
        total += item.amount * item.price
      })
      return total
    },
    ...mapGetters([
      'orderConfirm',
      'buyDirect',
      'buyDirectInfo'
    ])
  },
  methods: {
    deleteHandler(item) {
      this.$confirm('确认删除该商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        if (Cookies.get('MemberId')) {
          this._DeleteShoppingCar(item.id)
        } else {
          let localArr = JSON.parse(localStorage.getItem('shopList'))
          const index = localArr.findIndex(subItem => {
            return subItem.id - 0 === item.id
          })
          localArr.splice(index, 1)
          this.tableData = localArr
          localStorage.setItem('shopList', JSON.stringify(localArr))
        }
      })
    },
    async _DeleteShoppingCar(id) {
      try {
        const params = {
          id
        }
        const { data } = await DeleteShoppingCar(params)
        if (data.success) {
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
          this._GetShoppingPaged()
        } else {
          this.$notify.warn({
            title: '提示',
            message: '删除失败'
          })
        }
      } catch (err) {
        console.log(err)
        this.$notify.warn({
          title: '提示',
          message: '网络错误'
        })
      }
    },
    async _GetShoppingPaged() {
      try {
        const online = Cookies.get('online')
        let params = {
          IsOrder: null,
          MemberId: Cookies.get('MemberId')
        }
        if (online === 'false') {
          params.CommodityType = 1
        } else {
          params.CommodityType = 2
        }
        const { data } = await GetShoppingPaged(params)
        if (data.success) {
          this.tableData = data.result.items
        } else {
          this.$notify.warn({
            title: '提示',
            message: '网络错误'
          })
        }
      } catch (err) {
        this.$notify.warn({
          title: '提示',
          message: '网络错误'
        })
      }
    },
    // async _InsertOrderFromCar() {
    //   try {
    //     const params = {
    //       id: 1
    //     }
    //     const { data } = await InsertOrderFromCar(params)
    //     console.log('--->', data)
    //   } catch (err) {
    //     this.$notify.warn({
    //       title: '提示',
    //       message: '网络错误'
    //     })
    //   }
    // },
    submitOrder() {
      // let paramsArr = []
      // this.tableData.forEach(item => {
      //   paramsArr.push({
      //     id: item.id,
      //     amount: item.amount
      //   })
      // })
      this.setOrderConfirm(true)
      // this._InsertIntegralOrder({ ShoppingCarLists: paramsArr })
    },
    submitOrderHandler() {
      let paramsObj = {
        MemberNumber: Cookies.get('MemberId'),
        Comment: this.form.comment,
        Amount: this.totalPrice,
        ContactName: this.form.contact,
        ContactPhoneNumber: this.form.mobilePhone
      }
      let paramsArr = []
      if (Cookies.get('MemberId') && !this.buyDirect) {
        this.tableData.forEach(item => {
          paramsArr.push({
            id: item.id,
            amount: item.amount
          })
        })
      } else {
        this.tableData.forEach(item => {
          paramsArr.push({
            CommodityId: item.id,
            amount: item.amount
          })
        })
      }
      paramsObj.ShoppingCarLists = paramsArr
      if (Cookies.get('MemberId') && this.buyDirect && Cookies.get('online') === 'false') {  // 有ID 直接购买
        this._ImmediatelyExchange(paramsObj)
      } else if (this.buyDirect || !Cookies.get('MemberId')) {  // 没有ID 直接购买
        this._ImmediatelyOrder(paramsObj)
      } else if (Cookies.get('online') === 'true' && Cookies.get('MemberId')) {  // 有ID 在线商城
        this._InsertOrUpdateOrder(paramsObj)
      } else {
        this._InsertIntegralOrder(paramsObj)  // 有ID 购物车购买
      }
    },
    async _InsertIntegralOrder(params) {  // 将在购物车选中的商品加入订单
      try {
        const { data } = await InsertIntegralOrder(params)
        console.log('--->', data)
        if (data.result) {
          this.$notify.success({
            title: '成功',
            message: '下单成功'
          })
          this.setBuyDirect(false)
          this.setOrderConfirm(false)
          setTimeout(() => {
            this.$router.push('/mall/home')
          }, 1500)
        } else {
          this.$notify.warning({
            title: '提示',
            message: '积分不足，兑换失败'
          })
        }
      } catch (err) {
        this.$notify.warn({
          title: '提示',
          message: '网络错误'
        })
        console.log(err)
      }
    },
    async _ImmediatelyExchange(params) {  // 立即兑换商品接口
      try {
        const { data } = await ImmediatelyExchange(params)
        console.log('--->', data)
        if (data.result) {
          this.$notify.success({
            title: '成功',
            message: '下单成功'
          })
          this.setBuyDirect(false)
          this.setOrderConfirm(false)
          setTimeout(() => {
            this.$router.push('/mall/home')
          }, 1500)
        } else {
          this.$notify.warning({
            title: '提示',
            message: '积分不足，兑换失败'
          })
        }
      } catch (err) {
        this.$notify.warn({
          title: '提示',
          message: '网络错误'
        })
        console.log(err)
      }
    },
    async _ImmediatelyOrder(params) {  // 立即购买接口和非会员购买接口
      try {
        const { data } = await ImmediatelyOrder(params)
        console.log('--->', data)
        if (data.success) {
          this.$notify.success({
            title: '成功',
            message: '下单成功'
          })
          this.setBuyDirect(false)
          this.setOrderConfirm(false)
          setTimeout(() => {
            this.$router.push('/mall/home')
          }, 1500)
        } else {
          this.$notify.warning({
            title: '提示',
            message: '购买失败'
          })
        }
      } catch (err) {
        this.$notify.warn({
          title: '提示',
          message: '网络错误'
        })
        console.log(err)
      }
    },
    async _InsertOrUpdateOrder(params) {  // 将商品从购物车加入预购订单中
      try {
        const { data } = await InsertOrUpdateOrder(params)
        console.log('--->', data)
        if (data.result) {
          this.$notify.success({
            title: '成功',
            message: '下单成功'
          })
          this.setBuyDirect(false)
          this.setOrderConfirm(false)
          setTimeout(() => {
            this.$router.push('/mall/home')
          }, 1500)
        } else {
          this.$notify.warning({
            title: '提示',
            message: '购买失败'
          })
        }
      } catch (err) {
        this.$notify.warn({
          title: '提示',
          message: '网络错误'
        })
        console.log(err)
      }
    },
    ...mapMutations({
      setOrderConfirm: 'SET_ORDER_CONFIRM',
      setBuyDirect: 'SET_BUY_DIRECT'
    })
  },
  created() {
    if (this.buyDirect && this.buyDirectInfo.length) {  // 如果直接购买
      this.tableData = this.buyDirectInfo
      return
    } else if (!Cookies.get('MemberId')) {  // 如果游客状态下购买
      if (localStorage.getItem('shopList')) {
        this.tableData = JSON.parse(localStorage.getItem('shopList'))
      } else {
        this.tableData = []
      }
      return
    }
    this._GetShoppingPaged()  // 如果会员通过接口正常获取购物车数据
  }
}
</script>

<style lang="less">
@import "../../common/less/variables.less";
.shopCartDetailContainer {
  margin-top: 20px;
  margin-bottom: 130px;
  .title {
    font-size: @font-size-large;
    color: @color-text-deep-brand;
    margin-bottom: 20px;
  }
  .itemImg {
    padding: 5px 0;
  }
  .el-input-number {
    width: 130px;
  }
  .empty {
    align-items: center;
    height: 300px;
  }
  .btnConatiner {
    padding: 10px;
    align-items: center;
    margin-top: 20px;
    background-color: @color-text-white;
    .submitBtn {
      width: 100px;
      color: @color-text-white;
      background-color: @color-text-orange;
      border-color: @color-text-white;
    }
    .price {
      color: @color-text-orange;
    }
  }
  .contactContainer {
    margin-top: 20px;
    .iptWidth {
      width: 200px;
      &.area {
        width: 80%;
      }
      .el-textarea__inner {
        height: 100px;
      }
    }
  }
}
</style>
