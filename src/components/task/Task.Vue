<template>
      <div>
      <el-container>
        <el-header height="100px">
          <div style="margin-bottom: 20px;">
            <el-row>
                <el-col>
                  <el-breadcrumb separator=">">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item><a href="/">服务管理</a></el-breadcrumb-item>
                    <el-breadcrumb-item>执行任务</el-breadcrumb-item>
                  </el-breadcrumb>
                </el-col>
            </el-row>
          </div>


          <el-form label-position="top" :rules="rules" ref="loginFrom"  :model="formData">
            <el-form-item label="目标主机" prop="ips">
              <el-select v-model="formData.ips" multiple placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.ip">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="执行命令" prop="command">
              <editor  ref='myEditor' v-model="formData.command" @init="editorInit" lang="html" theme="chrome" width="500" height="500"></editor>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm()">开始执行</el-button>
            </el-form-item>

          </el-form>

        </el-header>
        <el-main>

        </el-main>
      </el-container>
    </div>
</template>


<style>

</style>

<script>
export default {
  data () {
    return {
      searchs:{
        username:"",
        status : "",
        dates : []
      },
      formData : {
        ips : [],
        command : ""
      },

      options : [
        {
          label:"吴浩的测试服务器",
          ip : "152.136.96.50"
        }
      ],

      rules: {
          ips: [
            { required: true, message: '请选择服务器', trigger: 'change'}
          ],
          command: [
            { required: true, message: '请输入命令', trigger: 'change'}
          ]
        }

    }
  },
  methods: {
    submitForm(){
       //ref 用在组件中，就代表当前组件
        this.$refs.loginFrom.validate((valid) => {

          //校验失败
          if (!valid) {
            console.log('loginFrom validate err');
            return false;
          }

          //校验成功
          this.submit()

        });
    },
    submit(){
      w
    },
    editorInit: function () {
      require('brace/ext/language_tools') //language extension prerequsite...
      require('brace/mode/html')
      require('brace/mode/javascript')    //language
      require('brace/mode/less')
      require('brace/theme/chrome')
      require('brace/snippets/javascript') //snippet

      console.log("myEditor = " , this.$refs.myEditor.editor);
    }
  },
  components: {
    editor: require('vue2-ace-editor'),
  },
}
</script>
