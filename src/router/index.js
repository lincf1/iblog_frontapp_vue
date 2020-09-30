import Vue from 'vue/dist/vue.esm.js'
import Router from 'vue-router'
import login from '@/views/index/login'
import test from '@/views/index/test'
// import videoTest from "@/views/index/videoTest";


Vue.use(Router)
// 重复点击导航栏的内容会有报错，加上这段代码就好了
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    // {path: '/', name: 'videoTest', component: videoTest},
    {path: '/', name: 'login', component: login},
    {path: '/test', name: 'test', component: test}
  ]
})
