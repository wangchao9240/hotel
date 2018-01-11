import axios from 'axios'
import { navBar } from './config'

export const getNavBar = () => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(navBar.getNav)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

export const getFooterMenu = () => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(navBar.getFooterNav)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

export const contactUs = () => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(navBar.contactUs, {id: 1})
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 获取文章详情接口
export const GetArticlePaged = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(navBar.GetArticlePaged, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

// 获取文章图片接口
export const GetArticleImages = (params) => {
  return new Promise(async(resolve, reject) => {
    try {
      const res = await axios.post(navBar.GetArticleImages, params)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}
