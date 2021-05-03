import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import './utils/day.js'
import VueSocketIO from 'vue-socket.io'
import VueQriously from 'vue-qriously'

Vue.use(VueQriously)
Vue.use(Vant)

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:9099',
  // vuex: {
  //     store,
  //     actionPrefix: 'SOCKET_',
  //     mutationPrefix: 'SOCKET_'
  // },
  // options: { path: "/my-app/" } //Optional options
  options: {
    autoConnect: false
  },
}))
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
