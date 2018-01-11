<template lang="pug">
  .heightContainer(v-loading.fullscreen="fullscreenLoading")
    .mall
      .navContainer
        mall-nav
      ul.topNav
        li(@click="selectItem({}, -1)", :class="{'active': hrefHome}") 首页
        li(@click="selectItem(item, index)", :class="{'active': item.number}", v-for="(item, index) in navList") {{ item.name }}
      router-view(@setFooter="setFooterHandler")
      mall-footer(ref="footer")
</template>

<script>
import Cookies from 'js-cookie'
import MallNav from '@/components/MallNav/MallNav'
import MallFooter from '@/components/MallFooter/MallFooter'
import { GetIntegralCommodityMenus, GetCommodityMenus } from '@/api/mall'
import { getSelectCategoryInfo } from '@/common/js/mixins'
export default {
  mixins: [getSelectCategoryInfo],
  data() {
    return {
      navList: [],
      hrefHome: true,
      fullscreenLoading: true
    }
  },
  methods: {
    selectItem(item, index) {
      this.navList.forEach(item => {
        item.number = 0
      })
      if (index === -1) this.hrefHome = true
      else {
        this.hrefHome = false
        this.navList[index].number = 1
      }
      this._GetIntegralCommodityPaged(item.id, item.name)
      this.$router.push('/mall/home')
    },
    async _GetIntegralCommodityMenus() {
      try {
        let res
        if (Cookies.get('online') === 'true') {
          res = await GetCommodityMenus()
        } else {
          res = await GetIntegralCommodityMenus()
        }
        const data = res.data
        data.result.items.forEach((item, index) => {
          // if (index === 0) item.number = 1
          item.number = 0
        })
        this.navList = data.result.items
      } catch (err) {
        this.$notify.error({
          title: '提示',
          message: '请求失败'
        })
        console.log(err)
      }
    },
    setFooterHandler() {
      this.$refs.footer.setFooter()
    }
  },
  created() {
    if (this.$route.query.online) Cookies.set('online', this.$route.query.online)
    else if (Cookies.get('online') === 'true') console.log('do nothing')
    else Cookies.set('online', false)
    if (Cookies.get('online') === 'false' && !Cookies.get('MemberId')) {
      this.$notify.warning({
        title: '提示',
        message: '进入积分商城需先登录'
      })
      this.fullscreenLoading = false
      this.$router.push('/pc/index')
      return
    }
    this._GetIntegralCommodityMenus()
    this._GetIntegralCommodityPaged()
  },
  watch: {
    $route() {
      this.$refs.footer.setFooter(0)
    }
  },
  components: {
    MallFooter,
    MallNav
  }
}
</script>

<style lang="less" scoped>
@import "../common/less/variables.less";
.heightContainer {
  position: absolute;
  top: 130px;
  bottom: 0;
  width: 100%;
  background: url('../../static/image/bgimg.jpg') left top no-repeat;
  background-size: cover;
}
.mall {
  position: relative;
  top: 0px;
  bottom: 0;
  margin-top: -130px;
  width: 100%;
  background: url('../../static/image/bgimg.jpg') left top no-repeat;
  background-size: cover;
  background-color: @color-text-white;
  .topNav {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 43px;
    background-color: @background-nav-black;
    li {
      width: 200px;
      height: 100%;
      line-height: 43px;
      text-align: center;
      color: @color-text-gray;
      cursor: pointer;
      &:hover {
        color: @color-text-white;
      }
      &.active {
        color: @color-text-white;
      }
    }
  }
  .navContainer {
    height: 76px;
    overflow: hidden;
  }
}
</style>
