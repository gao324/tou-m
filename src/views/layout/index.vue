<template>
  <div>
    <router-view />

    <van-tabbar route>
        <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/cricle" icon="comment-circle-o">问答</van-tabbar-item>
        <van-tabbar-item replace to="/video" icon="video-o">视频</van-tabbar-item>
        <van-tabbar-item replace to="/my" icon="manager-o">{{ $store.state.user ? '我的' : '未登录' }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
    export default {

    }
</script>

<style>

</style>