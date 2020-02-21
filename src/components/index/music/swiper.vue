<template>
  <div class="main">
    
      <mt-swipe :auto="4000" class="swiper" @change="imgChange">
        <mt-swipe-item class="swiper-item"  v-for="(item,index) in topLists" :key="index">
          <img
            :src="item.pic_info.url"
            alt=""
            data-id="item.mv_id"
          />
        </mt-swipe-item>
      </mt-swipe>
    
  </div>
</template>

<script>
import {getCarousel} from '@/api/recommend_swiper'
import {CODE_SUCCESS} from "@/api/config"
export default {
  name: "vSwiper",
  data() {
    return {
      topLists : []
    };
  },
  methods: {
      
      imgChange (index) {
        //   console.log(index);
        //   console.log(getCarousel);

      },
      getRecommend () {
        
      }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
      this.$http.get(`getRecommend`, {
        params: {}
      }).then((result) => {
        var data = result.data
        console.log(result);
        this.topLists = data.response.focus.data.content
      }).catch((err) => {
        console.log(err);
      })
  }
};
</script>

<style lang="sass" scoped>
// @                         imgSwiper {
//     0% {left: 0px}
//     33.3% {left: 33.3%}
//     66.6% {left: 66.6%}
//     100% {left: 100%}
// }
.main
    height: 14rem;    
    box-sizing: border-box;
    .swiper
    //    width: 100%;
    //    padding: 0 1.2rem;
    .swiper-item
        // paddin g: 0 1.2rem;
        margin: 0 auto;
        img
            border-radius: .8rem;
            width: 96%;
            height: 100%;
</style>
