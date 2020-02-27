<template>
  <div class="main" v-if="getRecommend">
    
      <mt-swipe :auto="4000" class="swiper" @change="imgChange">
        <mt-swipe-item class="swiper-item"  
        v-for="(item,index) in getRecommend.response.focus.data.content" 
        :key="index"
        :data-focusid="item.id"
        :data-id = "item.jump_info.url"
        :data-type="item.type"
        @click.native="goCheck"
        >
          <img
            :src="item.pic_info.url"
            alt=""
            :data-src = 'item.pic_info.url'
          />
        </mt-swipe-item>
      </mt-swipe>
    
  </div>
</template>

<script>
import {getCarousel} from '@/api/recommend_swiper'
import {Toast} from 'mint-ui'
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
      goCheck (e) {
        var data = e.currentTarget.dataset
        var type = data.type
        if(true) {
          Toast({
              message: '暂不支持！',
            // iconClass: 'iconfont icon-fufei',
              duration: 2000
          })
          return 
        }
        var id = data.id
          this.$router.push({path: `/recommend/${id}`, query: {type: '1'}})   

      }

  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    getRecommend () {
      return this.$store.state.recommend
    },

  },
  mounted () {
   
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

<style lang="sass">
.main
     /deep/ .mint-swipe-indicator
        // font-size: 12px
        background-color: #a1a1a1
        opacity: 1
     /deep/ .mint-swipe-indicator.is-active
        background-color: white 
  
</style>
