import * as types from './mutation-types'

const mutations = {
  [types.SET_USERINFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_HOTEL](state, hotel) {
    state.hotel = hotel
  },
  [types.SET_VERIFY_MEMBERID](state, memberId) {
    state.verifyMemberId = memberId
  },
  [types.SET_ORDER_DETAIL](state, orderDetail) {
    state.orderDetail = orderDetail
  },
  [types.SET_ARTICLE](state, article) {
    state.article = article
  },
  [types.SET_MALL_INFO](state, mallInfo) {
    state.mallInfo = mallInfo
  },
  [types.SET_SHOW_SWIPER](state, showSwiper) {
    state.showSwiper = showSwiper
  },
  [types.SET_ORDER_CONFIRM](state, orderConfirm) {
    state.orderConfirm = orderConfirm
  },
  [types.SET_BUY_DIRECT](state, buyDirect) {
    state.buyDirect = buyDirect
  },
  [types.SET_BUY_DIRECT_INFO](state, buyDirectInfo) {
    state.buyDirectInfo = buyDirectInfo
  }
}

export default mutations
