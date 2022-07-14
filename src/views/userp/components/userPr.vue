<template>
  <div class="userPr">
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      left-arrow
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
    <van-field
      v-model="rename"
      rows="2"
      autosize
      label="昵称"
      type="textarea"
      maxlength="8"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { modUserp } from "@/api/use";
export default {
  data() {
    return {
      rename:this.value
    };
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onClickRight() {
      const rename = this.rename
      // 估计是传参问题吧,打印data一直是空
      try {
        if (!rename.length) {
          return;
        }
        await modUserp({
            name:rename
        });
        // console.log( data);
        //更新视图_拿到数据-传给父组件
        this.$emit('input',rename)
        //关闭弹层
        this.$emit("close");
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {},
};
</script>

<style>
</style>