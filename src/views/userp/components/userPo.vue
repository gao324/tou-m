<template>
  <div class="photo">
    <img :src="img" alt="" ref="img">
    <div class="bottom">
        <div class="left" @click="$emit('close')">取消</div>
        <div class="right" @click="finish">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import { photoUserp } from "@/api/use";

export default {
    data() {
        return {
            cropper:null
        }
    },
    props:{
        img:{
            type:[String,Object],
            required:true
        }
    },
    mounted() {
        const image = this.$refs.img
        this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: 'move',
        aspectRatio: 1,
        autoCropArea: 1,
        cropBoxMovable: false,
        cropBoxResizable: false,
        background: false,
        },)
    },
    methods:{
        finish(){
            this.cropper.getCroppedCanvas().toBlob(blob => {
                this.photoUserp(blob)
            })
        },
        async photoUserp (blob) {
            this.$toast.loading({
                message: '更新中。。。',
                duration: 0,
                forbidClick: true
            })
            try {
                const formData = new FormData()
                formData.append('photo', blob)
                console.log(formData)
                const { data } = await photoUserp(formData)
                console.log(data)
                this.$toast.success('更新成功')
                // this.$emit('updatePhoto', data.photo)
                this.$emit('close')
            } catch (error) {
                this.$toast.fail('更新失败')
            }
            }
        }
}
</script>

<style lang="less">
.photo{
    background-color: #000;
    height: 100%;
    img{
        max-width: 100%;
        display: block;
    }
    .bottom{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left, .right{
            width: 90px;
            height: 90px;
            font-size: 30px;
            color: aliceblue;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>