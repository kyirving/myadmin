<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    //页面加载时读取localstorage里的状态信息
    const userInfo = {
      userId              : localStorage.getItem("userId"),
      accessToken         : localStorage.getItem("accessToken"),
      accessExpire  : localStorage.getItem("accessTokenExprice"),
      refreshToken        : localStorage.getItem("refreshToken"),
      refreshExpire : localStorage.getItem("refreshTokenExprice"),
    }

    this.$store.commit("saveUserInfo" , userInfo)

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        localStorage.setItem("userId" ,              this.$store.state.userInfo.userId)
        localStorage.setItem("accessToken" ,         this.$store.state.userInfo.accessToken)
        localStorage.setItem("accessTokenExprice" ,  this.$store.state.userInfo.accessTokenExprice)
        localStorage.setItem("refreshToken" ,        this.$store.state.userInfo.refreshToken)
        localStorage.setItem("refreshTokenExprice" , this.$store.state.userInfo.refreshTokenExprice)
    })

  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
