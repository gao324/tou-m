<template>
  <div class="date">
    <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
        @cancel="$emit('close')"
        />
  </div>
</template>

<script>
import { ageUserp } from "@/api/use";
import dayjs from 'dayjs'
export default {
    data() {
        return {
        minDate: new Date(1800, 0, 1),
        maxDate: new Date(),
        currentDate: new Date(this.value)
        };
    },
    props:{
        value:{
            type:String,
            required:true
        }
    },
    methods:{
        async onConfirm(){
            const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
            try {
                const data = await ageUserp({
                    birthday: currentDate
                })
                //渲染数据
                this.$emit('input',currentDate)
                //关闭
                this.$emit('close')
                //提示
            } catch (err) {
                console.log(err);
            }
        }
    }
}
</script>

<style>

</style>