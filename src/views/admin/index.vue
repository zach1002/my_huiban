<template>
  <!-- <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input :placeholder="$t('admin.searchHolder')" clearable v-model="searchInput.name"></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="handleSearch">{{$t('admin.search')}}</el-button>
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
        <el-input :placeholder="$t('admin.enterHolder')" clearable v-model="userId"></el-input>
      </el-col>
      <el-button type="primary" :icon="Delete" @click="handleDelete">{{$t('admin.delete')}}</el-button>
    </el-row>
  </el-card> -->
  <el-card>
    <GridDemo :data="pageData" :columns="gridColumns" :filter-key="searchInput.name"> </GridDemo>
  </el-card>
  <el-pagination class="pagination"
                   v-model:current-page="queryForm.pagenum"
                   v-model:page-size="queryForm.pagesize"
                   :page-sizes="[10, 20, 30]"
                   :small="small"
                   :disabled="disabled"
                   :background="background"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="totalLength"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
    />
</template>

<script setup>
import { Search, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import GridDemo from '@/components/Grid.vue'

const store = useStore()


const tableData = ref([])
const gridColumns = ['userId', 'userAccount', 'userName', 'email', 'phone','createTime', 'updateTime']
const totalLength = ref(tableData.value.length);

const queryForm = ref({
  pagenum: 1,
  pagesize: 8
})
let pageData = ref([])

const searchInput = ref({
    name: ''
})

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
    totalLength.value = tableData.value.length
    getData(queryForm.value.pagesize, queryForm.value.pagenum)
  }).catch( (err) => {
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
