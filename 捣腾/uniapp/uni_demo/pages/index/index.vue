
<template>
	<view class="content">
		<block v-if="showLoading">
			<view class="page-loading">
				<text class="weui-loading"/><text class="loading-text">玩命加载中</text>
			</view>
		</block>
		<block v-else>
			<scroll-view scroll-y="true" class="container film-list" v-bind:style="{ height: windowHeight + 'px' }" @scrolltolower="lower" lower-threshold="20">
				<view class="film-item" v-for="item of list" :key="item.id" @click="toDetails(item.id)">
					<view class="film-image">
						<image :src="item.images.large"></image>
					</view>
					<view class="film-info" >
						<view>
							<text class="film-title">{{item.title}}</text>
							<text class="year">{{item.year}}</text>
						</view>
						<view class="film-rating">
							<block v-if="item.rating.average > 0">
								<text class="label">评分</text>
								<text class="rating">{{item.rating.average}}</text>
							</block>
							<block v-else>
								<text class="label">暂无评分</text>
							</block>
						</view>
						<view class="directors">
							<text class="label">导演</text>
							<block v-for="director of item.directors" :key="index">
							  <text class="person">{{director.name}}</text>
							</block>
						</view>
						<view class="casts">
							<text class="label">主演</text>
							<block v-for="cast of item.casts" :key="index">
							  <text class="person">{{cast.name}}</text>
							</block>
						</view>
					</view>
				</view>
				<view class="load-more-wrap">
					<block v-if="hasMore">
						<view class="load-content">
						  <text class="weui-loading"/><text class="loading-text">玩命加载中</text>
						</view>
					</block>
					<block v-else>
						<view class="load-content">
						  <text>没有更多内容了</text>
						</view>
					</block>
				</view>
			</scroll-view>
		</block>
	</view>
</template>

<script>
	import {ajax} from '../request.js';
	
	export default {
		data() {
			return {
				windowHeight: '',
				list: [],
				start: 0,
				total: 0,
				hasMore: true,
				showLoading: true
			}
		},
		onLoad() {
			this.setWindowHeight()
			this.getMovie(0)
		},
		methods: {
			setWindowHeight(){
				uni.getSystemInfo({
					success:(info)=>{
						this.windowHeight = info.windowHeight
					}
				})
			},
			getMovie(page){
				ajax({
					url:'https://api.douban.com/v2/movie/in_theaters',
					method:'GET',
					data: {
						apikey: '0b2bdeda43b5688921839c8ecb20399b',
						city: '深圳',
						start: page,
						count: 10
					},
					success: (res) => {
						let {start,subjects,total} = res.data
						this.showLoading = false
						if(start >= total) this.hasMore = false
						this.list = this.list.concat(subjects)
						this.start = this.start + subjects.length
						this.total = total
					},
					error:function(){
					}
				});
			},
			lower(e){
				this.getMovie(this.start + 1)
			},
			toDetails(id){
				uni.navigateTo({
					url: '/pages/details/details?id=' + id
				});
			}
		}
	}
</script>

<style>
	page{
		height: 100%;
	}
	.clearfix{
		zoom: 1;
	}
	.clearfix:after{
		content:'';
		display: table;
		clear:both;
	}
	.hide{
		display: none !important;
	}
	.container {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: space-between;
	  box-sizing: border-box;
	  font-family: "Helvetica Neue",Arial,"PingFang SC","Microsoft YaHei",sans-serif;
	  font-size: 14px;
	  line-height: 1.5;
	  color: #333;
	}
	.film-item{
	  padding: 10px;
	  display: flex;
	}
	.film-image{
	  width: 128px;
	}
	.film-image image{
	  width: 100%;
	  height: 180px;
	}
	.film-info{
	  padding-left: 10px;
	  flex: 1;
	}
	.film-info view{
	  margin-bottom: 10px;
	}
	.film-info .label{
	  margin-right: 5px;
	  color: #666;
	}
	.film-info .rating{
	  color: #e09015;
	}
	.film-title{
	 font-size: 18px;
	 margin-right: 10px;
	}
	.film-year{
	  font-size: 16px;
	  color: #999;
	}
	.person{
	  margin-right: 5px;
	}
	.page-loading{
	  position: absolute;
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%,-50%);
	  font-size: 14px;
	  color: #666;
	}
	.page-loading .loading-text{
	  display: inline-block;
	  vertical-align: middle;
	}
	.weui-loading {
	  width: 20px;
	  height: 20px;
	  display: inline-block;
	  vertical-align: middle;
	  -webkit-animation: weuiLoading 1s steps(12, end) infinite;
	  animation: weuiLoading 1s steps(12, end) infinite;
	  background: transparent url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iciIgd2lkdGg9JzEyMHB4JyBoZWlnaHQ9JzEyMHB4JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiBjbGFzcz0iYmsiPjwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjRTlFOUU5JwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICA8L3JlY3Q+CiAgICA8cmVjdCB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzk4OTY5NycKICAgICAgICAgIHRyYW5zZm9ybT0ncm90YXRlKDMwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4KICAgICAgICAgICAgICAgICByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyM5Qjk5OUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz4KICAgIDwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjQTNBMUEyJwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoOTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNBQkE5QUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCMkIyQjInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCQUI4QjknCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxODAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDMkMwQzEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyMTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDQkNCQ0InCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEMkQyRDInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEQURBREEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNFMkUyRTInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0Pgo8L3N2Zz4=) no-repeat;
	  background-size: 100%;
	}
	.load-more-wrap{
	  text-align: center;
	  padding: 10px 20px 20px 20px;
	}
	.load-content{
	  padding: 5px;
	  color: #666;
	}
	.btn-load-more text{
	  display: block;
	  padding: 5px;
	  border-radius: 3px;
	  background: #e6e6e6;
	  color: #666;
	  text-align: center;
	}
</style>
