import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './plugins/element.js'

import './assets/css/font.css'
import './assets/css/global.css'
import store from './store.js'
// markdown编辑器
// import VueQuillEditor from 'vue-quill-editor'
 
// require styles
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'



import axios from 'axios'

axios.defaults.baseURL = "http://127.0.0.1:3000/"
axios.defaults.withCredentials = true

Vue.prototype.$http = axios



Vue.config.productionTip = false


// Vue.use(VueQuillEditor)

// 全局的过滤器, originVal传过来的时间
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


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
