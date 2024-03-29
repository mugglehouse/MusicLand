# MuggleMusicLand

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

****************************************** *MusicLand* *****************************************

线上预览地址：http://47.106.123.198:80/

网易云开放接口：https://binaryify.github.io/NeteaseCloudMusicApi/#/

****************************************** *MusicLand* *****************************************



**************************start法则****************************

背景

目标

行动

结果


## 一、项目背景

​       这是我刚开始学习vue的时候做的第一个完整入门项目，是基于Vue全家桶+ElementUI+Axios做了一个PC端音乐播放器，因为后台接口可以用网易云的开发接口，所以这个项目能让我快速的从知识层面过渡到实际开发，帮助我熟悉Vue框架在实际项目中模块化开发，进一步掌握axios对后台API接口的调用、Vuex进行状态管理，利用Vuerouter实现单页面的应用。网易云的接口我也部署到了自己的服务器，独立完成了登录注销、搜索、音乐播放、MV播放、歌单分类展示等基本功能。

## 二、业务功能

#### 1、登录注销

实现了短信验证码登录和密码登录和注销功能

**（1）vuex仓库管理登录状态：**每次重新挂载页面时，需要判断用户的登录状态，来保证登录和注销的不同页面渲染，所以我将登录状态放在vuex仓库中进行状态管理，在组件的created钩子中触发对登录状态的判断（发请求），在每次页面重新挂载时，实现不同登录状态的不同页面渲染

**（2）vuex仓库管理用户信息：**用户信息是动态存在的，在登录时存储用户信息，在注销时清空用户信息，所以放在vuex仓库中管理，在登录表单提交成功时，通知仓库commit存储用户信息，在退出登录时，通知仓库清空用户信息，并修改登录状态

**（3）axios请求拦截器设置token：**将token 的值放到请求头，则每次请求都会携带token

**（4）watch监听标签的切换：**登录表单提交的时候，两种登录方式调用的是不同的接口，需要监听登录模式的切换，不同模式调用不同的接口（el-tab v-model     el-tab-plane  name）

** Vue生命周期钩子，vue2，vue3不同之处

** vuex的state/mutations/actions/getters

** token、cookie

**axio还封装了什么

**watch和computed的区别

#### 2、搜索

实现了歌曲搜索功能，以及搜索结果的二级菜单

**（1）编程式导航：**并将搜索关键字作为query参数跳转到search页面

**（2）vuex仓库动态管理搜索关键字keywords：**因为keywords在其他组件也有使用到，将keywords放在仓库里可实现共享数据，所有组件都能同步地获取与修改

**（3）watch配合element-tab监听标签页的切换：**不同标签页的切换要发送不同的请求，重新渲染页面，所以在element-tab里绑定v-model获取子标签的name值，监听name值的变化即可监听页面切换，发送相应不同的请求

**编程式导航和声明式导航

#### 3、歌单\MV\排行榜\评论列表渲染

**（1）歌单列表封装成全局组件，利用全局事件总线进行组件之间的通信：**① 由于歌曲列表在多个组件中用到（最新歌单、最热歌单等），封装成全局组件可以高效复用组件，减少冗余代码。② 利用全局事件总线完成组件之间的通信，不同歌单请求不同的API接口，在其他组件完成API接口的调用，获取后台列表数据，发送事件（this,$bus.emit）并传递参数给全局组件，全局组件接收事件(this.$bus.on)和参数，更新渲染页面，并利用beforeDestroy钩子在组件销毁之前销毁对应的自定义事件，提高性能

**（2）将所有API接口挂载到vue的原型上：**由于歌单列表数据等不用存储到仓库中，直接在组件中created触发请求获取接口数据，存储在data中，然后进行列表渲染，将Api接口挂载到Vue的原型上，在组件当中就可以不用每次都引入，直接往组件自身实例的原型链上找调用API接口的方法。

**组件通信的方式还有哪些，有什么不同，优缺点



#### 4、音乐播放器

使用aplayer插件实现的一个小型播放器

**（1）vuex仓库管理播放列表数据：**由于多个组件都会往播放器添加歌曲进行播放，将播放列表数据存在仓库中可实现共享，其他组件往仓库添加歌曲数据，播放器组件往仓库取出数据，利用aplayer插件自身的属性和方法（:audio和listadd），完成歌曲列表的动态展示和播放。

**（2）utils文件夹统一管理工具函数**：由于添加播放歌曲工具函数在多个组件都有使用，将其统一放在utils文件夹并暴露，在main.js中将工具挂载到vue的原型中，则在组件中就能直接通过自身的原型链中查找工具函数之间使用，减少了冗余代码，提高函数的复用

**（3）axios.all + aixos.spread解决多个请求并发问题**：① 播放器用的是vue-aplayer组件，播放歌曲需要五个数据，要并发三个请求获取数据，并且三个请求都成功才往仓库里添加数据，所以用axios.all + axios.spread解决（与promise一样），axios请求的结果就是一个promise ② 这里首先是将axios绑定在vue的原型上，然后就能直接在组件中使用axios的方法 ③ axios.all并发三个请求，返回的是一个promise，如果三个请求都成功，才返回成功的promise，接着用then来捕获axios.all的结果，成功则执行axios.spread，aixos.spread的参数是一个执行函数，这个执行函数接收axios.all中三个请求函数返回的结果作为参数，最后得到接口数据

**（4）lodash对象数组去重：**在往播放列表添加歌曲的时候，需要进行对象数组去重，这里使用的是lodash库的方法uniqBy来根据url的唯一性去重

** 数组去重还有哪些常用方法

** lodash还有哪些常用方法

** promise还有哪些常用方法

## 三、技术栈

#### Vue+ElementUI+Axios

###### 1、使用全局事件总线等进行组件通信，利用vuex进行状态、数据的统一管理，并使用createPersistedState插件实现仓库中数据的持久化存储

（1）组件通信

* 全局事件总线
* props
* 自定义事件

（2）vuex状态管理

* 管理登录状态
* 管理用户信息和接口数据
* createPersistedState插件持久化存储仓库数据到sessionstorage

###### 2、二次封装axios，并将axios和接口文件挂载到Vue实例的原型上，实现api接口的统一管理，并使用axios.all和spread方法，解决多个请求并发的问题

（1）axios的二次封装

① 全局配置

--跨域，代理服务器解决跨域问题

--encodeURIComponent，为避免服务器收到不可预知的请求，在全局中利用encodeURIComponent 对用户输入的内容进行转义和过滤，保证数据传输的正确性

**说说还有哪些方法可以解决跨域

② 设置请求拦截器和响应拦截器

--在请求之前获取token，将token放在请求头一并发送

--设置loading

（2）接口挂载到vue原型上

（3）axios.all/spread解决多个请求并发

###### 3、注册全局组件，实现组件的复用，并将工具函数放在utils文件夹，实现工具函数的统一管理和复用

（1）歌单列表全局组件

（2）添加歌曲工具函数

## 四、项目重点\难点\亮点

#### 1、axios.all/spread解决多个请求并发问题

① 播放器用的是vue-aplayer组件，播放歌曲需要五个数据，要并发三个请求获取数据，并且三个请求都成功才往仓库里添加数据，所以用axios.all + axios.spread解决（与promise一样），axios请求的结果就是一个promise ② 这里首先是将axios绑定在vue的原型上，然后就能直接在组件中使用axios的方法 ③ axios.all并发三个请求，返回的是一个promise，如果三个请求都成功，才返回成功的promise，接着用then来捕获axios.all的结果，成功则执行axios.spread，aixos.spread的参数是一个执行函数，这个执行函数接收axios.all中三个请求函数返回的结果作为参数，最后得到接口数据，存储到state中

#### 2、createPersistedState解决vuex仓库非持久化存储

vuex仓库中存储的数据是非持久化的，如果组件销毁仓库中的数据也会跟着销毁，vuex管理着登录状态、用户信息以及播放列表的数据，这些数据在全局中需要一直存在，所以我使用了createPersistedState插件，在仓库中配置，将仓库中的数据存储在sessionStorage中，只有当会话关闭，仓库中的数据才会被销毁，实现了仓库数据的持久化

#### 3、对组件和工具函数的统一管理和复用

（1）① 由于歌曲列表在多个组件中用到（最新歌单、最热歌单等），封装成全局组件可以高效复用组件，减少冗余代码。② 利用全局事件总线完成组件之间的通信，不同歌单请求不同的API接口，在其他组件完成API接口的调用，获取后台列表数据，发送事件（this,$bus.emit）并传递参数给全局组件，全局组件接收事件(this.$bus.on)和参数，更新渲染页面，并利用beforeDestroy钩子在组件销毁之前销毁对应的自定义事件，提高性能

（2）由于添加播放歌曲工具函数在多个组件都有使用，将其统一放在utils文件夹并暴露，在main.js中将工具挂载到vue的原型中，则在组件中就能直接通过自身的原型链中查找工具函数之间使用，减少了冗余代码，提高函数的复用

## 五、项目优化

###### 1、使用v-if对登录窗口的显示与隐藏

而不是使用v-show，v-if是真正的条件渲染，保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是惰性的如果在初始渲染时条件为假，则什么也不做，直到条件第一次变为真时，才会开始渲染条件块。v-show 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 display 属性进行切换。

###### 2、使用watch监听标签页的切换

（1）登录表单提交的时候，两种登录方式调用的是同一个函数不同的接口，需要监听登录模式的切换，不同模式调用不同的接口（el-tab v-model     el-tab-plane  name）

（2）watch配合element-tab监听搜索结果中二级菜单标签页的切换：不同标签页的切换要发送不同的请求，重新渲染页面，所以在element-tab里绑定v-model获取子标签的name值，监听name值的变化即可监听页面切换，发送相应不同的请求

###### 3、图片懒加载

对于图片过多的页面，为了加速页面加载速度，将页面内未出现在可视区域内的图片先不做加载， 等到滚动到可视区域后再去加载。提高了页面加载的性能，也提高了用户体验。

###### 4、路由懒加载

这个项目是一个单页面应用，其中设置了一级路由和二级路由，不同组件之间使用声明式导航和编程式导航进行路由跳转，路由跳转过多的话，使用 webpcak 打包后的文件会很大，当进入首页时，加载的资源过多，页面会出现白屏的情况，不利于用户体验。所以可以使用路由懒加载，将不同路由对应的组件分割成不同的代码块，当路由被访问的时候才加载对应的组件，这样就会高效，提高首屏显示的速度。

###### 5、第三方插件按需引入

###### 6、服务端渲染

