<template>
<div>
    <!-- 登录后的页面 -->
    <div class="maxDiv" v-if="isLogin">
        <!-- 头部 -->
        <div class="top">
            <!-- 头像 -->
            <div class="imgDiv">
                <img :src="img01" alt="">
            </div>
            <!-- 昵称，地址 -->
            <div class="ggzl">
                <div class="sex_nicheng">
                    <i class="el-icon-caret-right" v-if="sex === '男'"></i>
                    <i class="el-icon-caret-left" v-else></i>
                    {{nicheng}}
                </div>
                <div class="address">{{city}}</div>
            </div>
        </div>

        <!-- 下面 -->
        <div class="bottom">
            <!-- 简介 -->
            <div class="jj">
                <div>个人简介</div>
                <p>{{grjj}}</p>
            </div>
            <!-- 博客内容按钮 -->
            <!-- <div class="my_blogs" @click="goMyblogs">
                我的博客
            </div> -->

            <!-- 退出登录 -->
            <div class="exit" @click="exit">
                退出登录
            </div>
        </div>
    </div>



    <!-- 未登录的页面 -->
    <div class="not_login" v-else>


        <!-- 输入账号显示头像 -->
        <div class="imgDiv">
            <img :src="img01" alt="">
        </div>
        
        <!-- input框 -->
        <div class="inputDiv">
            <div class="userDiv">
                <el-input prefix-icon="el-icon-user" v-model="username" placeholder="请输入手机号" @blur="blurUsername"></el-input>
            </div>
            <div class="pwdDiv">
                <el-input prefix-icon="el-icon-user" type="password" v-model="password" placeholder="请输入密码" @blur="blurPwd"></el-input>
            </div>
        </div>
        <!-- 按钮 -->
        <div class="btnDiv">
             <el-button type="success" @click="login">登录</el-button>
        </div>
    </div>
</div>
    
</template>


<script>
export default {
    data(){
        return {
            img01: require('./kongbai.png'),
            username: '',
            password: '',
            isLogin: false,
            // 用户输入密码账号不对时展示
            imgError: require('./imgerror.png'),
            city: '',
            nicheng: '',
            grjj: '',
            sex: ''
        }
    },
    created(){
        if(window.sessionStorage.getItem("username") && window.sessionStorage.getItem("pwd")){
            this.isLogin = true
            this.username = window.sessionStorage.getItem("username")
            this.password = window.sessionStorage.getItem("pwd")
            this.img01 = window.sessionStorage.getItem("image")
            this.getUserMsg()
        }else{
            this.isLogin = false
        }
    },
    methods:{
        // // 去我的博客列表页
        // goMyblogs(){

        // },
        // 退出登录
        exit(){
            window.sessionStorage.clear()
            this.$router.replace('/')
        },
        async login(){
            let {data: res} = await this.$http.post('/login', {username: this.username, pwd: this.password})
            console.log(res)
            window.sessionStorage.setItem("username", this.username)
            window.sessionStorage.setItem("pwd", this.password)
            window.sessionStorage.setItem("image", "data:image/png;base64," + res.data)
            this.getUserMsg()
            this.isLogin = true
            
        },
        // username失去焦点
        async blurUsername(){
            if(this.username.length !== 11){
                return this.$message.warning("用户名格式错误！")
            }
            if(this.password.length > 5 && this.password.length < 16){
                let {data: res} = await this.$http.get('/touXiangGet', {params: { username: this.username, pwd: this.password }})
                if(res.meta.status !== 200){ 
                    this.img01 = this.imgError
                    return
                }
                this.img01 = "data:image/png;base64," + res.data
            }
        },
        // password失去焦点
        async blurPwd(){
            if(this.username.length === 0){
                return this.$message.warning("请输入用户名！")
            }
            if(this.username.length !== 11){
                return this.$message.warning("用户名格式错误！")
            }
            if(this.password.length < 6 || this.password.length > 15){
                return this.$message.warning("密码长度错误！")
            }
            let {data: res} = await this.$http.get('/touXiangGet', {params: { username: this.username, pwd: this.password }})
            console.log(res)
            if(res.meta.status !== 200){ 
                this.img01 = this.imgError 
                return
            }
            this.img01 = "data:image/png;base64," + res.data
        },
        // 获取user信息
        async getUserMsg(){
            console.log(this.username)
            console.log(this.password)
            let {data: res} = await this.$http.get("/user/grzl", { params: { username: this.username,pwd: this.password }})
            console.log(res.data)
            if(res.meta.status !== 200){ return this.$message.error("获取用户信息失败") }
            this.city = res.data.address.city11 + res.data.address.city22
            this.nicheng = res.data.nicheng
            this.grjj = res.data.grjj
            this.sex = res.data.sex
        }
    }
}
</script>


<style lang="less" scoped>
    .maxDiv{
        font-size: 5vw;
        .top{
            width: 100%;
            height: 20vh;
            display: flex;
            .imgDiv{
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    width: 30vw;
                    height: 30vw;
                }
            }

            .ggzl{
                padding: 2%;
                flex: 2;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .sex_nicheng{
                    font-family: "Lucida Console", "Courier New", monospace;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .address{
                    font-family: "Lucida Console", "Courier New", monospace;
                    
                }
            }
        }

        .bottom{
            padding: 3%;
            .jj{
                div{
                    font-size: 16px;
                    font-weight: 200px;
                    color: rgb(95, 99, 104);
                }
                p{
                    padding: 0 5%;
                    font-weight: 300;
                }
            }
            .exit{
                height: 8vh;
                border-bottom: 1px solid rgb(238, 233, 233);
                border-top: 1px solid rgb(238, 233, 233);
                cursor: pointer;
                line-height: 8vh;
                text-align: center;
                width: 100%;
                font-weight: 200px;
            }
            // .my_blogs{
            //     border-top: 1px solid rgb(238, 233, 233);
            // }
        }

    }
    .not_login{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        .imgDiv{
            box-sizing: border-box;
            img{
                width: 100px;
                height: 100px;
                border: 1px solid red;
                border-radius: 50%;
            }
        }
        .inputDiv{
            position: absolute;
            top: 180px;
            .userDiv{
                background-color: springgreen;
                margin-bottom: 10px;
            }
            .pwdDiv{
                background-color: tomato;
            }
        }
        .btnDiv{
            position: absolute;
            top: 380px;
        }
    }
    
</style>