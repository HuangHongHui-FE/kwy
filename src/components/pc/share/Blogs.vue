<template>
    <div class="maxDiv">
        <div class="left_right">
            <!-- 左边分类 -->
            <div class="leftItem">
                <div @click="pageBlogsGet">分类</div>
                <ul>
                    <li v-for="(item1, index) in liList" :key="index" @click="classifyBlogGet(item1.name)">{{item1.name | kong}}</li>
                </ul>
            </div>
            <!-- 右边内容 -->
            <div class="rightItem">
                <div class="blogShow" v-for="(item) in dataListCom" :key="item.time">
                    <!-- 图片 -->
                    <div class="imgDiv">
                        <img :src="item.file == ''? img01: item.file" alt="封面图片" title="封面图片" @click="blogContent(item._id)">
                    </div>
                    <!-- Middle -->
                    <div class="middle">
                        <div class="title" @click="blogContent(item._id)">
                            {{item.inputTitle}}
                        </div>
                        <div class="fenlei">
                            分类: {{item.value || classify}}
                        </div>
                        <div class="reader">
                            阅读 {{item.views}} - 评论 {{item.comments.length}}
                        </div>
                    </div>

                    <!-- right -->
                    <div class="right">
                        <div class="time">
                            {{item.time | dateFormat}}
                            <!-- 2021-08-05  13:42:30 -->
                        </div>
                    </div>
                </div>

                <!-- 所有数据时的分页 -->
                <template v-if="!isClassify">
                    <div class="block">
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="20"
                            layout="total, prev, pager, next, jumper"
                            :total="total"
                        >
                        </el-pagination>
                    </div>
                </template>

                <!-- 分类数据时的分页 -->
                <template v-else>
                    <div class="block">
                        <el-pagination
                            @current-change="handleCurrentChangeClassify"
                            :current-page="classifyPage"
                            :page-size="20"
                            layout="total, prev, pager, next, jumper"
                            :total="classifyTotal"
                        >
                        </el-pagination>
                    </div>
                </template>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            liList: [],
            // 分页
            currentPage: 1,
            // 所有博客信息
            dataList: [],
            img01: require("../../../assets/blogLogo.png"),
            total: 0,
            // 默认分类
            classify: "未分类",
            // 分类的类名，分类数据分页查询使用
            name: null,
            classifyPage: 1,
            classifyTotal: 0,
            // 标志是不是classify请求的数据
            isClassify: false
        }
    },
    created(){
        this.pageBlogsGet()
        
    },
    mounted(){
        // this.classifyGet()
    },
    methods:{
        async pageBlogsGet(){
            this.isClassify = false
            let {data: res} = await this.$http.get("/share/blogs/allBlogs", {params: {currentPage: this.currentPage - 1}})
            if(res.meta.status !== 200){ return this.$message.error("获取博客数据失败！") }
            this.dataList = res.data
            this.total = res.data[res.data.length - 1].total

            // 分类标签的获取
            let {data: res1} = await this.$http.get("/user/writeBlog/classify")
            if(res1.meta.status !== 200){ return this.$message.error("获取分类数据失败！") }
            this.liList = res1.data
        },
        handleCurrentChange(val) {
            this.isClassify = false
            this.currentPage = val
            this.pageBlogsGet()
        },

        blogContent(_id){
            this.$http.post("/user/updateView", {_id: _id})
            const obj = this.$router.resolve({
                name: `/blogContent?_id=${_id}`
            });
            window.open(obj.location.name, '_blank');
        },
        // 分类标签的获取
        // async classifyGet(){
        //     let {data: res} = await this.$http.get("/user/writeBlog/classify")
        //     console.log(res)
        //     if(res.meta.status !== 200){ return this.$message.error("获取分类数据失败！") }
        //     this.liList = res.data
        // },
        // 分类博客数据信息获取,第一次点击分类标签时触发，以后触发就是触发这一分类的分页按钮了
        async classifyBlogGet(name){
            this.name = name
            this.classifyPage = 1
            this.isClassify = true
            let {data: res} = await this.$http.get("/share/classifyBlogGet", { params: { value: this.name, classifyPage: this.classifyPage }})
            if(res.meta.status !== 200){ return this.$message.error("获取分类博客数据失败！") }
            this.classifyTotal = res.data[res.data.length - 1].total
            this.dataList = res.data
        },
        handleCurrentChangeClassify(val){
            this.isClassify = true
            this.classifyBlogGetNext(val)
        },
        // 分页按钮触发的时候
        async classifyBlogGetNext(val){
            this.classifyPage = val
            let {data: res} = await this.$http.get("/share/classifyBlogGet", { params: { value: this.name, classifyPage: this.classifyPage }})
            if(res.meta.status !== 200){ return this.$message.error("获取分类博客数据失败！") }
            this.classifyTotal = res.data[res.data.length - 1].total
            this.dataList = res.data
        }
    },
    computed: {
        dataListCom(){
            return this.dataList.slice(0, this.dataList.length - 1)
        }
    }
}
</script>


<style lang="less" scoped>



    .maxDiv{
        display: flex;
        justify-content: center;
    }
    .left_right{
        // background-color: tomato;
        width: 80%;
        display: flex;
        .leftItem{
            
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
            height: 570px;
            overflow-y: auto;
            width: 15%;
            display: flex;
            flex-direction: column;
            align-items: center;
            div{
                font-family: "Lucida Console", "Courier New", monospace;
                font-size: 25px;
                font-weight: 500px;
                cursor: pointer;
            }
            ul{
                
                // background-color: yellow;
                cursor: pointer;
                padding: 0;
                width: 50%;
                text-align: center;
                li{
                    line-height: 50px;
                    width: 100%;
                    height: 50px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    list-style: none;
                }
            }
        }
        .rightItem{
            display: flex;
            flex-direction: column;
            width: 85%;
            margin-left: 5%;

            .blogShow{
                height: 160px;
                // margin: 20px;
                display: flex;
                border-bottom: 1px dotted rgb(200, 200, 200);
                .imgDiv{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    cursor: pointer;
                    img{
                        width: 140px;
                        height: 140px;
                        
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
                        font-size: 23px;
                        color: rgb(250, 14, 14);
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        word-break: break-all;
                    }
                    .fenlei{
                        color: rgb(43, 17, 156);
                    }
                    .reader{
                        font-family: "Lucida Console", "Courier New", monospace;
                    }
                }
                .right{
                    padding: 10px;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .time{
                        display: flex;
                        justify-content: flex-end;
                    }
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