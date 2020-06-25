<template>
	<div>
		<el-dialog title="修改密码" :visible.sync="dialogFormVisible" @close="cleartext">
			<el-form ref="form" :model="pass" label-width="120px">
				<el-form-item label="旧密码">
					<el-input v-model="pass.oldPassword"></el-input>
				</el-form-item>
				<el-form-item label="新密码">
					<el-input v-model="pass.password"></el-input>
				</el-form-item>
				<el-form-item label="重复新密码">
					<el-input v-model="pass.rePassword"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="setpass">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { http, updatePwd } from '../../api/api.js'
	export default {
		props: ['type', 'btn'],
		data() {
			return {
				dialogFormVisible: this.type, //对话框状态
				pass: {
					oldPassword: '',
					password: '',
					rePassword: ''
				}
			}
		},
		methods: {
			cleartext() {
				//清空数据
				for(var i in this.pass) {
					this.pass[i] = ''
				}
				//调取的父级函数
				this.btn()
			},
			setpass() {
				//修改密码
				if(this.pass.oldPassword == '') {
					this.$message.error('请输入旧密码');
				} else if(this.pass.password == '') {
					this.$message.error('请输入新密码');
				} else if(this.pass.rePassword == '') {
					this.$message.error('请再次输入新密码');
				} else if(this.pass.password != this.pass.rePassword) {
					this.$message.error('两次新密码不一致');
				} else {
					this.$http.post(http + updatePwd, this.pass, {
						emulateJSON: true
					}).then((data) => {
						if(data.data.msg == '成功') {
							this.$message({
								message: '恭喜你，修改成功了',
								type: 'success'
							});
							this.dialogFormVisible = false
						} else {
							this.$message.error(data.data.msg);
						}
						console.log(data)
					}, (err) => {
						this.$message.error(err.data.message);
					})
				}
			}
		},
		watch: {
			type(a, b) {
				//当父级传入的值发生改变，修改对话框的状态
				this.dialogFormVisible = this.type
			}
		}
	}
</script>

<style>

</style>