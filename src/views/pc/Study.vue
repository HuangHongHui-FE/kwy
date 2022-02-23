<template>
	<div class="maxDiv">
		<div class="main">
			<div class="itemDiv">
				<!-- 主分类标题 -->
				<h3>资源分享</h3>
				<!-- 内容 -->
				<template>
					<swiper class="swiper" :options="swiperOption">
						<swiper-slide v-for="(item) in resourceList" :key="item._id">
							<a class="item" :href="item.src" target="_blank">
								<p class="item_title">{{item.title}}</p>
								<div class="content">
									<img :src="item.path == ''? img01: $http.defaults.baseURL + item.path" alt="">
								</div>
							</a>
						</swiper-slide>

						<div class="swiper-pagination" slot="pagination"></div>
						<div class="swiper-button-prev" slot="button-prev"></div>
						<div class="swiper-button-next" slot="button-next"></div>
					</swiper>
				</template>
			</div>

			<!-- 好玩的 -->
			<div class="itemDiv">
				<!-- 主分类标题 -->
				<h3>好玩的</h3>
				<!-- 内容 -->
				<template>
					<swiper class="swiper" :options="swiperOption">
						<swiper-slide>
							<div class="item" @click="goSocket">
								<p class="item_title">聊天室</p>
								<div class="content">
									<img :src="img01" alt="">
								</div>
							</div>
						</swiper-slide>

						<div class="swiper-pagination" slot="pagination"></div>
						<div class="swiper-button-prev" slot="button-prev"></div>
						<div class="swiper-button-next" slot="button-next"></div>
					</swiper>
				</template>
			</div>

			<!-- 学习日常 -->
			<h3 class="stutyH">学习日常</h3>
			<div class="content_bottom">
				
				<div class="blogShow" v-for="(item) in dataList" :key="item.time">
					<!-- 图片 -->
					<div class="imgDiv">
						<img :src="item.file == ''? img01: item.file" alt="封面图片" title="封面图片" @click="blogContent(item._id)">
					</div>
					<!-- Middle -->
					<div class="middle">
						<div class="time">
							{{item.time}}
						</div>
						<div class="title" @click="blogContent(item._id)">
							{{item.inputTitle}}
						</div>
						
					</div>
				</div>
			</div>
			<!-- 分页 -->
			<template>
				<div class="block">
					<el-pagination
						@current-change="handleCurrentChange"
						:current-page="currentPage"
						:page-size="10"
						layout="total,  prev, pager, next, jumper"
						:total="total">
					</el-pagination>
				</div>
			</template>
			
		</div>
	</div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
	export default {
		name: 'swiper-example-loop-group',
		title: 'Loop mode with multiple slides per group',
		components: {
			Swiper,
			SwiperSlide
		},
		data() {
			return {
				swiperOption: {
					slidesPerView: 4,
					spaceBetween: 30,
					slidesPerGroup: 4,
					loop: true,
					loopFillGroupWithBlank: true,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
					}
				},
				img01: require("../../static/img/touxiang.jpg"),

				dataList: [],
				id: '',
				// 分页
				currentPage: 1,
				// 总条数
				total: 0,
				// 资源数据
				resourceList: []
			}
		},
		created(){
			// this.selfBlogGet()
			this.dataGet()
			console.log(this.$router)
		},
		methods:{
			async dataGet(){
				// let username = window.sessionStorage.getItem("username")
				let {data: res} = await this.$http.get("/study")
				console.log(res.data)
				if(res.meta.status !== 200){ return this.$message.error("获取study页数据失败！") }
				this.resourceList = res.data.resource
				this.dataList = res.data.blogs
				
				// this.total = res.data[res.data.length-1].total
			},
			// async selfBlogGet(){
			// 	let username = window.sessionStorage.getItem("username")
			// 	let {data: res} = await this.$http.get("/user/selfBlogGet", {params: {username: username, currentPage: this.currentPage - 1}})
			// 	console.log(res.data)
			// 	if(res.meta.status !== 200){ return this.$message.error("获取博客数据失败！") }
			// 	this.dataList = res.data
				
			// 	this.total = res.data[res.data.length-1].total
			// },
			canceldel(){
				this.delDialogVisible = false
				this.id = ''
				this.$message.warning("取消了删除！")
			},
			async sureDel(){
				this.delDialogVisible = false
				let {data: res} = await this.$http.delete("/user/selfBlogDel", {params: {_id: this.id}})
				if(res.meta.status !== 200){
					this.id = ''
					return this.$message.error("删除blog失败！")
				}
				this.selfBlogGet()
				this.id = ''
				return this.$message.success("删除blog成功！")
			},
			handleCurrentChange(val) {
				this.currentPage = val
				this.selfBlogGet()
			},
			// 博客详情页面
			blogContent(_id){
				const obj = this.$router.resolve({
					name: `/blogContent?_id=${_id}`
					// name: `/blogContent`,
					// params: {
					//     _id: _id
					// }
				});
				window.open(obj.location.name, '_blank');
			},
			// 跳转到socket页面
			goSocket(){
				const obj = this.$router.resolve({
					name: '/socket'
				});
				window.open(obj.location.name, '_blank');
			}
		}
	}
</script>

<style lang="less" scoped>

	.maxDiv{
		.main{
			display: flex;
			flex-direction: column;
			.itemDiv{
				
				margin: 0 auto;
				width: 90%;
				&>h3{
					font-family: cursive;
					text-align: center;
					font-size: 20px;
				}
				.item{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					text-decoration: none;
					
					.item_title{
						display: inline-block;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						width: 80%;
						text-align: center;
						cursor: pointer;

					}
					.content{
						height: 150px;
						cursor: pointer;
						img{
							height: 100%;
							width: auto;
						}
					}
				}
			}
			
		}
	}

	.stutyH{
		font-family: cursive;
		text-align: center;
		font-size: 20px;
	}

	.content_bottom{
		margin-left: 5%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		.blogShow{
			width: 40%;
			height: 200px;
			margin: 20px;
			display: flex;
			border-bottom: 1px dotted rgb(200, 200, 200);
			.imgDiv{
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-around;
				cursor: pointer;
				img{
					width: 180px;
					height: 180px;
					
				}
			}
			.middle{
				padding: 10px;
				flex: 3;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				flex-wrap: wrap;
				.title{
					cursor: pointer;
					font-weight: 300;
					font-size: 25px;
					overflow: hidden;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					word-break: break-all;
				}
				.time{
					color: rgb(51, 93, 230);
				}
			}

		}
	}
	

	// 分页
    .block{
        position: fixed;
        bottom: 0;
        left: 40%;
    }
</style>