import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index.vue'
import info from '../components/info/info.vue'
import mgr from '../components/mgr/mgr.vue'
import role from '../components/role/role.vue'
import dept from '../components/dept/dept.vue'
import menu from '../components/menu/menu.vue'
import dict from '../components/dict/dict.vue'

Vue.use(Router)

const routes =[
	 {path:'/',name:'index',component:index},
	 {path:'/info',name:'info',component:info},
	 {path:'/mgr',name:'mgr',component:mgr},
	 {path:'/role',name:'role',component:role},
	 {path:'/dept',name:'dept',component:dept},
	 {path:'/menu',name:'menu',component:menu},
	 {path:'/dict',name:'dict',component:dict}
]

export default new Router({
	routes
})


