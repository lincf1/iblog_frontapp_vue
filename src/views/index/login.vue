<template>
    <div class="homepage-hero-module">
        <div class="video-container">
            <div :style="fixStyle" class="filter">
                <!--内容-->
                <div style="margin-top: 200px;margin-left: 50px">
                    <el-form :data="loginFormData" style="width: 200px">
                        <el-form-item label="account" class="itemlabel">
                            <el-input v-model="loginFormData.account"  onkeyup="value=value.replace(/[^\w\.\/]/ig,'')" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="password" class="itemlabel">
                            <el-input v-model="loginFormData.password" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')" size="medium" type="password"></el-input>
                        </el-form-item>
                        <el-button size="small" @click="loginAction">登陆</el-button>
                    </el-form>
                </div>
            </div>
            <video :style="fixStyle" autoplay loop muted class="fillWidth" v-on:canplay="canplay">
                <source src="@/assets/zhizi/zhizi.mp4" type="video/mp4"/>
                浏览器不支持 video 标签，建议升级浏览器。
                <!--                <source src="../assets/video/G1w.webm" type="video/webm"/>-->
                浏览器不支持 video 标签，建议升级浏览器。
            </video>
            <div class="poster hidden" v-if="!vedioCanPlay">
                <img :style="fixStyle" src="@/assets/zhizi/zhizi.jpg" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    import {post} from "@/request/http";

    export default {
        name: 'Video',
        data() {
            return {
                vedioCanPlay: false,
                fixStyle: '',
                loginFormData: {
                    account: "",
                    password: ""
                }
            }
        },
        methods: {
            canplay() {
                this.vedioCanPlay = true
            },
            loginAction() {
                post('/login', this.loginFormData).then(res => {
                    console.log('res', res)
                    if (res.msg === 'fail') {
                        this.$message({
                            message: '帐号或者密码错误',
                            type: 'warning'
                        })
                    } else if (res.msg === 'success') {
                        let data = res.data.token
                        this.$store.commit('set_token', data)
                        localStorage.setItem('token', data)
                        this.$router.push('/test')
                    }
                })
            }
        },
        mounted: function() { //屏幕自适应
            window.onresize = () => {
                const windowWidth = document.body.clientWidth
                const windowHeight = document.body.clientHeight
                const windowAspectRatio = windowHeight / windowWidth
                let videoWidth
                let videoHeight
                if (windowAspectRatio < 0.5625) {
                    videoWidth = windowWidth
                    videoHeight = videoWidth * 0.5625
                    this.fixStyle = {
                        height: windowWidth * 0.5625 + 'px',
                        width: windowWidth + 'px',
                        'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
                        'margin-left': 'initial'
                    }
                } else {
                    videoHeight = windowHeight
                    videoWidth = videoHeight / 0.5625
                    this.fixStyle = {
                        height: windowHeight + 'px',
                        width: windowHeight / 0.5625 + 'px',
                        'margin-left': (windowWidth - videoWidth) / 2 + 'px',
                        'margin-bottom': 'initial'
                    }
                }
            }
            window.onresize()
        }
    }
</script>
<style src="@/css/resetelementui.css"></style>
<style scoped>
    .homepage-hero-module,
    .video-container {
        position: relative;
        height: 100vh;
        overflow: hidden;
    }

    .video-container .poster img{
        z-index: 0;
        position: absolute;
    }

    .video-container .filter {
        z-index: 1;
        position: absolute;
        background: rgba(0, 0, 0, 0.4);
        width: 100%;
    }

    .fillWidth {
        width: 100%;
    }
</style>