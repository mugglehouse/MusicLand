<template>
  <div class="main-container">
    <div class="main-header">
      <a class="menu-link-main" href="#">Muggle Wonderland</a>
    </div>
    <div class="content-wrapper">
      <div class="w">
        <div class="mus">
          <div class="txt">
            <p>Welcom to Muggle Music Land</p>
          </div>
          <!-- <div class="bear"></div> -->
          <div class="run"></div>
        </div>
        <footer class="footer">
          <div class="logo1">
            <a class="me">
              <img src="../../static/images/logo2.png" alt="About us" />
              <p>About me</p>
            </a>
          </div>
          <div class="foot">
            <div class="f5">
              <ul>
                <li>Want to get in touch? We’d love to hear from you!</li>
                <li>Contact with 863457210@qq.com</li>
                <li>Or weibo named muggle</li>
                <li>©2022 Muggle Terms and Conditions Privacy Cookie Policy</li>
              </ul>
            </div>
            <div class="f6">
              <ul>
                <li>
                  <a href="">Pricing</a>
                </li>
                <li><a href="">Exolore</a></li>
                <li><a href="">Join us</a></li>
                <li><a href="">About</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // mounted() {
  //   this.$store.commit("addsong", {
  //     amount1: "Are You Lost",
  //     amount2: "park bird",
  //     amount3:
  //       "http://m8.music.126.net/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/3700896420/cb0d/2854/01e1/bbe31fd7547c46b25da0d1eac1f19ea9.flac",
  //     amount4:
  //       "https://p1.music.126.net/B0hvMNWSoxW5jMc9kgS5xA==/109951165076735700.jpg",
  //     amount5: "[99:00.00]纯音乐，请欣赏",
  //   });
  // },
};
</script>
<style>
.w {
  width: 1200px;
  margin: 0 auto;
}

.mus {
  position: relative;
  height: 400px;
  top: 60px;
}

.run {
  position: absolute;
  width: 200px;
  height: 100px;
  top: 150px;
  background: url(../../static/images/bear.png);
  animation: bear 0.5s steps(8) infinite, move 2s linear forwards;
}

@keyframes bear {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -1600px 0;
  }
}

@keyframes move {
  0% {
    left: 0;
  }
  100% {
    left: 50%;
    transform: translateX(-50%);
  }
}
/* （2）文本 */

.txt {
  position: absolute;
  width: 0px;
  height: 50px;
  left: 32%;
  font-size: 30px;
  color: #cec1b9;
  overflow: hidden;
  /* 文字强制一行内显示 */
  white-space: nowrap;
  animation: w 2s steps(28) forwards;
}

@keyframes w {
  0% {
    width: 0;
  }
  100% {
    width: 520px;
  }
}

/* CSS的初始化 */

/* 把我们所有标签的内外边距清零 */

* {
  margin: 0;
  padding: 0;
  /* css3盒子模型 */
  box-sizing: border-box;
}

/* em 和 i 斜体的文字不倾斜 */

em,
i {
  font-style: normal;
}

/* 去掉li 的小圆点 */

li {
  list-style: none;
}

img {
  /* border 0 照顾低版本浏览器 如果 图片外面包含了链接会有边框的问题 */
  border: 0;
  /* 取消图片底侧有空白缝隙的问题 */
  vertical-align: middle;
}

button {
  /* 当我们鼠标经过button 按钮的时候，鼠标变成小手 */
  cursor: pointer;
}

a {
  color: #6a2f1c;
  text-decoration: none;
}

a:hover {
  color: #b9cebf;
}

button,
input {
  /* "\5B8B\4F53" 就是宋体的意思 这样浏览器兼容性比较好 */
  font-family: Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
    "\5B8B\4F53", sans-serif;
  /*去除搜索和按钮边框 */
  border: 0;
  outline: none;
}

body {
  /* CSS3 抗锯齿形 让文字显示的更加清晰 */
  -webkit-font-smoothing: antialiased;
  background-color: #fff;
  font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
    "\5B8B\4F53", sans-serif;
  color: #666;
}

.hide,
.none {
  display: none;
}

/* 清除浮动 */

.clearfix:after {
  visibility: hidden;
  clear: both;
  display: block;
  content: ".";
  height: 0;
}

.clearfix {
  *zoom: 1;
}

.footer {
  /* height: 400px; */
  color: #fff5e7;
}

.logo1 {
  width: 250px;
  height: 250px;
  margin: 2px auto;
}

.logo1 img {
  width: 230px;
  height: 230px;
  transition: all 0.5s;
}

.logo1 img:hover {
  width: 240px;
  height: 240px;
}

.logo1 p {
  text-align: center;
  font-size: 16px;
}

.foot {
  margin-top: 40px;
  position: relative;
  height: 210px;
  /* background-color: #b9cebf; */
}

.foot .f5 ul {
  float: left;
  width: 600px;
  margin: 20px;
}

.foot .f6 ul {
  float: right;
  width: 100px;
  margin: 20px;
}

.foot ul li {
  padding: 10px;
  font-size: 16px;
}

.foot a {
  color: #fff5e7;
}

.foot a:hover {
  color: aquamarine;
  text-decoration: none;
}

.me:hover {
  color: #fff5e7;
  text-decoration: none;
}
</style>