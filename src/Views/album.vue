<template lang="">
    <div class="main-container">
        <div class="main-header">
            <span class="menu-link-main">歌手专辑</span>
        </div>
        <div class="content-wrapper">
            <!-- 1 歌手介绍 -->
            <div class="content-section songdetail">
                <div class="apps-card">
                    <div class="app-songdetail songlistwrap">
                        <!-- 歌手封面 -->
                        <div class="coverimgsize">
                            <img :src="singerinfo.picUrl" alt=" " class="mvimg">
                        </div>
                        <!-- 歌手信息 -->
                        <div class="songinfo">
                            <!-- 头像姓名 -->
                            <div class="author">
                                <img :src="singerinfo.picUrl" width="50px" style="border-radius: 50%;">
                                <span>{{singerinfo.name}}</span>

                            </div>
                            <!-- ID和简介 -->
                            <div class="tagss">
                                <p>歌手ID：{{singerinfo.id}}</p>
                            </div>
                            <p class="intion">简介：{{singerinfo.alias[0]}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 2 歌曲部分 -->
            <div class="content-section">
                <div class="content-section-title">歌曲</div>
                <ul class="search_ul">
                    <!-- 列表 -->
                    <li class="adobe-product" v-for="item in singersong" >
                        <!-- 歌名 -->
                        <div class="products music-name">{{item.name}}</div>
                        <!-- 歌手名字 -->
                        <span class="status">
                            <span class="status-circle green"></span> {{item.artist.name}}</span>
                        <!-- 歌曲时间 -->
                        <!-- <span class="status">{{item.dt}}</span> -->
                        <!-- 歌曲简介 -->
                        <span class="status music-album">{{item.alias[0]}}</span>
                        <!-- 播放 -->
                        <div class="button-wrapper">
                            <div class="clicksvg">
                                <svg t="1639295337775" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2313" width="40" height="40">
                                    <path
                                        d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z"
                                        p-id="2314" fill="#e6e6e6"></path>
                                    <path
                                        d="M672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z"
                                        p-id="2315" fill="#e6e6e6"></path>
                                </svg>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 3 分页 -->
            <div class="block">
                <el-pagination v-if="count!=0" @current-change="handleCurrentChange" :current-page.sync="currentPage"
                    :page-size="30" layout="prev, pager, next, jumper" :total="count" :background="true">
                </el-pagination>
            </div>

        </div>
    </div>
</template>
<script>
import {
  playMusicApi,
  getLyricApi,
  getdetailApi,
  getsingerapi,
} from "../request/api.js";
export default {
  data() {
    return {
      singerinfo: [],
      singersong: [],
      DownloadSongUrl: "",
      //初始页
      currentPage: 1,
      count: 500,
      //音乐地址
      songurladd: null,
      //歌词
      songlrc: "",
    };
  },
  created() {
    this.showsinger();
  },
  methods: {
    //2、分页
    handleCurrentChange: function (currentPage) {
      // console.log(`当前页: ${currentPage}`);
      this.currentPage = currentPage;
      // console.log(this.currentPage)
      this.showsinger(currentPage);
    },
    // ----------------歌手信息列表--------------------------
    showsinger(page = 1) {
      getsingerapi({
        id: this.$route.query.sgingid,
        limit: 30,
        offset: (page - 1) * 30,
      }).then((res) => {
        // 个人信息
        this.singerinfo = res.data.artist;
        // 歌曲列表
        this.singersong = res.data.hotAlbums;
      });
    },
    // ----------------歌手信息列表--------------------------
  },
};
</script>
<style lang="">
.songdetail {
  margin-top: 1px;
}

.app-songdetail {
  width: 100%;
  padding: 10px;
  background-color: var(--content-bg);
  border-radius: 14px;
  border: 1px solid var(--theme-bg-color);
  padding: 5px;
  font-size: 16px;
}

.coverimgsize {
  width: 250px;
  position: relative;
  display: inline;
}

.coverimgsize img {
  border-radius: 10px;
  display: block;
  width: 100%;
}

.clicksvg {
  cursor: pointer;
}

.songlistwrap {
  display: flex;
  flex-direction: row;
}

.songlist-title {
  font-weight: 200;
  display: inline;
  margin: 5px 0;
}

.songinfo {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.songinfo p {
  color: var(--inactive-color);
}

.author {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  height: 50px;
  line-height: 50px;
}

.author span {
  margin-left: 15px;
}

.tagss {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
}

.tagss p {
  padding: 0;
  margin: 10px 0;
  font-size: 14px;
}

.tagss ul {
  padding: 0;
  margin: 10px 0;
}

.tagss ul li {
  margin-left: 10px;
  list-style: none;
  color: var(--inactive-color);
  font-size: 14px;
}

.mvimg {
  border-radius: 50%;
}

.app-mv {
  padding: 15px;
}

.app-mv-text {
  border-bottom: none;
}

.app-card-subtextchange {
  padding-bottom: 1px;
}

.mvtop {
  margin-top: 1px;
}

.button-set {
  font-size: 14px;
  width: 100px;
  margin-top: 10px;
  padding: 10px;
}

.intion {
  margin: 0;
  font-size: 14px;
}
</style>