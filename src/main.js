// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 导入element-ui -js
import ElementUI from 'element-ui';
// 导入 element-ui -css
import 'element-ui/lib/theme-chalk/index.css';

// 导入全局样式
import '@/assets/index.css'

// 导入vuex 状态管理
import store from './store/index'

//导入axios
import axios from 'axios'

//配置baseUrl
axios.defaults.baseURL = "http://127.0.0.1:8080"


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么

  //不是登录的请求则添加请求头
  if(!config.url.endsWith("/login")) {
    config.headers['Access-Token'] = store.getters.accessToken
  }

  console.log("请求拦截器 " , config);
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  //检测token是否过期，过期则跳至登录

  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

//将axios添加到Vue的原型中去
//实例对象可以直接使用原型对象的属性或方法
//所有的组件都是vue的实例
Vue.prototype.$axios = axios


// 安装ElementUI 插件
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, //使用router
  store, //使用store
  components: { App },
  template: '<App/>'
})
