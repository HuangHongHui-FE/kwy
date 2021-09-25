<template>
    <div class="maxDiv">
        <div class="content">
            <div v-for="(item, index) in imgSrcList" :key="index">
                <img :src="item" alt="">
            </div>
        </div>
        <div class="button_inputSubmit">
            <div class="button" @click="inputFile()">+</div>
            <div class="button" @click="deleteFile()">-</div>

            <div class="inputSubmit">
                <el-input placeholder="请输入图册的优美描述" v-model="formData.inputTitle">
                    <template #append>
                        <el-button icon="el-icon-search" @click="dialogShow">提交图册</el-button>
                    </template>
                </el-input>
            </div>
        </div>


        <!-- 真正上传文件的input -->
        <input type="file" class="input" @change="handleFile" accept="image/gif,image/jpeg,image/jpg,image/png">

        <template>
			<el-dialog
			  title="提示"
			  :visible.sync="subDialogVisible"
			  width="35%"
			  center
              allow-create
              filterable
              :close-on-click-modal='false'
              :show-close="false">
			  <span class="dialogSpan">
			  	确认上传？
			  </span>
			  <template #footer>
			    <span class="dialog-footer">
			      <el-button @click="cancelSub">取 消</el-button>
			      <el-button type="primary" @click="submit">确 定</el-button>
			    </span>
			  </template>
			</el-dialog>
		</template>

    </div>
</template>

<script>
export default {
    data(){
        return {
            formData: {
                
                file: [],
                inputTitle: ''
            },
            // 展示图片的src
            imgSrcList: [],
            subDialogVisible: false
        } 
    },
    created(){
        
    },
    methods:{
        // 点击触发input   file
        inputFile(){
            if(this.imgSrcList.length === 6){
                return this.$message.warning("一次最多上传6张图片！")
            }
            this.$el.querySelector('.input').click()
        },
        // 点击删除预览的图片
        deleteFile(){
            this.imgSrcList.pop()
            this.formData.file.pop()
        },
        // 选择图片内容了
        handleFile(e){
            let target = e.target || e.srcElement
            let file = target.files[0]
            if(file){
                if(file.size > 5250000){
                    return this.$message.error("图片过大")
                }
                // 提交的表单里面先加进去图片
                this.formData.file.push(file);
                

                // 用来生成预览图片的链接
                var reader = new FileReader();
                reader.onload = res => {
                    this.imgSrcList.push(res.target.result)
                }
                // //将文件以Data URL形式读入页面
                reader.readAsDataURL(file)
            }
            

            this.$el.querySelector('.input').value = ""
        },
        // 提交前的提示框
        dialogShow(){
            if(this.formData.file.length === 0){ return this.$message.warning("不能不上传图片") }
            if(this.formData.inputTitle === ''){ return this.$message.warning("描述不能为空！") }

            this.subDialogVisible = true
        },
        // 点击提交图册
        async submit(){

            let formdata = new FormData()
            for (let i = 0; i < this.formData.file.length; i++) {
                console.log(this.formData.file[i])
                formdata.append('multerShare', this.formData.file[i]);
            }

            formdata.append('inputTitle', this.formData.inputTitle)

            if(window.sessionStorage.getItem('username')){
                let username = window.sessionStorage.getItem("username")
                formdata.append('username', username)
            }

            let {data: res} = await this.$http.post("/user/uploadPhoto", formdata)

            this.subDialogVisible = false
            this.formData = {
                file: [],
                inputTitle: ''
            }
            this.imgSrcList = []

            if(res.meta.status !== 200){ return this.$message.error("提交图册失败") }
            return this.$message.success("提交图册成功！")
        },
        cancelSub(){
            this.subDialogVisible = false
            return this.$message.warning("提交取消！")
        }
    }
}
</script>


<style lang="less" scoped>


    .maxDiv{
        padding: 3%;
        .content{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            
            div{
                margin-bottom: 3%;
                height: 250px;
                width: auto;
                margin-right: 2%;
                img{
                    height: 250px;
                    width: auto;
                }
            }
            
        }
        .button_inputSubmit{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .button{
                box-sizing: border-box;
                height: 200px;
                width: 200px;
                border: 2px dotted red;
                display: flex;
                font-size: 100px;
                font-weight: 200;
                justify-content: center;
                align-items: center;
                
            }
            .inputSubmit{
                width: 50%;
            }
        }
        .input{
            display: none;
        }
        
    }
    .dialogSpan{
        text-align: center;
    }
</style>