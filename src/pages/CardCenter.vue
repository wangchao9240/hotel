<template lang="pug">
  el-row.cardContainer
    el-col.cardCenter(:span="20")
      .title 领券中心
      el-row.cardInfo
        el-col(:span="12", v-for="(cardInfo, index) in cardList", :key="index")
          card-item(:cardInfo="cardInfo", :lingqu="true")
      el-row(v-show="cardList.length === 0", type="flex", justify="center") 暂无卡券
</template>

<script>
import CardItem from '@/components/CardItem/CardItem'
import { GetIssueVoucherPaged } from '@/api/member'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      cardList: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    async _GetIssueVoucherPaged() {
      try {
        const params = {
          memberFileNum: this.userInfo.memberId,
          levelId: this.userInfo.level
        }
        const { data } = await GetIssueVoucherPaged(params)
        if (data.error) {
          this.$notify({
            title: '警告',
            message: data.error.message,
            type: 'error'
          })
          return
        }
        this.cardList = data.result.items
      } catch (err) {
        console.log(err)
      }
    }
  },
  created() {
    if (!this.userInfo.memberId) {
      this.$router.push('/pc/personalcenter/myinfo')
      return
    }
    this._GetIssueVoucherPaged()
  },
  components: {
    CardItem
  }
}
</script>

<style lang="less" scoped>
@import '../common/less/variables.less';
.cardContainer {
  // margin-top: 20px;
  margin-bottom: 150px;
  .cardCenter {
    padding: 15px;
    background-color: @background-extra-light-gray;
    border-radius: 4px;
    .title {
      font-weight: bold;
    }
    .cardInfo {
      margin-top: 20px;
      .el-col {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
