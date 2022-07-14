<template>
  <div class="articl-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败！"
    >
    <!-- 文章列表项 -->
    <Article
    v-for="(val,index) in list" 
    :key="index" 
    :article="val"
    />
        <!-- <van-cell 
        v-for="(val,index) in list" 
        :key="index" 
        :title="val.title" /> -->
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getNewsList } from '@/api/articl'
import Article from '../../../components/article/index.vue'
export default {
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            refreshing: false,
            error: false
        };
    },
    props: {
        channels: {
            type: Object,
            required: true
        }
    },
    created() {
    },
    methods: {
        async onLoad() {
            try {
                // console.log(this.channels);
                // 请求数据
                const { data } = await getNewsList({
                    channel_id: this.channels.id,
                    timestamp: this.timestamp || Date.now(),
                    with_top: 0
                });
                // console.log(data);
                // 把请求数据放入list
                const { results } = data.data;
                this.list.push(...results);
                // 本次请求结束把请求状态设置为结束
                this.loading = false;
                // 判断是否还有数
                if (results.length) {
                    this.timestamp = data.data.pre_timestamp;
                }
                else {
                    // 没有数据了
                    this.finished = true;
                }
                // console.log(this.list);
            }
            catch (err) {
                // console.log(err);
                this.error = true;
                this.loading = false;
            }
        },
        async onRefresh() {
            try {
                // 1请求数据
                const { data } = await getNewsList({
                    channel_id: this.channels.id,
                    timestamp: Date.now(),
                    with_top: 0
                });
                // 2将数据追加到顶部
                const { results } = data.data;
                this.list.unshift(...results);
                // 3关闭下拉刷新
                this.refreshing = false;
                this.$toast("刷新成功");
            }
            catch (error) {
                console.log(error);
                this.loading = false;
            }
        },
    },
    components: { Article }
}
</script>

<style>
.articl-list{
    padding-top: 180px;
    height: 82vh;
    overflow-y: auto;
}
</style>