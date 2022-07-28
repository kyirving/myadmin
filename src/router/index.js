import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import store from '@/store/index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

//全局导航守卫
//所有路由都会先走导航守卫
router.beforeEach((to, from, next) => {
  //store.state.accessToken
  console.log();
  // 调用next方法 允许通行
  if (to.path === "/login") {
    //如果访问login页面直接放行
    next()
  } else {
    //不是登录页，则需要判断用户是否登录成功

    const accessToken = store.getters.accessToken
    console.log("accessToken = " , accessToken);

    if (accessToken == "" || (typeof accessToken == 'undefined')){
      next('/login')

    } else {
      next()
    }
  }


})

export default router
