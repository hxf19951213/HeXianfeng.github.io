<template>
	<div>
		<el-dialog title="修改菜单" :visible.sync="thistype" @close="fun(tname)">
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
		props: ['type', 'fun', 'tname','tablerow'],
		data() {
			return {
				thistype: this.type, //模态框状态
				formtype: { //数据
					name: '',
					code: '',
					component: '',
					url: '',
					ismenu: '1',
					status: '1',
				},
				form:'',
			}
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
					this.$http.post(http+menu,JSON.stringify(this.form),{emulateJSON:true}).then((data)=>{
						console.log(data.data)
						if(data.data.msg == '成功'){
							this.thistype=false
								this.form = ''
						}else{
							this.$message.error(data.data.msg);
						}
					},(err)=>{
							this.$message.error(err.data.message);
					})
				}else{
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