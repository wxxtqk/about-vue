<template>
	<div class="childOne">
		<div>大哥</div>
		<button @click='tell'>大哥通知二弟回来给bug</button>
	</div>
</template>

<script>
	export default {
		name: 'childOne',
		methods: {
			tell () {
				this.$bus.$emit('childOne-tell-childTwo','老二赶紧回来改bug')
			}
		}
	}
</script>

<style scoped>
	.childOne{
		float: left;
		
	}
</style>