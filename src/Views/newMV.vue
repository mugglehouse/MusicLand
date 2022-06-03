<template lang="">
    <div class="main-container">
        <div class="main-header">
            <h4 class="menu-link-main" href="#">最新MV</h4>
        </div>
        <div class="content-wrapper">
            <!--MV开始 -->
            <div class="content-section">
                <div class="apps-card">
                    <div class="block" v-for="item in songMV" @click="playMV(item.id)">
                        <!-- MV封面 -->
                        <el-image class="app-card app-imgwithd" :src="item.cover"></el-image>
                        <!-- MV名 -->
                        <h5 class="songlisttext">{{item.name}}</h5>
                    </div>
                </div>
            </div>
            <!-- MV结束 -->
        </div>

    </div>
    </div>
</template>
<script>
    import { getnewMV } from '../request/api.js'
    export default {
        data() {
            return {
                songMV: [],
            }
        },
        created() {
            this.showmv();
        },
        methods: {
            // 1、获取MV列表数据
            showmv() {
                getnewMV({}).then(res => {
                    this.songMV = res.data.data;
                })
            },
            // 2、打开播放MV页面
            playMV(mvid, page = 1) {
                this.$router.push({ path: '/playmv', query: { mvid: mvid } })
            }
        },
    }
</script>
<style lang="">
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

    .app-imgwithd {
        width: 380px;
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