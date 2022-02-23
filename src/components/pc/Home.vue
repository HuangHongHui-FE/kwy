<template>
	<div>
		<!-- pc端 -->
		<div class="body">
			<div class="title">
				<!-- 这里用includes也可 -->
				<div :class="$route.path.split('/')[1] === 'funguy'? 'on': ''" @click="switchTo('/funguy')">
					<a>funguy</a>
				</div>
				<div :class="$route.path === '/study'?'on': ''" @click="switchTo('/study')">
					<a>resource</a>
				</div>
				<div :class="$route.path.split('/')[1] === 'share'?'on': ''" @click="switchTo('/share')">
					<a>share</a>
				</div>

				<span :class="$route.path.split('/')[1] === 'user'? 'on_img': ''">
					<img alt="头像" title="ha" :src="imgSrc" @click="imgSelect()"/>
				</span>
			</div>


			<!-- showUser -->
			<div v-if="showUser" class="showUser">
				<!-- 已经登录 -->
				<div v-if="isLogin" class="isLogin">
					<div>
						<img :src="imgSrc" alt="吼吼吼" title="头像">
					</div>
					<div @click="goWriteBlog">
						<i class="iconfont icon-boke"></i>
						<label>写博客</label>
					</div>
					<div @click="goUgrzl()">
						<i class="iconfont icon-gerenziliao"></i>
						<a>个人信息</a>
					</div>
					<template>
						<el-button type="info" size="mini" @click="loginOut()">退出登录</el-button>
					</template>
				</div>
				<!-- 没有登录 -->
				<div v-if="!isLogin" class="notLogin">
					<div>
						<img src="../../static/img/kongbai.png" alt="吼吼吼" title="头像">
					</div>
					<el-button type="primary" size="mini" @click="goLogin()">去登录</el-button>
				</div>
			</div>
			<!-- 点击更换背景图片 -->
			<div class="changeBgc" @click="changeBgd()">
				<div class="dotted">背景</div>
				<div class="pulse1"></div>
				<div class="pulse2"></div>
				<div class="pulse3"></div>
			</div>

			<!-- 音乐播放器 -->
			<div class="nameShow" ref="nameShow">{{name}}</div>
			<div class="musicDiv">
				<audio controls class="audio" ref="audio" @ended="musicEnd">
					<source :src="curMusicSrcCom" type="audio/mpeg">
					<source :src="curMusicSrcCom" type="audio/ogg">
					<embed height="50" width="100" :src="curMusicSrcCom">
				</audio>
				
				<div class="iconAll" v-on:mouseover="mouse01On" v-on:mouseout="mouse01Out">
					<i class="el-icon-service"></i>

					<i class="el-icon-video-play" ref="i02" @click="i02Click"></i>
					<i class="el-icon-video-pause" ref="i03" @click="i03Click"></i>
			
					<i class="el-icon-caret-right" ref="i04" @click="i04Click"></i>
					<i class="el-icon-caret-left" ref="i05" @click="i05Click"></i>
				</div>
			</div>
			<router-view @homeUser='homeUser'></router-view>
		</div>
	</div>
</template>


<script>
	export default {
		data(){
			return {
				// 标记显示与隐藏
				showUser: false,
				isLogin: false,
				// nicheng: "",
				// data: {},
				queryInfo: {},
				imgSrc: require('../../static/img/kongbai.png'),
				bgi01: require('../../static/img/kongbai.png'),
				bgi02: require('../../static/img/3072_1728.jpeg'),
				bgi03: require('../../static/img/03.jpeg'),
				bgcM: 0,
				// 播放器的播放与暂停标识
				playFlag: true,
				// 音乐数据
				musicData: [],
				curMusicSrc: 'public/music/花海-周杰伦-440615.flac',
				// 标记是第几首歌
				index: 0,
				// 跑马灯效果的定时器
				intervalId: null,
				// 歌名人名的显示
				name: '嘎嘎嘎'

			}
		},
		mounted(){
			// this.musicDataGet()
			// this.curMusicSrc = 'http://127.0.0.1:3000/public/music/花海-周杰伦-440615.flac'
			// this.$refs.i01.addEventListener("")
		},
		created(){
			let username = window.sessionStorage.getItem("username")
			let pwd = window.sessionStorage.getItem("pwd")
			this.queryInfo = { username: username, pwd: pwd }

			// bgcM
			if(window.sessionStorage.getItem("bgcM")){
				this.bgcM = window.sessionStorage.getItem("bgcM")
			}

			if(username !== null && pwd!==null){
				this.isLogin = true;
				if(!window.sessionStorage.getItem("image")){
					this.getTouXiangImg()
				}else{
					this.imgSrc = window.sessionStorage.getItem("image")
				}
			}
		},
		methods: {
			switchTo(path){
				this.$router.replace(path)
			},
			imgSelect(){
				this.showUser = !this.showUser
			},
			goLogin(){
				this.$router.push("/login")
			},
			loginOut(){
				window.sessionStorage.clear()
				this.$router.replace('/')
				this.$router.go(0)
			},
			goWriteBlog(){
				this.$router.replace("/user/writeBlog")
				this.showUser = false
			},
			goUgrzl(){
				this.$router.replace("/user/grzl")
				this.showUser = false
			},
			// async getUserMsg(){
			// 	let {data: res} = await this.$http.get("/user/grzl", { params: this.queryInfo })
			// 	if(res.meta.status !== 200) return this.$message.error("获取用户昵称失败")
			// 	this.nicheng = res.data.nicheng
			// },
			async getTouXiangImg(){
           		let {data: res} = await this.$http.get("/touXiangGet", { params: this.queryInfo })
				console.log(res)
           		if(res.meta.status !== 200){ return this.$message.error("获取头像失败") }
           		let url = "data:image/png;base64," + res.data
           		this.imgSrc = url
				window.sessionStorage.setItem("image", url)
           	},
           	// 更换背景颜色
           	changeBgd(){
 				// document.body.style.backgroundImage = 'url('+ this.bgi01 + ')'
 				let bgc = ['background-color: rgb(229, 238, 204)', 'background-color: #7FFF00;', 'background-color: #87CEEB;', 'background-color: #9370DB;', 'background-color: #AFEEEE;', 'background-color: #BDB76B;', 'background-color: #CD5C5C;', 'background-color: #D2B48C;', 'background-color: #D8BFD8;', 'background-color: #E0FFFF;']
 				let bgcM = parseInt(this.bgcM) + 1
 				if(bgcM > 9){
 					bgcM = 0
 				}
 				this.bgcM = bgcM
 				document.documentElement.setAttribute('style', bgc[bgcM]);
 				document.body.setAttribute('style', bgc[bgcM]);
 				window.sessionStorage.setItem("bgcM", bgcM)
 				// document.body.setAttribute('style', 'background: url(' + this.bgi03 + ') no-repeat fixed center; background-size: 100% 100%;');

           	},
			//    照片的实时更新
			homeUser(){
				this.imgSrc = window.sessionStorage.getItem("image")
			},
			// 音乐播放器的鼠标移入移出事件
			mouse01On(e){
				this.$refs.i04.style = "display: block;"
				this.$refs.i05.style = "display: block;"
				if(this.playFlag){
					this.$refs.i02.style = "display: block;"
				}else{
					this.$refs.i03.style = "display: block;"
				}
				if(this.musicData.length === 0){
					this.musicDataGet()
				}
				this.$refs.nameShow.style = "display: block;"

				this.intervalId = setInterval(() => {
					var start = this.name.substring(0, 1)
					var end = this.name.substring(1)
					this.name = end + start
				}, 400)
				
			},
			mouse01Out(e){
				this.$refs.i04.style = "display: none;"
				this.$refs.i05.style = "display: none;"
				this.$refs.i03.style = "display: none;"
				this.$refs.i02.style = "display: none;"
				this.$refs.nameShow.style = "display: none;"
				clearInterval(this.intervalId)
				// 每当清除了定时器后需要重新把intervalId置为null
				this.intervalId = null;
			},
			// 播放器图标的点击事件
			i02Click(){
				this.$refs.audio.play()
				this.$refs.i03.style = "display: block;"
				this.playFlag = false
				this.$refs.i02.style = "display: none;"
			},
			i03Click(){
				this.$refs.audio.pause()
				this.$refs.i02.style = "display: block;"
				this.playFlag = true
				this.$refs.i03.style = "display: none;"
			},
			i04Click(){
				this.index = this.index + 1
				if(this.index === this.musicData.length){ this.index = 0 }
				this.curMusicSrc = this.musicData[this.index].path
				this.$refs.audio.src = this.curMusicSrcCom
				this.playFlag = true
				this.$refs.i02.style = "display: block;"
				this.$refs.i03.style = "display: none;"

				this.name = this.musicData[this.index].music_name + '--' + this.musicData[this.index].author_name + '--'
			},
			i05Click(){
				this.index = this.index - 1
				if(this.index < 0){ this.index = this.musicData.length - 1 }
				this.curMusicSrc = this.musicData[this.index].path
				this.$refs.audio.src = this.curMusicSrcCom
				this.playFlag = true
				this.$refs.i02.style = "display: block;"
				this.$refs.i03.style = "display: none;"
				this.name = this.musicData[this.index].music_name + '--' + this.musicData[this.index].author_name + '--'
			},
			// 音乐播放结束事件
			musicEnd(){
				this.$refs.i02.style = "display: block;"
				this.playFlag = true
				this.$refs.i03.style = "display: none;"
			},
			async musicDataGet(){
				let {data: res} = await this.$http.get("/musicGet")
				if(res.meta.status !== 200){ return this.$message.error('获取音乐数据失败！') }
				this.musicData = res.data
				this.curMusicSrc = res.data[this.index].path
				this.$refs.audio.src = this.curMusicSrcCom
				this.name = this.musicData[this.index].music_name + '--' + this.musicData[this.index].author_name + '--'
			}
		},
		computed:{
			curMusicSrcCom(){
				return this.$http.defaults.baseURL + this.curMusicSrc
			}
		}
	}
</script>



<style lang="less" scoped>

	.mobileMaxDiv{
		display: none;
	}


	.title {
		display: flex;
		justify-content: space-around;
		.on {
			a{
				color: red;
			}
			background-color: #C8C8C8;
			border-radius: 20px;
		}
		div {
			width: 18%;
			border-radius: 20px;
			height: 50px;
			background-color: #333366;
			:hover {
				background-color: #C8C8C8;
				border-radius: 20px;
			}
			a{
				text-decoration: none;
				display: inline-block;
				width: 100%;
				height: 100%;
				text-align: center;
				color: white;
				font-size: 20px;
				line-height: 50px;
				cursor: pointer;
			}
		}
		span{
			:hover {
				border: 2px solid #C8C8C8;
			}
		}
		span img{
			
			height: 50px;
			width: auto;
			border-radius: 25px;
			box-sizing: border-box;
			
		}
		.on_img{
			background-color: #C8C8C8;
		}

	}
	.isLogin{
		z-index: 10;
		position: absolute;
		text-align: center;
		top: 50px;
		right: 1%;
		// height: 250px;
		width: 12%;
		color: rgb(89, 125, 185);
		background-color: white;
		div{
			margin-bottom: 10%;
		}
		div img{
			width: 50%;
			height: auto;
			margin-top: 5%;
		}
		div i{
			margin-right: 5%;
		}
	}
	.notLogin{
		z-index: 10;

		position: absolute;
		text-align: center;
		top: 50px;
		right: 2%;
		// height: 100px;
		width: 10%;
		background-color: white;
		div{
			margin-bottom: 10%;
		}
		div img{
			width: 70%;
			height: auto;
			margin-top: 5%;
		}
		div i{
			margin-right: 5%;
		}
	}
	.changeBgc{
		position: fixed;
		top: 95%;
		cursor: pointer;
		left: 1%;
		div[class^="pulse"] {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 8px;
			height: 8px;
			box-shadow: 0 0 12px #009dfd;
			border-radius: 50%;
			animation: pulse 1.8s linear infinite;
		}
		div.pulse2 {
			animation-delay: 0.6s;
		}
		div.pulse3 {
			animation-delay: 1.2s;
		}
	}
	.musicDiv{
		z-index: 999;
		position: fixed;
		top: 70%;
		left: 1%;
		audio{
			display: none;
		}
		.iconAll{
			display: flex;
			flex-direction: column;
			// background-color: chartreuse;
			i{
				text-align: center;
				line-height: 40px;
				width: 40px;
				height: 40px;
				display: none;
				font-size: 20px;
				color: rgb(2, 241, 2);
				cursor: pointer;
				&:hover{
					font-size: 35px;
				}

			}
			i:first-child{
				display: block;
				cursor: auto;
				animation-name: hp;
				animation-duration: 1s;
				animation-iteration-count: infinite;
				animation-direction: alternate;
				&:hover{
					font-size: 20px;
				}
			}

			@keyframes hp{
				25%{
					color: rgb(128, 9, 240);
					font-size: 25px;
				}
				50%{
					color: rgb(12, 240, 240);
					font-size: 30px;
				}
				75%{
					color: rgb(243, 208, 7);
					font-size: 35px;
				}
				100%{
					color: mediumspringgreen;
					font-size: 40px;
				}

			}
		}
	}
	// 歌名，作者名
	.nameShow{
		position: fixed;
		top: 66%;
		left: 1%;
		background-image: linear-gradient(to bottom right, red, yellow);
		opacity: 0.9;
		border-radius: 20%;
		display: none;
		color: cyan;
	}
	@keyframes pulse {
		0% {}
		70% {
			width: 30px;
			height: 30px;
			opacity: 1;
		}
		100% {
			width: 50px;
			height: 50px;
			opacity: 0;
		}
	}
	


</style>