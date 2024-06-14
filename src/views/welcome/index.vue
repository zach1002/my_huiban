<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input :placeholder="'search'" clearable></el-input>
      </el-col>
      <el-button type="primary" :icon="Search">Search</el-button>
      <el-button type="primary">Add User</el-button>
    </el-row>

    <el-table :data="pageData" stripe style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
    </el-table>
    <el-pagination class="pagination"
      v-model:current-page="qureyForm.pagenum"
      v-model:page-size="qureyForm.pagesize"
      :page-sizes="[2, 4, 8]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalLength"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'

const qureyForm = ref({
  pagenum: 1,
  pagesize: 2
})

const tableData = [
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-05',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const totalLength = ref(tableData.length);
let pageData = []

const getData = (pageSize, pageNum) => {
  const begin = pageSize*pageNum - pageSize
  const end = pageSize*pageNum
  pageData = tableData.slice(begin, end);
}
getData(qureyForm.value.pagesize, qureyForm.value.pagenum)

const handleSizeChange = (pageSize) => {
  qureyForm.value.pagenum = 1
  qureyForm.value.pagesize = pageSize
  getData(qureyForm.value.pagesize, qureyForm.value.pagenum)
}

const handleCurrentChange = (pageNum) => {
  qureyForm.value.pagenum = pageNum
  getData(qureyForm.value.pagesize, qureyForm.value.pagenum)
}





</script>

<style lang="scss" scoped>

.header{
  padding-bottom: 16px;
  box-sizing: border-box;
}

.pagination{
  margin-top:10px;
}
</style>
