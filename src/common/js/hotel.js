// import _ from 'lodash'

export const formatHotelArray = (array) => {
  let IDArr = []
  let resObj = {}
  let resArr = []
  array.forEach((item) => {
    IDArr.push(item.roomId)
  })
  IDArr = Array.from(new Set(IDArr))

  IDArr.forEach((item) => {
    resObj[item] = []
  })
  // 生成结果数组
  array.forEach(item => {
    IDArr.forEach(IDItem => {
      if (item.roomId === IDItem) resObj[IDItem].push(item)
    })
  })
  for (let key in resObj) {
    resArr.push(resObj[key])
  }
  return resArr
}
