<template>
    <div class="maxDiv">
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
                    分类: {{item.value | kong}}
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
                <div class="caozuo">
                    <label @click="editBlog(item)">编辑 !</label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label @click="deleteBlog(item._id)">删除 !</label>
                </div>
            </div>
        </div>
        <!-- 分页 -->
        <template>
            <div class="block">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="10"
                    layout="total,  prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </template>

        <!-- 确认删除 -->
        <template>
			<el-dialog
			  title="提示"
			  :visible.sync="delDialogVisible"
			  width="35%"
			  center
              :close-on-click-modal='false'
              :show-close="false">
			  <span class="dialogSpan">
			  	确认删除?
			  </span>
			  <template #footer>
			    <span class="dialog-footer">
			      <el-button @click="canceldel">取 消</el-button>
			      <el-button type="primary" @click="sureDel">确 定</el-button>
			    </span>
			  </template>
			</el-dialog>
		</template>
    </div>
</template>


<script>
export default{
    data(){
        return {
            dataList: [],
            img01: require("../../../static/img/blogLogo.png"),
            delDialogVisible: false,
            id: '',
            // 分页
            currentPage: 1,
            // 总条数
            total: 0
        }
    },
    created(){
        this.selfBlogGet()
    },
    methods:{
        async selfBlogGet(){
            
            let username = window.sessionStorage.getItem("username")
            let {data: res} = await this.$http.get("/user/selfBlogGet", {params: {username: username, currentPage: this.currentPage - 1}})
            console.log(res.data)
            if(res.meta.status !== 200){ return this.$message.error("获取博客数据失败！") }
            this.dataList = res.data
            
            this.total = res.data[res.data.length-1].total
        },
        // 删除博客
        deleteBlog(_id){
            this.delDialogVisible = true
            this.id = _id
        },
        // 修改博客
        editBlog(item){
            // console.log(item)
            // 触发store里的改变数据方法，并传参
            this.$store.commit('editSee', item)
            // !想要这种方式跳转过去，必须要加上router/index.js配置的路由， 加上name属性
            this.$router.push({name: "/user/writeBlog", params: {editCome: 'seeSelfBlog'}})
        },
        canceldel(){
            this.delDialogVisible = false
            this.id = ''
            this.$message.warning("取消了删除！")
        },
        async sureDel(){
            this.delDialogVisible = false
            let {data: res} = await this.$http.delete("/user/selfBlogDel", {params: {_id: this.id}})
            if(res.meta.status !== 200){
                this.id = ''
                return this.$message.error("删除blog失败！")
            }
            this.selfBlogGet()
            this.id = ''
            return this.$message.success("删除blog成功！")
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.selfBlogGet()
        },
        // 博客详情页面
        blogContent(_id){
            const obj = this.$router.resolve({
                name: `/blogContent?_id=${_id}`
                // name: `/blogContent`,
                // params: {
                //     _id: _id
                // }
            });
            window.open(obj.location.name, '_blank');
        }
    },
    computed:{
        dataListCom: function(){
            let len = this.dataList.length
            return this.dataList.slice(0, len - 1)
        }
    }
}
</script>


<style lang="less" scoped>
    .blogShow{
        height: 200px;
        margin: 20px;
        display: flex;
        border-bottom: 1px dotted rgb(200, 200, 200);
        .imgDiv{
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-around;
            cursor: pointer;
            img{
                width: 180px;
                height: 180px;
                
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
                font-size: 25px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                word-break: break-all;
            }
            .fenlei{
                color: goldenrod;
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
            .time, .caozuo{
                display: flex;
                justify-content: flex-end;
            }
            .caozuo{
                label{
                    cursor: pointer;
                }
                label:last-child{
                    color: rgb(241, 71, 71);
                }
                
            }
        }

    }
    // 确认删除字
    .dialogSpan{
        display: flex;
        justify-content: center;
    }
    // 分页
    .block{
        position: fixed;
        bottom: 0;
        left: 40%;
    }


    
</style>