<template>
	<div>
		<div class="maxDiv">
			<!-- 左边的两个item -->
			<div class="left">
				<div :class="$route.path === '/share/blogs'? 'on': ''" @click="switchTo('/share/blogs')">blogs</div>
				<div :class="$route.path === '/share/leonard'? 'on': ''" @click="switchTo('/share/leonard')">Leonard</div>
			</div>
			<!-- 右边的搜索框 -->
			<div class="right" v-if="$route.path === '/share/blogs'">
				<el-autocomplete
					class="inline-input"
					v-model="inputBlog"
					:fetch-suggestions="querySearchBlogs"
					:placeholder="placeholderBlogs"
					:trigger-on-focus="false"
					@select="handleSelectBlogs"
					@focus="getDiseaseMainSettingBlogs"
				>
				</el-autocomplete>
			</div>

			<!-- 两个请求的服务器链接不一样 -->
			<div class="right" v-if="$route.path === '/share/leonard'">
				<el-autocomplete
					class="inline-input"
					v-model="inputLeonard"
					:fetch-suggestions="querySearchLeonard"
					:placeholder="placeholderLeonard"
					:trigger-on-focus="false"
					@select="handleSelectLeonard"
					@focus="getDiseaseMainSettingLeonard"
				>
				</el-autocomplete>
			</div>
		</div>

		<router-view></router-view>

	</div>
</template>


<script>
	export default {
		data(){
			return {
				//这个值是需要匹配的值
				blogsList: [], 
				//这个值是用户正在输入的值
          		inputBlog: '',
				placeholderBlogs: '请输入要找的博客',
				placeholderLeonard: '请输入要找的图册',
				inputLeonard: '',
				leonardList: []
			}
		},
		created(){

		},
		mounted () {

        },
		methods:{
			async getDiseaseMainSettingBlogs(){
				// if(this.blogsList.length===0){
				var {data:res} = await this.$http.get("/share/blogs/inputTitleGet")
				if(res.meta.status === 200){
					res.data.forEach(item => {
						this.blogsList.push({
							id: item._id,
							value: item.inputTitle
						})
					})
				}
				
				
			},
			/* fetch-suggestions 是一个返回输入建议的方法属性，在该方法中你可以在输入建议数据准备好时通过 cb(data) 返回到 autocomplete 组件中. */
			querySearchBlogs (queryString, cb) {
				const blogsList = this.blogsList
				const results = queryString
					? blogsList.filter(this.createFilterBlogs(queryString))
					: blogsList
				// 调用 callback 返回建议列表的数据
				cb(results)
			},
			createFilterBlogs (queryString) {
				return inputBlog => {
					return (
						inputBlog.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1  
						// 改为===0 就是筛选的数据只是首字匹配的列表项，需要包含输入字的所有列表项改为！==-1
					)
				}
			},
			/* 用户选择了然后根据item.id查到博客 */
			handleSelectBlogs (item) {
				// 点一下就增加一次阅读数
				this.$http.post("/user/updateView", {_id: item.id})
				this.inputBlog = ''
				const obj = this.$router.resolve({
					name: `#/blogContent?_id=${item.id}`
				});
				window.open(obj.location.name, '_blank');
			},


			// leonard页的
			async getDiseaseMainSettingLeonard(){
				if(this.leonardList.length===0){
					var {data:res} = await this.$http.get("/share/blogs/inputTitleGetLeonard")
					if(res.meta.status === 200){
						res.data.forEach(item => {
							this.leonardList.push({
								id: item._id,
								value: item.inputTitle
							})
							
						})
					}
					console.log(this.leonardList)
				}
				
				
			},
			/* fetch-suggestions 是一个返回输入建议的方法属性，在该方法中你可以在输入建议数据准备好时通过 cb(data) 返回到 autocomplete 组件中. */
			querySearchLeonard (queryString, cb) {
				const leonardList = this.leonardList
				const results = queryString
					? leonardList.filter(this.createFilterLeonard(queryString))
					: leonardList
				// 调用 callback 返回建议列表的数据
				cb(results)
			},
			createFilterLeonard (queryString) {
				return inputLeonard => {
					return (
						inputLeonard.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1  
						// 改为===0 就是筛选的数据只是首字匹配的列表项，需要包含输入字的所有列表项改为！==-1
					)
				}
			},
			/* 用户选择了然后根据查到图册 */
			async handleSelectLeonard (item) {
				console.log(item)
				const obj = this.$router.resolve({
					name: `#/leonardShow?id=${item.id}`
				});
				window.open(obj.location.name, '_blank');
			},
			
			switchTo(path){
				this.$router.replace(path)
			}
		}
		// watch:{
		// 	'$route.path': function(){
		// 		console.log(this.$route.path)
		// 		if(this.$route.path === '/share/blogs'){ 
		// 			this.placeholder = "请输入要找的博客" 
		// 			this.inputLeonard = ''
		// 		}
		// 		if(this.$route.path === '/share/leonard'){
		// 			this.placeholder = "请输入要找的图册"
		// 			this.inputBlog = ''
		// 		}
		// 	}
		// }
		
	}
</script>


<style lang="less" scoped>


	.maxDiv{
		
		margin: 2% 0;
		display: flex;
		.left{
			flex: 2;
			display: flex;
			justify-content: space-around;
			align-items: center;
			padding-left: 5%;
			font-size: 18px;
			font-family: "Lucida Console", "Courier New", monospace;
			div{
				text-align: center;
				width: 45%;
				cursor: pointer;
			}
		}
		.right{
			flex: 6;
			display: flex;
			justify-content: flex-end;
			padding-right: 5%;
			
		}
	}
	.on{
		color: rgb(206, 9, 9);
	}


	
	
</style>