<template>
  <div class="comment">
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error="error"
    error-text="加载失败"
    >
    <ComCard
    v-for="(item,index) in list" 
    :key="index"
    :comment="item"
    @clickRep="$emit('clickRep',$event)"
    ></ComCard>
    <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.content">
    </van-cell> -->
    </van-list>
  </div>
</template>

<script>
import { getReply } from "@/api/comment";
import ComCard from "./comCard.vue";
export default {
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            error: false,
            offset: null,
            limit: 20
        };
    },
    props: {
        value: {
            type: Object,
            required: true
        },
        type:{
            type:String,
            Validator(value) {
                return ['a', 'c'].includes(value)
            }
        }
    },
    methods: {
        async onLoad() {
            try {
                console.log(this.value.art_id);
                const { data } = await getReply({
                    type: this.type,
                    source: this.value.art_id || this.value.com_id.toString(),  //这里需要存储到路由
                    offset: this.offset,
                    limit: this.limit
                });
                const { results } = data.data;
                this.list.push(...results);
                this.loading = false;
                if (results.length) {
                    this.offset = data.data.last_id;
                    // this.loading = false
                }
                else {
                    this.finished = true;
                }
                this.$emit("Numbers", data.data);
            }
            catch (err) {
                this.error = true;
            }
        }
    },
    created() {
        this.onLoad();
    },
    components: { 
        ComCard
    }
}
</script>

<style>

</style>