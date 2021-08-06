<template>
	<div class="body">
		<div class="title">
			<div :class="flag===0?'on': ''" @click="funguy()">
				<a>funguy专区</a>
				<!-- <router-link to="/funguy">funguy专区</router-link> -->
			</div>
			<div :class="flag===1?'on': ''" @click="study()">
				<a>study专区</a>
			</div>
			<div :class="flag===2?'on': ''" @click="echarts()">
				<a>echarts专区</a>
			</div>

			<!-- <span :class="[flag===3?'on_img': '', showUser?'click_img':'']"> -->
			<span :class="flag===3?'on_img': ''">
				<img alt="头像" title="ha" src="./touxiang.jpg" @click="imgSelect()"/>
			</span>
			
		</div>


		<!-- showUser -->
		<div v-if="showUser" class="showUser">
			<!-- 已经登录 -->
			<div v-if="isLogin" class="isLogin">
				<div>
					<img src="./touxiang.jpg" alt="吼吼吼" title="头像">
				</div>
				<div>
					<i class="iconfont icon-shipin1"></i>
					<label>{{nicheng}}</label>
				</div>
				<div @click="goUgrzl()">
					<i class="iconfont icon-ziyuan-copy"></i>
					<a>个人中心</a>
				</div>
				<template>
					<el-button type="info" size="mini" @click="loginOut()">退出登录</el-button>
				</template>
			</div>
			<!-- 没有登录 -->
			<div v-if="!isLogin" class="notLogin">
				<div>
					<img src="./kongbai.png" alt="吼吼吼" title="头像">
				</div>
				<el-button type="primary" size="mini" @click="goLogin()">去登录</el-button>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>


<script>
	export default {
		data(){
			return {
				flag: 0,
				// 标记显示与隐藏
				showUser: false,
				isLogin: false,
				nicheng: ""
				// data: {}
			}
		},
		mounted(){
			let username = window.sessionStorage.getItem("username")
			this.nicheng = window.sessionStorage.getItem("nicheng")
			console.log(username)
			if(username !== null){
				this.isLogin = true;
			}

		},
		created(){
			// window.sessionStorage.setItem("flag": this.flag)
			// this.isLogin = window.sessionStorage.getItem("isLogin")
			// location.reload()
			// console.log("data" + this.data)
			// if(this.data){
			// 	this.isLogin = true
			// }else{
			// 	this.isLogin = false
			// }
		},
		methods: {
			funguy(){
				this.flag = 0
				this.$router.push("/funguy")
				// window.sessionStorage.setItem('flag', 0)
				// console.log(this.$router)
				// window.sessionStorage.setItem('activePath', '/funguy')
				// this.activePath = '/funguy'
			},
			study(){
				this.flag = 1
				this.$router.push("/study")
				// window.sessionStorage.setItem('flag', 1)
			},
			echarts(){
				this.flag = 2
				this.$router.push("/echarts")
				// window.sessionStorage.setItem('flag', 2)
			},
			// user(){
			// 	this.flag = 3
			// 	this.$router.push('/user/grzl')
			// 	// window.sessionStorage.setItem('flag', 3)
			// },
			imgSelect(){
				this.showUser = !this.showUser
			},
			goLogin(){
				this.$router.push("/login")
			},
			loginOut(){
				window.sessionStorage.clear()
				this.$router.push('/')
				this.$router.go(0)
			},
			goUgrzl(){
				this.$router.push("/user")
				this.showUser = false
				this.flag = 3
			}
		}
	}
</script>



<style lang="less" scoped>
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
				// color: #D00000;
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
			border: 2px solid #C8C8C8;
		}

	}
	.isLogin{
		position: absolute;
		text-align: center;
		top: 50px;
		right: 1%;
		height: 250px;
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
		position: absolute;
		text-align: center;
		top: 50px;
		right: 2%;
		heigth: 100px;
		width: 10%;
		// color: rgb(89, 125, 185);
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


</style>