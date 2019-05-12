import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueStar from 'vue-star'
var VueCookie = require('vue-cookie');

Vue.use(VueCookie);
Vue.component('VueStar', VueStar)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // console.log('Global -- beforeEach - fired')
  document.title = to.meta.title
  // re-route

  if (to.path === '/' && localStorage.isAuthenticated) {
    next('/dash')
  } else {
    next()
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')