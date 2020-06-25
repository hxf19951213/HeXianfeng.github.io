<template>
	<div id="">
		<div style="width: 500px;margin: 150px auto;">
			<el-form ref="form" :model="login" label-width="80px">
				<el-form-item label="账号">
					<el-input v-model="login.user"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="login.pass"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {http,login} from './api/api.js'
	export default {
		data() {
			return {
				login: {
					user: '',
					pass: ''
				}
			}
		},
		methods: {
			//登录事件
			onSubmit() {
				//最简单的一个验证
				if(this.login.user ==''){
					this.$message.error('请输入账号');
				}else if(this.login.pass ==''){
					this.$message.error('请输入密码');
				}else{
					//登录的ajax
					this.$http.post(http+login,{
						username:this.login.user,
						password:this.login.pass
					},{emulateJSON:true}).then((data)=>{
						console.log(data)
						if(data.data.msg == '用户名或密码错误'){
							this.$message.error('用户名或密码错误');
						}else if(data.data.msg == '成功'){
							localStorage.token = data.data.data.token
							location.href = '/'
						}
					},(err)=>{
						this.$message.error('登录失败');
					})
				}
			}
		}
	}
</script>

<style>
 	*{
 		margin: 0;
 		padding: 0;
 	}
</style>