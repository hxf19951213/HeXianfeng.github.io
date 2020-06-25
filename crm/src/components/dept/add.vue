<template>
	<div>
		<el-dialog title="添加部门" :visible.sync="thistype" @close="fun(tname)">
			<div style="padding:10px;">
				<el-alert v-if="tablerow==''" title="当前创建的是公司级别部门，如果要创建部门级别请选择要创建的父级部门" type="warning" effect="dark"></el-alert>
				<el-alert v-else :title="'当前创建的是 '+tablerow.fullname+' 下的部门，如果要创建公司级别请取消选择'" type="warning" effect="dark"></el-alert>
			</div>
			<div>
				<el-form ref="form" :model="form" label-width="80px">
				<!--部门全称-->
				<el-form-item label="部门全称">
					<el-input v-model="form.fullname"></el-input>
				</el-form-item>
				<!--部门简称-->
				<el-form-item label="部门简称">
					<el-input v-model="form.simplename"></el-input>
				</el-form-item>
			</el-form>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="upuser">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { http, dept } from '../../api/api.js'
	export default {
		props: ['type', 'fun', 'tname','tablerow'],
		data() {
			return {
				thistype: this.type, //模态框状态
				form: { //数据
					fullname: '', //部门全称
					simplename: '', //部门简称
				}
			}
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
					//父级id
					if(this.tablerow == ''){
						this.form.pid = 0
					}else{
						this.form.pid = this.tablerow.id
					}
					//排序
					this.form.num =  0
					this.$http.post(http + dept, JSON.stringify(this.form), {
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