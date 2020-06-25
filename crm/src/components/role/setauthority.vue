<template>
	<div>
		<el-dialog title="分配权限" :visible.sync="thistype" @close="fun(tname)" @open="getdeptlist">
			<div v-if="typerole&&checkedIds">
				<el-tree :data="typerole" show-checkbox node-key="id" :default-expanded-keys="checkedIds" :default-checked-keys="checkedIds" :props="defaultProps" ref="roletree">
				</el-tree>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="upuser">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { http, setauthority, setsavePermisson } from '../../api/api.js'
	export default {
		props: ['type', 'fun', 'tname', 'tablerow'],
		data() {
			return {
				thistype: this.type, //模态框状态
				typerole: '', //权限信息
				checkedIds: '', //当前已有的权限数组
				defaultProps: {
					children: 'children',
					label: 'name'
				}
			}
		},
		methods: {
			upuser() {
				//获取选中的权限数组
				let arr = [...this.$refs.roletree.getCheckedKeys(),...this.$refs.roletree.getHalfCheckedKeys()]
				//设置角色
					this.$http.post(http + setsavePermisson, {
						roleId:this.tablerow.id,
						permissions:arr.toString()
					},{emulateJSON:true}).then((data) => {
						console.log(data.data)
						if(data.data.msg == '成功') {
							this.thistype = false
						} else {
							this.$message.error(data.data.msg);
						}
					}, (err) => {
						this.$message.error(err.data.message);
						//						location.href = './login.html'
					})
			},
			getdeptlist() {
				//获取部门信息
				this.$http.get(http + setauthority, {
					params: {
						roleId: this.tablerow.id
					}
				}).then((data) => {
					if(data.data.msg == '成功') {
						//权限树
						this.typerole = data.data.data.treeData
						//当前角色有的权限
						this.checkedIds = data.data.data.checkedIds
						console.log(data.data)
					} else {
						this.$message.error(data.data.msg);
					}
				}, (err) => {
					this.$message.error(err.data.message);
					//					location.href = './login.html'
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