<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="release"
      :disabled="!message.length"
    >发布</van-button>
  </div>
</template>

<script>
import { replyCom } from "@/api/comment";
export default {
  name: 'CommentPost',
  components: {},
  props: {
    value:{
        type:Object,
        required:true
    },
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {
    // console.log(this.value);
  },
  mounted () {},
  methods: {
    async release(){
        // if (!this.message.length) {
        //     return this.$toast('请输入内容')
        // }
        try {
            // console.log(this.value.art_id);
            // console.log(this.message);
            const {data} = await replyCom({
                target:this.value.art_id,  //评论目标文章id
                content:this.message,// 评论内容
                art_id:null
            })
            const { new_obj } = data.data
            // console.log(data.data);
            this.message = ''
            this.$emit('popSuccess',new_obj)
        } catch (err) {
            console.log(err);
        }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
