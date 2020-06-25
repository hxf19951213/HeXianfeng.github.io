<template>
	<div>
		<el-dialog title="修改用户" :visible.sync="thistype" @close="fun(tname)"> 
			<el-form ref="form" :model="form" label-width="80px" v-if="deptidarr&&form">
				<!--账户-->
				<el-form-item label="账号">
					<el-input v-model="form.account"></el-input>
				</el-form-item>
				<!--昵称-->
				<el-form-item label="昵称">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<!--生日-->
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<!--性别-->
				<el-form-item label="性别">
					<el-radio-group v-model="form.sex">
						<el-radio label="1">男</el-radio>
						<el-radio label="2">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<!--邮箱-->
				<el-form-item label="邮箱">
					<el-input v-model="form.email"></el-input>
				</el-form-item>
				<!--电话-->
				<el-form-item label="电话">
					<el-input v-model="form.phone"></el-input>
				</el-form-item>
				<!--部门-->
				<el-form-item label="部门">
					<el-cascader v-model="form.deptid" :options="deptidarr" :show-all-levels="false" :props="props"></el-cascader>
				</el-form-item>
				<!--状态-->
				<el-form-item label="状态">
					<el-radio-group v-model="form.status">
						<el-radio label="1">启用</el-radio>
						<el-radio label="2">禁用</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="upuser">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {http,deptlist,user} from '../../api/api.js'
	export default {
		props: ['type', 'fun', 'tname','tablerow'],
		data() {
			return {
				thistype: this.type, //模态框状态
				formtype: { //数据
					account: '', //账号
					name:'',//昵称
					birthday:'', //生日
					sex:"1", //性别
					email:'',//邮箱
					phone:'', //电话
					deptid:'', //部门id
					status:"0",// 状态
				},
				form:'',
				deptidarr:'',//部门信息
				props:{ //连级选择配置
					value:'id',
					label:'simplename',
					children:'children'
				}
			}
		},
		mounted(){
			this.getdeptlist()
		},
		methods:{
			upuser(){
				//修改用户 修改的用户id传进去
				var type = true
				for(var i in this.formtype){
					if(this.form[i] == ''){
						type = false
					}
				}
				if(type){
					if(Array.isArray(this.form.deptid)){
						//是数组的时候取最后一个
						this.form.deptid = this.form.deptid[this.form.deptid.length-1]
					}
					this.form.birthday = this.settimes(this.form.birthday)
					this.$http.post(http+user,this.form,{emulateJSON:true}).then((data)=>{
						console.log(data.data)
						if(data.data.msg == '成功'){
							this.thistype=false
							for(var i in this.form){
								this.form[i] = ''
							}
						}else{
							this.$message.error(data.data.msg);
						}
					},(err)=>{
							this.$message.error(err.data.message);
					})
				}else{
					  this.$message.error('请补全信息');
				}
			},
			settimes(time){
			   //处理时间格式类型
			  var time = new Date(time)
			  return time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()
			},
			chilrennull(data){
				//处理部门信息
				for(var i=0;i<data.length;i++){
					if(data[i].children.length == 0){
						data[i].children = null
					}else{
						this.chilrennull(data[i].children)
					}
				}
				return data
			},
			getdeptlist(){
				//获取部门信息
				this.$http.get(http+deptlist).then((data)=>{
					if(data.data.msg == '成功'){
						this.deptidarr = this.chilrennull(data.data.data)
					}else{
						this.$message.error(data.data.msg);
					}
					
				},(err)=>{
					this.$message.error(err.data.message);
				})
			}
		},
		watch: {
			type() {
				this.thistype = this.type
			},
			tablerow(){
				//浅拷贝变为深拷贝
				var json = {}
				for(var i in this.tablerow){
//					this.tablerow[i] = this.tablerow[i].toString()
					this.$set(json,i,this.tablerow[i].toString())
				}
				this.form = json
			}
		}
	}
</script>

<style>

</style>