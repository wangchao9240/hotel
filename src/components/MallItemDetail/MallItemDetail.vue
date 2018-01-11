<template lang="pug">
  el-row.mallItemDetail(type="flex", justify="center", v-loading.fullscreen.lock="fullscreenLoading")
    el-col.detailContainer(:span="20")
      el-row
        el-col(:span="10")
          .bigImgContainer
            img(:src="infoItem.imageUrl")
          //- ul.thumbImgContainer
          //-   li(@mouseover="mouseoverHandler(item)", v-for="item in thumbImgList")
          //-     img(:src="item")
        el-col.infoContainer(:span="14")
          .title {{ infoItem.name }}
          //- .description 商品描述
          .spec(v-show="infoItem.spec")
            span.label 商品规格：
            span {{ infoItem.spec }}
          .priceContainer
            span.label(:class="{'smallLabel': online === 'false'}") 商品价格：
            .oldPriceContainer(v-show="infoItem.price && online === 'true'")
              span ￥{{ infoItem.price * number }}
            .barginPriceContainer(:class="{'smallContainer': online === 'false'}")
              span.small(v-show="online === 'true'") ￥
              span(:class="{'smallPrice': online === 'false'}") {{ online === 'true' ? infoItem.barginPrice * number : infoItem.integral * number + '积分' }}
          .number
            span.label 商品数量：
            el-input-number(:min="1", size="small", :max="infoItem.inventory", v-model="number")
          .btnContainer
            el-button(@click="addCart") 加入购物车
            el-button(type="warning", @click="buyNow") 立即购买
</template>

<script>
import Cookies from 'js-cookie'
import { GetCommodity, InsertIntegralShoppingCar } from '@/api/mall'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      infoItem: {
        integral: 0
      },
      bigImg: '../../../static/image/636452280606580351.jpg--1600x440.jpg',
      thumbImgList: ['../../../static/image/636452280606580351.jpg--1600x440.jpg', '../../../static/image/636452280606580351.jpg--1600x440.jpg', '../../../static/image/636452280606580351.jpg--1600x440.jpg'],
      number: 1,
      online: null,
      fullscreenLoading: false
    }
  },
  methods: {
    mouseoverHandler(item) {
      this.bigImg = item
    },
    async _GetCommodity(id) {
      this.fullscreenLoading = true
      try {
        const params = {
          id
        }
        const { data } = await GetCommodity(params)
        console.log('--->', data)
        this.infoItem = data.result
      } catch (err) {
        console.log(err)
      }
      this.fullscreenLoading = false
    },
    setLocalResArr() {
      let resArr
      let addNum = false
      let copyItem = Object.assign(this.infoItem, {
        commodityId: this.$route.params.id - 0,
        amount: this.number - 0,
        commodityName: this.infoItem.name
      })
      if (!localStorage.getItem('shopList')) {
        resArr = []
      } else {
        resArr = JSON.parse(localStorage.getItem('shopList'))
      }
      resArr.forEach((item, index) => {
        if (item.commodityId - 0 === copyItem.commodityId - 0) {
          item.amount++
          addNum = true
        }
      })
      if (!addNum) resArr.push(copyItem)
      localStorage.setItem('shopList', JSON.stringify(resArr))
    },
    async addCart() {
      try {
        if (!Cookies.get('MemberId')) {
          this.setLocalResArr()
          this.$notify.success({
            title: '成功',
            message: '添加购物车成功'
          })
          return
        }
        let params = {
          CommodityId: this.$route.params.id,
          Amount: this.number,
          // IsOrder: false,
          MemberId: Cookies.get('MemberId')
        }
        if (this.online === 'false') {
          params.CommodityType = 1
        } else {
          params.CommodityType = 2
        }
        const { data } = await InsertIntegralShoppingCar(params)
        if (data.success) {
          this.$notify.success({
            title: '成功',
            message: '添加购物车成功'
          })
        } else {
          this.$notify.wraning({
            title: '提示',
            message: '添加购物车失败'
          })
        }
        // 添加购物车成功逻辑
      } catch (err) {
        console.log(err)
        this.$notify.wraning({
          title: '提示',
          message: '添加购物车失败'
        })
      }
    },
    buyNow() {
      let copyItem = Object.assign(this.infoItem, {
        commodityId: this.$route.params.id - 0,
        amount: this.number - 0,
        commodityName: this.infoItem.name
      })
      this.setBuyDirectInfo([copyItem])
      this.setOrderConfirm(true)
      this.setBuyDirect(true)
      setTimeout(() => {
        this.$router.push('/mall/shopcartdetail')
      }, 20)
    },
    ...mapMutations({
      setOrderConfirm: 'SET_ORDER_CONFIRM',
      setBuyDirect: 'SET_BUY_DIRECT',
      setBuyDirectInfo: 'SET_BUY_DIRECT_INFO'
    })
  },
  created() {
    this.online = Cookies.get('online')
    console.log(this.online)
    this._GetCommodity(this.$route.params.id)
  }
}
</script>

<style lang="less" scoped>
@import "../../common/less/variables.less";
.mallItemDetail {
  margin-bottom: 130px;
  .detailContainer {
    padding-top: 20px;
    .bigImgContainer {
      box-sizing: border-box;
      padding: 8px;
      width: 400px;
      height: 400px;
      background-color: @color-text-white;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .thumbImgContainer {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 10px;
      width: 400px;
      height: 80px;
      background-color: @color-text-white;
      li {
        margin-right: 8px;
        width: 60px;
        height: 60px;
        cursor: pointer;
        &:last-child {
          margin-right: 0;
        }
        &:hover {
          border: 1px solid @seperate-line-gray;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .infoContainer {
      &>div {
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .title {
        margin-bottom: 20px;
        font-size: @font-size-large-x;
        color: @color-text-deep-brand;
      }
      .priceContainer {
        display: flex;
        padding-top: 10px;
        color: @color-text-orange;
        font-size: 45px;
        .small {
          font-size: @font-size-small-x;
        }
        .smallPrice {
          font-size: @font-size-medium-x;
        }
        .label {
          margin-top: 18px;
          &.smallLabel {
            margin-top: 0;
          }
        }
        .smallContainer {
          display: inherit;
        }
        .oldPriceContainer {
          font-size: @font-size-large;
          span {
            display: inline-block;
            margin-top: 18px;
            margin-right: 8px;
            color: @color-text-gray;
            text-decoration: line-through;
          }
        }
      }
      .label {
        color: @color-text-gray;
        font-size: @font-size-medium;
      }
      .btnContainer {
        padding-top: 50px;
        .el-button {
          margin-right: 50px;
          width: 200px;
          height: 50px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>
