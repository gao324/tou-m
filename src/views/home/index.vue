<template>
  <div class="home">
    <van-nav-bar class="nav" fixed>
      <van-button 
      slot="title" 
      icon="search" 
      type="primary"
      round
      to="search"
      >搜索</van-button>
    </van-nav-bar>
    <van-tabs class="bar" v-model="active" swipeable>
      <van-tab 
      :title="val.name" 
      v-for="(val,index) in list" 
      :key="index">
        <articllist :channels="val"/>
         <van-popup
          v-model="show"
          closeable
          round
          close-icon-position="top-left"
          position="bottom"
          :style="{ height: '100%' }"
          class="pop"
        >
        <channelEdit 
        :mychannels="list"
        :myactive="active"
        @updataActive="actives"
        @close="upclose"
         />
        </van-popup>
      </van-tab>
      <div class="phan" slot="nav-right"></div>
      <van-icon name="wap-nav" slot="nav-right" class="han" @click="show = true">
        <img src="~@/assets/gradient-gray-line.png" alt="">
      </van-icon>
    </van-tabs>
  </div>
</template>

<script>
import { newsList } from "@/api/news";
import { mapState } from "vuex";
import { getItem } from "@/util/storage";
import articllist from '@/views/home/components/articl-list.vue'
import channelEdit from '@/views/home/components/channelEdit.vue'
export default {
  data() {
    return {
      active: 0,
      list:[],
      show: false,
      search:true
    };
  },
  created(){
    this.getNews()
  },
  methods:{
    async getNews(){
      try {
        // const { data } = await newsList()
        // this.list = data.data.channels
        let channels = []
        // 判断是否登录
        if (this.user) {
          const { data } = await newsList()
          channels = data.data.channels
        } else {
          //判断是否有本地数据
          const locaList= getItem('CHANNELS')
          if (locaList) {
            channels = locaList
          } else {
            const { data } = await newsList()
            channels = data.data.channels
          }
        }
        this.list = channels
      } catch (err) {
        this.$toast('获取失败！！')
      }
    },
    actives(index){
      this.active = index
    },
    upclose(){
      this.show = false
    }
    // shows(){
      
    // }
  },
  components:{
    articllist,
    channelEdit,
},
  computed:{
    ...mapState(['user'])
  }
}
</script>

<style lang="less">
.home{
  padding-bottom: 100px;
    .nav{
    height: 90px;
    background-color: #3296fa;
    .van-nav-bar__title{
      max-width: unset;
      padding-bottom: 10px;
      .van-button{
      height: 64px;
      width: 555px;
      text-align: center;
      background-color: #5babfb;
      border: none;
      .van-button__content{
        .van-icon-search{
          font-size: 32px;
          color: #fff;
        }
        .van-button__text{
          font-size: 28px;
          color: #fff;
        }
      }
    }
    }
  }
  .bar{
    .van-tabs__nav{
      height: 82px;
      padding-bottom: 0;
    }
    .van-tabs__wrap{
      position: fixed;
      top:90px;
      left: 0;
      right: 0;
      z-index: 1;
    }
    .van-tab{
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777;
    }
    .van-tab--active{
      color: #333333;
    }
    .van-tabs__line{
      bottom: 8px;
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      border-radius: 3px;
    }
    .han{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      font-size: 33px;
      background-color: #ffffff;
      opacity: 0.8;
      border: none;
      img{
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
      }
    }
    .phan{
      flex-shrink: 0;
      width: 65px;
      height: 82px;
    }
  }
  .pop{
    .van-popup__close-icon{
      color: #222222;
    }
  }
}
</style>