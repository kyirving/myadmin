<template>
  <div>


    <div>
      <el-container>
        <el-header>
        </el-header>
        <el-main>

          <div>
            <el-row>
              <el-button type="text" @click="dialogFormVisible = true">新建用户</el-button>
              <div class="my-create">

                <el-button type="primary" @click="dialogFormVisible = true">新建用户</el-button>
              </div>
                <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
                  <el-form :model="form">
                    <el-form-item label="用户名称" :label-width="formLabelWidth">
                      <el-input v-model="form.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" :label-width="formLabelWidth">
                      <el-input v-model="form.email" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="add">确 定</el-button>
                  </div>
                </el-dialog>
            </el-row>
            <el-table
            v-loading="isLoading"
              :data="tableData"
              border
              :row-class-name="tableRowClassName"
              style="width: 100%">
              <el-table-column prop="userName" label="用户名称"></el-table-column>
              <el-table-column prop="email" label="邮箱"></el-table-column>
              <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.status == 1" round type="success"  plain>正常</el-button>
                  <el-button v-if="scope.row.status == 2"  round disabled plain>禁用</el-button>
                  <el-button v-if="scope.row.status == 3" round type="warning" plain>异常</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="ctime" label="创建时间"></el-table-column>
            </el-table>
          </div>


          <div class="block">
            <el-pagination
              @current-change="pageChange"
              :current-page.sync="pageInfo.page"
              :page-size="pageInfo.pageSize"
              :pager-count="pageInfo.pageCount"
              layout="prev, pager, next"
              :disabled="isLoading"
              :total="pageInfo.total">
            </el-pagination>
          </div>

        </el-main>
      </el-container>
    </div>
  </div>
</template>



<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>
  import axios from 'axios'
  import store from '@/store/index'
  export default {
    data() {
      return {
        tableData: [],
        pageInfo : {
          pageSize : 20,
          total : 0,
          page:1
        },
        isLoading : false,
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '100px',
        form:{
          username:"",
          email:""
        }
      }
    },
    created(){
      this.getUserList()
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
      },
      //获取用户数据
      getUserList(){
        this.isLoading = true
        axios.get("http://127.0.0.1:8080/user/list" , {
           // `params` 是即将与请求一起发送的 URL 参数
          // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
          params: {
            userid: store.state.userInfo.userId,
            page:this.pageInfo.page,
            page_size:this.pageInfo.pageSize
          },
          // `headers` 是即将被发送的自定义请求头
          headers: {'Access-Token': store.getters.accessToken},

        })
        .then(res => {
          if(res.data.code == 200) {
            this.isLoading = false
            console.log(res.data.data)
            this.tableData = res.data.data.list

            this.pageInfo.pageSize = res.data.data.pageInfo.pageSize
            this.pageInfo.total = res.data.data.pageInfo.total
            this.pageInfo.page = res.data.data.pageInfo.page
          }
        })
        .catch(err => {
          console.log(err);
        })
      },
      //添加用户
      add(){
        this.dialogFormVisible = false
        //自定义验证 先不做
        axios.post("http://127.0.0.1:8080/user/register" , this.form , {
          headers: {'Access-Token': store.getters.accessToken}
        })
        .then(res => {
          if(res.data.code == 200) {
            this.$message({
              message: '注册成功',
              type: 'success'
            });

            this.getUserList()
          }
        })
        .catch(err => {
          this.$message({
              message: '注册失败',
              type: 'error'
            });
          console.log(err);
        })

      },
      //分页改变
      pageChange(page){
        this.pageInfo.page = page
        this.getUserList()
      }
    },
  }
</script>
