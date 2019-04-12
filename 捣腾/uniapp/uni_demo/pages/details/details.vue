<template>
	<view>
		123
	</view>
</template>

<script>
	export default {
		data() {
			return {
				film:{}
			};
		},
		mounted() {
			this.getFileDetails()
		},
		onLoad(options) {
			console.log(options);
		},
		methods:{
			getFileDetails(id){
				
			}
		}
	}
</script>

<style>

</style>
