<template>
    <div>
        <span>
            LOGIN
        </span>
        <div>
            <el-form :data="loginFormData" style="width: 300px">
                <el-form-item label="account">
                    <el-input v-model="loginFormData.account"></el-input>
                </el-form-item>
                <el-form-item label="password">
                    <el-input v-model="loginFormData.password"></el-input>
                </el-form-item>
                <el-button @click="loginAction">登陆</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { post } from '@/request/http'
    export default {
        name: "login",
        data() {
            return {
                loginFormData: {
                    account: "",
                    password: ""
                }
            }
        },
        methods: {
            loginAction() {
                post('http://localhost:2200/login', this.loginFormData).then(res => {
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
        }
    }
</script>

<style scoped>

</style>