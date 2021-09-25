<template>
    <div class="top">
        <div v-for="(item, index) in srcList" :key="index" class="imageDiv">
            <img :src="item.src" alt="">
            <span>
                {{item.title}}
            </span>
        </div>
    </div>
</template>


<script>
    export default{
        data(){
            return {
                data: []
            }
        },
        created(){
            let m = this.$route.query.m
            this.getImg(m)
            console.log(m)
        },
        methods:{
            async getImg(n){
                console.log(n)
                let url = "/kwy/tpq/" + n
				let {data: res} = await this.$http.get(url)
                if(res.meta.status !== 200){ return this.$message.error("获取图片信息失败") }
                let data = res.data
                this.data = data
			}
        },
        computed:{
            srcList: function(){
                let res = []
                for(let i = 0; i < this.data.length; i++){
                    res.push({src: "data:image/png;base64," + this.data[i].data, title: this.data[i].title})
                }
                return res
            }
        }
    }
</script>


<style lang="less" scoped>
    .top{
        .imageDiv{
            display: inline-block;
            width: 50%;
            margin-bottom: 3%;
            img{
                width: 60%;
                vertical-align: middle;
            }
        }
    }
</style>