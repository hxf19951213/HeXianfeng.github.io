export default {
	state:{
		info:'',
		menulist:''
	},
	mutations:{
		//修改当前账号信息
		setinfo(state,data){
			state.info = data
		},
		//设置功能权限
		setmenulist(state,data){
			state.menulist = data
		}
	}
}
