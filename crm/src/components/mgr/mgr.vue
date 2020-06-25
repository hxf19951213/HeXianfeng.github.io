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
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" inline class="demo-table-expand">
							<el-form-item label="昵称">
								<span>{{ props.row.name}}</span>
							</el-form-item>
							<el-form-item label="账号">
								<span>{{ props.row.account }}</span>
							</el-form-item>
							<el-form-item label="状态">
								<span>{{ props.row.statusName }}</span>
							</el-form-item>
							<el-form-item label="部门">
								<span>{{ props.row.deptName }}</span>
							</el-form-item>
							<el-form-item label="生日">
								<span>{{ props.row.birthday}}</span>
							</el-form-item>
							<el-form-item label="创建时间">
								<span>{{ props.row.createTime }}</span>
							</el-form-item>
							<el-form-item label="性别">
								<span>{{ props.row.sexName }}</span>
							</el-form-item>
							<el-form-item label="手机号">
								<span>{{ props.row.phone }}</span>
							</el-form-item>
							<el-form-item label="邮箱号">
								<span>{{ props.row.email }}</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column label="昵称" prop="name">
				</el-table-column>
				<el-table-column label="账号" prop="account">
				</el-table-column>
				<el-table-column label="状态" prop="statusName">
				</el-table-column>
			</el-table>
		</div>
		<div v-if="total">
			<el-pagination background layout="prev, pager, next" :page-size="5" :total="total" @current-change="pagetype">
			</el-pagination>
		</div>
		<!--功能组件-->
		<mgradd :type="buttontype.mgrAdd" :fun="showbtn" tname="mgrAdd"></mgradd>
		<mgredit :type="buttontype.mgrEdit" :fun="showbtn" tname="mgrEdit" :tablerow="tablerow"></mgredit>
		<mgrdelete :type="buttontype.mgrDelete" :fun="showbtn" tname="mgrDelete" :tablerow="tablerow"></mgrdelete>
		<setrole  :type="buttontype.mgrSetRole" :fun="showbtn" tname="mgrSetRole" :tablerow="tablerow"></setrole>
	</div>
</template>

<script>
	import { http, userlist } from '../../api/api.js'
	import mgradd from './mgradd.vue'
	import mgredit from './mgredit.vue'
	import mgrdelete from './mgrdelete.vue'
	import setrole from './setrole.vue'
	export default {
		data() {
			return {
				tableData: '', //用户列表数据
				total: '', //总数量
				names:'',//搜索的名字
				buttontype:{ //功能对话框状态
					mgrAdd:false, //添加用户
					mgrEdit:false, //修改用户
					mgrDelete:false, //删除用户
					mgrSetRole:false,//分配角色
				},
				tablerow:'' ,//当前选中的用户
				page:1,//当前页码
			}
		},
		mounted(){
			this.getuserlist(1)
		},
		components:{
			mgradd,
			mgredit,
			mgrdelete,
			setrole
		},
		methods: {
			//点击选中的用户
			celltable(row){
				this.tablerow = row
			},
			//对话框关闭回调
			showbtn(type){
				this.buttontype[type] = false
				this.getuserlist(this.page)
				this.tablerow = ''
			},
			//统一管理按钮点击事件
			btn(a){
				if(a=='mgrAdd'){
					this.buttontype[a] = true
				}else{
					 if(this.tablerow == ''){
					 	this.$message.error('请选择要操作的用户');
					 }else{
					 	if(a=='mgrFreeze'){
					 		if(this.tablerow.statusName == '冻结'){
					 			this.$message.error('当前用户已经是冻结状态哟');
					 		}else{
					 			this.buttontype[a] = true
					 		}
					 	}else if(a=='mgrUnfreeze'){
					 		if(this.tablerow.statusName == '启用'){
					 			this.$message.error('当前用户已经是启用状态哟');
					 		}else{
					 			this.buttontype[a] = true
					 		}
					 	}else{
					 		this.buttontype[a] = true
					 	}
					 }
				}
			},
			//重置
			clears(){
				this.names = ''
				this.getuserlist(1)
			},
			//页码发生改变时触发
			pagetype(page) {
				this.page = page
				this.getuserlist(page)
			},
			//获取用户列表
			getuserlist(page) {
				this.$http.get(http + userlist, {
					params: {
						page,
						limit: 5,
						name:this.names
					}
				}).then((data) => {
					if(data.data.msg == '成功'){
						this.tableData = data.data.data.records
						this.total = data.data.data.total
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