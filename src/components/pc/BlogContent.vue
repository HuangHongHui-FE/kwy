<template>
    <div>
        <!-- pc端 -->
        <div class="content">
            <!-- 左边 -->
            <div class="left">
                <!-- 用户头像跟昵称 -->
                <div class="leftUserImgNc">
                    <div class="imgDiv">
                        <img :src="data_image" alt="">
                    </div>
                    <div class="nicheng">
                        {{nicheng}}
                    </div>
                </div>
                <!-- 用户作品 -->
                <div class="leftUserBlog">
                    <ul>
                        <li v-for="(item) in blogList" :key="item._id" @click="changeBlog(item)">
                            <img :src="item.file==''? imgKong: item.file" alt="">
                            <p class="inputTitle">{{item.inputTitle}}</p>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- 右边 -->
            <div class="right">
                <!-- 标题 -->
                <div class="inputTitle">
                    <div>
                        标题: {{blogCon.inputTitle}}
                    </div>
                    <p>{{blogCon.time | dateFormat}}</p>
                </div>

                <!-- 内容 -->
                <div class="editor">
                    <mavon-editor
                        :value="blogCon.html"
                        defaultOpen="preview"
                        :boxShadow="false"
                        :editable="false"
                        :subfield="false"
                        :toolbarsFlag="false"
                    >
                    </mavon-editor>
                </div>

                <!-- 已有的评论显示，浏览数 -->
                <div class="view_commentDiv">
                    <!-- 评论与浏览数在一行上 -->
                    <div class="view_comment">
                        <div>评论:</div>
                        <!-- ！！！！！！！！！！！！插个眼 -->
                        <div>阅读 {{blogCon.views}}</div>
                    </div>
                    <!-- 展示所有评论 -->
                    <p v-for="(item, index) in blogCon.comments" :key="index">
                        <i class="el-icon-chat-dot-round"></i>
                        &nbsp;&nbsp;&nbsp;&nbsp;{{item}}
                    </p>
                </div>

                <!-- 写评论 -->
                <div class="inputDiv">
                    <el-input
                        placeholder="请输入想要评论的内容"
                        v-model="commentInput"
                    >
                    <template #append>
                        <el-button icon="el-icon-s-promotion" @click="commentSub">发表评论</el-button>
                    </template>
                    </el-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
export default {
    components: {
        mavonEditor
    },
    data(){
        return {
            data_image: '',
            blogCon: [],
            nicheng: '',
            blogList: [],
            imgKong: require("../../static/img/blogLogo.png"),
            commentInput: ''
        }
    },
    created(){
        let id = this.$route.query._id
        this.getBlogContent(id)
    },
    methods: {
        async getBlogContent(id){
            let {data: res} = await this.$http.get("/user/getBlogConById", {params: {_id: id}})
            console.log(res)
            if(res.meta.status !== 200){ return this.$message.error("获取blog数据信息失败！") }
            this.blogCon = res.data[0]
            // console.log("blogCon", this.blogCon)
            this.data_image = "data:image/jpeg;base64," + res.data[1].data_image
            this.nicheng = res.data[2].nicheng
            this.blogList = res.data.slice(3)
        },
        async changeBlog(item){
            let {data: res} = await this.$http.get("/user/getBlogById", {params: {_id: item._id}})
            if(res.meta.status !== 200){ return this.$message.error("获取blog数据信息失败！") }

            this.blogCon = res.data[0]
            console.log(this.blogCon)
        },
        async commentSub(){
            let {data:res} = await this.$http.post("/user/updateComment", {_id: this.blogCon._id, comment: this.commentInput})
            if(res.meta.status !== 200){ return this.$message.error("评论失败！") }
            this.commentInput = ''
            this.getBlogContent(this.blogCon._id)

        }
    }
}
</script>

<style lang="less" scoped>

@media only screen and (max-width: 1099px) {
	.content{
        .left{
            box-sizing: border-box;
            width: 100%;
            .leftUserImgNc{
                display: flex;
                justify-content: center;
                align-items: center;
                .imgDiv{
                    img{
                        width: 100px;
                        height: auto;
                    }
                }
                .nicheng{
                    font-size: 30px;
                    font-family: "Lucida Console", "Courier New", monospace;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
            .leftUserBlog{
                display: none;
            }

        }
        .right{
            box-sizing: border-box;
            padding: 0 5%;
            width: 100%;
            .inputTitle{
                white-space:nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                div{
                    margin: 3% 0;
                    font-size: 25px;
                    color: goldenrod;
                    font-family: "Lucida Console", "Courier New", monospace;
                    white-space:nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                p{
                    font-family: "Lucida Console", "Courier New", monospace;
                    display: flex;
                    justify-content: flex-end;
                }
            }
            .editor{
                box-sizing: border-box;
                width: 100%;
            }
            .view_commentDiv{
                margin-top: 3%;
                .view_comment{
                    display: flex;
                    justify-content: space-between;
                    div{
                        padding: 0 3%;
                        font-size: 18px;
                        font-weight: 300;
                    }
                }
                p{
                    color: grey;
                    font-weight: 300px;
                    i{
                        color: violet;
                    }
                }
            }
            .inputDiv{
                margin-top: 3%; margin-left: 1%;
            }
            
        }
	}
}


@media only screen and (min-width: 1100px) {
    .content{
        display: flex;
        .left{

            // 滚动的导航栏样式修改
            &::-webkit-scrollbar {  
                width: 6px; 
                height: 0px;
            }

            &::-webkit-scrollbar-thumb {
                background: transparent;
            }

            &:hover::-webkit-scrollbar {
                width: 6px;
                height: 0px;
                background: rgba(238, 238, 238, 1);
                border-radius: 6px;
            }
            &:hover::-webkit-scrollbar-thumb {
                background: #9bcaff;
                border-radius: 10px;
            }
            
            height: 720px;
            width: 20%;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            overflow-x: hidden;
            .leftUserImgNc{
                display: flex;
                flex-direction: column;
                align-items: center;
                .imgDiv{
                    width: 50%;
                    img{
                        width: 100%;
                        height: auto;
                    }
                }
                .nicheng{
                    font-family: "Lucida Console", "Courier New", monospace;
                }
            }

            .leftUserBlog{
                ul{
                    cursor: pointer;
                    padding: 0;
                    li{
                        margin-left: 5%;
                        list-style: none;
                        display: flex;
                        align-items: center;
                        border-bottom: 1px dotted rgb(200, 200, 200);
                        img{
                            width: 10%;
                            height: 90%;
                            margin-right: 5%;
                        }
                        p{
                            font-weight: 300;
                        }
                    }
                }
            }
        }

        .right{
            padding: 0 5%;
            width: 80%;
            .inputTitle{
                // margin-left: 10%;
                white-space:nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                div{
                    margin: 3% 0;
                    font-size: 25px;
                    color: goldenrod;
                    font-family: "Lucida Console", "Courier New", monospace;
                    white-space:nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                p{
                    font-family: "Lucida Console", "Courier New", monospace;
                    display: flex;
                    justify-content: flex-end;
                }
            }
            .editor{
                width: 100%;
                background-color: darkorange;
            }
            .view_commentDiv{
                margin-top: 3%;
                .view_comment{
                    display: flex;
                    justify-content: space-between;
                    div{
                        padding: 0 3%;
                        font-size: 18px;
                        font-weight: 300;
                    }
                }
                p{
                    color: grey;
                    font-weight: 300px;
                    i{
                        color: violet;
                    }
                }
            }
            .inputDiv{
                margin-top: 3%; margin-left: 1%;
            }
            
        }
    }
}
    
</style>