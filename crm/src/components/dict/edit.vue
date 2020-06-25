<template>
	<div>
		<el-dialog title="修改部门" :visible.sync="thistype" @close="fun(tname)">
			<div>
				{{form}}
				<el-form ref="form" :model="form" label-width="80px">
					<!--部门全称-->
					<el-form-item label="字典名称">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<div v-show="status.length">
						<div id="">
							字典详情
						</div>
						<el-row :gutter="20" v-for="(i,$index) in status">
							<el-col :span="10">
								<el-form-item label="状态码">
									<el-input v-model="status[$index].status"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="10">
								<el-form-item label="含义">
									<el-input v-model="status[$index].content"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-button type="danger" @click="status.splice($index,1)">移除</el-button>
							</el-col>
						</el-row>
					</div>
				</el-form>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="statuspush">添加字典详情</el-button>
				<el-button type="primary" @click="upuser">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { http, dict } from '../../api/api.js'
	export default {
		props: ['type', 'fun', 'tname','tablerow'],
		data() {
			return {
				thistype: this.type, //模态框状态
				formtype: { //数据
					name: '', //字典名称
				},
				status: [],
				form:'',
			}
		},
		methods:{
			statuspush() {
				//添加状态
				this.status.push({
					status: '',
					content: ''
				})
			},
			strstatus(data){
				//编码
				//1:xxx;2:xxx;
				var str = ''
				for(var i=0;i<data.length;i++){
					str+=data[i].status+':'+data[i].content+';'
				}
				return str
			},
			strstatusparse(data){
				//解码
				var arr = data.split(',')
				for(var i=0;i<arr.length;i++){
					var arr2 = arr[i].split(':')
					this.status.push({status:arr2[0],content:arr2[1]})
				}
				
			},
			upuser() {
				//添加用户
				var type = true
				for(var i in this.formtype) {
					if(this.form[i] == '') {
						type = false
					}
				}
				if(type) {
					this.$http.put(http +dict+`?dictName=${this.form.name}&dictValues=${this.strstatus(this.status)}&id=${this.form.id}`).then((data) => {
						if(data.data.msg == '成功') {
							this.thistype = false
						} else {
							this.$message.error(data.data.msg);
						}
					}, (err) => {
						this.$message.error(err.data.message);
					})
				} else {
					this.$message.error('请补全信息');
				}
			}
		},
		watch: {
			type() {
				this.thistype = this.type
			},
			tablerow(){
				//浅拷贝变为深拷贝
				if(this.tablerow){
					this.strstatusparse(this.tablerow.detail)
				}else{
					this.status =[]
				}
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