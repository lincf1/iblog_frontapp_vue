import Vue from 'vue/dist/vue.esm.js'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index'
import router from './router'
import axios from 'axios'

Vue.use(ElementUI)

Vue.prototype.$ajax = axios
axios.defaults.withCredentials = true
axios.defaults.headers.post['Contenst-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = store.state.token
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 判断是否存在token,如果存在将每个页面header添加token
  if (store.state.token) {
    config.headers.common['Authorization'] = 'Bearer ' + store.state.token
  }
  return config
}, function (error) {
  router.push('/login')
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log('response', response, response.headers.token)
  let data = response.headers.token
  if (data !== undefined && data !== '') {
    store.commit('set_token', data)
    localStorage.setItem('token', data)
  }
  if (response.data.code !== undefined && response.data.code !== '') {
    if (Number(response.data.code) === 101) {
      store.commit('del_token')
      router.push('/')
    }
  }
  // if (response.code !== undefined && response.code !== '') {
  //   if (Number(response.code) === 101) {
  //     store.commit('del_token')
  //     router.push('/')
  //   }
  // }
  return response
}, function (error) {
  // 对响应错误做点什么
  if (error.response) {
    switch (error.response.status) {
      case 401:
        store.commit('del_token')
        router.push('/login')
    }
  }
  return Promise.reject(error)
})

