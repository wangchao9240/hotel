<template lang="pug">
  transition(name="el-fade-in")
    .indexContainer
      .swiperContainer
        swiper(:options="swiperOption", ref="mySwiper")
          swiper-slide
            .imgContainer.fst
              //- img(src="../../static/image/1422698188560.jpg")
          swiper-slide
            .imgContainer.scd
              //- img(src="../../static/image/1422698233289.jpg")
        .reserveContainer
          reserve(@search="searchHandler", :glass="true")
        .memberLoginContainer(:class="{'logined': userInfo.memberId }")
          member-login(@login="loginHandler", ref="memberLoginCom", @logoffTap="logoffHandler", @hrefPersonalCenter="hrefPersonalCenterHandler", @hrefForgetPassword="hrefForgetPasswordHandler")
      .footerWrapper
        btm-footer
</template>

<script>
import BtmFooter from '@/components/BtmFooter/BtmFooter'
import memberLogin from '@/components/MemberLogin/MemberLogin'
import Reserve from '@/components/Reserve/Reserve'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { postLogin, ActivateMember } from '@/api/member'
import { getUserInfoMixin } from '@/common/js/mixins'
import Cookies from 'js-cookie'
import { mapGetters } from 'vuex'
export default {
  mixins: [getUserInfoMixin],
  data() {
    return {
      swiperOption: {
        effect: 'fade',
        autoplay: 5000,
        loop: true
      }
    }
  },
  computed: {
    swiperObj() {
      return this.$refs.mySwiper.swiper
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    searchHandler(query) {
      this.$router.push({
        path: '/pc/search',
        query: query
      })
    },
    async loginHandler(params) {
      console.log(params)
      try {
        const { data } = await postLogin(params)
        if (data.error) {
          this.$message({
            message: data.error.message,
            type: 'error'
          })
          return
        } else if (!data.result) {
          this.$message({
            message: '请输入正确的用户名和密码',
            type: 'error'
          })
          this.$refs.memberLoginCom.changeCode()
          return
        }
        Cookies.set('MemberId', data.result.memberId)
        this.setUserInfo(data.result)
      } catch (err) {
        console.log(err)
      }
    },
    logoffHandler() {
      Cookies.remove('MemberId')
      this.setUserInfo({})
    },
    hrefPersonalCenterHandler() {
      if (this.userInfo.memberId && !this.userInfo.isEmailConfirmed) {
        this.$notify.warning({
          title: '警告',
          message: '您的账号还未激活，请前往注册时所填邮箱激活账号'
        })
        return
      }
      this.$router.push('/pc/personalcenter/myinfo')
    },
    hrefForgetPasswordHandler() {
      this.$router.push('/pc/forgetPassword')
    },
    async _ActivateMember(params) {
      try {
        const { data } = await ActivateMember(params)
        if (data.result) {
          this.$notify({
            type: 'success',
            message: '邮箱激活成功',
            title: '成功'
          })
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  created() {
    if (this.$route.query.email && this.$route.query.memberId) {
      console.log('激活')
      // 邮箱激活接口
      const params = {
        Email: this.$route.query.email,
        MemberId: this.$route.query.memberId
      }
      this._ActivateMember(params)
      Cookies.set('MemberId', this.$route.query.memberId)
    }
    const memberId = Cookies.get('MemberId')
    if (memberId) this.getUserInfoHandler(memberId)
    if (this.userInfo.memberId && !this.userInfo.isEmailConfirmed) {
      this.$notify.warning({
        title: '警告',
        message: '您的账号还未激活，请前往注册时所填邮箱激活账号'
      })
    }
  },
  mounted() {
    setTimeout(() => {
      if (!this.$refs.mySwiper) return
      this.swiperObj.init()
    }, 450)
  },
  components: {
    swiper,
    swiperSlide,
    BtmFooter,
    Reserve,
    memberLogin
  }
}
</script>

<style lang="less" scoped>
@import '../common/less/variables.less';
.indexContainer {
  position: absolute;
  top: 130px;
  bottom: 120px;
  width: 100%;
  .swiperContainer {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    .swiper-container {
      width: 100%;
      height: 100%;
      .swiper-slide {
        width: 100%;
      }
      .imgContainer {
        width: 100%;
        height: 100%;
        background: #000;
        &.fst {
          background: url('../../static/image/1422698188560.jpg') left center no-repeat;
          background-size: cover;
        }
        &.scd {
          background: url('../../static/image/1422698233289.jpg') left center no-repeat;
          background-size: cover;
        }
      }
      // img {
      //   width: 100%;
      //   height: 100%;
      // }
    }
    .reserveContainer {
      position: absolute;
      z-index: 10;
      bottom: 0;
      width: 100%;
      height: 74px;
      background-color: @background-color-black-glass;
    }
    .memberLoginContainer {
      position: absolute;
      top: 50%;
      right: 20px;
      z-index: 10;
      margin-top: -180px;
      padding: 20px;
      width: 250px;
      height: 320px;
      color: #fff;
      border-radius: 4px;
      background-color: @background-color-black-glass;
      &.logined {
        width: 300px;
        height: 180px;
        margin-top: -100px;
      }
    }
  }
  .footerWrapper {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
</style>
