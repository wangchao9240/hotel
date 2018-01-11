<template lang="pug">
  transition(name="el-fade-in")
    div
      el-row(type="flex", justify="center", v-loading.body="loading", element-loading-text="正在查询")
        el-col.contentCol(:span="20")
          .reserveWrapper
            reserve(:comOptions="reserveObj", @search="searchHandler")
          .confitionWrapper 查询结果 入住日期：{{ reserveObj.Start }} 离店日期：{{ reserveObj.End }} 预定间数：{{ reserveObj.Count }}
          el-row.noResult(type="flex", justify="center", v-show="!hotelList.length")
            i.el-icon-information
            span &nbsp;所选时间段没有合适的房间，换一个时间段试试吧
          ul(v-show="hotelList.length")
            li.hotelLi(v-for="hotel in hotelList")
              el-row(:gutter="40")
                el-col(:span="8")
                  el-carousel(height="170px", :autoplay="false", arrow="never", :height="'223px'")
                    el-carousel-item(v-for="(item, index) in hotel[0].images" :key="index")
                      img(:src="item.imageUrl")
                el-col(:span="16")
                  .title {{ hotel[0].roomTypeName }}
                  .description {{ hotel[0].roomTypeDes }}
                  .table
                    el-table(
                    :data="hotel",
                    style="width: 100%",
                    header-align="center"
                    )
                      el-table-column(
                        prop="pricePolicyName",
                        label="价格名称",
                        width="180"
                      )
                      el-table-column(
                        prop="avgPrice",
                        label="平均房价",
                        width="180"
                      )
                      el-table-column(
                        label="支付方式"
                      )
                        template(scope="scope")
                          el-button(
                          type="warning",
                          size="small",
                          @click="handleEdit(scope.$index, scope.row)",
                          :disabled="scope.row.unNum - 0 > 0"
                          ) {{ scope.row.unNum - 0 < 0 ? '预订' : '不可预订' }}
      btmFooter(ref="footer")
</template>

<script>
import Reserve from '@/components/Reserve/Reserve'
import BtmFooter from '@/components/BtmFooter/BtmFooter'
import { search } from '@/api/member'
import { formatHotelArray } from '@/common/js/hotel'
import { mapMutations, mapGetters } from 'vuex'
import moment from 'moment'
export default {
  data() {
    return {
      reserveObj: {},
      hotelList: [],
      tableData: [],
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    async _getHotel(query) {
      try {
        this.loading = true
        if (this.userInfo.memberId) query.memberNum = this.userInfo.memberId
        const { data } = await search(query)
        this.loading = false
        if (data.error) {
          this.$notify.error({
            title: '错误',
            message: data.error.message
          })
          return
        }
        this.hotelList = formatHotelArray(data.result.items)
        console.log(this.hotelList)
        setTimeout(() => {
          this.$refs.footer.setFooter()
        }, 20)
      } catch (err) {
        this.loading = false
        console.log(err)
      }
    },
    searchHandler(query) {
      this._getHotel(query)
      this.initReserveObj(query)
    },
    initReserveObj(params) {
      let copyObj = {}
      copyObj.Start = params.start
      copyObj.End = params.end
      copyObj.People = params.people
      copyObj.Count = params.count
      this.reserveObj = copyObj
    },
    handleEdit(index, row) {
      Object.assign(row, this.reserveObj)
      this.setHotel(row)
      this.$router.push('/pc/confirmorder')
    },
    ...mapMutations({
      setHotel: 'SET_HOTEL'
    })
  },
  created() {
    let query = this.$route.query
    if (!query.start) {
      query.start = moment().format('YYYY-MM-DD')
      query.end = moment().add(1, 'days').format('YYYY-MM-DD')
      query.people = 1
      query.count = 1
    }
    this._getHotel(query)
    this.initReserveObj(query)
  },
  components: {
    Reserve,
    BtmFooter
  }
}
</script>

<style lang="less" scoped>
@import '../common/less/variables.less';
.contentCol {
  &>* {
    margin-top: 18px;
    border-radius: 4px;
  }
  .reserveWrapper {
    height: 60px;
    background-color: @background-extra-light-gray;
  }
  .confitionWrapper {
    color: @color-text-green;
    font-size: @font-size-medium;
    text-align: center;
    height: 60px;
    line-height: 60px;
    background-color: @background-green;
  }
  .hotelLi {
    margin-bottom: 18px;
    padding: 15px;
    width: 100%;
    min-height: 200px;
    border-radius: 4px;
    background-color: @background-extra-light-gray;
    &:hover {
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.2)
    }
    .title {
      font-size: @font-size-medium-x;
      font-weight: bold;
    }
    .description {
      margin: 15px 0;
      font-size: @font-size-medium;
    }
    .el-carousel img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
