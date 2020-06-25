<template>
	<div>
		<el-row id="" style="padding: 10px 0;">
			<el-col :span="18">
				<el-input v-model="names"></el-input>
			</el-col>
			<el-col :span="6" style="padding-left: 15px;">
				<el-button type="primary" @click="getuserlist(1)">搜索</el-button>
				<el-button type="primary" @click="clears">重置</el-button>
			</el-col>
		</el-row>
		
		<el-button type="primary" v-for="i in $store.state.user.menulist[this.$route.path]" :key="i.id" v-if="i.statusName=='启用'" @click="btn(i.code)">{{i.name}}</el-button>
		<!--{{$store.state.user.menulist[this.$route.path]}}-->
		
		<div v-if="tableData">
			<el-table ref="singleTable" :data="tableData" style="width: 100%" height="300" @cell-click="celltable" :highlight-current-row="true">
				<el-table-column label="角色名称" prop="name">
				</el-table-column>
				<el-table-column label="部门名称" prop="deptName">
				</el-table-column>
				<el-table-column label="id名" prop="id">
				</el-table-column>
			</el-table>
		</div>
		<!--功能组件-->
		<add :type="buttontype.roleAdd" :fun="showbtn" tname="roleAdd"></add>
		<edit :type="buttontype.roleEdit" :fun="showbtn" tname="roleEdit" :tablerow="tablerow"></edit>
		<deletec :type="buttontype.roleDelete" :fun="showbtn" tname="roleDelete" :tablerow="tablerow"></deletec>
		<setauthority  :type="buttontype.roleSetAuthority" :fun="showbtn" tname="roleSetAuthority" :tablerow="tablerow"></setauthority>
	</div>
</template>

<script>
	import { http, getrolelist } from '../../api/api.js'
	import add from './add.vue'
	import edit from './edit.vue'
	import deletec from './delete.vue'
	import setauthority from './setauthority.vue'
	export default {
		data() {
			return {
				tableData: '', //用户列表数据
				names:'',//搜索的名字
				buttontype:{ //功能对话框状态
					roleAdd:false, //添加角色
					roleEdit:false, //修改角色
					roleDelete:false, //删除用户
					roleSetAuthority:false,//分配权限
				},
				tablerow:'' ,//当前选中的用户
			}
		},
		mounted(){
			this.getuserlist(1)
		},
		components:{
			add,
			edit,
			deletec,
			setauthority
		},
		methods: {
			//点击选中的用户
			celltable(row){
				this.tablerow = row
			},
			//对话框关闭回调
			showbtn(type){
				this.buttontype[type] = false
				this.getuserlist()
				this.tablerow = ''
			},
			//统一管理按钮点击事件
			btn(a){
				console.log(a)
				if(a=='roleAdd'){
					this.buttontype[a] = true
				}else{
					 if(this.tablerow == ''){
					 	this.$message.error('请选择要操作的角色');
					 }else{
					 		this.buttontype[a] = true
					 }
				}
			},
			//重置
			clears(){
				this.names = ''
				this.getuserlist(1)
			},
			//获取用户列表
			getuserlist() {
				this.$http.get(http + getrolelist, {
					params: {
						name:this.names
					}
				}).then((data) => {
					if(data.data.msg == '成功'){
						this.tableData = data.data.data
					}else{
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