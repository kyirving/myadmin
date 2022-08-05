<template>
  <div>


    <div>
      <el-container>
        <el-header height="100px">
          <div style="margin-bottom: 20px;">
            <el-row>
                <el-col>
                  <el-breadcrumb separator=">">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
                    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
                  </el-breadcrumb>
                </el-col>
            </el-row>
          </div>

          <el-form :inline="true" :model="searchs" class="demo-form-inline">
            <el-form-item label="用户名">
              <el-input v-model="searchs.username" placeholder="请输入用户名"></el-input>
            </el-form-item>

            <el-form-item label="用户状态">
              <el-select v-model="searchs.status" placeholder="请选择用户状态">
                <el-option label="正常" value="1"></el-option>
                <el-option label="禁用" value="2"></el-option>
                <el-option label="异常" value="3"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="创建时间">
              <el-date-picker
                v-model="searchs.dates"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>

        </el-header>
        <el-main>

          <div>
            <el-row>
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
                  <el-switch
                    @change="changeStatus(scope.row)"
                    v-model="scope.row.status"
                    :active-value=1
                    :inactive-value=2
                    active-color="#13ce66"
                    inactive-color="#C0CCDA">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column prop="ctime" label="创建时间"></el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" plain icon="el-icon-edit"></el-button>
                    <template>
                      <el-popconfirm
                        title="确定要删除该用户嘛?"
                        icon="el-icon-delete"
                        @confirm="del(scope.row.id)"
                      >
                      <el-button type="danger" slot="reference" plain icon="el-icon-delete"></el-button>
                      </el-popconfirm>
                    </template>


                    <el-popconfirm
                      title="这是一段内容确定删除吗？"
                    >
                      <el-button type="danger"  plain icon="el-icon-delete">删除</el-button>
                    </el-popconfirm>
                  <el-button type="success" icon="el-icon-check" plain>分配角色</el-button>
                </template>
              </el-table-column>
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



<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-header{
    min-height: 60px !important;
  }

</style>

<script>
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
        },
        searchs:{
          username:"",
          status : "",
          dates : []
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },

      }
    },
    created(){
      this.getUserList()
    },
    methods: {
      /**
       *
       * @param {删除用户} uid
       */
      del(uid){
        this.$axios.delete("/user/delete" , {data : {uid:uid}})
        .then(res => {
          if(res.code == 200) {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.getUserList()
          }
        })
        .catch(err => {
          this.$message({
              message: "删除失败",
              type: 'error'
            });
        })
      },
      /**
       *
       * @param {当前变更用户} row
       */
      changeStatus(row) {
        console.log(row);
        this.$axios.post("/user/change-status" , {
          uid:row.id,
          status:row.status
        })
        .then(res => {
          if(res.code == 200) {
            this.$message({
              message: res.msg,
              type: 'success'
            });
          }
        })
        .catch(err => {
          this.$message({
              message: "更新异常",
              type: 'error'
            });
        })
      },
      /**
       * 搜索
       */
      onSubmit(){
        // if (this.searchs.username.trim() == "" && this.searchs.status == "") {
        //   this.$message('请输入用户名搜索');
        //   return
        // }
        this.getUserList()
      },
      tableRowClassName({row, rowIndex}) {
      },
      getUserList(){
        this.isLoading = true
        this.$axios.get("/user/list" , {
           // `params` 是即将与请求一起发送的 URL 参数
          // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
          params: {
            userid: store.state.userInfo.userId,
            username: this.searchs.username,
            status : this.searchs.status,
            sdate : this.searchs.dates[0],
            edate : this.searchs.dates[1],
            page:this.pageInfo.page,
            page_size:this.pageInfo.pageSize
          }

        })
        .then(res => {
          if(res.code == 200) {
            this.isLoading = false
            console.log(res.data)
            this.tableData = res.data.list

            this.pageInfo.pageSize = res.data.pageInfo.pageSize
            this.pageInfo.total = res.data.pageInfo.total
            this.pageInfo.page = res.data.pageInfo.page
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
        this.$axios.post("/user/register" , this.form , {
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
