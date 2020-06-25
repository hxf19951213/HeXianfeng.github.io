import Vue from 'vue'
import resource from 'vue-resource'
import echarts from 'echarts'
import store from './store/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/router.js'
import App from './App.vue'

//把echarts 添加到vue实例中
Vue.prototype.$echarts = echarts

Vue.use(resource)
Vue.use(ElementUI);

//判断有没有登录

//拦截器
Vue.http.interceptors.push((request, next) => {
	//设置token请求头
	if(localStorage.token) {
		//设置token请求头
		Vue.http.headers.common['Authorization'] = localStorage.token
	} else {
		location.href = './login.html'
	}
	next((response)=>{
		if(response.status == 401){
			location.href = './login.html'
		}
		return response
	})
})

new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App)
})