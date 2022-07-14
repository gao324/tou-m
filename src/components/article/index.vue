<template>
  <div class="article">
    <van-cell :to="`/article/${article.art_id}`">
        <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
        <div slot="label" class="bottom_nav">
            <div class="img_nav" v-if="article.cover.type === 3">
                <div class="center_img" v-for="(imgs,index) in article.cover.images" :key="index">
                    <van-image
                    fit="cover"
                    :src="imgs"
                    class="img"
                    />
                </div>
            </div>
            <div class="span_text">
                <span>{{ article.aut_name }}</span>
                <span>{{ article.comm_count }}:评论</span>
                <span>{{ article.pubdate|relativeTime}}</span>
            </div>
        </div>
        <div slot="default" v-if="article.cover.type === 1" class="right_img">
            <van-image
            fit="cover"
            :src="article.cover.images[0]"
            />
        </div>
    </van-cell>
  </div>
</template>

<script>
export default {
    name:'Article',
    props:{
        article:{
            type:Object,
            required:true
        }
    } 
}
</script>

<style lang="less">
.article{
    position: relative;
    .title{
        font-family: ArialMT;
        font-size: 32px;
        letter-spacing: 2px;
        color: #3a3a3a;
    }
    .bottom_nav{
        .span_text{
            position: absolute;
            bottom: 0;
            left: 25px;
            span{
                font-size: 22px;
                color: #b4b4b4;
                margin-right: 25px;
            }
        }
    }
    .right_img{
        .van-image{
            width: 232px;
            height: 146px;
        }
    }
    .img_nav{
        display: flex;
        padding: 25px;
        .center_img{
            flex: 1;
            height: 146px;
            &:not(:last-child) {
                padding-right: 4px;
            }
            .img{
                width: 100%;
                height: 146px;
            }
        }
    }
}
</style>