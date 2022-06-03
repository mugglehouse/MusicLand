<template >
  <div class="main-container">
    <!-- 1、头部路由导航 -->
    <div class="main-header">
      <div class="main-header">
        <div class="header-menu">
          <router-link to="/Leaderboard" active-class="is-active"
            >排行榜</router-link
          >
          <router-link to="/singerlist" active-class="is-active"
            >歌手</router-link
          >
          <router-link to="/dayrec" active-class="is-active"
            >每日推荐</router-link
          >
        </div>
      </div>
    </div>
    <!-- 2、主体 -->
    <div class="content-wrapper">
      <div class="content-section qx">
        <!-- （1）分类 -->

        <ul>
          <li class="content-button status-button" @click="singerlist(1)">
            华语
          </li>
          <li class="content-button status-button" @click="singerlist(2)">
            欧美
          </li>
          <li class="content-button status-button" @click="singerlist(3)">
            韩国
          </li>
          <li class="content-button status-button" @click="singerlist(4)">
            日本
          </li>
        </ul>
        <!-- （2）歌手卡片 -->
        <div class="apps-card">
          <div
            class="block imgsize"
            v-for="item in singerlistinfo"
            :key="item.id"
            @click="openalbum(item.id)"
          >
            <div style="width: 220px; height: 220px; margin-left: 15px">
              <img :src="item.img1v1Url" alt="" class="songlistimg2 app-card" />
            </div>
            <h5 class="songlisttext">{{ item.name }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getsingerlis } from "../request/api.js";
export default {
  data() {
    return {
      singerlistinfo: [],
    };
  },
  created() {
    this.singerlist();
  },
  methods: {
    // 1、歌手列表数据
    singerlist(type = 1) {
      getsingerlis({
        type,
      }).then((res) => {
        this.singerlistinfo = res.data.list.artists;
      });
    },
    // 2、打开歌手专辑
    openalbum(id) {
      this.$router.push({ path: "/album", query: { sgingid: id } });
    },
  },
};
</script>
<style lang="">
</style>