<template>
  <div class="login-container">
    <van-nav-bar title="登录">
      <van-icon slot="left" name="arrow-left" @click="$router.back()"/>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginF">
  <van-field
    v-model="user.mobile"
    name="mobile"
    label="请输入手机号"
    placeholder="请输入手机号"
    :rules="userRulse.mobile"
    type="number"
    maxlength="11"
  />
  <van-field
    v-model="user.code"
    name="code"
    label="验证码"
    placeholder="验证码"
    :rules="userRulse.code"
    type="number"
    maxlength="6"
  >
  <template #button>
    <van-count-down 
    :time="1000*10"
    v-if="isCutTime"
    @finish="isCutTime = false"
    format="ss s"
    >
    </van-count-down>
    <van-button 
    size="small" 
    round type="primary" 
    @click="sendSm" 
    native-type="button"
    v-else
    >发送验证码</van-button>
  </template>
  </van-field>
  <div style="margin: 16px;">
    <van-button block type="info" native-type="submit">登录</van-button>
    </div>
  </van-form>
    </div>
</template>

<script>
import { login,getInfor } from "@/api/use";
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
        user:{
          mobile: '',
          code: '',
        },
        userRulse:{
          mobile:[
            { 
            required: true, 
            message: '请输入手机号' 
            },
            {
              pattern:/^1[3|5|7|8]\d{9}$/,
              message:'手机号格式错误'
            }
          ],
          code:[
            {
             required: true,
             message: '请填写验证码' 
             },
             {
              pattern:/\d{6}$/,
              message:'验证码格式错误'
             }
             ]
        },
        isCutTime:false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
  },
   methods: {
    async onSubmit() {
      const us=this.user
       this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认 2000，0 表示持续展示不关闭
      })

      try{
        // console.log('submit', values);
        const {data} = await login(us)
        // console.log(res);
        this.$store.commit('setUser',data.data)
        this.$toast.success('登陆成功！！')
        this.$router.push('/')
      }catch(err){
        if (err.response.status === 400) {
           this.$toast.fail('验证码错误');
        } else{
           this.$toast.fail('登陆失败',err);
        }
      }
    },
    async sendSm(){
      try {
        await this.$refs.loginF.validate('mobile')
        this.$toast.success('验证成功');
        this.isCutTime=true
      } catch (err) {
        return this.$toast.fail('验证失败1',err);
      }
      try {
        const res = await getInfor(this.user.mobile)
        console.log(111,res);
      } catch (err) {
        this.isCutTime=false
        if (err.response.status == 429) {
          this.$toast('发送频繁')
        }else{
          this.$toast('发送失败，稍后重试')
        }
      }
    }
   },
}
</script>

<style scoped lang="less">
.van-field__button{
  .van-count-down{
    text-align: center;
    color: #fff;
    background-color: #6db4fb;
    border-radius: 10px;
  }
}
.login-container{
  .van-nav-bar{
    .van-icon{
      color: #fff;
    }
  }
}

</style>
