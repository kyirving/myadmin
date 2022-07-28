import Vue from "vue"
import Vuex from "vuex"

// 安装vuex
Vue.use(Vuex)

const store = new Vuex.Store({
  //全局状态 : 相当于组件中的data，就是数据
  state : {
    userInfo : {
      userId : "",
      accessToken : "",
      accessTokenExprice : -1,
      refreshToken : "",
      refreshTokenExprice : -1,
    }
  },
  //类似于 Vue 中的 计算属性
  getters:{
    accessToken : state => {
      const accessToken = state.userInfo.accessToken
      if(accessToken != "") return  state.userInfo.accessToken

      return localStorage.getItem("accessToken")
    }
  },

  //修改数据
  mutations : {
    //记录用户信息
    saveUserInfo(state , userInfo){
      state.userInfo.userId              =userInfo.userId
      state.userInfo.accessToken         =userInfo.accessToken
      state.userInfo.accessTokenExprice  =userInfo.accessExpire
      state.userInfo.refreshToken        =userInfo.refreshToken
      state.userInfo.refreshTokenExprice =userInfo.refreshExpire


      //将用户信息备份达到locastroage
      localStorage.setItem("userId" ,              userInfo.userId)
      localStorage.setItem("accessToken" ,         userInfo.accessToken)
      localStorage.setItem("accessTokenExprice" ,  userInfo.accessExpire)
      localStorage.setItem("refreshToken" ,        userInfo.refreshToken)
      localStorage.setItem("refreshTokenExprice" , userInfo.refreshExpire)
    }
  }
})

export default store

//访问accessToken store.state.accessToken

//调用修改方法 store.commit(fnName)

