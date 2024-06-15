<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input :placeholder="'查询用户信息'" clearable v-model="searchInput.name"></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
    </el-row>

    <el-table :data="pageData" stripe style="width: 100%">
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="type" label="Type" width="180" />
    <el-table-column prop="fullName" label="FullName" />
    </el-table>
    <el-pagination class="pagination"
      v-model:current-page="queryForm.pagenum"
      v-model:page-size="queryForm.pagesize"
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

  <el-card class="buttom-part">
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input :placeholder="'输入uid'" clearable v-model="searchInput.name"></el-input>
      </el-col>
      <el-button type="primary" :icon="Delete" @click="handleDelete">删除用户</el-button>
    </el-row>
  </el-card>
</template>

<script setup>
import { Search, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'

const queryForm = ref({
  pagenum: 1,
  pagesize: 2
})

const tableData = ref([
  {
    name: 'TPAMI',
    type: 'A',
    fullName: 'IEEE Trans on Pattern Analysis and Machine Intelligence',
  },
  {
    name: 'AI',
    type: 'A',
    fullName: 'Artificial Intelligence',
  },
  {
    name: 'IJCV',
    type: 'A',
    fullName: 'International Journal of Computer Vision',
  },
  {
    name: 'JMLR',
    type: 'A',
    fullName: 'Journal of Machine Learning Research',
  },
  {
    name: 'TAP',
    type: 'B',
    fullName: 'ACM Transactions on Applied Perception',
  },
  {
    name: 'TSLP',
    type: 'B',
    fullName: 'ACM Transactions on Speech and Language Processing',
  },
  {
    name: 'AAMAS',
    type: 'B',
    fullName: 'Autonomous Agents and Multi-Agent Systems',
  },
  {
    name: 'EAAI',
    type: 'C',
    fullName: 'Engineering Applications of Artificial Intelligence',
  }
])
const totalLength = ref(tableData.value.length);
let pageData = ref([])

const getData = (pageSize, pageNum) => {
  const begin = pageSize*pageNum - pageSize
  const end = pageSize*pageNum
  pageData.value = tableData.value.slice(begin, end);
}
getData(queryForm.value.pagesize, queryForm.value.pagenum)

const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1
  queryForm.value.pagesize = pageSize
  getData(queryForm.value.pagesize, queryForm.value.pagenum)
}

const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum
  getData(queryForm.value.pagesize, queryForm.value.pagenum)
}

const searchInput = ref({
    name: ''
})

const handleSearch = () => {
    let curData = ref([])
    for (let index = 0; index < tableData.value.length; index++) {
      const element = tableData.value[index];
      if(searchInput.value.name===element.name) {
        curData.value.push(element)
      }
    }
    pageData.value = curData.value;
}

const handleDelete = () => {

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

.card-container {
  display: flex;
  justify-content: flex-start;
  .card {
    width:20%;
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
