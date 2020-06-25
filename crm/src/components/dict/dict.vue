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
			<el-table ref="singleTable" :data="tableData" style="width: 100%" height="300" @cell-click="celltable" :highlight-current-row="true" border>
				<el-table-column label="名称" prop="name">
				</el-table-column>
				<el-table-column label="详情" prop="detail">
				</el-table-column>
				<el-table-column label="字典id" prop="id">
				</el-table-column>
			</el-table>
		</div>
		<!--功能组件-->
		<add :type="buttontype.dictAdd" :fun="showbtn" tname="dictAdd"></add>
		<edit :type="buttontype.dictEdit" :fun="showbtn" tname="dictEdit" :tablerow="tablerow"></edit>
		<deletec :type="buttontype.dictDelete" :fun="showbtn" tname="dictDelete" :tablerow="tablerow"></deletec>
		
	</div>
</template>

<script>
	import { http, dictlist } from '../../api/api.js'
	import add from './add.vue'
	import edit from './edit.vue'
	import deletec from './delete.vue'
	export default {
		data() {
			return {
				tableData: '', //用户列表数据
				names:'',//搜索的名字
				buttontype:{ //功能对话框状态
					dictAdd:false, //添加字典
					dictEdit:false, //修改字典
					dictDelete:false, //删除字典
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
			deletec
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
				if(a=='dictAdd'){
					this.buttontype[a] = true
				}else{
					 if(this.tablerow == ''){
					 	this.$message.error('请选择要操作的字典');
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
			//获取字典列表
			getuserlist() {
				this.$http.get(http + dictlist, {
					params: {
						name:this.names
					}
				}).then((data) => {
					if(data.data.msg == '成功'){
						this.tableData = data.data.data
						console.log(this.tableData)
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