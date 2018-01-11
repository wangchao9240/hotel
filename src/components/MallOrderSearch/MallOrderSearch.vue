<template lang="pug">
  .MallOrderSearch(v-loading.fullscreen.lock="fullscreenLoading")
    el-row.rowContainer(type="flex", justify="center")
      el-col.searchContainer(:span="6")
        el-input(placeholder="按手机号或订单号搜索", v-model="text")
        el-button(type="warning", @click="_GetMallOrderPaged(text)") 搜索
    .OrderListContainer
      .no-result(v-show="noResult") 未找到符合条件的订单
      el-table(
      :data="tableData",
      border,
      style="width: 100%",
      v-show="tableData.length"
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
        //- el-table-column(
        //-   label="操作"
        //- )
        //-   template(scope="scope")
        //-     span 取消订单
</template>

<script type="text/javascript">
import { GetMallOrderPaged, GetIntegrealOrderPaged } from '@/api/mall'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      tableData: [],
      text: '',
      noResult: false,
      fullscreenLoading: false
    }
  },
  methods: {
    async _GetMallOrderPaged(text) {
      if (!text) {
        this.noResult = true
        return
      }
      this.fullscreenLoading = true
      try {
        const params = {
          MemberNum: Cookies.get('MemberId'),
          OrderNum: text
        }
        let data
        if (Cookies.get('online') === 'true') {
          data = await GetMallOrderPaged(params)
        } else {
          data = await GetIntegrealOrderPaged(params)
        }
        this.tableData = data.data.result.items
        if (this.tableData.length) this.noResult = false
        else this.noResult = true
      } catch (err) {
        this.$notify.warning({
          title: '提示',
          message: '网络错误'
        })
      }
      this.fullscreenLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/variables.less';
.MallOrderSearch {
  margin-bottom: 150px;
  padding: 15px;
  font-size: @font-size-medium-x;
  border-radius: 4px;
  .rowContainer {
    margin-bottom: 20px;
    .searchContainer {
      display: flex;
      .el-button {
        margin-left: 20px;
      }
    }
  }
  .title {
    padding-bottom: 20px;
    font-weight: bold;
  }
  .no-result {
    text-align: center;
  }
}
</style>