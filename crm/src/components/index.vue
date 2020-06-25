<template>
	<div>
		<div id="main" style="width: 600px;height:400px;"></div>
	</div>
</template>

<script>
	import { http, channellist, articlebychannel } from '../api/api.js'
	export default {
		mounted() {
			this.getdata()
		},
		methods: {
			viewtype(arr1,arr2) {
				// 基于准备好的dom，初始化echarts实例
				var myChart = this.$echarts.init(document.getElementById('main'));
				// 指定图表的配置项和数据
				var option = {
					title: {
						text: '文章统计'
					},
					tooltip: {},
					xAxis: {
						data: arr1
					},
					yAxis: {},
					series: [{
						name: '数量',
						type: 'bar',
						data: arr2
					}]
				};
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
			},
			getdata() {
				//获取文章信息
				Promise.all([this.$http.get(http + channellist),
					this.$http.get(http + articlebychannel)
				]).then((data) => {
					//分类数据
					var typelisty = data[0].data.data
					//文章数量
					var num = data[1].data.data
					//迭代新的数组
					//分类数组
					var typearr = typelisty.map((i) => {
						return i.name
					})
					//数量数组
					var newnum = num.map((i) => {
						return i.articles
					})
					//生成统计图
					this.viewtype(typearr,newnum)
				}, (err) => {
					this.$message.error(err.data.message);
				})
			}
		}
	}
</script>

<style>

</style>