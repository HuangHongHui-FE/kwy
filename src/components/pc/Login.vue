<template>
  <div class="login_container">

	<div :class="flag==0? 'login_box': 'reg_box'">
		<div :class="flag==0 ?['on', 'login']: 'login'" @click="clickLogin">
			登录
		</div>
		<div :class="flag==1 ?['on', 'reg']: 'reg'" @click="clickReg">
			注册
		</div>
		<!-- 登录页 -->
		<div v-if="flag==0? true: false">
			<!-- 头像区域 -->
			<div class="avatar_box">
				<img src="../../assets/touxiang.jpg">
			</div>
			
			<!-- 登陆表单区域     ref用来后面获取实例对象-->
			<el-form label-width="0px" class="login_form" :model="loginForm" ref="loginFormRef" :rules="loginFormRules">
			<!-- 用户名 -->
				<el-form-item prop="username">
					<el-input prefix-icon="el-icon-user" v-model="loginForm.username" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<!-- 密码 -->
				<el-form-item prop="pwd">
					<el-input prefix-icon="iconfont icon-mima" v-model="loginForm.pwd" type="password" placeholder="请输入密码" show-password></el-input>
				</el-form-item>
				<!-- 图片验证码 -->
				<el-form-item prop="sureCode">
					<el-input prefix-icon="el-icon-picture" v-model="loginForm.sureCode" placeholder="请输入验证码" class="codeInput"></el-input>
					<div class="imgDiv" @click="getImgCodeLogin">
						<img :src="imgCodeLogin" alt="图片验证码" title="看不清？点击换">
					</div>
				</el-form-item>
				<!-- 按钮区域 -->
				<el-form-item class="btns">
					<el-button type="primary" @click="login">登录</el-button>
					<el-button type="info" @click="resetLoginForm">重置</el-button>
				</el-form-item>
			</el-form>
		</div>

		<!-- 注册页 -->
		<div v-if="flag==1? true: false">
			<!-- 头像区域 -->
			<div class="avatar_box">
				<img src="../../assets/touxiang.jpg">
			</div>
			
			<!-- 注册表单区域     ref用来后面获取实例对象-->
			<el-form label-width="0px" class="login_form" :model="regForm" ref="regFormRef" :rules="regFormRules" status-icon>
				<!-- 用户名 -->
				<el-form-item prop="usernameReg">
					<el-input prefix-icon="el-icon-user" v-model="regForm.usernameReg" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<!-- 密码 -->
				<el-form-item prop="pwd01">
					<el-input prefix-icon="iconfont icon-mima" v-model="regForm.pwd01" type="password" placeholder="请输入密码" show-password></el-input>
				</el-form-item>
				<el-form-item prop="pwd02">
					<el-input prefix-icon="iconfont icon-mima" v-model="regForm.pwd02" type="password" placeholder="请确认密码" show-password></el-input>
				</el-form-item>
				<el-form-item prop="regCode">
					<el-input prefix-icon="el-icon-picture" v-model="regForm.regCode" placeholder="请输入图片验证码" class="codeInput"></el-input>
					<!-- 图片验证码区域 -->
					<div class="imgDiv" @click="getImgCodeReg">
						<img :src="imgCodeReg" alt="图片验证码" title="看不清？点击换">
					</div>
				</el-form-item>
				<!-- <el-form-item prop="pwd">
					<el-input prefix-icon="el-icon-chat-dot-square" v-model="loginForm.pwd" placeholder="请输入短信验证码" class="codeInput"></el-input>
					<div class="sendCode">发送验证码</div>
				</el-form-item> -->
				<!-- 按钮区域 -->
				<el-form-item class="btns">
					<el-button type="primary" @click="reg">注册</el-button>
					<el-button type="info" @click="resetRegForm">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
  </div>
</template>


<script>
export default {
	data(){
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				if(value.length < 6 || value.length > 15){
					callback(new Error('密码长度在6到15位'));
				}
				if (this.regForm.pwd02 !== '') {
					this.$refs.regFormRef.validateField('pwd02');
				}
				callback();
			}
		};
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			}else if(value.length < 6 || value.length > 15) {
				callback(new Error('密码长度在6到15位'));
			}else if (value !== this.regForm.pwd01) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		var validatePass3 = (rule, value, callback) => {
			let ls = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
			let m = 1
			for(let i = 0; i< value.length; i++){
				if (!ls.includes(value[i])){
					m = 0
				}
			}
			if (value === '') {
				callback(new Error('请输入手机号！'));
			}else if(m === 0) {
				callback(new Error('手机号不该全为数字吗？？？'));
			}else if (value.length !== 11) {
				callback(new Error('手机号长度不应该为11位吗？？？'));
			} else {
				callback();
			}
		};
		return {
			// 登录表单的数据绑定对象
			loginForm: {
				username: '',
				pwd: '',
				sureCode: ''
			},
			// 表单的验证规则对象
			loginFormRules: {
				// 验证用户名
				username: [
					{ required: true, message: '请输入手机号', trigger: 'blur' },
					/*trigger: 文本框失去焦点时触发验证*/
					{ min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
				],
				// 验证密码
				pwd: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
				],
				sureCode: [
					{ required: true, message: '请输入图片验证码内容', trigger: 'blur' },
					{ min: 4, max: 4, message: '长度为四个字符', trigger: 'blur' }
				]
			},

			// 注册表单的数据绑定对象
			regForm: {
				usernameReg: '',
				pwd01: '',
				pwd02: '',
				regCode: ""
			},
			// 注册表单的验证规则对象
			regFormRules: {
				// 验证用户名
				usernameReg: [
					{ validator: validatePass3, trigger: 'blur' }
				],
				// 验证密码
				pwd01: [
					{ validator: validatePass, trigger: 'blur' }
				],
				// 确认密码
				pwd02: [
					{ validator: validatePass2, trigger: 'blur' }
				],
				regCode: [
					{ required: true, message: '请输入图片验证码内容', trigger: 'blur' },
					{ min: 4, max: 4, message: '长度为四个字符', trigger: 'blur' }
				]
			},
			flag: 0,
			// 返回的图片验证码信息
			imgCodeReg: '',
			strReg: '',
			imgCodeLogin: '',
			strLogin: ''
		}
	},
	created(){
		// this.loginForm.username = window.sessionStorage.getItem("username")
		// this.loginForm.pwd = window.sessionStorage.getItem("pwd")
		this.getImgCodeLogin()
	},
	methods: {
		// 点击重置按钮重置登陆表单
		resetLoginForm() {
			this.$refs.loginFormRef.resetFields();
		},
		resetRegForm() {
			this.$refs.regFormRef.resetFields();
		},
		// 登陆前的预验证
		login(){
			this.$refs.loginFormRef.validate(async valid => {
				if (!valid) return;
				// 验证码不正确的时候
				if (this.loginForm.sureCode !== this.strLogin){
					this.getImgCodeLogin()
					this.loginForm.sureCode = ''
					return this.$message.error("请输入正确的验证码!");
				} 

				const {data: res} = await this.$http.post("login", this.loginForm);

				console.log("login", res)
				// 账号密码不正确时
				if(res.meta.status !== 200) {
					this.getImgCodeLogin()
					this.loginForm.sureCode = ''
					return this.$message.error("登录失败,请检查账号或密码输入是否有误！");
				}
				this.$message.success("登陆成功");
				
				// 加密的用户名密码存起来
				window.sessionStorage.setItem('username', res.data[0].username);
				// window.sessionStorage.setItem('pwd', this.loginForm.pwd);
				// window.localStorage.setItem('username', res.data[0].username);
				window.sessionStorage.setItem('pwd', res.data[0].pwd);
				window.sessionStorage.setItem('image', 'data:image/jpeg;base64,' + res.data[0].img);	
				this.$router.replace("/");
			})
		},
		// 注册前的预验证
		reg(){
			
			this.$refs.regFormRef.validate(async valid => {
				if (!valid) return;

				// 验证码不正确的时候
				if (this.regForm.regCode !== this.strReg){
					this.getImgCodeReg()
					this.regForm.regCode = ''
					return this.$message.error("请输入正确的验证码!");
				}

				console.log(this.regForm)
				let {data: res} = await this.$http.post("/register", this.regForm)
				console.log(res)
				this.flag = 0
				this.getImgCodeReg()
				// 返回444, 就是已经注册过了
				if(res.meta.status === 444){ return this.$message.warning("您已注册请直接登录！") }
				if(res.meta.status === 405){ return this.$message.error("两次密码输入不同！") }
				if(res.meta.status === 200){ return this.$message.success("注册成功，快去登录吧"); }
				if(res.meta.status === 404){ return this.$message.error("注册失败") }
				
			})
		},
		// 获取验证码图片
		async getImgCodeReg(){
			let {data: res} = await this.$http.get("/imgCode")
			console.log(res)
			if(res.meta.status !== 200){ return this.$message.error("获取图片验证码失败") }
			this.imgCodeReg = "data:image/png;base64," + res.data[0]
			this.strReg = res.data[1]
		},
		async getImgCodeLogin(){
			let {data: res} = await this.$http.get("/imgCode")
			console.log(res)
			if(res.meta.status !== 200){ return this.$message.error("获取图片验证码失败") }
			this.imgCodeLogin = "data:image/png;base64," + res.data[0]
			this.strLogin = res.data[1]
		},
		clickLogin(){
			this.flag = 0
			this.$refs.regFormRef.resetFields();
			this.loginForm = {
				username: '',
				pwd: '',
				sureCode: ''
			}
			if(!this.strLogin){
				this.getImgCodeLogin()
			}
		},
		clickReg(){
			this.flag = 1
			this.$refs.loginFormRef.resetFields();
			this.regForm = {
				usernameReg: '',
				pwd01: '',
				pwd02: '',
				regCode: ""
			}
			if(!this.strReg){
				this.getImgCodeReg()
			}
		}
	}
}
</script>


<style lang="less" scoped>  /*设置style只在当前组件内生效*/
.login_container {
	background-color: #2b4b6b;
	height: 100%;
}

.login_box, .reg_box{
	width: 450px;
	background-color: #fff;
	border-radius: 3px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);

	.avatar_box {
		height: 130px;
		width: 130px;
		border: 1px solid #eee;
		border-radius: 50%;
		box-shadow: 0 0 10px #ddd;
		padding: 10px;
		position: absolute;  /*绝对定位*/
		left: 50%;  /*距离左侧50%*/
		transform: translate(-50%, -50%);  /*向后移动图片自身的50%,再向上移动50%, %根据avatar_box的高度来比*/
		background-color: #fff;
		img{
			width: 100%;
			height: 100%;
			border-radius: 50%;
			background-color: #eee;
		}
	}
}
.login_box{
	height: 400px;
}
.reg_box{
	height: 450px;
}
.login_form{
	position: absolute;
	bottom: 0;
	width: 100%;
	padding: 0 20px;
	box-sizing: border-box;  /*嘎嘎嘎嘎*/
	.codeInput{
		width: 50%;
	}
	// 图片验证码
	.imgDiv{
		background-color: springgreen;
		display: inline-block;
		width: 40%;
		position: absolute;
		right: 5%;
		height: 100%;
		img{
			width: 100%;
			height: 100%;
		}
	}
	// 发送验证码
	.sendCode{
		background-color: springgreen;
		display: inline-block;
		width: 25%;
		position: absolute;
		right: 15%;
		text-align: center;
		border-radius: 10px;
	}
}
.btns{
	display: flex;
	justify-content: flex-end;
}


.login{
	cursor: pointer;
	text-align: center;
	width: 70px;
	height: 30px;
	display: inline-block;
	color: rgb(6, 176, 243);
	font-size: 25px;
	// background-color: red;
	&:hover{
		background-color: whitesmoke;
		color: skyblue;
	}
}
.on{
	background-color: rgb(217, 231, 221);
}
// 144, 147, 153
.reg{
	cursor: pointer;
	text-align: center;
	width: 70px;
	height: 30px;
	display: inline-block;
	// background-color: rosybrown;
	color: rgb(6, 176, 243);
	font-size: 25px;
	position: absolute;
	right: 0;
	&:hover{
		background-color: whitesmoke;
		color: skyblue;
	}
}
</style>
