<template>
	<div>
		<el-dialog title="添加角色" :visible.sync="thistype" @close="fun(tname)">
			<el-form ref="form" :model="form" label-width="80px" v-if="deptidarr">
				<!--角色名称-->
				<el-form-item label="角色名称">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<!--角色编码-->
				<el-form-item label="角色编码">
					<el-input v-model="form.tips"></el-input>
				</el-form-item>
				<!--部门-->
				<el-form-item label="部门">
					<el-cascader v-model="form.deptid" :options="deptidarr" :show-all-levels="false" :props="props"></el-cascader>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="upuser">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { http, deptlist, role } from '../../api/api.js'
	export default {
		props: ['type', 'fun', 'tname'],
		data() {
			return {
				thistype: this.type, //模态框状态
				form: { //数据
					name: '', //角色名称
					tips: '', //角色编码
					deptid: '', //部门id
				},
				deptidarr: '', //部门信息
				props: { //连级选择配置
					value: 'id',
					label: 'simplename',
					children: 'children'
				}
			}
		},
		mounted() {
			this.getdeptlist()
		},
		methods: {
			upuser() {
				//添加用户
				var type = true
				for(var i in this.form) {
					if(this.form[i] == '') {
						type = false
					}
				}
				if(type) {
					//处理部门id
					this.form.deptid = this.form.deptid[this.form.deptid.length - 1]
					//账号id
					this.form.pid = this.$store.state.user.info.profile.id
					//排序
					this.form.num =  0
					this.$http.post(http + role, JSON.stringify(this.form), {
						emulateJSON: true
					}).then((data) => {
						if(data.data.msg == '成功') {
							this.thistype = false
							for(var i in this.form) {
								this.form[i] = ''
							}
						} else {
							this.$message.error(data.data.msg);
						}
					}, (err) => {
						this.$message.error(err.data.message);
					})
					delete this.form.pid
					delete this.form.num	
				} else {
					this.$message.error('请补全信息');
				}
			},
			chilrennull(data) {
				//处理部门信息
				for(var i = 0; i < data.length; i++) {
					if(data[i].children.length == 0) {
						data[i].children = null
					} else {
						this.chilrennull(data[i].children)
					}
				}
				return data
			},
			getdeptlist() {
				//获取部门信息
				this.$http.get(http + deptlist).then((data) => {
					if(data.data.msg == '成功'){
						this.deptidarr = this.chilrennull(data.data.data)
					}else{
						this.$message.error(data.data.msg);
					}
					
					//					console.log()
				}, (err) => {
					this.$message.error(err.data.message);
				})
			}
		},
		watch: {
			type() {
				this.thistype = this.type
			}
		}
	}
</script>

<style>

</style>