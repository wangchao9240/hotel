import axios from 'axios'
import { room } from './config'

export const getRoomInfo = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(room.getInfo, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

export const bookingRoom = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(room.bookingRoom, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

export const GetIncrementList = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(room.GetIncrementList, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 取消订单接口
export const NoPassAudit = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(room.NoPassAudit, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 游客查询订单接口
export const GetTouristOrderPaged = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(room.GetTouristOrderPaged, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 订单成功后调取发送邮件接口
export const SendBookingEmailUser = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(room.SendBookingEmailUser, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}
