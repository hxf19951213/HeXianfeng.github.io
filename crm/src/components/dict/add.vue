<template>
	<div>
		<el-dialog title="添加字典" :visible.sync="thistype" @close="fun(tname)">
			<div>
				{{status}}
				<el-form ref="form" :model="form" label-width="80px">
					<!--部门全称-->
					<el-form-item label="字典名称">
						<el-input v-model="form.dictName"></el-input>
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
		props: ['type', 'fun', 'tname', 'tablerow'],
		data() {
			return {
				thistype: this.type, //模态框状态
				form: { //数据
					dictName: '', //字典名称
				},
				status: []
			}
		},
		methods: {
			statuspush() {
				//添加状态
				this.status.push({
					status: '',
					content: ''
				})
			},
			strstatus(data){
				//1:xxx;2:xxx;
				var str = ''
				for(var i=0;i<data.length;i++){
					str+=data[i].status+':'+data[i].content+';'
				}
				return str
			},
			upuser() {
				//添加用户
				var type = true
				for(var i in this.form) {
					if(this.form[i] == '') {
						type = false
					}
				}
				if(type) {
					this.$http.post(http +dict+`?dictName=${this.form.dictName}&dictValues=${this.strstatus(this.status)}`).then((data) => {
						if(data.data.msg == '成功') {
							this.thistype = false
							for(var i in this.form) {
								this.form[i] = ''
							}
							this.status = []
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
			}
		}
	}
</script>

<style>

</style>