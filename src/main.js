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
