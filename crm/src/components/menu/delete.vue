<template>
	<div>
		<el-dialog title="删除菜单" :visible.sync="thistype" @close="fun(tname)">
			<div style="text-align: center;">
				你确定要删除菜单
				<span style="color: deepskyblue;">{{tablerow.name}}</span>
				吗？
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="mgrdelete">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {http,menu} from '../../api/api.js'
	export default {
		props: ['type', 'fun','tablerow','tname'],
		data() {
			return {
				thistype: this.type, //模态框状态
			}
		},
		methods:{
			mgrdelete(){
				this.$http.delete(http+menu,{
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