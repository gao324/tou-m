<template>
  <div class="result">
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    >
        <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchRes } from "@/api/search";
export default {
    name:'Result',
    data() {
        return {
        list: [],
        loading: false,
        finished: false,
        page:1,
        per_page:10
        };
    },
    props:{
        value:{
            type:String,
            required:true
        }
    },
    methods: {
        async onLoad() {
        // 获取数据
            try {
                const {data} = await getSearchRes({
                    page:this.page,
                    per_page:this.per_page,
                    q:this.value
                })
               // 数据添加列表
               const { results } = data.data
            //    console.log(results);
               this.list.push(...results)
                //    打开更新
               this.loading = false
                // 判断是否还有数据
                if (results.length) {
                    this.page++
                } else {
                    this.finished = true
                }

            } catch (error) {
                this.error = true
                //加载失败
                this.loading = false
                console.log(error);
            }
        
        
        },
    },
    created(){
        // console.log(this.value,'hah');
    }
}
</script>

<style lang="less">

</style>