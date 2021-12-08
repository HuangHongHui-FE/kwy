
<template>
  <div class="thumb-example">
    <!-- swiper1 -->
    <swiper class="swiper gallery-top" :options="swiperOptionTop" ref="swiperTop">
      <swiper-slide v-for="(src, index) in imgSrcLsCom" :key="index">
          <img :src="src">
      </swiper-slide>

      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    </swiper>
    <!-- swiper2 Thumbs -->
    <swiper class="swiper gallery-thumbs" :options="swiperOptionThumbs" ref="swiperThumbs">
      <swiper-slide v-for="(src, index) in imgSrcLsCom" :key="index">
          <img :src="src">
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  export default {
    name: 'swiper-example-thumbs-gallery',
    title: 'Thumbs gallery with Two-way control',
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        swiperOptionTop: {
          loop: true,
          loopedSlides: 5, // looped slides should be the same
          spaceBetween: 10,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        swiperOptionThumbs: {
          loop: true,
          loopedSlides: 5, // looped slides should be the same
          spaceBetween: 10,
          centeredSlides: true,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          slideToClickedSlide: true
        },
        imgSrcLs: []
      }
    },
    created(){
        console.log(this.$route.query)
        if(this.$route.query.item){
            this.imgSrcLs = this.$route.query.item.split(',')
        }
        if(this.$route.query.id){
            this.getLeonardById(this.$route.query.id)
        }
    },
    mounted() {
      this.$nextTick(() => {
        const swiperTop = this.$refs.swiperTop.$swiper
        const swiperThumbs = this.$refs.swiperThumbs.$swiper
        swiperTop.controller.control = swiperThumbs
        swiperThumbs.controller.control = swiperTop
      })
    },
    methods:{
        async getLeonardById(id){
            console.log(id)
            let {data: res} = await this.$http.get("/share/blogs/GetLeonardById", {params: {id: id}})
            if(res.meta.status !== 200){ return this.$message.error("获取图册信息失败！"); }
            this.imgSrcLs = res.data[0].files
        }
    },
    computed:{
        imgSrcLsCom(){
            let src = []
            for(let i = 0; i < this.imgSrcLs.length; i++){
                src.push(this.$http.defaults.baseURL + this.imgSrcLs[i])
            }
            // console.log(src)
            return src
        }
    }
  }
</script>

<style lang="less" scoped>
  .thumb-example {
    height: 100vh;
    background-color: black;
  }

  .swiper {
    .swiper-slide {
      background-size: cover;
      background-position: center;
      display: flex;
      justify-content: center;
      img{
          height: 100%;
      }
    }

    &.gallery-top {
      height: 80%;
      width: 100%;
    }
    &.gallery-thumbs {
      height: 20%;
      box-sizing: border-box;
      padding: gap 0;
    }
    &.gallery-thumbs .swiper-slide {
      width: 25%;
      height: 100%;
      opacity: 0.4;
    }
    &.gallery-thumbs .swiper-slide-active {
      opacity: 1;
    }
  }
</style>