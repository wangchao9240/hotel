<template lang="pug">
el-tooltip(class="item", effect="dark", :disabled="!(my && cardInfo.cancelOut === 1 && cardInfo.cancelCauseName)", :content="computedContent(cardInfo)", placement="right")
  .cardItem
    .left
      .cardName {{ cardInfo.voucherName }}
      .cardPrice ￥{{ cardInfo.denomination }}
      .cardTip {{ cardInfo.description }}
      .cardTime {{ computedTime(cardInfo) }}
      .cardNum(v-if="cardInfo.voucherNum") 卡券编号:{{ cardInfo.voucherNum }}
    .right(:class="{'disabled': cardInfo.cancelOut === 1 || cardInfo.isTimeOut}")
      a.useNow(@click="useNow(cardInfo)", v-if="!my") {{ computedText }}
      a.useNow(v-show="cardInfo.cancelOut === 1", v-if="my") 已核销
</template>

<script>
import moment from 'moment'
import { CreateMemberVoucher } from '@/api/member'
import { mapGetters } from 'vuex'
export default {
  props: {
    cardInfo: {
      type: Object,
      default() {
        return {
          cardName: '',
          cardPrice: 0,
          cardTip: '',
          cardTime: '',
          disabled: false
        }
      }
    },
    my: {
      type: Boolean,
      default: false
    },
    lingqu: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedText() {
      if (this.cardInfo.isTimeOut) {
        return '已过期'
      } else if (this.lingqu) {
        return '立即领取'
      } else {
        return '立即使用'
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    computedTime(cardInfo) {
      return `${moment(cardInfo.startTime).format('YYYY/MM/DD')}-${moment(cardInfo.endTime).format('YYYY/MM/DD')}`
    },
    async useNow(cardInfo) {
      try {
        const params = {
          memberFileNum: this.userInfo.memberId,
          id: cardInfo.id,
          voucherId: cardInfo.voucherId
        }
        const { data } = await CreateMemberVoucher(params)
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
          message: '领券成功',
          type: 'success'
        })
        setTimeout(() => {
          this.$router.push('/pc/personalcenter/mycard')
        }, 1500)
      } catch (err) {
        console.log(err)
      }
    },
    computedContent(cardInfo) {
      return `${cardInfo.cancelCauseName} | ${cardInfo.remark}`
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/variables.less';
.cardItem {
  display: flex;
  width: 300px;
  height: 130px;
  background-color: @color-text-white;
  border: 1px solid @seperate-line-gray;
  .left {
    flex: 1;
  }
  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px;
    &>div {
      margin-bottom: 10px;
    }
    &>div:last-child {
      margin-bottom: 0;
    }
    .cardName {
      font-size: @font-size-small-x;
      color: @background-blur-green;
    }
    .cardPrice {
      font-weight: bold;
      font-size: @font-size-large-x;
      color: @background-blur-green;
    }
    .cardTip {
      font-size: @font-size-small-x;
      color: @color-text-gray;
    }
    .cardTime, .cardNum {
      font-size: @font-size-small-x;
      color: @color-text-gray;
    }
  }
  .right {
    position: relative;
    flex: 0 0 55px;
    display: flex;
    align-items: center;
    background: url('./semi-circle.png') left top no-repeat;
    background-size: 3px 100%;
    background-color: @background-blur-green;
    &.disabled {
      background-color: @color-text-brand;
    }
    .useNow {
      margin: 0 auto;
      width: @font-size-small-x;
      font-size: @font-size-small-x;
      line-height: 23.333px;
      color: @color-text-white;
      cursor: pointer;
    }
  }
}
</style>
