<template>
  <div class="channelEdit">
    <!-- 我的频道 -->
    <van-cell-group>
      <van-cell title="我的频道" >
        <van-button 
        slot="default" 
        plain type="primary" 
        @click="isChang">{{ isEdit ? '完成' : '编辑' }}</van-button>
      </van-cell>
      <!-- 频道内容 -->
        <van-grid :gutter="10" direction="horizontal">
          <van-grid-item 
          v-for="(val,index) in mychannels" 
          :key="index"  
          @click="del(val,index)">
            <van-icon 
            slot="icon" 
            name="clear" 
            v-if="isEdit && !iclist.includes(val.id)"
            />
            <span 
            slot="text" 
            class="van-grid-item__text" 
            :class="{active:index === myactive }"
            >{{ val.name }}</span>
          </van-grid-item>
        </van-grid>
    </van-cell-group>



    <!-- 推荐频道 -->
    <van-cell-group>
      <van-cell title="推荐频道" />
      <!-- 频道内容 -->
      <van-grid :gutter="10" direction="horizontal">
        <van-grid-item 
        v-for="val in reLists" 
        :key="val.id" 
        :text="val.name" 
        icon="plus"
        @click="pus(val)"
        />
      </van-grid>
    </van-cell-group>
  </div>
</template>

<script>
import { reList,addList,delList } from "@/api/news";
import { mapState } from "vuex";
import { setItem } from "@/util/storage";
export default {
  data() {
    return {
      // reLists:[],
      allLists:[],
      isEdit:false,
      iclist:[0]
    }
  },
  props:{
    mychannels:{
        type:Array,
        required:true
    },
    myactive:{
        type:Number,
        required:true
    }
  },
  methods:{
    async AllList(){
      try {
        // const userRes = await newsList()
        // this.mychannels.push(...userRes.data.data.channels)
        // const setArr = new Set(this.mychannels)
        const allRes = await reList()
        this.allLists.push(...allRes.data.data.channels)
        // this.reLists=this.allLists.filter(item => !user.includes(item))
        
      } catch (err) {
        console.log(err);
      }
    },
    async pus(val){
      this.mychannels.push(val)

      //判断存储代码
      if (this.user) {
        try {
          await addList({
              id:val.id,
              seq:this.mychannels.length
            })
        } catch (err) {
          console.log(err);
        }
      } else {
        // 本地存储
        setItem('CHANNELS',this.mychannels)
      }
    },
    del(val,index) {
      if (this.isEdit) {
        if (this.iclist.includes(val.id)) {
          return
        }

        this.mychannels.splice(index,1)
        if (index < this.myactive) {
          this.$emit('updataActive',this.myactive-1)
        }
        this.dell(val)
      }else{
        this.$emit('updataActive',index,false)
        this.$emit('close')
      }
      // console.log(this.isEdit);
    },
    async dell(val){
      try {
        if (this.user) {
            await delList(val.id)
          } else {
            // 未登录本地存储
            setItem('CHANNELS',this.mychannels)
          }
      } catch (err) {
        console.log(err);
      }
    },
    isChang(){
      this.isEdit = !this.isEdit
    }
  },
  computed:{
    ...mapState(['user']),
    reLists(){
      const channels = []
      this.allLists.forEach(item => {
        const ret = this.mychannels.find(ele => {
          return ele.id === item.id
        })

        if (!ret) {
          channels.push(item)
        }
      })
      return channels
     
    }
  },
  created(){
    this.AllList()
    // console.log(this.reLists);
  },
}
</script>

<style lang="less">
.channelEdit{
  padding: 86px 0;
  .van-cell-group{
    .van-cell{
      justify-content: center;
      align-items: center;
    }
    .van-cell__title{
      span{
        font-size: 32px;
        letter-spacing: 2px;
        color: #333333;
      }
    }
    .van-button{
      max-width: 123px;
      height: 69px;
      text-align: center;
      line-height: 69px;
      border-radius: 30px;
      border: 1px solid #f85d5d;
      span{
        font-size: 26px;
        color: #f85d5d;
      }
    }
    .van-grid-item{
      .van-grid-item__content{
        position: relative;
        width: 160px;
        height: 86px;
        background-color: #f4f5f6;
        border-radius: 6px;
        text-align: center;
        text-overflow: ellipsis;
        -ms-text-overflow: ellipsis;
        white-space:nowrap;
        .van-grid-item__text{
          color: #222222;
          font-size: 28px;
        }
        .active{
          color: #f85d5d;
        }
        .van-icon-clear{
          position: absolute;
          top: -5px;
          right: -14px;
          display: block;
          width: 28px;
          height: 28px;
          text-align: center;
          line-height: 28px;
          border-radius: 28px;
          color: #cacaca;
          // background-color: #fff;
          z-index: 5;
        }
      }
      .van-grid-item__icon{
        color: #222222;
        font-size: 24px;
      }
      .van-grid-item__icon-wrapper{
        position: unset;
      }
    }
  }
}
</style>