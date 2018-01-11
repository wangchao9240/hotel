<template lang="pug">
  .myCard
    el-row.title 我的券
    el-row.flexRow(type="flex", :gutter="120")
      el-col.cardWrapper(:span="12", v-for="(cardInfo, index) in cardList", :key="index")
        card-item(:cardInfo="cardInfo", :my="true")
      el-col(v-show="cardList.length === 0") 暂无卡券
</template>

<script>
import CardItem from '@/components/CardItem/CardItem'
import { mapGetters } from 'vuex'
import { GetMemberVoucherPaged } from '@/api/member'
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
    async _GetMemberVoucherPaged() {
      try {
        const params = {
          memberNum: this.userInfo.memberId
        }
        const { data } = await GetMemberVoucherPaged(params)
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
    this._GetMemberVoucherPaged()
  },
  components: {
    CardItem
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/variables.less';
.myCard {
  margin-bottom: 150px;
  padding: 15px;
  font-size: @font-size-medium-x;
  background-color: @background-extra-light-gray;
  border-radius: 4px;
  .title {
    padding-bottom: 20px;
    font-weight: bold;
  }
  .flexRow {
    flex-wrap: wrap;
  }
  .cardWrapper {
    margin-bottom: 15px;
  }
}
</style>
