<template>
  <div class="suggestion">
    <van-cell 
    icon="search" 
    v-for="(val,index) in list" 
    :key="index" >
    <div slot="title" v-html="htmlTo(val)" @click="onSearch(val)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSug } from "@/api/search";
import { debounce } from "lodash";
export default {
    name:'Suggestion',
    data() {
        return {
            list:[],
        }
    },
    props:{
        value:{
            type:String,
            required:true
        }
    },
    methods:{
        async getSuggestion(q){
            try {
                const {data} = await getSearchSug(q)
                this.list = data.data.options
                // console.log(data);
            } catch (err) {
                console.log(err);
            }
        },
        htmlTo(val){
            if (val) {
                const heighHtml = `<span class='active'>${this.value}</span>`
                const res = new RegExp(this.value,'gi')
                return val.replace(res,heighHtml)
            }
        },
        onSearch(text){
            this.$emit('search',text)
        }
    },
    watch:{
        value:{
            handler:debounce(function(val){
                this.getSuggestion(val)
            },1000),
            immediate:true
        }
    }
}
</script>

<style lang="less">
.suggestion{
    // .van-icon-search{
    //     font-size: 22px;
    //     color: #c9c9c9;
    //     margin-top: 8px;
    //     margin-right: 10px;
    // }
    .active{
        color: red;
    }
}
</style>