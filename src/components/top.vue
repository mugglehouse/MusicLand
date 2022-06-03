<template>
  <div class="app">
      <!-- 1、头部导航 -->
      <div class="header">
        <!-- （1）前进后退 -->
        <div class="top-wrap">
          <ul>
            <li @click="back">
              <img src="../../static/images/返回.png" alt="" />
            </li>
            <li @click="forward">
              <img src="../../static/images/返回2.png" alt="" />
            </li>
            <li @click="ref">
              <img src="../../static/images/刷新.png" alt="" />
            </li>
          </ul>
        </div>
        <!-- （2）基本菜单 -->
        <div class="header-menu">
          <router-link to="/content" class="menu-link" active-class="is-active"
            >歌曲</router-link
          >
          <router-link to="/newmv" class="menu-link" active-class="is-active"
            >MV</router-link
          >
          <router-link
            to="./wallpaper"
            class="menu-link notify"
            active-class="is-active"
            >About me</router-link
          >
        </div>
        <!-- （3）搜索框 -->
        <div class="search-bar">
          <input
            type="text"
            placeholder="搜索"
            @keyup.enter="toResult"
            v-model="searchvalue"
          />
        </div>
        <!-- （4）登录注册 -->
        <div class="header-profile">
          <!-- 注销 -->
          <div class="user" v-if="islogin == 0">
            <img class="profile-img" :src="useravatar" alt="" />
            <a
              href="#"
              class="login-link"
              @click="logout"
              style="margin-left: 22px"
              >注销</a
            >
          </div>
          <!-- 登录 -->
          <div class="login" v-if="islogin == 1">
            <a
              href="#"
              class="login-link"
              @click="showlogin"
              style="margin-left: 22px"
              >登录</a
            >
          </div>
        </div>
      </div>
      <!-- 2、主体 -->
      <Main></Main>
      <!-- 3  登录窗口 -->
      <div class="login-box" v-if="loginstatus">
        <!-- (1) 头部 -->
        <div class="login-header">
          <div class="login-title">
            登录
            <span
              @click="closelogin"
              style="float: right; margin-right: 10px; cursor: pointer"
              >X</span
            >
          </div>
        </div>
        <!-- (2) 主体 -->
        <el-tabs v-model="activeName">
          <!-- ** 短信登录 -->
          <el-tab-pane label="短信登录" name="first">
            <div class="login-content">
              <!-- 手机号 -->
              <div class="lg-mgt">
                <input
                  v-model="userphone"
                  type="text"
                  placeholder="请输入手机号码"
                  style="width: 250px"
                  @keyup.enter="lg_submit"
                />
              </div>
              <!-- 验证码 -->
              <div class="lg-mgt">
                <input
                  v-model="userverion"
                  type="text"
                  placeholder="请输入验证码"
                  style="width: 122px"
                  @keyup.enter="lg_submit"
                />
                <a
                  href="#"
                  @click="lg_rverion"
                  class="login-submit content-button status-button"
                  style="font-size: 14px"
                  >获取验证码</a
                >
              </div>
              <!-- 提示信息 -->
              <!-- <div class="lg-mgt">
              <span class="login-link msg" style="font-weight: bold; ">{{verionmessage}}</span>
            </div> -->
              <!-- 提示信息 -->
              <button
                class="login-submit content-button status-button"
                @keyup.enter="lg_submit"
                @click="lg_submit"
                style="width: 250px"
              >
                登录
              </button>
            </div>
          </el-tab-pane>
          <!-- ** 密码登录 -->
          <el-tab-pane label="密码登录" name="second">
            <div class="login-content">
              <!-- 手机号 -->
              <div style="margin-top: 20px">
                <input
                  v-model="userphone"
                  type="text"
                  placeholder="请输入手机号码"
                  style="width: 250px"
                  @keyup.enter="lg_submit"
                />
              </div>
              <!-- 密码 -->
              <div style="margin-top: 20px">
                <input
                  v-model="userpwd"
                  type="password"
                  placeholder="请输入密码"
                  style="width: 250px"
                  @keyup.enter="lg_submit"
                />
              </div>
              <!-- 登录按钮 -->
              <button
                class="login-submit content-button status-button"
                @click="lg_submit"
                style="width: 250px"
              >
                登录
              </button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {
  userlogin,
  getuserverion,
  getstatus,
  userlogout,
  getuserinfo,
  getuserlist,
  reflogin,
} from "../request/api.js";
import Main from "./main.vue";
export default {
  created() {
    // 更新登录状态
    this.status();
    // 触发个人歌单列表数据的请求
    this.usersonglist(this.$store.state.userinfo.account.id);
  },
  components: {
    Main,
  },
  computed: {
    // 用户信息
    ...mapState(["userinfo"]),
    // 用户头像
    ...mapState(["useravatar"]),
    // 登录状态
    ...mapState(["islogin"]),
  },
  data() {
    return {
      // 1、搜索框的内容
      searchvalue: "",
      // 2、登录窗口状态
      loginstatus: false,
      // 3、登录表单信息
      userphone: "",
      userpwd: "",
      userverion: "",
      // 4、登录用户信息
      pwdmessage: "",
      verionmessage: "",
      userstatus: false,
      // 5、标签切换
      activeName: "first",
      type: 1,
    };
  },

  //侦听器
  watch: {
    // 监听登录标签页的切换
    activeName() {
      this.type = 1;
      switch (this.activeName) {
        case "first":
          this.type = 1;
          break;
        case "second":
          this.type = 2;
          break;

        default:
          break;
      }
    },
  },

  methods: {
    // ------------------前进后退刷新-----------------------
    forward() {
      this.$router.go(1);
    },
    ref() {
      this.$router.go(0);
    },
    back() {
      this.$router.back();
    },
    // ------------------前进后退刷新-----------------------

    //--------------------搜索框------------------------
    toResult() {
      if (this.searchsong == "") {
        alert("内容不能为空");
      } else {
        // this.$router.push("./search?q=" + this.searchvalue);
        this.$router.push({
          path: "/search",
          query: { keyworks: this.searchvalue },
        });
      }
    },
    //--------------------搜索框------------------------

    // ----------------------------登录----------------------------------
    // 1、登录窗口的显示与隐藏
    closelogin() {
      this.loginstatus = false;
    },
    showlogin() {
      this.loginstatus = true;
    },

    // 2、判断并更新登录状态--每次组件挂载created中都要触发一次--用于切换登录、注销的显示与隐藏
    status() {
      getstatus().then((res) => {
        let fx = res.data.data.account;
        if (fx == null) {
          this.$store.commit("setislogin", 1);
        } else {
          this.$store.commit("setislogin", 0);
        }
      });
    },

    // 3、 登录表单提交
    lg_submit() {
      // (1) 短信登录
      if (this.type == 1) {
        userlogin({
          phone: this.userphone,
          captcha: this.userverion,
        }).then((res) => {
          if (res.data.code == 200) {
            this.$store.commit("adduserinfo", res.data);
            this.$store.commit("adduseravatar", res.data.profile.avatarUrl);
            if ((this.$store.state.userinfo.code = 200)) {
              this.$router.go(0);
            }
          } else if (res.data.code == 400) {
            this.open4();
            // this.verionmessage = "手机号码或者验证码错误"
          } else if (res.data.code == 502) {
            this.open4();
            // this.pwdmessage = "手机号码或者密码错误"
          }
        });
      }
      // (2) 手机号登录
      else if (this.type == 2) {
        // 发请求
        userlogin({
          phone: this.userphone,
          password: this.userpwd,
        }).then((res) => {
          // 成功--通知仓库更新用户信息和头像
          if (res.data.code == 200) {
            this.$store.commit("adduserinfo", res.data);
            this.$store.commit("adduseravatar", res.data.profile.avatarUrl);
            if ((this.$store.state.userinfo.code = 200)) {
              this.$router.go(0);
            }
          }
          // 失败--提示错误信息
          else if (res.data.code == 400) {
            this.open4();
          } else if (res.data.code == 502) {
            this.open4();
          }
        });
      }
    },
    // （1）发送验证码
    lg_rverion() {
      getuserverion({
        phone: this.userphone,
      }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          alert("验证码发送成功");
        } else {
          alert("验证码发送失败，请60s后再发");
        }
      });
    },
    // （2）登录--错误信息提示
    open4() {
      if (this.type == 1) {
        this.$notify.error({
          title: "错误",
          message: "手机号码验证码错误",
        });
      } else if (this.type == 2) {
        this.$notify.error({
          title: "错误",
          message: "手机号码或者密码错误",
        });
      }
    },

    // 4、注销
    logout() {
      // 发请求--不需要接收数据
      userlogout().then((res) => {
        // 注销之后要通知仓库--清空用户信息/更改登录状态
        this.$store.commit("userlogout");
        this.$store.commit("setislogin", 1);
      });
    },

    // -------------------------------登录--------------------------------

    // ------------------------个人歌单列表----------------------------
    usersonglist(id) {
      getuserlist({
        id,
      }).then((res) => {
        this.$store.commit("adduserlist", res.data.playlist);
      });
    },
    // ------------------------个人歌单列表----------------------------
  },
};
</script>
<style lang="">
.el-tabs__header {
  padding-left: 18px !important;
}

#app {
  max-width: 1500px;
  width: 100%;
}
/* .mu{
  width: 100%;
} */

.top-wrap {
  margin-right: 105px;
}

.top-wrap ul {
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
}

.top-wrap ul li {
  list-style: none;
  margin: 0 10px;
  cursor: pointer;
  width: 16px;
  height: 16px;
}

.msg:hover {
  color: red;
}
</style>