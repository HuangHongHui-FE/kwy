<template>
	<div class="maxDiv">
		<div class="userMsg">
			<div class="title">
				<h3>个人资料</h3>
			</div>
			<hr>
			<div class="touxiang">
				<img :src="imgSrc" alt="头像" title="放大" @click="imgFaDa()">
				<span>
					<form :action="$http.defaults.baseURL+ 'touXiang'" method="POST" enctype="multipart/form-data" class="formTx" name="touXiangForm" target="tg">
						<input type="file" accept="image/*" class="touInput" name="pic" @change="handleFile">
						<input type="text" class="userInput" name="username" v-model="queryInfo.username">
					</form>
					<button @click="upload()" class="touButton">上传头像</button>
				</span>
				<!-- form的默认跳转到这里 -->
				<iframe name="tg" id="tg" style="display: none;"></iframe>
			</div>

			<div>
				<span>基本信息</span>
			</div>
			<hr>
			<div class="form_div">
				<form>
					<div>
						<span>昵称</span>
						<input type="text" class="nicheng" v-model="formGet.nicheng">
					</div>
					<div>
						<span>性别</span>
						<input type="radio" name="sex" value="男" v-model="formGet.sex"><span>男</span>
						<input type="radio" name="sex" value="女" v-model="formGet.sex"><span>女</span>
					</div>

					<div>
						<span>现居地</span>
						<select @change="changeProduct1()" v-model="city1">
							<option v-for="(city, index) in cityData" :key="index" :value='city'>{{city.value}}</option>
						</select>

						<select v-if="city1.children" @change="changeProduct2()" v-model="city2">
							<option v-for="(city2, index) in city1.children" :key="index" :value="city2">{{city2.value}}</option>
						</select>

						<select v-if="city2.children" @change="changeProduct3()" v-model="city3">
							<option v-for="(city3, index) in city2.children" :key="index" :value="city3">{{city3.value}}</option>
						</select>
					</div>
					<div>
						<span>个人简介</span>
						<textarea v-model="formGet.grjj" class="textarea"></textarea>
					</div>
					<input value="提交修改" type="button" class="submit" @click="post_grzl()">
				</form>
			</div>
		</div>
		<template>
			<el-dialog
			  title="提示"
			  :visible.sync="dialogVisible"
			  width="35%"
			  center>
			  <span class="dialogSpan">
			  	<img :src="imgSrcPre">
			  </span>
			  <template #footer>
			    <span class="dialog-footer">
			      <el-button @click="postCancel">取 消</el-button>
			      <el-button type="primary" @click="postSure">确 定</el-button>
			    </span>
			  </template>
			</el-dialog>
		</template>

		<!-- 头像的放大 -->
		<template>
			<el-dialog
			  title="大图"
			  :visible.sync="touXiangDialogVisible"
			  width="35%"
			  center>
			  <span class="dialogSpan">
			  	<img :src="imgSrc">
			  </span>
			  <template #footer>
			    <span class="dialog-footer">
			      <el-button @click="touXiangDialogVisible = false">取 消</el-button>
			      <el-button type="primary" @click="touXiangDialogVisible = false">确 定</el-button>
			    </span>
			  </template>
			</el-dialog>
		</template>
	</div>

</template>

<script>
	import cityData from './citydata.js'
	export default{
			data(){
			return {
				cityData: cityData,
				// 获取到的表单数据
				formGet: {

				},
				// option选中的城市
				city1: {},
				city11: '',
				city2: {},
				city22: '',
				city3: {},
				city33: '',
				// 请求user, touXiang信息时要上传的参数
				queryInfo: {},
				imgSrc: "",
				// 选择头像预览的src
				imgSrcPre: "",
				dialogVisible: false,
				dialogImgSrc: require("../touxiang.jpg"),
				touXiangDialogVisible: false,
				file: ""
			}
		},
		created(){
			let username = window.sessionStorage.getItem("username")
			let pwd = window.sessionStorage.getItem("pwd")
			this.queryInfo = { username: username, pwd: pwd }
			this.getUserMsg()
			if(window.sessionStorage.getItem("image")){
				this.imgSrc = window.sessionStorage.getItem("image")
			}else{
				this.getTouXiangImg()
			}
			
		},
		methods: {
			async getUserMsg(){
				let {data: res} = await this.$http.get("/user/grzl", { params: this.queryInfo })
				// let {data: res} = await this.$http({
				// 	methods: 'get',
				// 	url: '/user/grzl',
					
				// 	params: this.queryInfo,
					
				// 	withCredentials: true
				// })
				console.log(res.data)
				if(res.meta.status!==200){ return this.$message.error("获取用户信息失败") }
				this.formGet = res.data
				this.city1 = res.data.address.city1
				this.city11 = res.data.address.city11
				this.city2 = res.data.address.city2
				this.city22 = res.data.address.city22
				this.city3 = res.data.address.city3
				this.city33 = res.data.address.city33
			},
			changeProduct1() {
				this.city11 = this.city1.value
				this.city22 = ''
				this.city33 = ''
           	},
           	changeProduct2() {
				this.city22 = this.city2.value
				this.city33 = ''
           	},
           	changeProduct3() {
				this.city33 = this.city3.value
           	},
           	async post_grzl(){
           		this.formGet.address.city1 = this.city1
           		this.formGet.address.city11 = this.city11
           		this.formGet.address.city2 = this.city2
           		this.formGet.address.city22 = this.city22
           		this.formGet.address.city3 = this.city3
           		this.formGet.address.city33 = this.city33
           		var {data: res} = await this.$http.post('/user/grzl', this.formGet)
           		if(res.meta.status !== 200){ return this.$message.error("信息更新失败！") }
           		this.$message.success("信息更新成功！")
           		this.getUserMsg()
           	},
           	upload(){
           		this.$el.querySelector('.touInput').click()
           	},
           	handleFile(e){
           		let target = e.target || e.srcElement
           		let file = target.files[0]
           		if(file.size > 1050000){
           			return this.$message.error("图片过大")
           		}
           		var reader = new FileReader();
           		reader.onload = res => {
           			this.imgSrcPre = res.target.result;
           		}
				//将文件以Data URL形式读入页面
           		reader.readAsDataURL(file)

				
           		this.dialogVisible = true
				
           	},
           	// 头像放大
           	imgFaDa(){
           		this.touXiangDialogVisible = true
           	},
           	// 取消上传
           	postCancel(){
           		this.dialogVisible = false
           		this.$message.warning("上传取消")
           		// 解决当选择两次同样的图片时，不响应的问题
           		this.$el.querySelector('.touInput').value = ""
           	},
           	// 点击dialog,确定上传
           	async postSure(){
           		this.dialogVisible = false
           		let formImg = document.touXiangForm
           		await formImg.submit()
				// 上传成功同时更新浏览器存储里的image
				window.sessionStorage.setItem("image", this.imgSrcPre)
				this.imgSrc = this.imgSrcPre
				this.$emit('userUgrzl')
           		// 解决当选择两次同样的图片时，不响应的问题
           		this.$el.querySelector('.touInput').value = ""
           		this.$message.success("上传成功")
           	},
           	// 请求头像图片
           	async getTouXiangImg(){
           		let {data: res} = await this.$http.get("/touXiangGet", { params: this.queryInfo })
           		if(res.meta.status !== 200){ return this.$message.error("获取头像失败") }
           		let url = "data:image/png;base64," + res.data
           		this.imgSrc = url
           	}
		}
	}

</script>

<style lang="less" scoped>

	.userMsg{
		margin-left: 15%;
		width: 60%;
		background-color: rgb(240, 240, 240);
		padding-top: 2%;
		padding-left: 2%;
		.form_div{
			form div{
				margin-bottom: 30px;
			}
			form div span{
				margin-right: 60px;
				color: rgb(140, 140, 170);
			}
			form div select{
				height: 30px;
				margin-right: 5%;
			}
		}
		hr{
			margin-bottom: 25px;
		}
		div img{
			margin-left: 30px;
			width: 15%;
			height: auto;
		}
	}
	.nicheng{
		height: 25px;
		outline: none;
	}
	.touxiang{
		margin-bottom: 20px;
	}
	.submit{
		background-color: #99FF99;
		width: 80px;
		height: 40px;
		margin-left: 80%;
	}
	.block{
		display: inline-block;
	}
	.touButton{
		margin-left: 10%;
	}
	.dialogSpan{
		display: flex;
		justify-content: center;
		img{
			width: 80%;
			height: auto;
		}
	}
	.formTx{
		display: none;
	}
	.textarea{
		resize: none;
		vertical-align: middle;
		width: 50%;
	}


	

	
</style>