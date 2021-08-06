import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home.vue'
import Funguy from '../components/funguy/Funguy.vue'
import Study from '../components/study/Study.vue'
import Echarts from '../components/echarts/Echarts.vue'
import User from '../components/user/User.vue'
import Grzl from '../components/funguy/Grzl.vue'
import Tpq from '../components/funguy/Tpq.vue'
import Spq from '../components/funguy/Spq.vue'
import Ugrzl from '../components/user/Ugrzl'
import Caozuo from '../components/user/Caozuo.vue'
import Login from '../components/Login.vue'


Vue.use(VueRouter)


const routes = [
    { path: '/login', component: Login },
    { path: '/', redirect: '/home' },

    { 
      path: '/home',
      component: Home,
      redirect: 'funguy',
      children: [
        {
          path: '/funguy',
          component: Funguy,
          redirect: '/funguy/grzl',
          children: [
            { path: '/funguy/grzl', component: Grzl},
            { path: '/funguy/tpq', component: Tpq},
            { path: '/funguy/spq', component: Spq}
          ]
        },
        { path: '/study', component: Study },
        { path: '/echarts', component: Echarts },
        {
          path: '/user',
          component: User,
          redirect: '/user/grzl',
          children: [
            { path: '/user/grzl', component: Ugrzl },
            { path: '/user/Caozuo', component: Caozuo }
          ]
        }
      ]
    }
]

const router = new VueRouter({
  routes
})

export default router

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
