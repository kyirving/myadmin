<template>
  <el-row type="flex" justify="center" class="loginFrom" align="middle">
    <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4" >
        <el-form label-position="top" :model="loginFrom" :rules="rules" ref="loginFrom" label-width="100px" class="loginFrom">
          <el-form-item label="用户名称" prop="username">
            <el-input v-model="loginFrom.username"></el-input>
          </el-form-item>
            <el-form-item label="密码" prop="password">
            <el-input  type="password" v-model="loginFrom.password"></el-input>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="submitForm()">登录</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>

    </el-col>
  </el-row>
  <!-- <img src="@/assets/rww.jpg" alt=""> -->
</template>

<script>
  export default {
    data() {
      return {
        loginFrom: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名称', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm() {

        //ref 用在组件中，就代表当前组件
        this.$refs.loginFrom.validate((valid) => {

          //校验失败
          if (!valid) {
            console.log('loginFrom validate err');
            return false;
          }

          //校验成功
          this.login()

        });

      },
      //登录功能的实现
      login(){

        this.$axios.post("http://127.0.0.1:8080/user/login" , this.loginFrom)
        .then(res => {
            if (res.code == 200) {

              this.$message({
                message: '登录成功',
                type: 'success'
              });

              // 更新状态数据
              this.$store.commit('saveUserInfo', res.data)

              //编程式导航 跳转首页
              this.$router.push("/")
            } else {
              this.$message.error('登录失败');
              // this.resetForm()
            }
        })
        .catch(err => {
          console.log(err);
        })
      },
      //重置输入框内容
      resetForm() {
        this.$refs.loginFrom.resetFields();
      }
    }
  }
</script>


<style>
.loginFrom {
  height: 100%;
  background-color: #2d434c;
  /* background-image: "@/assets/rww.jpg"; */

  /* background-image:url('../../assets/rww.jpg');
  background-repeat:no-repeat;
  background-position:right top; */
}
</style>
