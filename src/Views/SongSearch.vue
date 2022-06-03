<template>
  <div class="main-container">
    <div class="content-wrapper">
      <div class="content-section">
        <!-- 1、头部 -->
        <div class="content-section-title" style="margin-bottom: 0px">
          <h1 class="titletest1">{{ $route.query.keyworks + " " }}</h1>
          搜索{{ count }}结果
        </div>
        <!-- 2、主体 -->
        <el-tabs v-model="activeName">
          <!-- 1、歌曲 -->
          <el-tab-pane label="歌曲列表" name="first">
            <!-- （1）每一首歌曲 -->
            <ul class="search_ul">
              <li
                class="adobe-product"
                v-for="(item, index) in musicList"
                :key="index"
                @dblclick="runapi(item.id)"
              >
                <!-- 歌名 -->
                <div class="products music-name">
                  {{ item.name }}
                </div>
                <!-- 歌手 -->
                <span
                  class="status"
                  @click="flyawayar(item.ar[0].id)"
                  style="cursor: pointer"
                >
                  <span class="status-circle green"></span>{{ item.ar[0].name }}
                </span>
                <!-- 时间 -->
                <span class="status music-dt">{{ item.dt }}</span>
                <span class="status music-album">{{ item.al.name }}</span>
                <div class="button-wrapper">
                  <div class="clicksvg" @click="runapi(item.id)">
                    <svg
                      t="1639295337775"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="2313"
                      width="40"
                      height="40"
                    >
                      <path
                        d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z"
                        p-id="2314"
                        fill="#e6e6e6"
                      ></path>
                      <path
                        d="M672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z"
                        p-id="2315"
                        fill="#e6e6e6"
                      ></path>
                    </svg>
                  </div>
                  <!-- 播放MV -->
                  <div
                    class="clicksvg"
                    v-if="item.mv != 0"
                    @click="playMV(item.mv, item.id)"
                  >
                    <svg
                      t="1639296179055"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="3387"
                      width="40"
                      height="40"
                    >
                      <path
                        d="M0 76.8h158.72v125.952H0V76.8z m209.92 0v870.4h606.208v-870.4H209.92z m147.456 193.536c5.12 0 10.24 1.024 14.336 4.096l153.6 108.544 153.6 108.544c12.288 8.192 15.36 26.624 8.192 39.936-2.048 4.096-5.12 7.168-8.192 9.216l-153.6 108.544-153.6 108.544c-12.288 8.192-27.648 4.096-34.816-9.216-3.072-5.12-4.096-10.24-4.096-15.36V299.008c0-15.36 10.24-27.648 24.576-28.672zM868.352 76.8H1024v125.952H868.352V76.8zM0 260.096h158.72V389.12H0V260.096z m868.352 0H1024V389.12H868.352V260.096zM0 447.488h158.72v129.024H0V447.488z m868.352 0H1024v129.024H868.352V447.488zM0 633.856h158.72v129.024H0V633.856z m868.352 0H1024v129.024H868.352V633.856zM0 820.224h158.72v125.952H0V820.224z m868.352 0H1024v125.952H868.352V820.224z"
                        fill="#e6e6e6"
                        p-id="3388"
                      ></path>
                    </svg>
                  </div>
                  <!-- 下载 -->
                  <div class="clicksvg" @click="DownloadSong(item.id)">
                    <a :href="DownloadSongUrl" target="_blank" download>
                      <svg
                        t="1639296939929"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="4288"
                        width="40"
                        height="40"
                      >
                        <path
                          d="M918.3 468.6c-18.8 0-34 15.2-34 34v309.6c0 6.6-14.4 18.7-38 18.7H190.2c-23.5 0-38-12.1-38-18.7V486c0-18.8-15.2-34-34-34s-34 15.2-34 34v326.3c0 24.8 12.8 48.4 35 64.7 19.4 14.2 44.6 22 71 22h656.1c26.4 0 51.6-7.8 71-22 22.2-16.3 35-39.9 35-64.7V502.6c0-18.7-15.3-34-34-34z"
                          fill="#e6e6e6"
                          p-id="4289"
                        ></path>
                        <path
                          d="M450.4 679.4c17.8 18 41.5 28 66.8 28.1h0.5c25.1 0 48.8-9.7 66.6-27.4l154.4-152.8c13.3-13.2 13.5-34.7 0.2-48.1-13.2-13.3-34.7-13.5-48.1-0.2L551.3 617.1c0.6-2.6 1-5.3 1-8.1V149.1c0-18.8-15.2-34-34-34s-34 15.2-34 34V609c0 3.2 0.5 6.3 1.3 9.3L345.9 477.1c-13.2-13.3-34.7-13.5-48.1-0.2-13.3 13.2-13.5 34.7-0.2 48.1l152.8 154.4z"
                          fill="#e6e6e6"
                          p-id="4290"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            <!-- （2）分页器 -->
            <div class="block">
              <el-pagination
                v-if="count != 0"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="30"
                layout="prev, pager, next, jumper"
                :total="count"
                :background="true"
              >
              </el-pagination>
            </div>
          </el-tab-pane>
          <!-- 2、歌单 -->
          <el-tab-pane label="歌单" name="second">
            <div class="apps-card">
              <div
                class="block"
                v-for="item in songlist"
                :key="item.id"
                @click="opensonglist(item.id)"
              >
                <!-- 封面 -->
                <div class="imgkd">
                  <el-image
                    class="songlistimg app-card"
                    :src="item.coverImgUrl"
                  ></el-image>
                </div>
                <!-- 名称 -->
                <h5 class="songlisttext">{{ item.name }}</h5>
              </div>
            </div>
          </el-tab-pane>
          <!-- 3、MV -->
          <el-tab-pane label="MV" name="third">
            <div class="content-section">
              <div class="apps-card">
                <div
                  class="block"
                  v-for="item in songMV"
                  :key="item.id"
                  @click="playMV(item.id)"
                >
                  <el-image
                    class="app-card app-imgwithd"
                    :src="item.cover"
                  ></el-image>
                  <h5 class="songlisttext">{{ item.name }}</h5>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <!-- 4、专辑 -->
          <el-tab-pane label="专辑" name="foru">
            <div class="apps-card">
              <div
                class="block"
                v-for="item in songalbum"
                :key="item.id"
                @click="opensongalbum(item.id)"
              >
                <div class="imgkd">
                  <!-- 专辑封面 -->
                  <el-image
                    class="albumcover app-card"
                    :src="item.picUrl"
                  ></el-image>
                </div>
                <!-- 专辑名 -->
                <h5 class="songlisttext">{{ item.name }}</h5>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getMusicInfoApi,
  playMusicApi,
  getLyricApi,
  getdetailApi,
  getcommentApi,
  getMVApi,
  getcommentMV,
} from "../request/api.js";
export default {
  data() {
    return {
      // 歌曲数组
      musicList: [],
      // 歌曲地址
      musicUrl: "",
      //下载音乐的地址
      DownloadSongUrl: "",
      // 热门获取评论
      hotComments: [],
      //mv地址
      mvUrl: "",
      //标签切换
      activeName: "first",
      //搜索歌曲总数
      count: "",
      //音乐地址
      songurladd: null,
      //歌词
      songlrc: "",
      //初始页
      currentPage: 1,
      //MV评论
      mvComments: [],
      //mv分页
      mvcount: "",
      mvcurrentPage: 1,
      mvidd: "",
      //歌单
      songlist: [],
      //MV
      songMV: [],
      songalbum: [],
    };
  },
  created() {
    this.getmusicInfo();
  },
  watch: {
    //------------- 切换标签页的监听--每次页面一切换，就重新发请求.重新渲染页面----------
    activeName() {
      // 1、标签页id定义
      let type = 1;
      switch (this.activeName) {
        case "first":
          type = 1;
          break;
        case "foru":
          type = 100;
          break;
        case "second":
          type = 1000;
          break;
        case "third":
          type = 1004;
          break;

        default:
          break;
      }
      // 2、获取列表数据
      getMusicInfoApi({
        keywords: this.$route.query.keyworks,
        limit: 30,
        offset: (this.currentPage - 1) * 30,
        type,
      }).then((res) => {
        // （1）歌曲
        if (type == 1) {
          this.count = res.data.result.songCount;
          this.$store.state.songcount = this.count;
          // 歌曲列表
          this.musicList = res.data.result.songs;
          //计算歌曲时间
          for (let i = 0; i < this.musicList.length; i++) {
            let min = parseInt(this.musicList[i].dt / 1000 / 60);
            let sec = parseInt((this.musicList[i].dt / 1000) % 60);
            if (min < 10) {
              min = "0" + min;
            }
            if (sec < 10) {
              sec = "0" + sec;
            }
            this.musicList[i].dt = min + ":" + sec;
          }
          //存储搜索关键字
          this.$store.commit("stokeywork", this.$route.query.keyworks);
        }
        // （2）歌单
        else if (type == 1000) {
          this.songlist = res.data.result.playlists;
        }
        // （3）MV
        else if (type == 1004) {
          this.songMV = res.data.result.mvs;
        }
        // （4）专辑
        else if (type == 100) {
          this.songalbum = res.data.result.artists;
        }
      });
      
    },
    //------------- 切换标签页的监听--每次页面一切换，就重新发请求.重新渲染页面----------
  },
  methods: {

    // MV列表分页
    mvhandleCurrentChange: function (mvcurrentPage) {
      // console.log(`当前页: ${currentPage}`);
      this.mvcurrentPage = mvcurrentPage;
      // console.log("我是第一"+this.mvcurrentPage)
      this.playMV(this.mvidd, mvcurrentPage);
    },

    // ---------------------------歌曲列表信息----------------------------
    // （1）获取歌曲列表信息
    getmusicInfo(page = 1) {
      getMusicInfoApi({
        keywords: this.$route.query.keyworks,
        limit: 30,
        offset: (page - 1) * 30,
        type: 1,
      }).then((res) => {
        // 歌曲数量
        this.count = res.data.result.songCount;
        // 歌曲列表
        this.musicList = res.data.result.songs;
        // 存储搜索总数
        this.$store.commit("searchcount", this.count);
        //计算歌曲时间
        for (let i = 0; i < this.musicList.length; i++) {
          let min = parseInt(this.musicList[i].dt / 1000 / 60);
          let sec = parseInt((this.musicList[i].dt / 1000) % 60);
          if (min < 10) {
            min = "0" + min;
          }
          if (sec < 10) {
            sec = "0" + sec;
          }
          this.musicList[i].dt = min + ":" + sec;
        }
        //存储搜索关键字
        this.$store.state.songkeyworks = this.$route.query.keyworks;
      });
    },
    // （2）下载音乐
    DownloadSong(id) {
      playMusicApi({
        id: id,
      }).then((res) => {
        if (res.data.data[0].url != null) {
          this.DownloadSongUrl = res.data.data[0].url;
        } else {
          this.open4(res.data.songs[0].name);
        }
      });
    },
    // （3）播放MV
    playMV(mvid, page = 1) {
      this.$router.push({ path: "/playmv", query: { mvid: mvid } });
    },
    // （4）歌手
    flyawayar(id) {
      this.$router.push({ path: "/album", query: { sgingid: id } });
    },
    // （5） 歌曲列表分页
    handleCurrentChange: function (currentPage) {
      // console.log(`当前页: ${currentPage}`);
      this.currentPage = currentPage;
      // console.log(this.currentPage)
      this.getmusicInfo(currentPage);
    },
    // ---------------------------歌曲列表信息----------------------------


    // -----------------------------播放器-------------------------------
    runapi(id) {
      //歌曲不同步
      var _this = this;
      this.$axios
        .all([
          _this.playMusic(id),
          _this.getlr(id),
          _this.getdta(id),
        ])
        .then(
          _this.$axios.spread(function (res1, res2, res3) {
            let songurl = res1.data.data[0].url;
            let songname = res3.data.songs[0].name;
            let songarname = res3.data.songs[0].ar[0].name;
            let songpicurl = res3.data.songs[0].al.picUrl;
            let musiclrc = res2.data.lrc.lyric;
            console.log('2222222222222222',songurl,songname,songarname,songpicurl,musiclrc)

            if (songurl != null) {
              _this.$store.commit("addsong", {
                amount1: songname,
                amount2: songarname,
                amount3: songurl,
                amount4: songpicurl,
                amount5: musiclrc,
              });
              (musiclrc = ""), (songurl = null);
            } else {
              _this.open4(songname);
            }
          })
        );
    },
    //（1）获取播放音乐链接
    playMusic(id) {
      return playMusicApi({
        id,
      });
    },
    //（2）获取歌词
    getlr(id) {
      return getLyricApi({
        id,
      });
    },
    //（3）获取歌曲信息
    getdta(id) {
      return getdetailApi({
        id,
      });
    },
    //（4）版权提示
    open4(messges) {
      this.$notify.error({
        title: "错误",
        message: `《${messges}》  该歌曲无版权，暂无法播放,或者重新点击播放！`,
      });
    },
    // -----------------------------播放器-------------------------------


    // （1）点击跳转到歌单页面--携带歌单id
    opensonglist(id) {
      this.$router.push({ path: "/Playlist", query: { playlistid: id } });
    },
    // （1）点击跳转到专辑页面--携带专辑id
    opensongalbum(id) {
      this.$router.push({ path: "/album", query: { sgingid: id } });
    },
  },
};
</script>
<style lang="">
.albumcover {
  width: 222px;
  height: 200px;
  border-radius: 10px;
  margin: 0 10px;
  cursor: pointer;
}
</style>