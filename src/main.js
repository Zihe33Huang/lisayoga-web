import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/global.css'
import consts from '@/util/consts'
import Vant from 'vant'
import 'vant/lib/index.css'
import VueMixin from './mixins/VueMixin'
import i18n from './locales/i18n'
require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
// require('echarts/lib/component/legend')
// require('echarts/lib/component/legendScroll')

Vue.config.productionTip = false
Vue.prototype.$consts = consts

Vue.use(Vant)
Vue.mixin(VueMixin)

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
