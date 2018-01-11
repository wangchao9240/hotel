import axios from 'axios'
import { mall, onlineMall } from './config'

// 得到积分商城商品类别接口
export const GetIntegralCommodityMenus = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(mall.GetIntegralCommodityMenus, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 获得积分商城全部商品接口 && 获得积分商城里某一类别商品接口
export const GetIntegralCommodityPaged = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(mall.GetIntegralCommodityPaged, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 积分商城每个商品详情接口
export const GetCommodity = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(mall.GetCommodity, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 积分商城每个商品详情接口
export const InsertIntegralShoppingCar = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(mall.InsertIntegralShoppingCar, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 获得积分购物车商品接口&&获得积分预兑换订单接口
export const GetShoppingPaged = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(mall.GetShoppingPaged, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 删除购物车积分商品&&删除预兑换商品接口
export const DeleteShoppingCar = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(mall.DeleteShoppingCar, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 将商品从购物车加入预兑换订单中
export const InsertOrderFromCar = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(mall.InsertOrderFromCar, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 查看某会员全部已兑换积分订单&&查看会员某个积分订单详情
export const GetMallOrderPaged = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(mall.GetMallOrderPaged, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 将在购物车选中的商品加入订单
export const InsertIntegralOrder = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(mall.InsertIntegralOrder, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 立即兑换商品接口
export const ImmediatelyExchange = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(mall.ImmediatelyExchange, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 查看某会员全部已兑换积分订单&&查看会员某个积分订单详情
export const GetIntegrealOrderPaged = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(mall.GetIntegrealOrderPaged, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 得到在线商城商品类别接口
export const GetCommodityMenus = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(onlineMall.GetCommodityMenus, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 获得在线商城全部商品接口
export const GetCommodityPaged = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(onlineMall.GetCommodityPaged, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 立即购买接口和非会员购买接口
export const ImmediatelyOrder = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(onlineMall.ImmediatelyOrder, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 将商品从购物车加入预购订单中
export const InsertOrUpdateOrder = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(onlineMall.InsertOrUpdateOrder, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}