import { mapMutations } from 'vuex'
import { getUserInfo } from '@/api/member'
import Cookies from 'js-cookie'
import { GetIntegralCommodityPaged, GetCommodityPaged } from '@/api/mall'

export const getUserInfoMixin = {
  methods: {
    async getUserInfoHandler(memberId) {
      try {
        const { data } = await getUserInfo({ memberId })
        if (data.error) {
          this.$message({
            message: data.error,
            type: 'error'
          })
          return
        }
        console.log('这里设置了获取用户信息', data.result)
        let userInfo = {}
        if (data.result.items[0]) userInfo = data.result.items[0]
        this.setUserInfo(userInfo)
      } catch (err) {
        console.log(err)
      }
    },
    ...mapMutations({
      setUserInfo: 'SET_USERINFO'
    })
  }
}

export const getSelectCategoryInfo = {
  methods: {
    async _GetIntegralCommodityPaged(id, name) {
      this.fullscreenLoading = true
      try {
        if (!id) {
          id = 0
          this.setShowSwiper('')
        } else {
          this.setShowSwiper(name)
        }
        const params = {
          CategoryId: id
        }
        let res
        if (Cookies.get('online') === 'true') {
          res = await GetCommodityPaged(params)
        } else {
          res = await GetIntegralCommodityPaged(params)
        }
        const data = res.data
        this.setMallInfo(data.result)
        setTimeout(() => {
          if (this.$refs.footer) {
            if (document.querySelector('.itemContainer')) {
              this.$refs.footer.setFooter(document.querySelector('.itemContainer').clientHeight + 130)
            } else {
              this.$refs.footer.setFooter()
            }
          } else {
            this.$emit('setFooter')
          }
        }, 80)
      } catch (err) {
        console.log(err)
        this.$notify.warning({
          title: '提示',
          message: '网络错误'
        })
      }
      this.fullscreenLoading = false
    },
    ...mapMutations({
      setMallInfo: 'SET_MALL_INFO',
      setShowSwiper: 'SET_SHOW_SWIPER'
    })
  }
}
