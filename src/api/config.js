export const prefix = '/api/services/app/front/GetRoomList'

export const Member = {
  search: '/api/services/app/front/GetRoomList',
  signin: '/api/services/app/front/InsertOrUpdateRegister',
  userInfo: '/api/services/app/front/GetByIdMemberFile',
  login: '/api/services/app/front/GetMemberFileByUserNameAndPwd',
  getOrder: '/api/services/app/front/GetBookingOrderPaged',
  SendEmailToUser: '/api/services/app/front/SendEmailToUser',
  GetIssueVoucherPaged: '/api/services/app/front/GetIssueVoucherPaged',
  CreateMemberVoucher: '/api/services/app/front/CreateMemberVoucher',
  GetMemberVoucherPaged: '/api/services/app/front/GetMemberVoucherPaged',
  GetJfAccountByUserName: '/api/services/app/front/GetJfAccountByUserName', // 显示我的积分
  GetJfAccountByUser: '/api/services/app/front/GetJfAccountByUser',
  UpdateMemberFileAsync: '/api/services/app/front/UpdateMemberFileAsync',
  SendPhoneCode: '/api/services/app/front/SendPhoneCode',
  GetPhoneAndEmailVerify: '/api/services/app/front/GetPhoneAndEmailVerify',
  UpdateMemberPassword: '/api/services/app/front/UpdateMemberPassword',
  ActivateMember: '/api/services/app/front/ActivateMember',  // 激活邮箱
  UpdateMemberEmail: '/api/services/app/front/UpdateMemberEmail',  // 绑定/更改邮箱信息接口(会员信息)
  GetUserVerifyLogByCode: '/api/services/app/front/GetUserVerifyLogByCode', // 验证用户输入的验证码是否正确接口
  UpdateUserPhone: '/api/services/app/front/UpdateUserPhone',  // 更改手机号接口
  GetBookingOrderByUser: '/api/services/app/front/GetBookingOrderByUser',
  CreateComment: '/api/services/app/front/CreateComment', // 提交评论接口
  GetEvaluateDetail: '/api/services/app/front/GetEvaluateDetail',  // 获取评论详情接口
  GetPhoneAndCodeVerify: '/api/services/app/front/GetPhoneAndCodeVerify',  // 验证手机号和验证码是否正确接口
  SendEmailUser: '/api/services/app/front/SendEmailUser',  // 忘记密码验证邮箱
  Decryption: '/api/services/app/front/Decryption',  // 解密参数
  ValidationRegistration: '/api/services/app/front/ValidationRegistration', // 验证用户名，邮箱，手机唯一性接口
  ValidationPromoteMember: '/api/services/app/front/ValidationPromoteMember'  // 是否存在推介用户接口
}

export const navBar = {
  getNav: '/api/services/app/front/GetMenus',
  getFooterNav: '/api/services/app/front/GetFooterMenus',
  contactUs: '/api/services/app/front/GetMapPagedList',
  GetArticlePaged: '/api/services/app/front/GetArticlePaged',
  GetArticleImages: '/api/services/app/front/GetArticleImages'  // 获取文章图片接口
}

export const room = {
  getInfo: '/api/services/app/front/GetRoomOrderDetail',
  bookingRoom: '/api/services/app/front/CreateBookingOrder',
  GetIncrementList: '/api/services/app/front/GetIncrementList',
  NoPassAudit: '/api/services/app/front/NoPassAudit',  // 取消订单接口
  GetTouristOrderPaged: '/api/services/app/front/GetTouristOrderPaged',
  SendBookingEmailUser: '/api/services/app/front/SendBookingEmailUser'  // 订单成功后调取发送邮件接口
}

export const mall = {
  GetIntegralCommodityMenus: '/api/services/app/front/GetIntegralCommodityMenus', // 得到积分商城商品类别接口
  GetIntegralCommodityPaged: '/api/services/app/front/GetIntegralCommodityPaged', // 获得积分商城全部商品接口 && 获得积分商城里某一类别商品接口
  GetCommodity: '/api/services/app/front/GetCommodity',  // 积分商城每个商品详情接口
  InsertIntegralShoppingCar: '/api/services/app/front/InsertIntegralShoppingCar',  // 将积分商品放入购物车&&预兑换订单接口
  GetShoppingPaged: '/api/services/app/front/GetShoppingPaged',  // 获得积分商城购物车内容接口
  DeleteShoppingCar: '/api/services/app/front/DeleteShoppingCar',  // 删除购物车积分商品&&删除预兑换商品接口
  // InsertOrderFromCar: '/api/services/app/front/InsertOrderFromCar',  // 将商品从购物车加入预兑换订单中
  GetMallOrderPaged: '/api/services/app/front/GetMallOrderPaged',  // 查看某会员全部积分订单&&查看会员某个积分订单详情
  InsertIntegralOrder: '/api/services/app/front/InsertIntegralOrder',  // 将在购物车选中的商品加入订单
  ImmediatelyExchange: '/api/services/app/front/ImmediatelyExchange', // 立即兑换商品接口
  GetIntegrealOrderPaged: '/api/services/app/front/GetIntegrealOrderPaged'
}

export const onlineMall = {
  GetCommodityMenus: '/api/services/app/front/GetCommodityMenus', // 得到在线商城商品类别接口
  GetCommodityPaged: '/api/services/app/front/GetCommodityPaged', // 获得在线商城全部商品接口
  ImmediatelyOrder: '/api/services/app/front/ImmediatelyOrder',  // 立即购买接口和非会员购买接口
  InsertOrUpdateOrder: '/api/services/app/front/InsertOrUpdateOrder'  // 将商品从购物车加入预购订单中
}
