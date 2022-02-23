<template>
	<div>
		<!-- 左边中间悬浮的 -->
		<div class="gd1">
			<div :class="$route.path === '/funguy/grzl'? 'on':''" @click="switchTo('/funguy/grzl')">
				<a>个人资料<i class="iconfont icon-gerenziliao"></i></a>
			</div>
			<div :class="$route.path === '/funguy/tpq'? 'on':''" @click="switchTo('/funguy/tpq')">	
				<a>图片区&nbsp;&nbsp;<i class="iconfont icon-tupian"></i></a>
			</div>
			<div :class="$route.path === '/funguy/spq'? 'on':''" @click="switchTo('/funguy/spq')">
				<a>视频区&nbsp;&nbsp;<i class="iconfont icon-shipin"></i></a>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>


<script>
	
	export default{
		data(){
			return{
				flagFun: 0
			}
		},
		created(){
			
		},
		methods:{
			switchTo(path){
				this.$router.replace(path)
			}
		}
	}
</script>

<style lang="less">
	.gd1{
		z-index: 10;
		background: rgba(88, 117, 6, 0.2);
		position: fixed;
		top: 40%;
		.on{
			background-image: linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%);;
			border-right: 1px solid #d1eecf;
		}
		div{
			height: 60px;
			text-align: center;
			:hover{
				background-color: #9966FF;
			};
			a{
				display: inline-block;
				vertical-align: middle;
				width: 100%;
				height: 100%;
				text-decoration: none;
				line-height: 60px;
				// font-size: 16px;
				color: white;	
				cursor: pointer;
			}
		}
	}
</style>