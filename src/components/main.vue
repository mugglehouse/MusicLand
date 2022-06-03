<template lang="">
    <div class="wrapper">
        <div class="left-side">
                <!-- 1 推荐 -->
            <div class="side-wrapper">
                <div class="side-title">推荐</div>
                <div class="side-menu">
                <!-- content -->
                    <router-link to="/">
                        <svg viewBox="0 0 512 512">
                            <g xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                <path
                                    d="M0 0h128v128H0zm0 0M192 0h128v128H192zm0 0M384 0h128v128H384zm0 0M0 192h128v128H0zm0 0"
                                    data-original="#bfc9d1" />
                            </g>
                            <path xmlns="http://www.w3.org/2000/svg" d="M192 192h128v128H192zm0 0" fill="currentColor"
                                data-original="#82b1ff" />
                            <path xmlns="http://www.w3.org/2000/svg"
                                d="M384 192h128v128H384zm0 0M0 384h128v128H0zm0 0M192 384h128v128H192zm0 0M384 384h128v128H384zm0 0"
                                fill="currentColor" data-original="#bfc9d1" />
                        </svg> 猜你喜欢
                    </router-link>
                <!-- search -->
                    <router-link :to="{ path:'/search',query:{keyworks:$store.state.songkeyworks}}">
                        <svg t="1640255412874" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2193" width="16" height="16">
                            <path
                                d="M966.4 924.8l-230.4-227.2c60.8-67.2 96-156.8 96-256 0-217.6-176-390.4-390.4-390.4-217.6 0-390.4 176-390.4 390.4 0 217.6 176 390.4 390.4 390.4 99.2 0 188.8-35.2 256-96l230.4 227.2c9.6 9.6 28.8 9.6 38.4 0C979.2 950.4 979.2 934.4 966.4 924.8zM102.4 441.6c0-185.6 150.4-339.2 339.2-339.2s339.2 150.4 339.2 339.2c0 89.6-35.2 172.8-92.8 233.6-3.2 0-3.2 3.2-6.4 3.2-3.2 3.2-3.2 3.2-3.2 6.4-60.8 57.6-144 92.8-233.6 92.8C256 780.8 102.4 627.2 102.4 441.6z"
                                p-id="2194" fill="#e6e6e6"></path>
                        </svg> 歌曲搜索
                        <span class="notification-number updates"
                            v-show="$store.state.songcount!=0">{{$store.state.songcount}}</span>
                    </router-link>
                </div>
            </div>
            <!-- 2 自建歌单 -->
            <div class="side-wrapper">
                <div class="side-title">自建歌单</div>
                <div class="side-menu">
                    <a href="#" v-for="item in userlist" @click="opensonglist(item.id)">
                        <img :src="item.coverImgUrl" alt="" width="30px" height="30px"> {{item.name}}
                    </a>
                </div>
            </div>
        </div>
        <!-- 携带key进行路由跳转 -->
        <router-view :key="key"></router-view>
    </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  // 路由重新刷新
  computed: {
    ...mapState(["userlist"]),
    key() {
      return this.$route.fullPath;
    },
  },
  methods: {
    // 2、打开歌单列表
    opensonglist(id) {
      this.$router.push({ path: "/Playlist", query: { playlistid: id } });
    },
  },
};
</script>
<style lang="">
</style>