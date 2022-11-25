<template>
    <div>
        <div class="content">
            <!-- 视频 -->
            <div class="video">
                <video :src="videoPlaySrcCom" autoplay disablePictureInPicture height="100%" width="100%" 
                ref="video1" @touchstart.prevent='touchStart' @touchmove.prevent='touchMove' @touchend.prevent='touchEnd'>
                抱歉，您的浏览器不支持内嵌视频，不过不用担心，你可以 <a :href="videoPlaySrcCom">下载</a>
                并用你喜欢的播放器观看!
                </video>
            </div>

            <!-- 双击喜欢  icon -->
            <div class="love">
                <i class="iconfont icon-buxihuan" @click="loveClick" v-if="loveMask"></i>
                <i class="iconfont icon-xihuan" v-else></i>
                {{videoPlayCur.love}}
            </div>

            <!-- 评论 icon -->
            <div class="comment" @click="commentClick">
                <i class="iconfont icon-pinglun"></i>
                {{videoPlayCur.length===0? '': videoPlayCur.comments.length}}
            </div>
            <!-- 标题 -->
            <div class="title" ref="title">
                <p>{{videoPlayCur.title}}</p>
            </div>
        </div>

        <!-- 下载的弹出 -->
        <div class="download" @touchstart.prevent="downloadTouchStart" v-if="downloadFlag">
            <a :href="videoPlaySrcCom">下载</a>
            <i class="el-icon-caret-right"></i>
        </div>

        <!-- 评论从下面升上来的动画最后div -->
        <div class="dialogComment" v-if="commentFlag">

            <el-input placeholder="请输入想要评论的内容" v-model="commentInput" class="commentInput">
                <template #append>
                    <el-button icon="el-icon-search" @click="commentSub(videoPlayCur._id)">发表评论</el-button>
                </template>
            </el-input>

            <div class="commentDiv">
                <div v-for="(item, index) in videoPlayCur.comments" :key="index">{{item}}</div>
            </div>
        </div>

    </div>
</template>


<script>
export default {
    data(){
        return {
            // 所有视频数据列表
            videoList: [],
            // 正在播放的视频所有数据
            videoPlayCur: [],
            // 正在播放的视频的src
            videoPlaySrc: '',
            // 开始触摸屏幕时的位置
            startPosition: {},
            // 控制那个播放器显示
            mask: '1',
            // 控制download时候显示
            downloadFlag: false,
            // 长按的定时器
            lenPress: null,
            commentInput: '',
            // 控制comment时候显示
            commentFlag: false,
            // 标记点击的次数
            clickid: 1,
            // 双击的定时器
            doubleTimer: null,
            // 双击单击的时候用来春时间了
            startTime: 0,
            // 当前视频在所有视频数据中的下标
            index: 0,
            // love点击
            loveMask: true
        }
    },
    created(){
        this.videoGet()
    },
    methods: {
        // 视频信息数据
        async videoGet(){
            let {data: res} = await this.$http.get('/videoGet')
            if(res.meta.status !== 200){ return this.$message.error("获取视频信息失败！") }
            this.videoList = res.data
            this.videoPlayCur = this.videoList[this.index]
            this.videoPlaySrc = this.videoList[this.index].path
            console.log(res.data)
        },
        // 单击事件
        oneClick(){
            clearTimeout(this.doubleTimer)

            if(this.commentFlag === true){ 
                // 隐藏评论,同时不改变播放状态
                this.commentFlag = false 
            }else{
                if(this.$refs.video1.paused === true){
                    this.$refs.video1.play()
                }else{
                    this.$refs.video1.pause()
                }
            }
        },
        // 双击事件
        twoClick(){
            console.log("two")
            this.loveClick()
        },
        touchStart(e){
            if(e.touches.length === 1){
                // 开始点击的位置
                this.startPosition = e.touches[0]
                // 长按,两秒内没有被清除就代表是长按，下载
                this.lenPress = setTimeout((res) => {
                    this.downloadFlag = true
                }, 1500);

                // 双击单击触发事件
                if(this.clickid === 1) {
                    this.startTime = new Date().getTime();
                    this.clickid++;
                    // 双击的定时器
                    this.doubleTimer = setTimeout(() => {
                        // 触发单击事件
                        this.oneClick();
                        this.clickid = 1;
                    }, 300)
                }
                // 这时候才是单击
                if(this.clickid === 2) {
                    this.clickid++;
                // 这时候是双击或者多击
                } else {
                    var endTime = new Date().getTime();
                    if((endTime - this.startTime) < 300) {
                        this.twoClick();
                        this.clickid = 1;
                        clearTimeout(this.doubleTimer);
                    }
                }

            }else{
                this.startPosition = {}
            }
            // console.log(this.startPosition)
            // console.log(this.$refs.video1.buffered)
            // console.log(this.$refs.video1.duration)
            // console.log(this.$refs.video1.played)
        },
        touchMove(e){
            let lenY = e.touches[0].clientY - this.startPosition.clientY
            // 就直接不触发双击事件了
            clearTimeout(this.lenPress)
            clearTimeout(this.doubleTimer)
            this.$refs.video1.pause()
            this.clickid = 1
            // 视频随着移动
            this.$refs.video1.style.top = `${lenY / 12}vh`
        },
        touchEnd(e){
            clearTimeout(this.lenPress)
            // 判断top符号为正还是为负
            // 上划
            if(this.$refs.video1.style.top.slice(0, 1) === '-'){
                // 返回原来的位置
                this.$refs.video1.style.top = 0
                this.index = this.index + 1
                // 到底了
                if(this.index === this.videoList.length){
                    this.index = this.index - 1
                    return this.$message.warning("没有更多视频！")
                }
                this.videoPlayCur = this.videoList[this.index]
                this.videoPlaySrc = this.videoPlayCur.path
            // 没滑动排除，就是下滑了
            }else if(this.$refs.video1.style.top !== '0px'){
                this.$refs.video1.style.top = 0
                this.index = this.index - 1
                // 当前在第一个视频
                if(this.index < 0){
                    this.index = 0
                    // 这里可以做下拉刷新视频列表的操作
                    this.$message.success("刷新成功！")
                    this.videoGet()
                }else{
                    this.videoPlayCur = this.videoList[this.index]
                    this.videoPlaySrc = this.videoPlayCur.path
                }
            }
        },
        // 下载弹出的点击
        downloadTouchStart(){
            this.downloadFlag = false
        },
        // 点击评论的标志
        commentClick(){
            this.commentFlag = true
            this.commentInput = ''
            // 更新数据
            this.loveCommentGet(this.videoPlayCur._id)
        },
        // 单个更新comment与love数据，点击评论按钮时，双击时，点击love时
        async loveCommentGet(_id){
            console.log(_id)
            let {data: res} = await this.$http.get("/loveCommentGet", {params: {_id: _id}})
            console.log(res)
            if(res.meta.status !== 200){
                return this.$message.error("获取最新评论数据失败！")
            }
            // 实时更新comment与love数据
            this.videoPlayCur.comments = res.data[0].comments.reverse()
            this.videoPlayCur.love = res.data[0].love
        },

        // 这里可以加上节流，防抖函数！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        // 点击love的标志
        async loveClick(){
            this.loveMask = false

            let {data: res} = await this.$http.post("/videoLovePush", {_id: this.videoPlayCur._id})
            if(res.meta.status !== 200){ return this.$message.error("点赞失败！") }

            this.loveCommentGet(this.videoPlayCur._id)
        },
        // 点击确定发表评论
        async commentSub(_id){
            // console.log("commentSub")
            let {data: res} = await this.$http.post("/videoCommentPush", {commentInput: this.commentInput, _id: _id})
            if(res.meta.status !== 200){ return this.$message.error("评论失败！") }
            this.loveCommentGet(this.videoPlayCur._id)
            this.commentInput = ''
        }
    },
    computed:{
        videoPlaySrcCom(){
            return this.$http.defaults.baseURL + this.videoPlaySrc
        }
    }
}
</script>


<style lang="less" scoped>
    .content{
        overflow: hidden;
        height: 100vh;
        width: 100%;
        background-color: rgb(0, 0, 0);
        .video{
            
            box-sizing: border-box;
            border-bottom: 1px solid #f5f5f5;
            height: 100%;
            video{
                position: absolute;
                height: 100%;
                width: 100%;
            }
        }
        .love{
            color: white;
            position: fixed;
            top: 40vh;
            right: 2vh;
            i{
                font-size: 5vw;
            }
        }
        .comment{
            color: white;
            // background-color: springgreen;
            position: fixed;
            top: 50vh;
            right: 2vh;
            i{
                font-size: 5vw;
            }
        }
        .title{
            padding: 0 2vw;
            position: fixed;
            bottom: 4vh;
            color: rgb(235, 223, 235);
            p{
                font-size: 5vw;

                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;

                font-family: cursive;
            }
        }
    }
    .download{
        background-color: rgba(230, 247, 5, 0.5);
        z-index: 100;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 8vw;
        a{
            background-color: violet;
            color: white;
            text-decoration: none;
        }
    }

    // 评论div样式
    .dialogComment{
        z-index: 10;
        width: 100%;
        position: fixed;
        bottom: 6vh;
        overflow: auto;
        // 动画
        animation-name: comment;
        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-timing-function: linear;
        .commentDiv{
            margin-bottom: 6vh;
            padding: 3vw;
            div{
                border-bottom:1px solid #de88e9;

                // 最多显示三行
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
            }
            div:nth-child(2n){
                background-color: rgb(107, 172, 224);
            }
        }
        .commentInput{
            position: fixed;
            bottom: 6vh;
        }
    }
    
    // 评论显示出来的动画
    @keyframes comment {
        0% {
            height: 0vh;
            background-color: rgb(247, 226, 3);
        }
        20% {
            height: 10vh;
            background-color: rgb(238, 221, 35);
        }
        40% {
            height: 20vh;
            background-color: rgb(238, 226, 93);
        }
        60% {
            height: 30vh;
            background-color: rgb(240, 233, 163);
        }
        80% {
            height: 40vh;
            background-color: rgb(241, 239, 209);
        }
        100% {
            height: 50vh;
            background-color: rgb(247, 247, 247);
        }
    }
</style>