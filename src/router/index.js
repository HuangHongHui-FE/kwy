import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/pc/Home.vue'
import Funguy from '../components/pc/funguy/Funguy.vue'
import Study from '../components/pc/study/Study.vue'
import Share from '../components/pc/share/Share.vue'
import User from '../components/pc/user/User.vue'
import Grzl from '../components/pc/funguy/Grzl.vue'
import Tpq from '../components/pc/funguy/Tpq.vue'
import Spq from '../components/pc/funguy/Spq.vue'
import Ugrzl from '../components/pc/user/Ugrzl'
import WriteBlog from '../components/pc/user/WriteBlog.vue'
import SeeSelfBlog from '../components/pc/user/SeeSelfBlog.vue'
import UploadPhoto from '../components/pc/user/UploadPhoto.vue'


import Login from '../components/pc/Login.vue'
// 图片展示
import Show from '../components/pc/Show.vue'
// 博客详情页
import BlogContent from '../components/pc/BlogContent.vue'
// share
import Leonard from '../components/pc/share/Leonard.vue'
import Blogs from '../components/pc/share/Blogs.vue'
// Leonard用户上传图册查看
import LeonardShow from '../components/pc/share/LeonardShow.vue'



// 移动端主页
import MIndex from '../components/mobile/MIndex.vue'

import MVideo from '../components/mobile/MVideo'
// import MImage from '../components/mobile/MImage'
import MBlogs from '../components/mobile/MBlogs'
import MUsers from '../components/mobile/MUsers'




Vue.use(VueRouter)


const routesP = [
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
        { 
          path: '/share', 
          component: Share,
          redirect: '/share/blogs',
          children: [
            { path: '/share/blogs', component: Blogs, name: '/share/blogs' },
            { path: '/share/leonard', component: Leonard, name: '/share/Leonard' }
          ] 
        },
        {
          path: '/user',
          component: User,
          redirect: '/user/grzl',
          children: [
            { path: '/user/grzl', component: Ugrzl },
            { path: '/user/writeBlog', component: WriteBlog, name: '/user/writeBlog' },
            { path: '/user/seeSelfBlog', component: SeeSelfBlog },
            { path: '/user/uploadPhoto', component: UploadPhoto }
            
          ]
        }
      ]
    },
    // 分类图片查看
    { path: '/show', name: '/show' ,component: Show },
    // 博客详情页面
    { path: '/blogContent', name: '/blogContent', component: BlogContent },
    // Leonard用户上传图册查看
    { path: '/leonardShow', name: '/leonardShow', component: LeonardShow }
]

const routesM = [
  // 移动端
  { path: '/', redirect: '/mIndex' },
  { 
    path: '/mIndex', 
    name: 'mIndex', 
    component: MIndex,
    redirect: 'mIndex/video',
    children: [
      {
        path: '/mIndex/video',
        component: MVideo,
        name: 'video'
      },
      {
        path: '/mIndex/blogs',
        component: MBlogs,
        name: 'blogs'
      },
      {
        path: '/mIndex/users',
        component: MUsers,
        name: 'users'
      }
    ]

  }
]

var routes = routesP
if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)){
  routes = routesM
}





const router = new VueRouter({
  // 去除地址栏的 #
  mode: "history",
  routes
})

export default router

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const originalreplace = VueRouter.prototype.replace
   VueRouter.prototype.replace = function replace(location) {
   return originalreplace.call(this, location).catch(err => err)
}