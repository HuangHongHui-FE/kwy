<template>
	<div class="user">
		<!-- 左边 -->
		<div class="left">
			<div class="left_index">
				<div :class="flag==0?'on': ''" @click="grzl_btn()">
					<i class="iconfont icon-ziyuan-copy"></i>
					<span>个人资料</span>
				</div>
				<div :class="flag==1?'on': ''" @click="wdjl_btn()">
					<i class="iconfont icon-ziyuan-copy"></i>
					<span>我的简历</span>
				</div>
			</div>
			
		</div>

		<!-- 右边 -->
		<router-view></router-view>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				flag: 0,
				// 修改个人资料要提交的对象
				grzl: {}
			}
		},
		methods: {
			grzl_btn(){
				this.flag = 0
				this.$router.push("/user/grzl")
			},
			wdjl_btn(){
				this.flag = 1
				this.$router.push("/user/Caozuo")
			}
		}
	}
</script>


<style lang="less" scoped>
	.user{
		// display:flex;
		// justfy-content:center;
		// align-item:center;
		// justfy-content:center;
		position: relative;
		left: 15%;
		width: 70%;
		.left{
			// background-color: rgb(240, 240, 240);
			text-align: center;
			height: 600px;
			float: left;
			width: 20%;
			.left_index{
				margin-top: 200px;
				div{
					background-color: rgb(240, 240, 240);
					margin-bottom: 100px;
					height: 50px;
					:hover{
						font-size: 20px;
						color: rgb(45, 181, 153);
					};
					i{
						line-height: 50px;
						margin-right: 10px;
					}
					span{
						line-height: 50px;
					}
				}
			}
		}
	}
	.on{
		border:1px solid rgb(45, 181, 153);
		font-size: 20px;
		color: rgb(45, 181, 153);
	}

		
</style>