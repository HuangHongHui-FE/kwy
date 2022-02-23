<template>
    <div>
        <!-- 移动端 -->
		<div class="mobileMaxDiv">
			<div>
				<router-view></router-view>
			</div>
			<!-- 底部导航栏 -->
			<div class="bottomDiv">
				<div :class="$route.path === '/mIndex/video'? 'on': ''" @click="switchTo('/mIndex/video')">
					<i class="iconfont icon-shipin"></i>
					<span>video</span>
				</div>
				<div :class="$route.path === '/mIndex/blogs'? 'on': ''" @click="switchTo('/mIndex/blogs')">
					<i class="iconfont icon-boke"></i>
					<span>blogs</span>
				</div>
				<div :class="$route.path === '/mIndex/users'? 'on': ''" @click="switchTo('/mIndex/users')">
					<i class="iconfont icon-gerenziliao"></i>
					<span>users</span>
				</div>
			</div>
		</div>
    </div>    
</template>

<script>
export default {
    data(){
        return {

        }
    },
    created(){

    },
    methods: {
        switchTo(path){
            this.$router.replace(path)
        }
    },
    watch: {

    }
}
</script>

<style lang="less" scoped>
	.mobileMaxDiv{
        // 底部导航栏
		.bottomDiv{
			display: flex;
			align-items: center;
			height: 6vh;
			position: fixed;
			bottom: 0px;
			width: 100%;
			div{
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: rgb(95, 99, 104);
				background-color: #f5f5f5;
			}
			.on{
				color: rgb(12, 171, 235);
			}
		}
	}
</style>