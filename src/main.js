// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Title from 'vue-wechat-title'
import store from './store'

import 'minireset.css'
import './common/less/index.less'
import 'swiper/dist/css/swiper.css'
import '../static/theme/index.css'

window.Promise = Promise

Vue.use(Title)
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
