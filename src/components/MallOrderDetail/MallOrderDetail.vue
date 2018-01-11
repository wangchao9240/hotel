<template lang="pug">
  el-row.mallOrderDetail(type="flex", justify="center")
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
            el-input-number.numberIpt(v-model="scope.row.amount", :min="1")
        el-table-column(
        label="小计（元）")
          template(scope="scope")
            span {{ scope.row.amount * scope.row.price }}
        el-table-column(
        label="操作")
          template(scope="scope")
            el-button(@click="deleteHandler(scope.row)") 删除
      el-row.btnConatiner(type="flex", justify="space-between")
        .tipCount
          span 总价：
          span.price ￥{{ totalPrice }}
        el-button.submitBtn(@click="submitOrder", v-show="tableData.length") 提交订单
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.mallOrderDetail {
  margin-top: 20px;
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
}
</style>
