<template lang="pug">
  transition(name="el-fade-in")
    .confirmOrderContainer
      el-row
        el-col(:span="20")
      el-row(type="flex", justify="center")
        el-col.formTitle(:span="20") 预订信息
      el-row(type="flex", justify="center")
        el-col(:span="20").infoContainer
          el-row.infoRow(type="flex", justify="space-between")
            el-col(:span="12")
              el-row
                el-col.infoLabel(:span="8") 房型名称：
                el-col(:span="16") {{ orderDetail.roomName }}
            el-col(:span="12")
              el-row
                el-col.infoLabel(:span="8") 房间数：
                el-col(:span="16") {{ orderDetail.roomNum }}间
          el-row.infoRow(type="flex", justify="space-between")
            el-col(:span="12")
              el-row
                el-col.infoLabel(:span="8") 价格名称：
                el-col(:span="16") {{ orderDetail.priceName }}
            el-col(:span="12")
              el-row
                el-col.infoLabel(:span="8") 间夜数：
                el-col(:span="16") {{ orderDetail.roomNight }}间夜
          el-row.infoRow(type="flex", justify="space-between")
            el-col(:span="12")
              el-row
                el-col.infoLabel(:span="8") 入住日期：
                el-col(:span="16") {{ arrivalTime }}
            el-col(:span="12")
              el-row
                el-col.infoLabel(:span="8") 入住人数：
                el-col(:span="16") {{ orderDetail.roomPolicy }}人
          el-row.infoRow(type="flex", justify="space-between")
            el-col(:span="12")
              el-row
                el-col.infoLabel(:span="8") 离店日期：
                el-col(:span="16") {{ departingTime }}
      el-row(type="flex", justify="center")
        el-col.formTitle(:span="20") 房费
      el-row(type="flex", justify="center")
        el-col(:span="20").infoContainer
          el-table(
          :data="orderDetail.datePrice",
          style="width: 100%",
          border,
          header-align="center"
          )
            el-table-column(
              prop="date",
              label="日期"
            )
            el-table-column(
              label="房型"
            )
              template(scope="scope")
                span {{ orderDetail.roomName }}
            el-table-column(
              prop="housingPrice",
              label="价格"
            )
          el-row.moneyCount
            el-col(:span="8", :offset="16") 净房费小计：￥{{ pureTips }}
      el-row(type="flex", justify="center")
        el-col.formTitle(:span="20") 客制化服务
      el-row(type="flex", justify="center")
        el-col(:span="20").infoContainer
          el-table(
          :data="orderDetail.incrementServices",
          style="width: 100%",
          border,
          header-align="center"
          )
            el-table-column(
              prop="valueAdded",
              label="项目"
            )
            el-table-column(
              prop="price",
              label="单价"
            )
            el-table-column(
              prop="number",
              label="选择"
            )
            el-table-column(
              label="金额"
            )
              template(scope="scope") {{ scope.row.number * scope.row.price }}
      el-row(type="flex", justify="center")
        el-col.formTitle.totalMoney(:span="20") 总价格：
          span ￥{{ orderDetail.orderMoney }}
      el-row(type="flex", justify="center")
        el-col.formTitle(:span="20") 入住信息
      el-row(type="flex", justify="center")
        el-col(:span="20").infoContainer
          el-form(ref="form", label-width="80px")
            .rowPlay
              el-form-item(label="姓")
                el-col(:span="2")
                  span {{ orderDetail.guestSurName }}
              el-form-item(label="名")
                el-col(:span="2")
                  span {{ orderDetail.guestName }}
            .rowPlay
              el-form-item(label="姓1", v-if="orderDetail.guestSurName1")
                el-col(:span="2")
                  span {{ orderDetail.guestSurName1 }}
              el-form-item(label="名1", v-if="orderDetail.guestName1")
                el-col(:span="2")
                  span {{ orderDetail.guestName1 }}
            .rowPlay
              el-form-item(label="姓2", v-if="orderDetail.guestSurName2")
                el-col(:span="2")
                  span {{ orderDetail.guestSurName2 }}
              el-form-item(label="名2", v-if="orderDetail.guestSurName2")
                el-col(:span="2")
                  span {{ orderDetail.guestName2 }}
            .rowPlay
              el-form-item(label="姓3", v-if="orderDetail.guestSurName3")
                el-col(:span="2")
                  span {{ orderDetail.guestSurName3 }}
              el-form-item(label="名3", v-if="orderDetail.guestSurName3")
                el-col(:span="2")
                  span {{ orderDetail.guestName3 }}
            .rowPlay
              el-form-item(label="姓4", v-if="orderDetail.guestSurName4")
                el-col(:span="2")
                  span {{ orderDetail.guestSurName4 }}
              el-form-item(label="名4", v-if="orderDetail.guestSurName4")
                el-col(:span="2")
                  span {{ orderDetail.guestName4 }}
            el-form-item(label="房间要求", prop="roomDemand")
              el-col(:span="6")
                span(v-show="showInfo") {{ bookingRequest }}
            el-form-item(label="到店时间", prop="reachTime")
              el-col(:span="6")
                span {{ reachTime }}
            el-form-item(label="备注")
              el-col(:span="12")
                span {{ orderDetail.comment }}
      el-row(type="flex", justify="center")
        el-col.formTitle(:span="20") 联系信息
      el-row(type="flex", justify="center")
        el-col(:span="20").infoContainer
          el-form(ref="form", label-width="80px")
            .rowPlay
              el-form-item(label="姓")
                el-col(:span="2")
                  span {{ orderDetail.contactSurName }}
              el-form-item(label="名")
                el-col(:span="2")
                  span(v-show="showInfo") {{ orderDetail.contactName }}
            el-form-item(label="联系手机")
              el-col(:span="6")
                span(v-show="showInfo") {{ orderDetail.contactPhone }}
            el-form-item(label="固定电话")
              el-col(:span="6")
                span(v-show="showInfo") {{ orderDetail.contactTelePhone }}
            el-form-item(label="电子邮件")
              el-col(:span="6")
                span(v-show="showInfo") {{ orderDetail.email }}
      el-row(type="flex", justify="center")
        el-col.formTitle(:span="20") {{ payment }}
      el-row(type="flex", justify="center")
        el-col(:span="20").infoContainer
          span 我已阅读并同意以上规则
          .submitBtnContainer
            el-button(@click="cancelOrder", v-show="orderDetail.orderState !== 2") 取消订单
      .footerContainer
        btm-footer(ref="footer")
</template>

<script>
// import { mapGetters } from 'vuex'
import moment from 'moment'
import BtmFooter from '@/components/BtmFooter/BtmFooter'
// import { formatDetailPage } from '@/common/js/utils'
import { NoPassAudit } from '@/api/room'
import { GetBookingOrderByUser } from '@/api/member'
// import Cookies from 'js-cookie'
moment.locale('zh-cn')

export default {
  data() {
    return {
      showInfo: true,
      tabelData: [],
      customTable: [],
      orderDetail: {}
    }
  },
  computed: {
    arrivalTime() {
      return moment(this.orderDetail.arrivalTime).format('YYYY-MM-DD')
    },
    departingTime() {
      return moment(this.orderDetail.departingTime).format('YYYY-MM-DD')
    },
    pureTips() {
      let incrementServices = 0
      if (this.orderDetail.incrementServices && this.orderDetail.incrementServices.length) {
        this.orderDetail.incrementServices.forEach(item => {
          incrementServices += item.number * item.price
        })
      }
      return this.orderDetail.orderMoney - incrementServices
    },
    bookingRequest() {
      switch (this.orderDetail.bookingRequest) {
        case 47:
          return '无烟房'
        case 48:
          return '吸烟房'
        case 49:
          return '没有要求'
      }
    },
    reachTime() {
      switch (this.orderDetail.reachTime) {
        case 51:
          return '18点前到达'
        case 52:
          return '18:00 – 20:00'
        case 53:
          return '20:00-22:00'
        case 54:
          return '22:00-24:00'
        case 55:
          return '24:00以后'
      }
    },
    payment() {
      switch (this.orderDetail.payment) {
        case 56:
          return '在线预付'
        case 57:
          return '前台现付'
      }
    }
  },
  methods: {
    formatData(dataObj) {
      dataObj.datePrice.forEach(item => {
        item.date = moment(item.priceTime).format('YYYY-MM-DD 周dd')
      })
      return dataObj
    },
    async _GetBookingOrderByUser() {
      const params = {
        OrderNumber: this.$route.params.order
      }
      try {
        const { data } = await GetBookingOrderByUser(params)
        console.log('---->', data)
        if (data.error) {
          this.$notify({
            title: '警告',
            message: data.error.message,
            type: 'error'
          })
          return
        }
        this.orderDetail = this.formatData(data.result)
      } catch (err) {
        console.log(err)
      }
    },
    async cancelOrder() { // 取消订单接口
      try {
        await this.$confirm('确认取消订单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        let params = {}
        params.id = this.orderDetail.id
        console.log('进入取消订单')
        const { data } = await NoPassAudit(params)
        console.log('data-->', data)
        if (data.success) {
          this.$notify.success({
            title: '成功',
            message: '取消订单成功'
          })
          this.$router.push('/pc/index')
        } else {
          this.$notify.error({
            title: '失败',
            message: data.error.message
          })
        }
      } catch (err) {
        console.log(err)
        this.$notify.warning({
          title: '失败',
          message: '取消订单失败'
        })
      }
    }
  },
  created() {
    if (!this.$route.params.order) {
      this.$router.push('/pc/search')
    }
    this._GetBookingOrderByUser()
  },
  mounted() {
    // if ()
    this.$refs.footer.setFooter()
  },
  components: {
    BtmFooter
  }
}
</script>

<style lang="less" scoped>
@import '../common/less/variables.less';
.formTitle {
  margin: 15px 0;
  padding: 15px;
  border-radius: 4px;
  color: #555;
  background-color: @background-footer;
  font-weight: bold;
  &.totalMoney {
    text-align: right;
    background-color: @background-extra-light-gray;
    span {
      color: @color-text-red;
    }
  }
}
.infoContainer {
  padding: 20px;
  font-size: @font-size-medium;
  background-color: @background-extra-light-gray;
  border-radius: 4px;
  .infoRow {
    padding-bottom: 20px;
    &:last-child {
      padding: 0
    }
    .infoLabel {
      font-weight: bold;
    }
  }
  .moneyCount {
    padding-top: 15px;
    font-size: @font-size-medium-x;
    font-weight: bold;
  }
  &>span {
    display: block;
    text-align: center;
  }
  .submitBtnContainer {
    margin-top: 20px;
    text-align: center;
  }
}
.footerContainer {
  margin-top: 20px;
}
.rowPlay {
  display: flex;
}
</style>
