<template>
	<div>
		<el-dialog title="分配角色" :visible.sync="thistype" @close="fun(tname)">
			<el-form ref="form" :model="form" label-width="80px" v-if="typerole">
				<!--账户-->
				<el-form-item label="选择角色">
					<el-select v-model="form.roleIds" placeholder="请选择">
						<el-option v-for="item in typerole.treeData" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
<!--					<el-input v-model="form.account"></el-input>-->
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="upuser">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { http, getrole, setrole} from '../../api/api.js'
	export default {
		props: ['type', 'fun', 'tname', 'tablerow'],
		data() {
			return {
				thistype: this.type, //模态框状态
				form: { //数据
					roleIds:this.tablerow.roleid
				},
				typerole: '', //部门信息
			}
		},
		mounted() {
			this.getdeptlist()
		},
		methods: {
			upuser() {
				//设置角色
				var type = true
				for(var i in this.formtype) {
					if(this.form[i] == '') {
						type = false
					}
				}
				if(type) {
					this.form.userId = this.tablerow.id
					this.$http.get(http + setrole,{
						params:this.form
					}).then((data) => {
						console.log(data.data)
						if(data.data.msg == '成功') {
							this.thistype = false
						}else{
							this.$message.error(data.data.msg);
						}
					}, (err) => {
						this.$message.error(err.data.message);
						//						location.href = './login.html'
					})
					delete this.form.userId
				} else {
					this.$message.error('请补全信息');
				}
			},
			getdeptlist() {
				//获取部门信息
				this.$http.get(http + getrole, {
					params: {
						idUser: this.$store.state.user.info.profile.id
					}
				}).then((data) => {
					if(data.data.msg == '成功') {
						this.typerole = data.data.data
					} else {
						this.$message.error(data.data.msg);
					}
				}, (err) => {
					this.$message.error(err.data.message);
					//					location.href = './login.html'
				})
			}
		},
		watch: {
			type() {
				this.thistype = this.type
			},
			tablerow(){
				this.form.roleIds = this.tablerow.roleid
			}
		}
	}
</script>

<style>

</style>