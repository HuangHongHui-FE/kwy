<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-4" v-for="(item) in leonardData" :key="item.index" @click="goLeonardShow(item)">
                    <div class="box">
                        <img :src="$http.defaults.baseURL + item.files[0]">
                        <div class="box-content">
                            <h3 class="title">{{item.inputTitle}}</h3>
                            <span class="post">{{item.userdata[0].nicheng}}</span>
                        </div>
                    </div>
                </div>
                <!-- <div class="col-md-4">
                    <div class="box">
                        <img :src="img01">
                        <div class="box-content">
                            <h3 class="title">Miranda Roy</h3>
                            <span class="post">前端开发</span>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            // img01: require('../../../assets/01.png'),
            leonardData: [],
            page: 0
        }
    },
    created(){
        this.getLeonard()
    },
    mounted(){
        // 添加窗口滚动事件
        window.addEventListener('scroll',this.handleScrollx, true)
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.handleScrollx, true);
    },
    methods:{
        async getLeonard(){
            let {data: res} = await this.$http.get("/share/leonard", {params: {page: this.page}})
            console.log(res)
            if(res.meta.status!==200){ return this.$message.warning("没有更多数据！"); }
            this.leonardData = this.leonardData.concat(res.data)
            console.log(this.leonardData)
        },
        goLeonardShow(item){
            // console.log(item)
            const obj = this.$router.resolve({
                name: `/leonardShow?item=${item.files}`
            });
            window.open(obj.location.name, '_blank');
        },
        handleScrollx(){
            // 用来获取滚动的距离，顶部距离浏览器内上边框的距离(为负值)，反过来就为
            let scrollLen = document.documentElement.getBoundingClientRect().top
            // 滚动条的总高度
            let scrollTotalLen = document.documentElement.scrollHeight
            // 窗口高度
            let clientLen = document.documentElement.clientHeight
            if(clientLen - scrollLen >= scrollTotalLen - 1){
                this.page = this.page + 1
                this.getLeonard()
            }
        }
    }
}
</script>


<style lang="less" scoped>
    .container{
        width: 80%;
        position: relative;
        left: 10%;
        .row{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            .col-md-4{
                width: 40%;
                background-color: violet;
                margin: 2%;
                cursor: pointer;
                .box{
                    background: linear-gradient(#8E2DE2,#4A00E0);
                    font-family: 'Merriweather Sans', sans-serif;
                    border-radius: 7px;
                    position: relative;
                    overflow: hidden;
                    width: 100%;
                    img{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        height: 250px;
                        transition: all 0.5s ease;
                        -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                    }
                    &:before{
                        content: "";
                        background: -webkit-repeating-linear-gradient(45deg,rgba(0, 0, 0, 0.1) 10px,
                                    transparent 10px,transparent 20px,rgba(0,0,0,0.1) 20px,rgba(0,0,0,0.1) 30px,
                                    transparent 30px,transparent 40px,rgba(0,0,0,0.1) 40px,rgba(0,0,0,0.1) 50px,
                                    transparent 50px,transparent 60px,rgba(0,0,0,0.1) 60px,rgba(0,0,0,0.1) 70px,
                                    transparent 70px,transparent 80px,rgba(0, 0,0, 0.1) 80px,
                                    rgba(0, 0,0, 0.1) 90px,transparent 90px);
                        width: 100%;
                        height: 100%;
                        opacity: 0;
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 0;
                        transition: all 0.5s;
                    }
                    &:hover:before{ opacity:1; }
                    &:hover{
                        img{
                            opacity: 0.5;
                            -webkit-clip-path: polygon(50% 0, 99% 50%, 50% 99%, 0 50%);
                            clip-path: polygon(50% 0, 99% 50%, 50% 99%, 0 50%);
                        }
                        .box-content{
                            opacity: 1;
                            transform: translateX(-50%) translateY(-50%) rotate(0deg);
                        }
                    }

                    .box-content{
                        color: #fff;
                        text-align: center;
                        width: 100%;
                        opacity: 0;
                        transform: translateX(-50%) translateY(-50%) rotate(-55deg);
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        z-index: 1;
                        transition: all 0.5s;
                    }
                    .title{
                        font-size: 25px;
                        font-weight: 700;
                        text-transform: uppercase;
                        text-shadow: 0 0 5px #000;
                        margin: 0 0 3px 0;
                    }
                    .post{
                        font-size: 16px;
                        text-shadow: 0 0 5px #000;
                        text-transform: capitalize;
                        display: block;
                    }
                }
            }
        }
    }




    
    
</style>