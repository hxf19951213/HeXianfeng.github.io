//服务器地址
const http = 'http://39.101.217.150:8086'
//登录地址
const login = '/account/login'
//获取菜单信息
const listForRouter =  '/menu/listForRouter'
//获取账号信息
const info =  '/account/info'
//修改密码
const updatePwd = '/account/updatePwd'
//获取文章分类
const channellist = '/channel/list'
//获取文章数量
const articlebychannel ='/article/articlebychannel'
//获取功能操作信息
const menulist = '/menu/list'
//获取用户列表
const userlist = '/user/list'
//获取部门数据
const deptlist = '/dept/list'
//添加用户信息
const user = '/user'
//获取角色
const getrole ='/role/roleTreeListByIdUser'
//设置角色
const setrole = '/user/setRole'
//获取角色列表（可搜索）
const getrolelist = '/role/list'
//添加角色
const role = '/role'
//获取当前角色权限状态树
const  setauthority = '/menu/menuTreeListByRoleId'
//设置角色权限
const setsavePermisson = '/role/savePermisson'
//添加、修改、删除 部门
const dept ='/dept'
//添加&修改菜单
const menu = '/menu'
//获取字典列表
const dictlist = '/dict/list'
//添加字典
const dict = '/dict'
export {
	http,
	login,
	listForRouter,
	info,
	updatePwd,
	channellist,
	articlebychannel,
	menulist,
	userlist,
	deptlist,
	user,
	getrole,
	setrole,
	getrolelist,
	role,
	setauthority,
	setsavePermisson,
	dept,
	menu,
	dictlist,
	dict
}






