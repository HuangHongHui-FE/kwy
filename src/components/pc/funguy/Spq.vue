<template>
	<div class="maxDiv">
		<div class="content">
			<!-- 头部标题与喜爱数 -->
			<div class="top">
				{{videoData === {}? '': videoData.title}}
				<div>
					<i class="el-icon-chat-dot-round"></i>
					{{videoData === {}? '': videoData.love}}
				</div>
			</div>
			
			<div class="bottom">
				<!-- 下面左边 -->
				<div class="bottom_left">
					<video :src="videoSrcCur" autoplay controlslist='[nofullscreen]' controls disablePictureInPicture>
					抱歉，您的浏览器不支持内嵌视频，不过不用担心，你可以 <a :href="videoSrcCur">下载</a>
					并用你喜欢的播放器观看!
					</video>
				</div>
				<!-- 下面右边 -->
				<div class="bottom_right">
					<div v-for="(item) in videoList" :key="item._id" @click="playVideo(item)">
						<span>
							<i class="el-icon-chat-dot-round"></i>{{item.love}}
						</span>
						{{item.title}}
					</div>
				</div>
			</div>
		</div>
	</div>
	
</template>


<script>
	export default{
		data(){
			return {
				// 所有数据列表
				videoList: [],
				// 正在播放的src数据
				videoSrc: '',
				videoData: {}
			}
		},
		created(){
			this.videoGet()
		},
		methods:{
			// 视频信息数据
			async videoGet(){
				let {data: res} = await this.$http.get('/videoGet')
				if(res.meta.status !== 200){ return this.$message.error("获取视频信息失败！") }
				this.videoList = res.data
				this.videoSrc = this.videoList[0].path
				this.videoData = res.data[0]
			},
			// 点击右侧的列表视频
			playVideo(item){
				this.videoSrc = item.path
				this.videoData = item
			}
		},
		computed:{
			videoSrcCur(){
				return this.$http.defaults.baseURL + this.videoSrc
			}
		}
	}
</script>

<style lang="less" scoped>
.maxDiv{
	.content{
		width: 70%;
		height: 600px;
		background-color: rgb(69, 209, 228);
		margin-left: 15%;
		margin-top: 40px;
		display: flex;
		flex-direction: column;
		padding: 3%;
		.top{
			font-size: 25px;
			font-family: cursive;
			width: 100%;
			height: 10%;
			display: flex;
			align-items: center;
			justify-content: space-around;
			// background-color: rgb(235, 238, 56);
		}
		.bottom{
			// background-color: yellow;
			width: 100%;
			height: 90%;
			display: flex;
			.bottom_left{
				// background-color: rgb(12, 42, 175);
				width: 60%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				video{
					
					width: auto;
					height: 100%;
				}
			}
			.bottom_right{
				// background-color: turquoise;
				border-bottom: 1px dotted skyblue;
				
				width: 40%;
				height: 100%;
				// 滚动的导航栏样式修改
				&::-webkit-scrollbar {  
					width: 6px; 
					height: 0px;
				}
				&::-webkit-scrollbar-thumb {
					background: transparent;
				}
				&:hover::-webkit-scrollbar {
					width: 6px;
					height: 0px;
					background: rgba(238, 238, 238, 1);
					border-radius: 6px;
				}
				&:hover::-webkit-scrollbar-thumb {
					background: #9bcaff;
					border-radius: 10px;
				}
				overflow-y: auto;
				
				display: flex;
				flex-direction: column;
				div{
					height: 50px;
					line-height: 50px;
					font-size: 20px;
					font-weight: 300;
					cursor: pointer;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					span{
						color: springgreen;
						margin-right: 5%;
					}
				}
			}
		}
	}
}
	
</style>