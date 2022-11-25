import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './plugins/element.js'

import './assets/css/font.css'
// import './assets/fonts/demo.css'
import './assets/css/global.css'
import store from './store.js'

import axios from 'axios'

// 图片懒加载插件
import VueLazyload from 'vue-lazyload'
import loading from './static/img/loading.png'

axios.defaults.baseURL = "http://127.0.0.1:3000/"
// axios.defaults.baseURL = "http://82.157.53.221:3000/"
// axios.defaults.baseURL = "http://192.168.174.128:8890/"
// axios.defaults.withCredentials = true

if(window.sessionStorage.getItem('username') && window.sessionStorage.getItem('pwd')){
	axios.interceptors.request.use(config => {
		// console.log(config)
			config.headers.Authorization = window.sessionStorage.getItem('username') + window.sessionStorage.getItem('pwd')
		
		// 在最后必须要return,为每次api请求挂载token
		// console.log(config)
		return config
	})
}

Vue.prototype.$http = axios

// 移动端的
// import FastClick from 'fastclick'; // 引入插件
// FastClick.attach(document.body); // 使用 fastclick


Vue.config.productionTip = false



Vue.filter('dateFormat', function(originVal) {
	const dt = new Date(originVal)

	const y = dt.getFullYear()
	// 因为得到的月份从零开始, padStart: 总共两位，不足两位的用0填充
	const m = (dt.getMonth() + 1 + '').padStart(2, '0')
	const d = (dt.getDate() + '').padStart(2, '0')
	const hh = (dt.getHours() + '').padStart(2, '0')
	const mm = (dt.getMinutes() + '').padStart(2, '0')
	const ss = (dt.getSeconds() + '').padStart(2, '0')
	return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})


Vue.filter('kong', function(originVal) {
	if(originVal === ''){
		return '未分类'
	}else{
		return originVal
	}
})

Vue.use(VueLazyload, {
	loading
})



new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
