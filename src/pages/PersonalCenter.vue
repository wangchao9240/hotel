<template lang="pug">
  transition(name="el-fade-in")
    el-row.personalCenterContainer(type="flex", justify="center")
      el-col(:span="20")
        el-row(:gutter="20")
          el-col.menu(:span="6")
            el-menu.el-menu-vertical-demo(default-active="1")
              el-menu-item(index="1", @click="hrefRouter('myinfo')") 我的信息
              el-submenu(index="2")
                template(slot="title") 我的订单
                el-menu-item(index="1-1", @click="hrefRouter('myorder?type=0')") 客房订单
                el-menu-item(index="1-2", @click="hrefRouter('mallorder?type=1')") 商城订单
                el-menu-item(index="1-3", @click="hrefRouter('mallorder?type=2')") 积分乐园订单
              el-menu-item(index="2", @click="hrefRouter('accountrecord')") 积分记录
              el-menu-item(index="3", @click="hrefRouter('cardcenter')") 领券中心
              el-menu-item(index="4", @click="hrefRouter('mycard')") 我的券
          el-col(:span="18")
            transition(name="el-fade-in")
              router-view
      .footer
        btm-footer(ref="footer")
</template>

<script>
import { getUserInfoMixin } from '@/common/js/mixins'
import BtmFooter from '@/components/BtmFooter/BtmFooter'
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
export default {
  mixins: [getUserInfoMixin],
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    hrefRouter(url) {
      if (url === 'cardcenter') this.$router.push(`/pc/personalcenter/${url}`)
      else this.$router.push(`/pc/personalcenter/${url}`)
      setTimeout(() => {
        this.$refs.footer.setFooter()
      }, 1500)
    }
  },
  created() {
    const memberId = Cookies.get('MemberId')
    if (!memberId) {
      this.$router.push('/pc/index')
    }
    this.getUserInfoHandler(memberId)
    // if (memberId && !this.userInfo.memberId) this.getUserInfoHandler(memberId)
    if (this.userInfo.memberId && !this.userInfo.isEmailConfirmed) {
      this.$notify.warning({
        title: '警告',
        message: '您的账号还未激活，请前往注册时所填邮箱激活账号'
      })
      // 缺一个跳转限制
    }
  },
  components: {
    BtmFooter
  }
}
</script>

<style lang="less" scoped>
@import '../common/less/variables.less';
.personalCenterContainer {
  margin-top: 20px;
  .el-menu {
    border-radius: 4px;
  }
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
