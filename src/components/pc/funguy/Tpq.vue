<template>
	<div class="totalDiv" ref="ulRef">
		<!-- 上方的图册区域 -->
		<div class="topDiv">
			<div class="content">
				<a class="card">
					<div class="front" :style="'background-image:url('+ img07 +');'">
						<p>猛龙时期</p>
					</div>
					<div class="back">
					<div>
						<p>猛龙时期</p>
						<button class="button" @click="toShow('mlsq')">Click</button>
					</div>
					</div>
				</a>
				<a class="card">
					<div class="front" :style="'background-image:url('+ img08 +');'">
						<p>马刺时期</p>
					</div>
					<div class="back">
						<div>
							<p>马刺时期</p>
							<button class="button" @click="toShow('mcsq')">Click</button>
						</div>
					</div>
				</a>
				<a class="card">
					<div class="front" :style="'background-image:url('+ img09 +');'">
					<p>NBA总冠军</p>
					</div>
					<div class="back">
					<div>
						<p>NBA总冠军</p>
						<button class="button" @click="toShow('mvp')">Click</button>
					</div>
					</div>
				</a>
				<a class="card">
					<div class="front" :style="'background-image:url('+ img10 +');'">
					<p>马刺新秀</p>
					</div>
					<div class="back">
					<div>
						<p>马刺新秀</p>
						<button class="button" @click="toShow('new')">Click</button>
					</div>
					</div>
				</a>
				<a class="card">
					<div class="front" :style="'background-image:url('+ img11 +');'">
					<p>词条图片</p>
					</div>
					<div class="back">
					<div>
						<p>词条图片</p>
						<button class="button" @click="toShow('ctimage')">Click</button>
					</div>
					</div>
				</a>
				<a class="card">
					<div class="front" :style="'background-image:url('+ img12 +');'">
					<p>概述图册</p>
					</div>
					<div class="back">
					<div>
						<p>概述图册</p>
						<button class="button" @click="toShow('gsimage')">Click</button>
					</div>
					</div>
				</a>
			</div>
			<div class="content">
				<a class="card">
					<div class="front" :style="'background-image:url('+ img01 +');'">
						<p>防守集锦</p>
					</div>
					<div class="back">
					<div>
						<p>防守集锦</p>
						<button class="button" @click="toShow('defind')">Click</button>
					</div>
					</div>
				</a>
				<a class="card">
					<div class="front" :style="'background-image:url('+ img02 +');'">
						<p>大学时期</p>
					</div>
					<div class="back">
						<div>
							<p>大学时期</p>
							<button class="button" @click="toShow('school')">Click</button>
						</div>
					</div>
				</a>
				<a class="card">
					<div class="front" :style="'background-image:url('+ img03 +');'">
					<p>幼年伦纳德</p>
					</div>
					<div class="back">
					<div>
						<p>幼年伦纳德</p>
						<button class="button" @click="toShow('younger')">Click</button>
					</div>
					</div>
				</a>
				<a class="card">
					<div class="front" :style="'background-image:url('+ img04 +');'">
					<p>伦纳德扣篮</p>
					</div>
					<div class="back">
					<div>
						<p>伦纳德扣篮</p>
						<button class="button" @click="toShow('koulan')">Click</button>
					</div>
					</div>
				</a>
				<a class="card">
					<div class="front" :style="'background-image:url('+ img05 +');'">
					<p>快船时期</p>
					</div>
					<div class="back">
					<div>
						<p>快船时期</p>
						<button class="button" @click="toShow('kcsq')">Click</button>
					</div>
					</div>
				</a>
				<a class="card">
					<div class="front" :style="'background-image:url('+ img06 +');'">
					<p>抢七绝杀</p>
					</div>
					<div class="back">
					<div>
						<p>抢七绝杀</p>
						<button class="button" @click="toShow('seven')">Click</button>
					</div>
					</div>
				</a>
			</div>
		</div>

		<!-- 搜索框 -->
		<div class="search">
			<el-input placeholder="搜索图片" v-model="inputContent">
				<el-button slot="append" icon="el-icon-search" @click="search"></el-button>
			</el-input>
		</div>

		<!-- 图片区域 -->
		<!-- <keep-alive> -->
		<div class="bottomImg">	
			<ul>
				<li v-for="(item, index) in srcList" :key="index" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">
					<p :style="flag == index ? 'display: block': ''">{{item.title}}</p>
					<!-- 图片懒加载 -->
					<img v-lazy="$http.defaults.baseURL + 'public/image/' + item.src" alt="">
					<!-- <img :src="$http.defaults.baseURL + 'public/image/' + item.src" alt=""> -->
				</li>
				
			</ul>
			
		</div>
		<!-- </keep-alive> -->
		<img v-lazy="img13" v-if="srcList.length === 0? true: false" class="kongImg">
		<!-- <img :src="img13" v-if="srcList.length === 0? true: false" class="kongImg"> -->
	</div>
</template>


<script>
	export default{
		data(){
			return {
				// 控制图片上的文字的显示隐藏
				flag: null,
				img01: require("../../../static/tpqTop/80-伦纳德防守集锦.png"),
				img02: require("../../../static/tpqTop/1-大学时期的科怀·伦纳德.png"),
				img03: require("../../../static/tpqTop/70-幼年伦纳德.png"),
				img04: require("../../../static/tpqTop/85-伦纳德扣篮.png"),
				img05: require("../../../static/tpqTop/91-快船时期.png"),
				img06: require("../../../static/tpqTop/62-抢七绝杀.png"),
				img07: require("../../../static/tpqTop/52-猛龙时期.png"),
				img08: require("../../../static/tpqTop/40-马刺时期.png"),
				img09: require("../../../static/tpqTop/25-2013-14赛季NBA总冠军、FMVP.png"),
				img10: require("../../../static/tpqTop/13-马刺新秀.png"),
				img11: require("../../../static/tpqTop/97-词条图片.png"),
				img12: require("../../../static/tpqTop/01伦纳德的概述图.png"),
				img13: require("../../../static/img/空空如也.png"),
				// 没搜索时图片数据列表
				srcList: [],
				inputContent: null,
				oldContent: null,
				// 不是搜索时的页面
				page: 0,
				// 图片搜索时的页面
				searchPage: 0,
				// 节流时用了
				start: 0
			}
		},
		
		created(){
			this.imgGet()
		},
		mounted(){
			// 添加窗口滚动事件
			window.addEventListener('scroll',this.handleScrollx, true)
		},
		beforeDestroy() {
    		window.removeEventListener("scroll", this.handleScrollx, true);
  		},
		methods:{
			// 图片上划触底事件的监听
			handleScrollx(){
				// 用来获取滚动的距离，顶部距离浏览器内上边框的距离(为负值)，反过来就为
				let scrollLen = document.documentElement.getBoundingClientRect().top
				// 滚动条的总高度
				let scrollTotalLen = document.documentElement.scrollHeight
				// 窗口高度
				let clientLen = document.documentElement.clientHeight
				if(clientLen - scrollLen >= scrollTotalLen - 1){
					if(this.inputContent === null){
						this.page = this.page + 1
						this.throttle(this.imgGetNext(), 1000)
					}else{
						this.throttle(this.searchNext(), 1000)
					}
				}
				//变量scrollTop是滚动条滚动时，距离顶部的距离
				// var scrollTop = e.target.scrollTop;
				//变量windowHeight是可视区的高度
				// var windowHeight = e.target.clientHeight;
				//变量scrollHeight是滚动条的总高度
				// var scrollHeight = e.target.scrollHeight;
				//滚动条到底部的条件
			},
			// 节流函数
			throttle(callback, wait){
				return function(){
					let now = Date.now();
					if(now - this.start >= wait){
						callback();
						this.start = now;
					}
				}
			},


			// 鼠标的移入移除图片事件
			changeActive(e){
				e.currentTarget.firstElementChild.style = "display: block;"
			},
			removeActive(e){
				e.currentTarget.firstElementChild.style = "display: none;"
			},
			// 跳转到分类图片展示区
			toShow(mark){
				const obj = this.$router.resolve({
					name: `/show?m=${mark}`
				});
				window.open(obj.location.name, '_blank');
			},
			// 一开始图片数据的get
			async imgGet(){
				this.page = 0
				this.searchPage = 0
				let {data: res} = await this.$http.get("/kwy/tpq", { params: {page: this.page} })
				// console.log(res)
				if(res.meta.status !== 200){ return this.$message.error("请求图片失败！"); }
				this.srcList = res.data
			},
			// 上划触底的图片get
			async imgGetNext(){
				let {data: res} = await this.$http.get("/kwy/tpq", { params: {page: this.page} })
				console.log("d")
				if(res.meta.status !== 200){ return this.$message.error("请求图片失败！"); }
				this.srcList = this.srcList.concat(res.data)
			},
			// 搜索图片时
			async search(){
				this.page = 0
				this.searchPage = 0
				this.oldContent = this.inputContent

				let {data:res} = await this.$http.get("/kwy/tpq/search", { params: {page: this.searchPage, keyWords: this.oldContent} })
				if(!res.meta.status === 200) { return this.$message.error("请求图片失败") }
				this.srcList = res.data
			},
			// 搜索的图片上滑触底时
			async searchNext(){
				let {data:res} = await this.$http.get("/kwy/tpq/search", { params: {page: this.searchPage, keyWords: this.oldContent} })
				if(!res.meta.status === 200) { return this.$message.error("请求图片失败") }
				this.srcList = this.srcList.concat(res.data)
			}
		}
	}
</script>

<style lang="less" scoped>

	.totalDiv{
		overflow-x: hidden;
		.topDiv{
			*, *:before, *:after {
				box-sizing: border-box;
			}
			.content {
				display: flex;
				margin: 0 auto;
				justify-content: center;
				align-items: center;
				flex-wrap: wrap;
			}

			.card {
				color: inherit;
				cursor: pointer;
				width: calc(15.5% - 2rem);
				// min-width: calc(16.5% - 2rem);
				height: 180px;
				perspective: 1000px;
				margin: 1rem;
				position: relative;
			}
			@media screen and (max-width: 800px) {
				.card {
					width: calc(50% - 2rem);
				}
			}
			@media screen and (max-width: 500px) {
				.card {
					width: 100%;
				}
			}

			.front,
			.back {
				display: flex;
				border-radius: 6px;
				background-position: center;
				background-size: cover;
				text-align: center;
				justify-content: center;
				align-items: center;
				position: absolute;
				height: 100%;
				width: 100%;
				-webkit-backface-visibility: hidden;
				backface-visibility: hidden;
				transform-style: preserve-3d;
				transition: ease-in-out 600ms;
			}

			.front {
				background-size: cover;
				padding: 2rem;
				font-size: 1.618rem;
				font-weight: 600;
				color: #fff;
				overflow: hidden;
				font-family: Poppins, sans-serif;
			}
			.front:before {
				position: absolute;
				display: block;
				content: '';
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: linear-gradient(135deg, #1a9be6, #1a57e6);
				opacity: .25;
				z-index: -1;
			}
			.card:hover .front {
				transform: rotateY(180deg);
			}
			.card:nth-child(even):hover .front {
				transform: rotateY(-180deg);
			}

			.back {
				background: #fff;
				transform: rotateY(-180deg);	
				padding: 0 2em;
			}
			.card:hover .back {
				transform: rotateY(0deg);
			}
			.card:nth-child(even) .back {
				transform: rotateY(180deg);
			}
			.card:nth-child(even):hover .back {
				transform: rotateY(0deg);
			}

			.button {
				// transform: translateZ(40px);
				-webkit-backface-visibility: hidden;
				backface-visibility: hidden;
				font-weight: bold;
				color: #fff;
				padding: .5em 1em;
				border-radius: 100px;
				font: inherit;
				background: linear-gradient(135deg, #57addf, #6087e2);
				border: none;
				position: relative;
				transform-style: preserve-3d;
				transition: 300ms ease;
			}


			&>div{
				// background-color: tomato;
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
				>div{
					cursor: pointer;
					width: 15%;
					height: 200px;
					// background-color: turquoise;
					text-align: center;
					border-bottom: 2px solid rgb(200, 200, 200);
					
					img{
						width: 90%;
						height: 80%;
						box-shadow: 10px 10px 10px #888888;
						transition: all 2s;
						border-radius: 50%;
					}
					:hover{
						transform: rotate(360deg);
					}
					.topTitle{
						color: blue;
						width: 100%
					}
				}
			}
		}

		.bottomImg{
			ul{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				li{
					position: relative;
					list-style: none;
					margin: 0.1%;
					white-space: nowrap;
					overflow: hidden;
					// text-overflow: ellipsis;
					// width: 13%;
					
					img{
						height: 200px;
						width: auto;
					}
					p{
						display: none;
						font-size: 14px;
						font-weight: 300;
						font-family: cursive;
						color: white;
						position: absolute;
						top: 75%;
						left: 3%;
					}	
				}
			}
		}
	}

	.search{
		width: 60%;
		margin: 40px auto;
	}
	.kongImg{
		width: 100%;
		height: 100%;
	}



	
</style>