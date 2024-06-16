<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input :placeholder="$t('welcome.search')" clearable v-model="searchQuery"></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="handleSearch">{{ $t('welcome.search') }}</el-button>
      <el-button type="primary" :icon="Refresh" @click="handleRefresh">重置</el-button>
    </el-row>
    <GridDemo :data="pageData" :columns="gridColumns" :filter-key="searchQuery" :title-mapper="titleMapper"
      operate-name="删除" :operation="handleDelete">
    </GridDemo>
  </el-card>
  <el-pagination class="pagination" v-model:current-page="queryForm.pagenum" v-model:page-size="queryForm.pagesize"
    :page-sizes="[10, 20, 30]" :small="small" :disabled="disabled" :background="background"
    layout="total, sizes, prev, pager, next, jumper" :total="tableData.length" @size-change="handleSizeChange"
    @current-change="handleCurrentChange" />
</template>


<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Delete, Refresh } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import GridDemo from '@/components/Grid.vue'


const store = useStore()

const searchQuery = ref('')
const tableData = ref([])
const gridColumns = ['userId', 'userAccount', 'userName', 'email', 'phone', 'createTime', 'updateTime', 'role']
const titleMapper = {
  userId: 'UID',
  userAccount: '账户名',
  userName: '昵称',
  email: '邮箱',
  phone: '电话',
  createTime: '创建时间',
  updateTime: '更新时间',
  role: '权限'
}

const queryForm = ref({
  pagenum: 1,
  pagesize: 8
})
let pageData = ref([])



const userId = ref()

const getData = (pageSize, pageNum) => {
  const begin = pageSize * pageNum - pageSize
  let end = pageSize * pageNum
  if (Array.isArray(tableData.value)) {
    if (end > tableData.value.length) {
      end = tableData.value.length
    }
    pageData.value = tableData.value.slice(begin, end)
  } else {
    console.error('tableData is not an array')
  }
}

const handleData = () => {
  store.dispatch('user/listAll').then(res => {
    tableData.value = res
    tableData.value.forEach(item => {
      item.role = item.permission === 1 ? '普通用户' : '管理员'
    })
    getData(queryForm.value.pagesize, queryForm.value.pagenum)
  }).catch((err) => {
    console.log(err)
  })
}

onBeforeMount(() => {
  handleData()
})


const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1
  queryForm.value.pagesize = pageSize
  getData(queryForm.value.pagesize, queryForm.value.pagenum)
}

const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum
  getData(queryForm.value.pagesize, queryForm.value.pagenum)
}

const handleSearch = () => {
  store.dispatch('user/searchUser', searchQuery.value).then(res => {
    tableData.value = res
    getData(queryForm.value.pagesize, queryForm.value.pagenum)
    ElMessage({
      message: 'Search successfully',
      type: 'success',
      duration: 1000
    })
  }).catch((msg) => {
    ElMessage.error(msg)
  })
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    'delete this user. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      store.dispatch(`user/deleteUser`, row.userId).then(() => {
        ElMessage({
          message: 'Delete successfully',
          type: 'success',
          duration: 1000
        })
      }).catch((msg) => {
        ElMessage.error(msg)
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

const handleRefresh = () => {
  searchQuery.value = ''
  handleData()
}

</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}

.pagination {
  margin-top: 10px;
}

.card-container {
  display: flex;
  justify-content: flex-start;

  .card {
    width: 20%;
    margin-bottom: 10px;
    margin-left: 5px;
    margin-right: 5px;
  }
}

.data-card {
  width: 90%;
  display: flex;
  justify-content: space-between;

  .png-container {
    width: 30%;
    margin-left: 10%;

    .peoplePng {
      width: 80%;
      height: auto;
    }
  }

  .text-container {
    width: 30%;
    margin-right: 5%
  }
}

.title-container {
  margin-bottom: 5px;
}

.buttom-part {
  margin-top: 10px;
}
</style>
