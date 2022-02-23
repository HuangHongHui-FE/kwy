<template>
	<div class="user">
		<!-- 左边 -->
		<div class="left">
			<div class="left_index">
				<div :class="$route.path === '/user/grzl'? 'on': ''" @click="switchTo('/user/grzl')">
					<i class="iconfont icon-gerenziliao"></i>
					<span>个人信息</span>
				</div>
				<div :class="$route.path === '/user/writeBlog'? 'on': ''" @click="switchTo('/user/writeBlog')">
					<i class="iconfont icon-boke"></i>
					<span>写博客</span>
				</div>
				<div :class="$route.path === '/user/seeSelfBlog'? 'on': ''" @click="switchTo('/user/seeSelfBlog')">
					<i class="iconfont icon-boke"></i>
					<span>博客管理</span>
				</div>
				<div :class="$route.path === '/user/uploadPhoto'? 'on': ''" @click="switchTo('/user/uploadPhoto')">
					<i class="iconfont icon-JC_054"></i>
					<span>图片分享</span>
				</div>
			</div>
			
		</div>

		<!-- 右边 -->
		<div class="right">
			<router-view @userUgrzl='userUgrzl'></router-view>
		</div>
		
	</div>
</template>

<script>
	export default{
		data(){
			return{

			}
		},
		created(){
			
		},
		methods: {
			switchTo(path){
				this.$router.replace(path)
			},
			userUgrzl(){
				this.$emit('homeUser')
			}
		}
	}
</script>


<style lang="less" scoped>

	.user{
		display: flex;
		.left{
			text-align: center;
			flex: 1;
			cursor: pointer;
			.left_index{
				height: 500px;
				width: 40%;
				margin: 40% auto;
				div{
					background-color: rgb(240, 240, 240);
					margin-bottom: 60%;
					height: 50px;
					display: flex;
					justify-content:space-around;
					&:hover{
						color: rgb(45, 181, 153);
					};
					i{
						line-height: 50px;
					}
					span{
						line-height: 50px;
					}
				}
			}
		}
		.right{
			flex: 4;
		}
	}
	.on{
		color: rgb(45, 181, 153);
	}
	

		
</style>