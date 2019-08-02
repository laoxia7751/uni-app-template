<template>
	<view>
		{{test}}
        <button type="primary" @click="changeTest()">测试</button>
	</view>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';
    import { getData } from "@/utils";
	export default {
		data() {
			return {
				
			};
		},
        computed: mapState(['test']),
        onReady() {
           
        },
        onLoad() {
            getData(1).then(res => {
                console.log(res);
            })
        },
        onShow() {
            
        },
        onPullDownRefresh() {
            
        },
        methods: {
            ...mapMutations(['changeTest']),
        }
	}
</script>

<style lang="less">

</style>
