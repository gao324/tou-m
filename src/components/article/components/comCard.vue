<template>
  <div class="article-comments">
    <!-- 评论列表 -->
      <van-cell>
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="comment.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{ comment.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636;">{{ comment.content }}</p>
          <p>
            <span style="margin-right: 10px;">{{ comment.pubdate | relativeTime }}</span>
            <van-button 
            size="mini" 
            type="default" 
            @click="$emit('clickRep',comment)"
            >{{ comment.reply_count }}回复</van-button>
          </p>
        </div>
        <van-button 
        slot="right-icon" 
        :loading="load"
        :icon="comment.is_liking ? 'like' : 'like-o'" 
        @click="givLicks" 
        :class="{
            red:comment.is_liking
        }"
        >{{comment.is_liking ? comment.like_count : "赞"}}</van-button>
      </van-cell>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { givLick,delLick } from "@/api/comment";
  export default {
    name: "ArticleComment",
    props: {
        comment:{
            type:Object,
            required:true
        },
        list:{
        type:Array,
        default:()=>[]
      }
    },
    data() {
      return {
        // list: [], // 评论列表
        loading: false, // 上拉加载更多的 loading
        finished: false, // 是否加载结束
        load:false
      };
    },

    methods: {
      onLoad() {
        // 异步更新数据
        // setTimeout(() => {
        //   for (let i = 0; i < 10; i++) {
        //     this.list.push(this.list.length + 1);
        //   }
        //   // 加载状态结束
        //   this.loading = false;

        //   // 数据全部加载完成
        //   if (this.list.length >= 40) {
        //     this.finished = true;
        //   }
        // }, 500);
      },
      async givLicks(){
        this.load = true
        try {
            if (this.comment.is_liking) {
                await delLick(this.comment.com_id)
                this.comment.like_count--
            } else {
                await givLick(this.comment.com_id)
                this.comment.like_count++
            }
            this.comment.is_liking = !this.comment.is_liking
        } catch (err) {
            this.$toast('点赞失败')
        }
        this.load = false
      }
    },
    created(){
      this.onLoad()
    }
  };
</script>

<style scoped lang="less">
  .publish-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .van-list {
    margin-bottom: 45px;
  }
  .red{
    color: red;
  }
</style>