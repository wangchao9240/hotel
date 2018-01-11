import axios from 'axios'
import { Member } from './config'

export const search = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.search, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

export const signinPost = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.signin, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

export const getUserInfo = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.userInfo, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

export const postLogin = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.login, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

export const getOrder = (memberId) => {
  const params = {
    MemberNum: memberId
  }
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.getOrder, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 邮箱验证
export const SendEmailToUser = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.SendEmailToUser, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 领券中心
export const GetIssueVoucherPaged = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.GetIssueVoucherPaged, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 券领取接口
export const CreateMemberVoucher = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.CreateMemberVoucher, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 我的券接口
export const GetMemberVoucherPaged = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.GetMemberVoucherPaged, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 显示我的积分
export const GetJfAccountByUserName = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.GetJfAccountByUserName, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 显示我的积分
export const GetJfAccountByUser = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.GetJfAccountByUser, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 会员修改基本信息接口
export const UpdateMemberFileAsync = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.UpdateMemberFileAsync, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 手机请求验证码接口
export const SendPhoneCode = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.SendPhoneCode, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 通过用户名验证用户状态
export const GetPhoneAndEmailVerify = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.GetPhoneAndEmailVerify, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

export const UpdateMemberPassword = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.UpdateMemberPassword, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 邮箱激活
export const ActivateMember = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.ActivateMember, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

export const UpdateMemberEmail = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.UpdateMemberEmail, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 验证用户输入的验证码是否正确
export const GetUserVerifyLogByCode = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.GetUserVerifyLogByCode, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 更改/验证用户手机号
export const UpdateUserPhone = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.UpdateUserPhone, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 获取订单详情接口
export const GetBookingOrderByUser = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.GetBookingOrderByUser, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 提交评论接口
export const CreateComment = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.CreateComment, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 获取评论详情
export const GetEvaluateDetail = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.GetEvaluateDetail, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 验证手机号和验证码是否正确
export const GetPhoneAndCodeVerify = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.GetPhoneAndCodeVerify, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 验证手机号和验证码是否正确
export const SendEmailUser = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.SendEmailUser, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 解密memberId
export const Decryption = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.Decryption, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 验证用户名，邮箱，手机唯一性接口
export const ValidationRegistration = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.ValidationRegistration, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 是否存在推介用户接口
export const ValidationPromoteMember = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(Member.ValidationPromoteMember, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}