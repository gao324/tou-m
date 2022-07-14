<template>
  <div class="reply">
    <van-nav-bar>
        <div slot="title">这里有{{ list.reply_count }}条评论</div>
    </van-nav-bar>
    <ComCard
    :comment="list"
    />
    <div>全部评论</div>
    <CommentList
    v-model="comList"
    :type='"c"'
    />
  </div>
</template>

<script>
import ComCard from './comCard.vue';
import CommentList from './comment-list.vue';
import { getReply } from "@/api/comment";
export default {
    name: "ReplyCom",
    props: {
        list: {
            type: Object,
            required: true
        }
    },
    components: { ComCard, CommentList },
    data() {
        return {
            comList:{}
        }
    },
    created(){
        console.log(this.list);
    },
    methods:{
        // async getRep(){
        //     // console.log(this.list.com_id);
        //     const data = await getReply({
        //         type: "c",
        //         source: this.list.com_id,
        //         offset: this.offset,
        //         limit: this.limit
        //     })
        //     // console.log(data);
        // }
    }
}
</script>

<style>

</style>