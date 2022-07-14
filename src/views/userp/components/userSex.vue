<template>
  <div class="sex">
     <van-picker
        title="性别"
        show-toolbar
        :default-index="value"
        :columns="sexcolumns"
        @confirm="onConfirm"
        @cancel="$emit('close')"
        />
  </div>
</template>

<script>
import { sexUserp } from "@/api/use";
export default {
    data() {
        return {
            sexcolumns:['男','女'],
        }
    },
    props:{
        value:{
        type: Number,
        required: true
        }
    },
    methods:{
        async onConfirm(value,index){
            // 传参问题吧  应该是
            try {
                // 修改数据
                await sexUserp({
                    gender:index
                })
                // 渲染
                this.$emit('input',index)
                // 关闭
                // 提示
                this.$toast.success('修改成功')
            } catch (err) {
                console.log(err);
            }
        },
    }
}
</script>

<style>

</style>