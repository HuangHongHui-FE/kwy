<template>
	<div>
		<!-- 左边中间悬浮的 -->
		<div class="gd1">
			<div :class="flag===0?'on':''" @click="grzl()">
				<a>个人资料<i class="iconfont icon-ziyuan-copy"></i></a>
			</div>
			<div :class="flag===1?'on':''" @click="tpq()">
				<a>图片区&nbsp;&nbsp;<i class="iconfont icon-fanganxiaoguotu"></i></a>
			</div>
			<div :class="flag===2?'on':''" @click="spq()">
				<a>视频区&nbsp;&nbsp;<i class="iconfont icon-shipin1"></i></a>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>


<script>
	export default{
		data(){
			return{
				flag: 0
			}
		},
		created(){

		},
		methods:{
			grzl(){
				this.flag = 0
				this.$router.push("/funguy/grzl")
			},
			tpq(){
				this.flag = 1
				this.$router.push("/funguy/tpq")
			},
			spq(){
				this.flag = 2
				this.$router.push("/funguy/spq")
			}

		}
	}
</script>

<style lang="less">
	.gd1{
		background: rgba(0, 0, 0, 0.2);
		position: fixed;
		top: 40%;
		.on{
			background-color: #9966FF;
			border-right: 1px solid #C8C8C8;
		}
		div{
			height: 60px;
			text-align: center;
			:hover{
				background-color: #9966FF;
			};
			a{
				display: inline-block;
				width: 100%;
				height: 100%;
				text-decoration: none;
				line-height: 60px;
				font-size: 16px;
				color: white;	
				cursor: pointer;
			}
		}
	}
</style>