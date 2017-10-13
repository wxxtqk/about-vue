<template>
	<div class="childTwo">
		<div>二哥</div>
		<span>{{msg}}</span>
	</div>

</template>

<script>
	export default {
		name: 'childTwo',
		data (){
			return {
				msg: '接收大哥来的信息'
			}
		},
		mounted: function(){
			this.$bus.$on('childOne-tell-childTwo', (data) => {
				this.msg = data
			})
		}
	}
</script>

<style scoped>
	.childTwo{
		float: right;
	}
	span{
		color: red
	}
</style>