<template lang="pug">
  .mallNav
    .logo
    a(@click="hrefMyCartHandler").myCart 我的购物车
    router-link(:to="{ path: '/mall/search' }").myCart 订单查询
    .weather
      iframe.weather(
        src="http://www.thinkpage.cn/weather/weather.aspx?uid=&cid=CHSD000000&l=zh-CN&p=SMART&a=0&u=C&s=11&m=0&x=0&d=1&fc=4a2b0e&bgc=&bc=&ti=0&in=0&li=&ct=iframe",
        frameborder="0",
        scrolling="no",
        width="230",
        height="50",
        allowtransparency="true"
      )
    ul.btnUl
      router-link(tag="li", to="/pc/index") 返回官网
      li(@click="hrefHandler('/search')") 会员预订
      li.black(v-show="userInfo.memberId") 欢迎您，{{ userInfo.surName }}{{ userInfo.genderName }}
      li(v-show="userInfo.memberId", @click="signoutHandler") 注销
      li(@click="hrefHandler('/')", v-show="!userInfo.memberId") 登录
      li(@click="hrefHandler('/signin')", v-show="!userInfo.memberId") 注册
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Cookies from 'js-cookie'
import { getUserInfoMixin } from '@/common/js/mixins'
export default {
  mixins: [getUserInfoMixin],
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    hrefHandler(url) {
      this.$router.push('/pc' + url)
    },
    signoutHandler() {
      Cookies.remove('MemberId')
      this.setUserInfo({})
    },
    hrefMyCartHandler() {
      console.log('nihaoa')
      this.setBuyDirect(false)
      this.setOrderConfirm(false)
      this.$router.push('/mall/shopcartdetail')
    },
    ...mapMutations({
      setUserInfo: 'SET_USERINFO',
      setBuyDirect: 'SET_BUY_DIRECT',
      setOrderConfirm: 'SET_ORDER_CONFIRM'
    })
  },
  created() {
    const memberId = Cookies.get('MemberId')
    if (memberId) this.getUserInfoHandler(memberId)
  }
}
</script>

<style lang="less">
@import "../../common/less/variables.less";
.mallNav {
  position: relative;
  height: 76px;
  padding-right: 5%;
  .logo {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -38px;
    margin-left: -43px;
    width: 75px;
    height: 69px;
    background: url('./logo.png') center center no-repeat;
    background-size: 100% 100%;
  }
  .myCart {
    display: flex;
    align-items: center;
    float: right;
    margin-right: 8px;
    height: 100%;
    cursor: pointer;
    color: @color-text-blue;
    &:hover {
      color: @color-text-gray;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  .weather {
    margin-left: 30px;
    float: right;
  }
  .btnUl {
    display: flex;
    align-items: center;
    float: left;
    padding-left: 5%;
    height: 100%;
    li {
      margin-right: 5px;
      cursor: pointer;
      color: @color-text-blue;
      &.black {
        color: @color-text;
        cursor: default;
      }
      &:hover {
        color: @color-text-gray;
        &.black {
          color: @color-text;
        }
      }
    }
  }
}
</style>
