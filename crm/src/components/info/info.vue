<template>
	<div class="info">
		<p>账户信息：{{$store.state.user.info.profile.account}}</p>
		<p>
			修改密码:  
			<span @click="type = true" style="color: deepskyblue;">
				修改密码
			</span>
		</p>
		<p>名字：{{$store.state.user.info.profile.name}}</p>
		<p>生日：{{$store.state.user.info.profile.birthday}}</p>
		<p>性别:{{$store.state.user.info.profile.sex==1?'男':'女'}}</p>
		<p>邮箱：{{$store.state.user.info.profile.email}}</p>
		<p>电话：{{$store.state.user.info.profile.phone}}</p>
		<p>部门:{{$store.state.user.info.profile.dept}}</p>
		<p>
			<el-button type="danger" @click="clearuser">退出登录</el-button>
		</p>
		<setpass :type="type" :btn="btn"></setpass>
	</div>
</template>

<script>
	import setpass from './setpass.vue'
	export default {
		data(){
		   return {
		   		type:false
		   }
		},
		components:{
			setpass
		},
		methods:{
			clearuser(){
				//退出登录
				localStorage.clear()
				location.href = './login.html'
			},
			btn(){
				//关闭对话框的状态
				this.type = false
			}
		}
	}
</script>

<style>
	.info>p{
		line-height: 40px;
	}
</style>