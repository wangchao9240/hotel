import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = (resolve) => {
  import('@/pages/Index').then(module => {
    resolve(module)
  })
}

const Search = (resolve) => {
  import('@/pages/Search').then(module => {
    resolve(module)
  })
}

const ConfirmOrder = (resolve) => {
  import('@/pages/ConfirmOrder').then(module => {
    resolve(module)
  })
}

const Signin = (resolve) => {
  import('@/pages/Signin').then(module => {
    resolve(module)
  })
}

const PersonalCenter = (resolve) => {
  import('@/pages/PersonalCenter').then(module => {
    resolve(module)
  })
}

const MyInfo = (resolve) => {
  import('@/components/MyInfo/MyInfo').then(module => {
    resolve(module)
  })
}

const MyOrder = (resolve) => {
  import('@/components/MyOrder/MyOrder').then(module => {
    resolve(module)
  })
}

const Comment = (resolve) => {
  import('@/pages/Comment').then(module => {
    resolve(module)
  })
}

const MyCard = (resolve) => {
  import('@/components/MyCard/MyCard').then(module => {
    resolve(module)
  })
}

const ChangePassword = (resolve) => {
  import('@/components/ChangePassword/ChangePassword').then(module => {
    resolve(module)
  })
}

const ForgetPassword = (resolve) => {
  import('@/pages/ForgetPassword').then(module => {
    resolve(module)
  })
}

const CardCenter = (resolve) => {
  import('@/pages/CardCenter').then(module => {
    resolve(module)
  })
}

const ChangePhone = (resolve) => {
  import('@/components/ChangePhone/ChangePhone').then(module => {
    resolve(module)
  })
}

const ChangeEmail = (resolve) => {
  import('@/components/ChangeEmail/ChangeEmail').then(module => {
    resolve(module)
  })
}

const ChangePasswordPage = (resolve) => {
  import('@/pages/ChangePassword').then(module => {
    resolve(module)
  })
}

const AccountRecord = (resolve) => {
  import('@/components/AccountRecord/AccountRecord').then(module => {
    resolve(module)
  })
}

const Article = (resolve) => {
  import('@/pages/Article').then(module => {
    resolve(module)
  })
}

const OrderDetail = (resolve) => {
  import('@/pages/OrderDetail').then(module => {
    resolve(module)
  })
}

const OrderSearch = (resolve) => {
  import('@/pages/OrderSearch').then(module => {
    resolve(module)
  })
}

const NewsList = (resolve) => {
  import('@/pages/NewsList').then(module => {
    resolve(module)
  })
}

const Mall = (resolve) => {
  import('@/pages/Mall').then(module => {
    resolve(module)
  })
}

const MallHome = (resolve) => {
  import('@/components/MallHome/MallHome').then(module => {
    resolve(module)
  })
}

const MallItemDetail = (resolve) => {
  import('@/components/MallItemDetail/MallItemDetail').then(module => {
    resolve(module)
  })
}

const ShopCartDetail = (resolve) => {
  import('@/components/ShopCartDetail/ShopCartDetail').then(module => {
    resolve(module)
  })
}

const MallOrder = (resolve) => {
  import('@/components/MallOrder/MallOrder').then(module => {
    resolve(module)
  })
}

const MallOrderSearch = (resolve) => {
  import('@/components/MallOrderSearch/MallOrderSearch').then(module => {
    resolve(module)
  })
}

const PCHome = (resolve) => {
  import('@/pages/PCHome').then(module => {
    resolve(module)
  })
}

const ContactUs = (resolve) => {
  import('@/pages/ContactUs').then(module => {
    resolve(module)
  })
}

const Electric = (resolve) => {
  import('@/pages/Electric').then(module => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/pc/index'
    },
    {
      path: '/pc',
      component: PCHome,
      meta: {
        title: '首页'
      },
      children: [
        {
          path: 'index',
          component: Index,
          meta: {
            title: '首页'
          }
        },
        {
          path: 'search',
          component: Search,
          meta: {
            title: '搜索结果'
          }
        },
        {
          path: 'confirmorder',
          component: ConfirmOrder,
          name: 'confrimorder',
          meta: {
            title: '确认订单'
          }
        },
        {
          path: 'signin',
          component: Signin,
          meta: {
            title: '会员注册'
          }
        },
        {
          path: 'personalcenter',
          component: PersonalCenter,
          meta: {
            title: '个人中心'
          },
          children: [
            {
              path: 'myinfo',
              component: MyInfo
            },
            {
              path: 'myorder',
              component: MyOrder
            },
            {
              path: 'mycard',
              component: MyCard
            },
            {
              path: 'changephone',
              component: ChangePhone
            },
            {
              path: 'changeemail',
              component: ChangeEmail
            },
            {
              path: 'changepassword',
              component: ChangePassword
            },
            {
              path: 'accountrecord',
              component: AccountRecord
            },
            {
              path: '/cardcenter',
              component: CardCenter,
              meta: {
                title: '领券中心'
              }
            },
            {
              path: 'mallorder',
              component: MallOrder
            }
          ]
        },
        {
          path: 'comment/:id',
          name: 'comment',
          component: Comment,
          meta: {
            title: '评论'
          }
        },
        {
          path: 'forgetpassword',
          component: ForgetPassword,
          meta: {
            title: '忘记密码'
          }
        },
        {
          path: 'changepassword',
          component: ChangePasswordPage,
          name: 'changepassword',
          meta: {
            title: '更改密码'
          }
        },
        {
          path: 'article/:id',
          component: Article,
          meta: {
            title: '文章'
          }
        },
        {
          path: 'orderDetail/:order',
          name: 'orderdetail',
          component: OrderDetail,
          meta: {
            title: '订单详情'
          }
        },
        {
          path: 'ordersearch',
          component: OrderSearch,
          meta: {
            title: '订单查询'
          }
        },
        {
          path: 'newsList/:id',
          component: NewsList,
          meta: {
            title: '新闻列表'
          }
        },
        {
          path: 'contactus',
          component: ContactUs,
          meta: {
            title: '联系我们'
          }
        },
        {
          path: 'electric',
          component: Electric,
          meta: {
            title: '山东大厦《电子版》'
          }
        }
      ]
    },
    {
      path: '/mall',
      component: Mall,
      meta: {
        title: '在线商城'
      },
      children: [
        {
          path: 'home',
          component: MallHome
        },
        {
          path: 'detail/:id',
          name: 'mallDetail',
          component: MallItemDetail
        },
        {
          path: 'shopcartdetail',
          component: ShopCartDetail
        },
        {
          path: 'search',
          component: MallOrderSearch
        }
      ]
    }
  ]
})
