<template>
	<div>
		<el-dialog title="添加菜单" :visible.sync="thistype" @close="fun(tname)">
			<div style="padding:10px;">
				<el-alert v-if="tablerow==''" title="添加的是一级菜单" type="warning" effect="dark"></el-alert>
				<el-alert v-else title="添加的是子级菜单" type="warning" effect="dark"></el-alert>
			</div>
			<div>
				<el-form ref="form" :model="form" label-width="120px">
					<!--菜单名称-->
					<el-form-item label="菜单名称">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<!--部门简称-->
					<el-form-item label="编码">
						<el-input v-model="form.code"></el-input>
					</el-form-item>
					<el-form-item label="组件">
						<el-input v-model="form.component"></el-input>
					</el-form-item>
					<el-form-item label="链接">
						<el-input v-model="form.url"></el-input>
					</el-form-item>
					<el-form-item label="是否是菜单">
						<el-radio-group v-model="form.ismenu">
							<el-radio label="1"> 菜单</el-radio>
							<el-radio label="0">按钮</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="状态">
						<el-radio-group v-model="form.status">
							<el-radio label="1"> 启用</el-radio>
							<el-radio label="0">弃用</el-radio>
						</el-radio-group>
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
	import { http, menu } from '../../api/api.js'
	export default {
		props: ['type', 'fun', 'tname', 'tablerow'],
		data() {
			return {
				thistype: this.type, //模态框状态
				form: { //数据
					name: '',
					code: '',
					component: '',
					url: '',
					ismenu: '1',
					status: '1',
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
					if(this.tablerow == '') {
						this.form.pcode = 0
					} else {
						this.form.pcode = this.tablerow.code
					}
					//排序
					this.form.num = 0
					this.$http.post(http + menu, JSON.stringify(this.form), {
						emulateJSON: true
					}).then((data) => {
						if(data.data.msg == '成功') {
							this.thistype = false
							this.form = { //数据
								name: '',
								code: '',
								component: '',
								url: '',
								ismenu: '1',
								status: '1',
							}
						} else {
							this.$message.error(data.data.msg);
						}
					}, (err) => {
						this.$message.error(err.data.message);
					})
					delete this.form.pcode
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