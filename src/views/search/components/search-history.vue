<template>
  <div class="keyword">
    <van-cell-group>
        <van-cell title="所搜历史">
            <div slot="default" v-if="isShow">
                <span @click="delAll">全部删除</span>
                <span @click="isShow = false">完成</span>
            </div>
            <van-icon 
            slot="right-icon" 
            name="delete-o"  
            v-else
            @click="isShow = true"
            />
        </van-cell>
        <van-cell :title="vals" v-for="(vals,index) in value" :key="index" @click="delThis(vals,index)">
            <van-icon slot="right-icon" name="close" v-show="isShow"/>
        </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
    name:'History',
    props:{
        value:{
            type:Array,
            required:true
        }
    },
    data() {
        return {
            isShow:false
        }
    },
    methods:{
        delAll(){
            this.$emit('clears')
        },
        delThis(vals,index){
            if (this.isShow) {
                this.$emit('clear',index)
            }else{
                // console.log(1);
                this.$emit('search',vals)
            }
        }
    },
    watch:{
    }
}
</script>

<style lang="less">
.keyword{
    .van-cell{
        .van-cell__value{
            span{
                padding-left: 20px;
            }
        }
    }
}
</style>