<template lang="pug">
  .headerContainer
    .logo
    .tipContainer
      ul.tipUl
        li(@click="specialCount") 特别优惠
        li(@click="hrefHandler") 会员预订
      iframe.weather(
        src="http://www.thinkpage.cn/weather/weather.aspx?uid=&cid=CHSD000000&l=zh-CN&p=SMART&a=0&u=C&s=11&m=0&x=0&d=1&fc=4a2b0e&bgc=&bc=&ti=0&in=0&li=&ct=iframe",
        frameborder="0",
        scrolling="no",
        width="230",
        height="50",
        allowtransparency="true"
      )
</template>

<script>
import { getNavBar } from '@/api/navBar'
export default {
  data() {
    return {
      countUrl: ''
    }
  },
  methods: {
    hrefHandler() {
      this.$router.push('/pc/index')
    },
    specialCount() {
      if (this.countUrl) this.$router.push(this.countUrl)
    },
    async _getNavBar() {
      try {
        const { data } = await getNavBar()
        data.result.items.forEach(item => {
          if (item.name === '优惠酬宾') this.countUrl = item.url
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  created() {
    this._getNavBar()
  }
}
</script>

<style lang="less" scoped>
  @import "../../common/less/variables.less";
  .headerContainer {
    position: relative;
    padding-top: 9px;
    width: 100%;
    height: 95px;
    background: url('./head_bj.jpg') center center no-repeat;
    background-size: 100% 100%;
    .logo {
      margin: 0 auto;
      width: 85px;
      height: 77px;
      background: url('./logo.png') center center no-repeat;
      background-size: 100% 100%;
    }
    .tipContainer {
      position: absolute;
      top: 20px;
      right: 100px;
      .tipUl {
        display: flex;
        justify-content: center;
        font-size: 16px;
        font-weight: bold;
        color: rgb(57, 32, 13);
        li {
          padding: 0 10px;
          border-right: 1px solid rgb(57, 32, 13);
          cursor: pointer;
          &:last-child {
            padding-right: 0;
            border-right: none;
          }
        }
      }
    }
  }
</style>
