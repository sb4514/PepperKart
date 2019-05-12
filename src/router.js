import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import List from './views/List.vue'
import Addresses from './views/Addresses.vue'
import Success from './views/Success.vue'
import Orders from './views/Orders.vue'
import Profile from './views/Profile.vue'
import OrderDetails from './views/OrderDetails.vue'
import manageAddress from './views/manageAddress.vue'
import editAddress from './views/editAddress.vue'
import Wallet from './views/Wallet.vue'
import About from './views/About.vue'
import Feedback from './views/Feedback.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/dash',
      name: 'home',
      component: Home,
      meta: {
        title: 'DashBoard - PepperKart'
      }
    },
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        title: 'Pepperkart'
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: {
        title: 'Pepperkart'
      }
    },
    {
      path: '/list/:id',
      name: 'List',
      component: List
    },
    {
      path: '/addresses/:list_id',
      props: true,
      name: 'Manage Addresses',
      component: Addresses
    },
    {
      path: '/success',
      name: 'Cart',
      component: Success
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders
    },
    {
      path: '/orders/:id',
      name: 'Order Details',
      component: OrderDetails
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/manageAddress',
      name: 'Manage Address',
      component: manageAddress
    },
    {
      path: '/editAddress/:id',
      name: 'Edit Address',
      component: editAddress
    },
    {
      path: '/wallet',
      name: 'Wallet',
      component: Wallet
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/feedback',
      name: 'FeedBack',
      component: Feedback
    },
  ]
})