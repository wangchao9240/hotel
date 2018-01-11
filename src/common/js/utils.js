import _ from 'lodash'

export const regObj = {
  phone: /^1[34578]\d{9}$/,
  email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
  http: /^(http:\/\/|https:\/\/).*$/
}

export const createCode = (codeLength) => {
  let code = ''
  var codeChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  for (var i = 0; i < codeLength; i++) {
    var charNum = Math.floor(Math.random() * 52)
    code += codeChars[charNum]
  }
  return code
}

export const validateCode = (iptCode, code) => {
  if (!iptCode || iptCode.toLowerCase() !== code.toLowerCase()) return false
  else return true
}

export const judgeLoginType = (username) => {
  // if (username.match(regObj.phone)) {
  //   return 'mobilePhone'
  // } else if (username.match(regObj.email)) {
  //   return 'email'
  // } else {
  //   return 'userName'
  // }
  if (username.match(regObj.email)) {
    return 'email'
  } else {
    return 'userName'
  }
}

export const formatDetailPage = orderDetail => {

}

export const formatMallHome = mallHomeArr => {
  if (judgeHomeArr(mallHomeArr)) {
    let cateArr = []
    mallHomeArr.forEach(item => {
      cateArr.push({
        categoryName: item.categoryName,
        categoryId: item.categoryId,
        categoryInfo: []
      })
    })
    cateArr = _.uniqBy(cateArr, 'categoryId')
    mallHomeArr.forEach(parentItem => {
      cateArr.forEach(item => {
        if (parentItem.categoryId === item.categoryId) item.categoryInfo.push(parentItem)
      })
    })
    return cateArr
  } else {
    return mallHomeArr
  }
}

const judgeHomeArr = infoArr => { // 有category的ID是否相同判断是否是首页数组
  let categoryId
  let ifHomeArr = false
  infoArr.forEach(item => {
    if (!categoryId) {
      categoryId = item.categoryId
      return
    }
    if (item.categoryId !== categoryId) ifHomeArr = true
  })
  return ifHomeArr
}
