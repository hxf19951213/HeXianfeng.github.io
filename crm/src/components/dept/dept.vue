<template>
	<div>
		<div style="padding: 20px 0 ;">
			<el-button type="primary" v-for="i in $store.state.user.menulist[this.$route.path]" :key="i.id" v-if="i.statusName=='启用'" @click="btn(i.code)">{{i.name}}</el-button>
		</div>
		
		<!--{{$store.state.user.menulist[this.$route.path]}}-->

		<div v-if="tableData">
			<!--<el-table ref="singleTable" :data="tableData" style="width: 100%" height="300" @cell-click="celltable" >-->
			<el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border :tree-props="{children: 'children'}" :highlight-current-row="true" @cell-click="celltable">
				<el-table-column prop="fullname" label="部门全称" sortable >
				</el-table-column>
				<el-table-column prop="simplename" label="部门简称" sortable>
				</el-table-column>
				<el-table-column prop="id" label="当前部门id">
				</el-table-column>
			</el-table>
		</div>
		<!--功能组件-->
		<add :type="buttontype.deptAdd" :fun="showbtn" tname="deptAdd" :tablerow="tablerow"></add>
		<edit :type="buttontype.deptEdit" :fun="showbtn" tname="deptEdit" :tablerow="tablerow"></edit>
		<delete_c :type="buttontype.deptDelete" :fun="showbtn" tname="deptDelete" :tablerow="tablerow"></delete_c>
	</div>
</template>

<script>
	import { http, deptlist } from '../../api/api.js'
		import add from './add.vue'
		import edit from './edit.vue'
		import delete_c from './delete.vue'
	//	import setrole from './setrole.vue'
	export default {
		data() {
			return {
				tableData: '', //用户列表数据
				buttontype: { //功能对话框状态
					deptAdd: false, //添加部门
					deptEdit: false, //修改部门
					deptDelete: false, //删除部门
				},
				tablerow: '', //当前选中的部门
			}
		},
		mounted() {
			this.getuserlist(1)
		},
		components: {
						add,
						edit,
						delete_c,
			//			setrole
		},
		methods: {
			//点击选中的用户
			celltable(row) {
				this.tablerow = row
			},
			//对话框关闭回调
			showbtn(type) {
				this.buttontype[type] = false
				this.getuserlist()
				this.tablerow = ''
			},
			//统一管理按钮点击事件
			btn(a) {
				console.log(a)
				if(a == 'deptAdd') {
					this.buttontype[a] = true
				} else {
					if(this.tablerow == '') {
						this.$message.error('请选择要操作的用户');
					} else {
						this.buttontype[a] = true
					}
				}
			},
			//获取部门列表
			getuserlist() {
				this.$http.get(http + deptlist).then((data) => {
					if(data.data.msg == '成功') {
						this.tableData = data.data.data
						console.log(this.tableData)
						this.total = data.data.data.total
					} else {
						this.$message.error(data.data.message);
					}
				}, (err) => {
					this.$message.error(err.data.message);
				})
			}
		}
	}
</script>

<style>
	.demo-table-expand {
		font-size: 0;
	}
	
	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}
	
	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}
</style>