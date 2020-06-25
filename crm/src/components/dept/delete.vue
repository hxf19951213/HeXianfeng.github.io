<template>
	<div>
		<el-dialog title="删除部门" :visible.sync="thistype" @close="fun(tname)">
			<div style="text-align: center;">
				你确定要删除部门
				<span style="color: deepskyblue;">{{tablerow.fullname}}</span>
				吗？
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="mgrdelete">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {http,dept} from '../../api/api.js'
	export default {
		props: ['type', 'fun','tablerow','tname'],
		data() {
			return {
				thistype: this.type, //模态框状态
			}
		},
		methods:{
			mgrdelete(){
				this.$http.delete(http+dept,{
					params:{
						id:this.tablerow.id
					}
				}).then((data)=>{
					if(data.data.msg == '成功'){
						this.thistype = false
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
			}
		}
	}
</script>

<style>

</style>