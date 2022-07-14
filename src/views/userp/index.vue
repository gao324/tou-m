<template>
  <div class="users">
    <van-nav-bar
    title="个人信息"
    left-arrow
    @click-left="onClickLeft"
    class="hed"
    />
    <input type="file" hidden ref="file" @change="changeFile">
    <van-cell title="头像" is-link  @click="$refs.file.click()">
        <van-image
        slot="default"
        fit="cover"
        round
        width="30px"
        height="30px"
        :src="userPs.photo"
        />
    </van-cell>
    <!-- 昵称 -->
    <van-cell title="昵称" is-link :value="userPs.name" @click="nameShow = true"></van-cell>
    <!-- 性别 -->
    <van-cell title="性别" is-link :value="userPs.gender === 0 ? '男' : '女'"  @click="sexShow = true"></van-cell>
    <!-- 生日 -->
    <van-cell title="生日" is-link :value="userPs.birthday" @click="ageShow = true"></van-cell>
    <!-- 昵称弹出层 -->
    <van-popup
    v-model="nameShow"
    position="bottom"
    :style="{ height: '100%' }"
    >
    <UserPr 
    @close="nameShow = false" 
    v-model="userPs.name"
    ></UserPr>
    </van-popup>

    <!-- 性别弹出层 -->
    <van-popup
    v-model="sexShow"
    position="bottom"
    :style="{ height: '30%' }"
    >
    <UserSex
    v-model="userPs.gender"
    @close="sexShow = false" 
    ></UserSex>
    </van-popup>
    <!-- 年龄弹出层 -->
     <van-popup
    v-model="ageShow"
    position="bottom"
    :style="{ height: '30%' }"
    >
    <UserDate
    v-if="ageShow"
    @close="ageShow = false"
    v-model="userPs.birthday"
    ></UserDate>
    </van-popup>
    <!-- 头像弹出层 -->
     <van-popup
    v-model="photoShow"
    position="bottom"
    :style="{ height: '100%' }"
    >
    <userPo
    :img="img"
    @close="photoShow = false"
    ></userPo>
    </van-popup>
  </div>
</template>

<script>
import { getUserp } from "@/api/use";
import UserPr from './components/userPr.vue'
import UserDate from "@/views/userp/components/userDate.vue";
import UserPo from '@/views/userp/components/userPo.vue';
import UserSex from './components/userSex.vue';
export default {
    data() {
        return {
            userPs:{},
            nameShow:false,
            sexShow:false,
            ageShow:false,
            photoShow:false,
            img:null
        }
    },
    props:{},
    methods:{
        onClickLeft(){
            this.$router.back()
        },
        async getUser(){
            try {
                const { data } = await getUserp()
                this.userPs = data.data
            } catch (err) {
                console.log(err);
            }
        },

        changeFile(){
            const file = this.$refs.file.files[0]
            this.img = window.URL.createObjectURL(file)
            this.photoShow = true
            //避免重复文件不触发
            this.$refs.file.value = ''
        }
    },
    computed:{},
    created(){
        this.getUser()
    },
    components:{
    UserPr,
    UserDate,
    UserPo,
    UserSex
},
}
</script>

<style lang="less">
.users{
    .hed{
        background-color: #3296fa;
        .van-icon-arrow-left{
            color: #fff;
        }
        .van-nav-bar__title{
            color: #fff;
        }
    }
}
</style>