<template>
	<div>
		<div class="right">
			<div class="title">
				<h3>个人资料</h3>
			</div>
			<hr>
			<div class="touxiang">
				<img src="../../assets/01.png" alt="头像">
				<button>更换头像</button>
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
						<textarea :value="formGet.grjj"></textarea>
					</div>
					<input value="提交修改" type="button" class="submit" @click="post_grzl()">
				</form>
			</div>
		</div>
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
				// 要提交的表单数据
				formPost: {

				},
				// option选中的城市
				city1: {},
				city11: '',
				city2: {},
				city22: '',
				city3: {},
				city33: '',
				// 请求user信息时要上传的参数
				queryInfo: {}
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
				console.log(res)
				if(res.meta.status!==200){ return this.$message.error("获取用户信息失败") }
				this.formGet = res.data
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
           		var data = await this.$http.post('/user/grzl', this.formGet)
           		console.log(data)
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
	
</style>