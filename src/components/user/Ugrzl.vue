<template>
	<div>
		<div class="right">
			<div class="title">
				<h3>个人资料</h3>
			</div>
			<hr>
			<div class="touxiang">
				<img :src="imgSrc" alt="头像" title="放大" @click="imgFaDa()">
				<span>
					<form action="http://127.0.0.1:3000/touXiang" method="POST" enctype="multipart/form-data" class="formTx" name="touXiangForm" target="tg">
						<!-- name属性一定一定要加上 -->
						<input type="file" accept="image/*" class="touInput" name="pic" @change="handleFile">
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
						<input type="text" class="nicheng" v-model="formGet.nicheng" @click="ncInput()">
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
						<textarea v-model="formGet.grjj"></textarea>
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
			  	<img :src="dialogImgSrc">
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
			  	<img :src="dialogImgSrc">
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
				// 请求user信息时要上传的参数
				queryInfo: {},
				imgSrc: require("../touxiang.jpg"),
				dialogVisible: false,
				dialogImgSrc: require("../touxiang.jpg"),
				touXiangDialogVisible: false
			}
		},
		created(){
			console.log(cityData)
			let username = window.sessionStorage.getItem("username")
			let pwd = window.sessionStorage.getItem("pwd")
			this.queryInfo = { username: username, pwd: pwd }
			this.getUserMsg()
		},
		methods: {
			async getUserMsg(){
				let {data: res} = await this.$http.get("/user/grzl", { params: this.queryInfo })
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
				console.log(this.city1)
				console.log(this.city11)
           	},
           	changeProduct2() {
				this.city22 = this.city2.value
				this.city33 = ''
				console.log(this.city2)
				console.log(this.city22)
           	},
           	changeProduct3() {
				this.city33 = this.city3.value
				console.log(this.city3)
				console.log(this.city33)
           	},
           	changeBorder(x) {
           		console.log(x)
           	},
           	ncInput(){
           		this.name = ""
           	},
           	async post_grzl(){
           		this.formGet.address.city1 = this.city1
           		this.formGet.address.city11 = this.city11
           		this.formGet.address.city2 = this.city2
           		this.formGet.address.city22 = this.city22
           		this.formGet.address.city3 = this.city3
           		this.formGet.address.city33 = this.city33
           		var {data: res} = await this.$http.post('/user/grzl', this.formGet)
           		// console.log(res)
           		if(res.meta.status !== 200){ return this.$message.error("信息更新失败！") }
           		this.$message.success("信息更新成功！")
           		this.getUserMsg()
           	},
           	upload(){
           		this.$el.querySelector('.touInput').click()
           	},
           	handleFile(e){
           		console.log(e)
           		let target = e.target || e.srcElement
           		console.log(target.files)
           		let file = target.files[0]
           		if(file.size > 130000){
           			return this.$message.error("图片过大")
           		}
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
           	// 确定上传
           	postSure(){
           		this.dialogVisible = false
           		let res = document.touXiangForm.submit()
           		console.log(res)
           		// 解决当选择两次同样的图片时，不响应的问题
           		this.$el.querySelector('.touInput').value = ""
           		this.$message.success("上传成功")
           	}
		}
	}

</script>

<style lang="less" scoped>
	.right{
		margin-top: 60px;
		background-color: rgb(240, 240, 240);
		padding: 5px;
		height: 100%;
		float: right;
		width: 75%;
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
				margin-right: 60px;
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
		div span input{
			// width: 1px;
		}
	}
	.nicheng{
		height: 25px;
	}
	.touxiang{
		margin-bottom: 20px;
	}
	.submit{
		background-color: #99FF99;
		width: 80px;
		height: 40px;
		float: right;
		margin-right: 20px;
		margin-bottom: 20px;
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
	
</style>