<template>
  <div>
    <div class="headers" v-if="user">
      <div class="top">
        <div class="names">
          <van-image
          round
          :src="users.photo"
          />
          <span>{{ users.name }}</span>
        </div>
        <span class="mode">编辑资料</span>
      </div>
      <div class="buttom">
        <van-row type="flex" justify="space-around">
          <van-col span="4">
            <span>{{ users.art_count }}</span>
            <span class="s">头条</span>
          </van-col>
          <van-col span="4">
            <span>{{ users.follow_count }}</span>
            <span class="s">关注</span>
          </van-col>
          <van-col span="4">
            <span>{{ users.fans_count }}</span>
            <span class="s">粉丝</span>
          </van-col>
          <van-col span="4">
            <span>{{ users.like_count }}</span>
            <span class="s">获赞</span>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="header"  v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="">
        <span>登录  /  注册</span>
      </div>
    </div>
    <div>
      <van-grid clickable :column-num="2">
        <van-grid-item icon="star-o" text="收藏" is-link/>
        <van-grid-item icon="clock-o" text="历史" is-link/>
      </van-grid>
    </div>
    <div class="center">
      <van-cell title="消息通知" is-link  />
      <van-cell title="小星同学" is-link  />
    </div>
    <van-button 
    type="primary" 
    color="#fff" 
    block
    @click="clear"
    v-if="user"
    >退出登录</van-button>
</div>
</template>

<script>
import { mapState } from 'vuex';
// import { removeItem } from "@/util/storage";
import { userInfor } from "@/api/use";
export default {
  data() {
    return {
      users:{}
    }
  },
  created(){
    if (this.user) {
      this.locaUser()
    }
  },
  methods:{
    clear(){
        this.$dialog.confirm({
        title: '确认退出',
        message: '是否要退出账号',
        })
        .then(() => {
          //退出
            this.$store.commit('setUser',null)
          })
          .catch(() => {
            //返回
          });
      },
    async locaUser(){
      try {
        const {data} = await userInfor()
        this.users = data.data
        // console.log(this.users);
      } catch (err) {
        this.$toast('请求失败！！')
        console.log(err);
      }
    }
  },
  computed:{
    ...mapState(['user'])
  }
}
</script>

<style lang="less">
.header{
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("~@/assets/banner.png");
  background-size: cover;
  height: 360px;
  .login-btn{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      height: 132px;
      width: 132px;
      padding-bottom: 15px;
    }
    span{
      color: #fff;
      font-size: 28px;
    }
  }
}
.headers{
  background-image: url("~@/assets/banner.png");
  background-size: cover;
  height: 360px;
  .top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 230px;
    // background-color: pink;
    box-sizing: border-box;
    padding: 76px 32px 23px;
    .names{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .van-image__img{
        width: 130px;
        height: 130px;
        border: solid 2px #ffffff;
      }
      span{
      font-size: 30px;
      color: #fff;
      padding-left: 25px;
      }
    }
    .mode{
      width: 116px;
      height: 33px;
      background-color: #ffffff;
      border-radius: 16px;
      font-size: 20px;
      color: #666666;
      text-align: center;
      line-height: 33px;
    }
  }
  .buttom{
    height: 130px;
    padding-top: 35px;
    // background-color: aqua;
    box-sizing: border-box;
    .van-row{
      .van-col{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span{
          font-size: 30px;
          color: #fff;
        }
        .s{
          font-size: 23px;
        }
      }
    }
  }
}
.van-grid-item__content{
  .van-icon-star-o{
    color: #ee6869;
  }
  .van-icon-clock-o{
    color: #ff9d1d;
  }
  .van-grid-item__icon{
    font-size: 45px;
  }
  .van-grid-item__text{
    font-size: 28px;
  }
}
.center{
  margin-top: 5px;
  .van-cell{
    margin-top: 1px;
  }
}
.van-button--primary{
  margin-top: 10px;
  height: 105px;
  .van-button__text{
    font-size: 30px;
    color: #d86262;
  }
}
</style>