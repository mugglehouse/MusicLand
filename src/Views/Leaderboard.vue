<template lang="">
    <div class="main-container">
        <div class="main-header">
            <!-- 1、头部导航 -->
            <div class="main-header">
                <div class="header-menu">
                    <router-link to="/Leaderboard" active-class="is-active">排行榜</router-link>
                    <router-link to="/singerlist" active-class="is-active">歌手</router-link>
                    <router-link to="#" active-class="is-active">每日推荐</router-link>
                </div>
            </div>
        </div>
        <div class="content-wrapper">
            <div class="content-section">
                <!-- 2、排行榜卡片 -->
                <div class="apps-card">
                    <div class="block" v-for="item in lead" @click="openplaylist(item.id)">
                        <el-image class="songlistimg1 app-card" :src="item.coverImgUrl"></el-image>
                        <h5 class="songlisttext">{{item.name}}</h5>
                    </div>
                </div>
            </div>


        </div>


    </div>
</template>
<script>
    import { getlead } from '../request/api.js'
    export default {
        data() {
            return {
                lead: [],
            }
        },
        created() {
            this.getinfo()
        },
        methods: {
            // 1、获取排行榜列表数据
            getinfo() {
                getlead({}).then(res => {
                    this.lead = res.data.list;
                })
            },
            // 2、打开排行榜专辑
            openplaylist(id) {
                this.$router.push({ path: '/Playlist', query: { playlistid: id } })
            }
        },

    }
</script>
<style lang="">
    .content-button {
        text-decoration: none;
    }

    .songlistimg1 {
        width: 220px;
        height: 220px;
        border-radius: 10px;
        margin: 0 10px;
        cursor: pointer;
    }

    .songlisttext {
        text-align: center;
        font-weight: 500;
        cursor: pointer;
    }
</style>