<template>
    <div>
        <div class="contentDiv">
            <!-- 顶部搜索框 -->
            <div class="search">
                <el-autocomplete
                    class="inline-input"
                    v-model="inputBlog"
                    :fetch-suggestions="querySearchBlogs"
                    :placeholder="placeholder"
                    :trigger-on-focus="false"
                    @select="handleSelectBlogs"
                    @focus.once="searchBlogs"
                >
                </el-autocomplete>
            </div>
            
            <!-- 左侧分类 -->
            <div class="classify">
                <div @click="pageBlogsGet">默认分类</div>
                <div v-for="(item1, index) in classifyList" :key="index" @click="classifyBlogGet(item1.name)">{{item1.name}}</div>
            </div>
            <!-- 博客列表 -->
            <div class="blogs" @scroll="handleScroll($event)">
                <div class="blog" v-for="item in dataListCom" :key="item.time">
                    <div class="imgDiv" @click="goBlogContent(item)">
                        <img :src="item.file == ''? imgBlogLogo: item.file" alt="封面">
                    </div>
                    
                    <div class="blog_right">
                        <div @click="goBlogContent(item)">{{item.inputTitle}}</div>
                        <div>
                            <i class="el-icon-caret-right"></i>{{item.views}}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <i class="el-icon-caret-right"></i>{{item.comments.length}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return {
            inputBlog: '',
			placeholder: '请输入要找的博客名',
            // 搜索框
            blogsList: [],
            // 分类标签
            classifyList: [],
            // 分类的类名，分类数据分页查询使用
            name: null,
            // 触底请求新数据的page
            classifyPage: 0,
            classifyName: '',
            // 所有数据请求的页面
            currentPage: 0,
            // 所有博客数据
            dataList: [],
            // 
            imgBlogLogo: require("../../assets/blogLogo.png")
        }
    },
    created(){
        // 标签列表数据与博客数据
        this.pageBlogsGet()
    },
    methods:{
        async searchBlogs(){
            if(this.blogsList.length===0){
                var {data:res} = await this.$http.get("/share/blogs/inputTitleGet")
                if(res.meta.status === 200){
                    res.data.forEach(item => {
                        this.blogsList.push({
                            id: item._id,
                            value: item.inputTitle
                        })
                    })
                }
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
                )
            }
        },
        /* 用户选择了然后根据item.id查到博客 */
        handleSelectBlogs (item) {
            // 点一下就增加一次阅读数
            this.$http.post("/user/updateView", {_id: item.id})
            this.inputBlog = ''
            const obj = this.$router.resolve({
                name: `/blogContent?_id=${item.id}`
            });
            window.open(obj.location.name, '_blank');
        },

        // 所有博客数据的获取
        async pageBlogsGet(){
            // 分类请求的页数就清空为0
            this.classifyPage = 0
            this.currentPage = 0

            let {data: res} = await this.$http.get("/share/blogs/allBlogs", {params: {currentPage: this.currentPage}})
            // console.log(res.data)
            if(res.meta.status !== 200){ return this.$message.error("获取博客数据失败！") }
            this.dataList = res.data.slice(0, res.data.length-1)
            this.name = null

            // 分类标签的获取
            this.classifyGet()
        },
        // 上划所有博客的请求,直接拼接
        async pageBlogsGetNext(){
            let {data: res} = await this.$http.get("/share/blogs/allBlogs", {params: {currentPage: this.currentPage}})
            if(res.meta.status !== 200){ return this.$message.error("获取博客数据失败！") }
            this.dataList = this.dataList.concat(res.data.slice(0, res.data.length-1))
            // console.log(this.dataList.length)
        },
        // 分类标签的获取
        async classifyGet(){
            let {data: res} = await this.$http.get("/user/writeBlog/classify")
            if(res.meta.status !== 200){ return this.$message.error("获取分类数据失败！") }
            // console.log(res.data)
            this.classifyList = res.data
        },
        // 点击分类标签
        async classifyBlogGet(name){
            // 全部数据请求的页数为0
            this.currentPage = 0
            this.classifyPage = 0

            let {data: res} = await this.$http.get("/share/classifyBlogGetM", { params: { value: name, classifyPage: this.classifyPage }})
            console.log(res)
            if(res.meta.status !== 200){ return this.$message.error("获取分类博客数据失败！") }

            // 很重要，区分是不是一类
            this.name = name
            
            this.dataList = res.data
            // console.log(this.dataList.length)
        },
        // 上划分类的请求,直接拼接
        async classifyGetNext(){
            let {data: res} = await this.$http.get("/share/classifyBlogGetM", { params: { value: this.name, classifyPage: this.classifyPage }})
            if(res.meta.status !== 200){ return this.$message.warning("没有更多数据！") }
            this.dataList = this.dataList.concat(res.data)
            // console.log(this.dataList.length)
        },
        
        goBlogContent(item){
            // 点一下就增加一次阅读数
            this.$http.post("/user/updateView", {_id: item._id})
            const obj = this.$router.resolve({
                name: `/blogContent?_id=${item._id}`
            });
            window.open(obj.location.name, '_blank');
        },

        // 上划触底
        handleScroll(e){
            // console.log(e.target.scrollHeight)
            // console.log(e.target.clientHeight)
            // // console.log(e.target.getBoundingClientRect())
            // console.log(e.target.scrollTop)
            // console.log(e.target.scrollTop + e.target.clientHeight + 1 >= e.target.scrollHeight)
            if(e.target.scrollTop + e.target.clientHeight + 1 >= e.target.scrollHeight){
                // 说明不是分类的请求
                if(this.name === null){
                    this.currentPage = this.currentPage + 1
                    this.pageBlogsGetNext()
                }else{
                    // 是分类的上拉触底
                    this.classifyPage = this.classifyPage + 1
                    this.classifyGetNext()
                }
                
            }
        }
    },
    computed:{
        dataListCom(){
            return this.dataList
        }
    }
}
</script>


<style lang="less" scoped>
    .contentDiv{
        overflow: hidden;
        height: 100vh;
        width: 100%;
        display: flex;
        .search{
            position: fixed;
            width: 100%;
            z-index: 999;
            .inline-input{
                width: 100%;
            }
        }

        .classify{
            margin-top: 6vh;
            margin-bottom: 70px;
            // height: 600px;
            height: 83vh;
            width: 20%;
            overflow-y: auto;
            padding: 2%;
            div{
                display: flex;
                align-items: center;
                line-height: 9vw;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 100%;
                font-size: 4vw;
            }
        }
        .blogs{
            margin-top: 6vh;
            margin-bottom: 6vh;
            width: 80%;

            height: 83vh;
            overflow-y: auto;
            padding: 2%;
            .blog{
                width: 100%;
                height: 15vh;
                overflow: hidden;
                display: flex;
                align-items: center;
                border-bottom: 1px solid white;
                .imgDiv{
                    width: 30%;
                    img{
                        height: 90%;
                        width: 90%;
                        margin-left: 5%;
                        margin-top: 5%;
                    }
                }
                
                .blog_right{
                    width: 70%;
                    padding: 0 2%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    div:first-child{
                       font-family:Verdana, Geneva, Tahoma, sans-serif;
                       color: rgb(94, 224, 111);
                       font-size: 5vw;
                    }
                    div:last-child{
                        margin-top: 4vh;
                        font-size: 3vw;
                        font-weight: 300;
                        color: rgb(50, 127, 223);
                    }
                }
            }
        }
    }
</style>