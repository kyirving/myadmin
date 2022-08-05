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

          <el-form :inline="true" :model="searchs" class="demo-form-inline">

          </el-form>

        </el-header>
        <el-main>

          <div>
            <el-row>
              <div class="my-create">
                <el-button type="primary" @click="dialogFormVisible = true">新建任务</el-button>
              </div>
            </el-row>
          </div>



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
    }
  }
}
</script>
