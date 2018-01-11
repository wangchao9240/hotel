<template lang="pug">
  transition(name="el-fade-in")
    .confirmOrderContainer(v-loading.fullscreen="loading")
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
                el-col(:span="16") {{ hotel.roomTypeName }}
            el-col(:span="12")
              el-row
                el-col.infoLabel(:span="8") 房间数：
                el-col(:span="16") {{ hotel.Count }}间
          el-row.infoRow(type="flex", justify="space-between")
            el-col(:span="12")
              el-row
                el-col.infoLabel(:span="8") 价格名称：
                el-col(:span="16") {{ hotel.pricePolicyName }}
            el-col(:span="12")
              el-row
                el-col.infoLabel(:span="8") 间夜数：
                el-col(:span="16") {{ hotel.Count * computedDays }}间夜
          el-row.infoRow(type="flex", justify="space-between")
            el-col(:span="12")
              el-row
                el-col.infoLabel(:span="8") 入住日期：
                el-col(:span="16") {{ hotel.Start }}
            el-col(:span="12")
              el-row
                el-col.infoLabel(:span="8") 入住人数：
                el-col(:span="16") {{ hotel.People }}人
          el-row.infoRow(type="flex", justify="space-between")
            el-col(:span="12")
              el-row
                el-col.infoLabel(:span="8") 离店日期：
                el-col(:span="16") {{ hotel.End }}
      el-row(type="flex", justify="center")
        el-col.formTitle(:span="20") 房费
      el-row(type="flex", justify="center")
        el-col(:span="20").infoContainer
          el-table(
          :data="tabelData",
          style="width: 100%",
          border,
          header-align="center"
          )
            el-table-column(
              prop="date",
              label="日期"
            )
            el-table-column(
              prop="roomType",
              label="房型"
            )
            el-table-column(
              prop="price",
              label="价格"
            )
          el-row.moneyCount
            el-col(:span="8", :offset="16") 净房费小计：￥{{ computedMoney }}
      el-row(type="flex", justify="center")
        el-col.formTitle(:span="20") 客制化服务
      el-row(type="flex", justify="center")
        el-col(:span="20").infoContainer
          el-table(
          :data="customTable",
          style="width: 100%",
          border,
          header-align="center"
          )
            el-table-column(
              prop="name",
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
              template(scope="scope")
                el-input-number(v-model="scope.row.number", :min="0", size="small", v-show="!showInfo")
                span(v-show="showInfo") {{ scope.row.number }}
            el-table-column(
              label="金额"
            )
              template(scope="scope") {{ scope.row.number * scope.row.price }}
      el-row(type="flex", justify="center")
        el-col.formTitle.totalMoney(:span="20") 总价格：
          span ￥{{ computedTotal }}
      el-row(type="flex", justify="center")
        el-col.formTitle(:span="20") 入住信息
      el-row(type="flex", justify="center")
        el-col(:span="20").infoContainer
          el-form(ref="form", :model="formInfo", :rules="formInfoRules", label-width="80px")
            .rowPlay
              el-form-item(label="姓", required, prop="familyName")
                el-col(:span="16")
                  el-input(v-model="formInfo.familyName", v-show="!showInfo")
                  span(v-show="showInfo") {{ formInfo.familyName }}
              el-form-item(label="名", required, prop="givenName")
                el-col(:span="16")
                  el-input(v-model="formInfo.givenName", v-show="!showInfo")
                  span(v-show="showInfo") {{ formInfo.givenName }}
            .rowPlay
              el-form-item(label="姓1", required, prop="familyName1", v-show="hotel.Count >= 2")
                el-col(:span="16")
                  el-input(v-model="formInfo.familyName1", v-show="!showInfo")
                  span(v-show="showInfo") {{ formInfo.familyName1 }}
              el-form-item(label="名1", required, prop="givenName1", v-show="hotel.Count >= 2")
                el-col(:span="16")
                  el-input(v-model="formInfo.givenName1", v-show="!showInfo")
                  span(v-show="showInfo") {{ formInfo.givenName1 }}
            .rowPlay
              el-form-item(label="姓2", required, prop="familyName2", v-show="hotel.Count >= 3")
                el-col(:span="16")
                  el-input(v-model="formInfo.familyName2", v-show="!showInfo")
                  span(v-show="showInfo") {{ formInfo.familyName2 }}
              el-form-item(label="名2", required, prop="givenName2", v-show="hotel.Count >= 3")
                el-col(:span="16")
                  el-input(v-model="formInfo.givenName2", v-show="!showInfo")
                  span(v-show="showInfo") {{ formInfo.givenName2 }}
            .rowPlay
              el-form-item(label="姓3", required, prop="familyName3", v-show="hotel.Count >= 4")
                el-col(:span="16")
                  el-input(v-model="formInfo.familyName3", v-show="!showInfo")
                  span(v-show="showInfo") {{ formInfo.familyName3 }}
              el-form-item(label="名3", required, prop="givenName3", v-show="hotel.Count >= 4")
                el-col(:span="16")
                  el-input(v-model="formInfo.givenName3", v-show="!showInfo")
                  span(v-show="showInfo") {{ formInfo.givenName3 }}
            .rowPlay
              el-form-item(label="姓4", required, prop="familyName4", v-show="hotel.Count >= 5")
                el-col(:span="16")
                  el-input(v-model="formInfo.familyName4", v-show="!showInfo")
                  span(v-show="showInfo") {{ formInfo.familyName4 }}
              el-form-item(label="名4", required, prop="givenName4", v-show="hotel.Count >= 5")
                el-col(:span="16")
                  el-input(v-model="formInfo.givenName4", v-show="!showInfo")
                  span(v-show="showInfo") {{ formInfo.givenName4 }}
            el-form-item(label="房间要求", prop="roomDemand")
              el-col(:span="6")
                el-select(placeholder="请选择", v-model="formInfo.roomDemandSelect", v-show="!showInfo")
                  el-option(
                    v-for="item in roomDemandOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  )
                span(v-show="showInfo") {{ this.computedRoomDemandSelect }}
            el-form-item(label="到店时间", prop="reachTime")
              el-col(:span="6")
                el-select(placeholder="请选择", v-model="formInfo.reachTimeSelect", v-show="!showInfo")
                  el-option(
                    v-for="item in reachTimeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  )
                span(v-show="showInfo") {{ this.computedReachTimeOptions }}
            el-form-item(label="备注", prop="reachTime")
              el-col(:span="12")
                el-input(
                type="textarea",
                :autosize="{ minRows: 2, maxRows: 4}",
                placeholder="请输入内容",
                v-model="formInfo.tip",
                v-show="!showInfo"
                )
                span(v-show="showInfo") {{ formInfo.tip ? formInfo.tip : '无' }}
      el-row(type="flex", justify="center")
        el-col.formTitle(:span="20") 联系信息
      el-row(type="flex", justify="center")
        el-col(:span="20").infoContainer
          el-form(ref="form", :model="contactInfo", :rules="contactInfoRules", label-width="80px")
            .rowPlay
              el-form-item(label="姓", required, prop="familyName")
                el-col(:span="16")
                  el-input(v-model="contactInfo.familyName", v-show="!showInfo")
                  span(v-show="showInfo") {{ contactInfo.familyName }}
              el-form-item(label="名", required, prop="givenName")
                el-col(:span="16")
                  el-input(v-model="contactInfo.givenName", v-show="!showInfo")
                  span(v-show="showInfo") {{ contactInfo.givenName }}
            el-form-item(label="联系手机", required, prop="phone")
              el-col(:span="6")
                el-input(v-model="contactInfo.phone", v-show="!showInfo")
                span(v-show="showInfo") {{ contactInfo.phone }}
            el-form-item(label="固定电话", prop="stickPhone")
              el-col(:span="6")
                el-input(v-model="contactInfo.stickPhone", v-show="!showInfo")
                span(v-show="showInfo") {{ contactInfo.stickPhone ? contactInfo.stickPhone : '未填' }}
            el-form-item(label="电子邮件", required, prop="email")
              el-col(:span="6")
                el-input(v-model="contactInfo.email", v-show="!showInfo")
                span(v-show="showInfo") {{ contactInfo.email }}
      el-row(type="flex", justify="center")
        el-col.formTitle(:span="20") 付款方式
      el-row(type="flex", justify="center")
        el-col(:span="20").infoContainer
          el-radio.radio(v-model="payType" label="56", v-show="!showInfo") 在线预付
          el-radio.radio(v-model="payType" label="57", v-show="!showInfo") 前台到付
          span(v-show="showInfo") {{ computedPayType }}
      el-row(type="flex", justify="center")
        el-col(:span="20").infoContainer
          span 我已阅读并同意以上规则
          .submitBtnContainer
            el-button(type="warning", @click="submitOrder", v-show="!showInfo") 提交订单
            el-button(@click="cancelOrder", v-show="showInfo") 取消订单
      .footerContainer
        btm-footer(ref="footer")
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import BtmFooter from '@/components/BtmFooter/BtmFooter'
import { regObj, formatDetailPage } from '@/common/js/utils'
import { getRoomInfo, bookingRoom, GetIncrementList, NoPassAudit, SendBookingEmailUser } from '@/api/room'
import Cookies from 'js-cookie'
moment.locale('zh-cn')

export default {
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value.match(regObj.phone)) return callback(new Error('请输入正确的手机号'))
    }
    return {
      loading: false,
      bookingNum: '',
      showInfo: false,
      formInfo: {
        familyName: '',
        givenName: '',
        familyName1: '',
        givenName1: '',
        familyName2: '',
        givenName2: '',
        familyName3: '',
        givenName3: '',
        familyName4: '',
        givenName4: '',
        roomDemandSelect: 47,
        reachTimeSelect: 51,
        tip: ''
      },
      formInfoRules: {
        familyName: [
          {
            required: true,
            message: '请填写您的姓氏',
            trigger: 'blur'
          }
        ],
        givenName: [
          {
            required: true,
            message: '请填写您的名字',
            trigger: 'blur'
          }
        ]
      },
      contactInfo: {
        familyName: '',
        givenName: '',
        phone: '',
        stickPhone: '',
        email: ''
      },
      contactInfoRules: {
        familyName: [
          {
            required: true,
            message: '请填写您的姓氏',
            trigger: 'blur'
          }
        ],
        givenName: [
          {
            required: true,
            message: '请填写您的名字',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            validator: validatePhone,
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ]
      },
      tabelData: [],
      customTable: [
        {
          name: '早餐',
          price: 80,
          number: 0
        }
      ],
      roomDemandOptions: [
        {
          value: 47,
          label: '无烟房'
        },
        {
          value: 48,
          label: '吸烟房'
        },
        {
          value: 49,
          label: '没有要求'
        }
      ],
      reachTimeOptions: [
        {
          value: 51,
          label: '18点前到达'
        },
        {
          value: 52,
          label: '18:00-20:00'
        },
        {
          value: 53,
          label: '20:00-22:00'
        },
        {
          value: 54,
          label: '22:00-24:00'
        },
        {
          value: 55,
          label: '24:00以后'
        }
      ],
      payType: '1',
      roomDetail: {}
    }
  },
  computed: {
    computedDays() {
      const duration = moment(this.hotel.End).unix() - moment(this.hotel.Start).unix()
      return duration / (60 * 60 * 24)
    },
    computedMoney() {
      return this.computedDays * this.hotel.avgPrice * this.hotel.Count
    },
    computedTotal() {
      let customMoney = 0
      this.customTable.forEach((item) => {
        customMoney += item.price * item.number
      })
      return `${this.computedMoney + customMoney}`
    },
    computedRoomDemandSelect() {
      switch (this.formInfo.roomDemandSelect - 0) {
        case 47:
          return '无烟房'
        case 48:
          return '吸烟房'
        case 49:
          return '没有要求'
      }
    },
    computedReachTimeOptions() {
      switch (this.formInfo.reachTimeSelect - 0) {
        case 51:
          return '18点前到达'
        case 52:
          return '18:00-20:00'
        case 53:
          return '20:00-22:00'
        case 54:
          return '22:00-24:00'
        case 55:
          return '24:00以后'
      }
    },
    computedPayType() {
      switch (this.payType - 0) {
        case 1:
          return '在线预付'
        case 2:
          return '到店现付'
      }
    },
    ...mapGetters([
      'hotel',
      'userInfo',
      'orderDetail'
    ])
  },
  methods: {
    async submitOrder() {
      if (!this.validFormData(this.formInfo, this.contactInfo)) return
      let serviceObj = this.customTable
      serviceObj[0].valueAdded = this.customTable[0].name
      let params = {
        ArrivalTime: this.hotel.Start,
        DepartingTime: this.hotel.End,
        RoomType: this.hotel.roomId,
        PriceSystemId: this.hotel.priceSystemId,
        RoomPolicy: this.hotel.People,
        RoomNum: this.hotel.Count,
        GuestSurName: this.formInfo.familyName,
        GuestName: this.formInfo.givenName,
        GuestSurName1: this.formInfo.familyName1,
        GuestName1: this.formInfo.givenName1,
        GuestSurName2: this.formInfo.familyName2,
        GuestName2: this.formInfo.givenName2,
        GuestSurName3: this.formInfo.familyName3,
        GuestName3: this.formInfo.givenName3,
        GuestSurName4: this.formInfo.familyName4,
        GuestName4: this.formInfo.givenName4,
        BookingRequest: this.formInfo.roomDemandSelect,
        ReachTime: this.formInfo.reachTimeSelect,
        Comment: this.formInfo.tip,
        Lists: serviceObj,
        ContactSurName: this.contactInfo.familyName,
        ContactName: this.contactInfo.givenName,
        ContactPhone: this.contactInfo.phone,
        Email: this.contactInfo.email,
        Payment: this.payType,
        ContactTelePhone: this.contactInfo.stickPhone,
        ordermoney: this.computedTotal
      }
      const memberId = Cookies.get('MemberId')
      // this.guestArr.forEach(item => {
      //   params = Object.assign(params, item)
      // })
      if (memberId) {
        params.memberNum = memberId
        console.log(params)
        // return
      }
      try {
        this.loading = true
        const { data } = await bookingRoom(params)
        const res = await GetIncrementList({ number: this.customTable[0].number, valueAdded: this.customTable[0].name })
        this.loading = false
        console.log('客制化服务-->', res.data)
        if (data.error) {
          this.$notify({
            title: '警告',
            message: data.error.message,
            type: 'error'
          })
          return
        }
        this.$notify({
          title: '成功',
          message: '订单提交成功',
          type: 'success'
        })
        // 发送激活邮件
        let emailParams = {
          ArrivalTime: this.hotel.Start,
          ContactSurName: this.contactInfo.givenName,
          ContactName: this.contactInfo.familyName,
          BookingNum: data.result.bookingNum,
          RoomName: this.hotel.roomTypeName,
          RoomNum: this.hotel.Count,
          Email: this.contactInfo.email
        }
        const emailRes = await SendBookingEmailUser(emailParams)
        console.log('----->', emailRes)
        this.bookingNum = data.result.bookingNum
        this.showInfo = true
      } catch (err) {
        console.log(err)
        this.loading = false
      }
    },
    createTableData(daysNumber) {
      console.log('天数--->', daysNumber)
      let tableData = []
      for (let i = 0; i < daysNumber; i++) {
        let obj = {}
        const day = moment(this.hotel.Start).add(i, 'days')
        obj.date = `${day.format('YYYY-MM-DD')} 星期${day.format('dd')}`
        obj.roomType = this.hotel.roomTypeName
        obj.price = `￥${this.hotel.avgPrice}`
        tableData.push(obj)
      }
      return tableData
    },
    validFormData(formInfo, contactInfo) {
      if (!formInfo.familyName || !contactInfo.familyName) {
        this.$notify({
          title: '警告',
          message: '请填写姓氏',
          type: 'warning'
        })
        return false
      } else if (!formInfo.givenName || !contactInfo.familyName) {
        this.$notify({
          title: '警告',
          message: '请填写名字',
          type: 'warning'
        })
        return false
      } else if (!contactInfo.phone.match(regObj.phone)) {
        this.$notify({
          title: '警告',
          message: '请填写正确的手机号',
          type: 'warning'
        })
        return false
      } else if (!contactInfo.email.match(regObj.email)) {
        this.$notify({
          title: '警告',
          message: '请填写正确的邮箱',
          type: 'warning'
        })
        return false
      }
      return true
    },
    async _getRoomInfo() {
      const params = {
        start: this.hotel.Start,
        end: this.hotel.End,
        pYId: this.hotel.priceSystemId,
        rid: this.hotel.roomId
      }
      try {
        const { data } = await getRoomInfo(params)
        if (data.error) {
          this.$notify({
            title: '警告',
            message: data.error.message,
            type: 'error'
          })
          return
        }
        this.roomDetail = data.result
      } catch (err) {
        console.log(err)
      }
    },
    async _GetIncrementList(params) {
      try {
        const { data } = await GetIncrementList(params)
        data.result.items.forEach(item => {
          item.number = 0
        })
        this.customTable = data.result.items
        // console.log
      } catch (err) {
        console.log(err)
      }
    },
    async cancelOrder() { // 取消订单接口
      try {
        let params = {}
        params.id = this.bookingNum
        const { data } = NoPassAudit(params)
        if (data.success) {
          this.$notify.success({
            title: '成功',
            message: '取消订单成功'
          })
        } else {
          this.$notify.error({
            title: '失败',
            message: data.error.message
          })
        }
      } catch (err) {
        console.log(err)
        this.$notify.error({
          title: '失败',
          message: '取消订单失败'
        })
      }
    }
  },
  created() {
    if (this.$route.query.detail) {
      formatDetailPage(this.orderDetail)
      this.showInfo = true
      return
    }
    if (!this.hotel.roomId) this.$router.push('/pc/search')

    // for (let i = 0; i < this.hotel.Count - 1; i++) {
    //   let obj = {}
    //   obj[`GuestSurName${i + 1}`] = ''
    //   obj[`GuestName${i + 1}`] = ''
    //   this.guestArr.push(obj)
    // }
    this._GetIncrementList() // 获取客制化服务接口

    this.tabelData = this.createTableData(this.computedDays)
    this._getRoomInfo()
  },
  mounted() {
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
