<template>
  <div>
    <van-nav-bar class="nav">
      <van-button 
      slot="title" 
      icon="search" 
      type="primary"
      round
      >搜索</van-button>
    </van-nav-bar>
    <van-tabs class="bar" v-model="active" swipeable>
      <van-tab :title="val.name" v-for="val in list" :key="val.id">{{ val.name }}</van-tab>
      <div class="phan" slot="nav-right"></div>
      <van-icon name="wap-nav" slot="nav-right" class="han">
        <img src="~@/assets/gradient-gray-line.png" alt="">
      </van-icon>
    </van-tabs>
  </div>
</template>

<script>
import { newsList } from "@/api/news";
export default {
  data() {
    return {
      active: 0,
      list:[]
    };
  },
  created(){
    this.getNews()
  },
  methods:{
    async getNews(){
      try {
        const { data } = await newsList()
        this.list = data.data.channels
      } catch (err) {
        this.$toast('获取失败！！')
      }
    }
  }
}
</script>

<style lang="less">
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
</style>