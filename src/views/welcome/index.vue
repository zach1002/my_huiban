<template>
  <div class="card-container">
    <el-card class="card">
      <div class="data-card">
        <div class="png-container">
          <img src="@/assets/images/people.png" alt="people" class="peoplePng">
        </div>
        <div class="text-container">
          <div class="title-container">
            <h3 class="title">科研人员</h3>
          </div>
          <div class="number-container">
            {{ personnelCount }}
          </div>
        </div>
      </div>
    </el-card>

    <el-card class="card">
      <div class="data-card">
        <div class="png-container">
          <img src="@/assets/images/meeting.png" alt="people" class="peoplePng">
        </div>
        <div class="text-container">
          <div class="title-container">
            <h3 class="title">会议</h3>
          </div>
          <div class="number-container">
            {{ meetingCount }}
          </div>
        </div>
      </div>
    </el-card>
  </div>

  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input :placeholder="'search'" clearable v-model="searchQuery"></el-input>
      </el-col>
      <el-button type="primary" :icon="Search">Search</el-button>
    </el-row>

<!--    <el-table :data="pageData" stripe style="width: 100%">-->
<!--      <el-table-column prop="addr" label="Name" width="180"/>-->
<!--      <el-table-column prop="type" label="Type" width="180"/>-->
<!--      <el-table-column prop="fullName" label="FullName"/>-->
<!--    </el-table>-->
    <GridDemo :data="pageData" :columns="gridColumns" :filter-key="searchQuery" :is-subscribed=false>
    </GridDemo>
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
  </el-card>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { mapState, useStore } from 'vuex'
import GridDemo from '@/views/user/components/Grid.vue'

const personnelCount = ref(102400) // 假设这是从变量得到的数字
const meetingCount = ref(81212)
const searchQuery = ref('')

const gridColumns = ['level', 'addr', 'fullName', 'url', 'publicer' , 'isConference', 'type']
const queryForm = ref({
  pagenum: 1,
  pagesize: 10
})
const store = useStore()

const tableData = ref() // 初始为空数组
const totalLength = ref(0)
const pageData = ref([])

const handleData = () => {
  store.dispatch('paper/listAll').then(() => {
    console.log(tableData)
    const arr = computed(() => store.state.paper.tableData)
    console.log(arr.value)
    tableData.value = arr.value
    console.log(Array.isArray(tableData.value))  // 应该输出 true
    console.log(tableData.value)  // 查看实际内容
    totalLength.value = tableData.value.length
    getData(queryForm.value.pagesize, queryForm.value.pagenum)
    console.log(pageData.value)
    console.log(totalLength.value)
    ElMessage.success({
      message: '获取成功',
      duration: 1000
    })
  }).catch((msg) => {
    ElMessage.error(msg)
  })

  store.dispatch('user/getUserNum').then((res) => {
    personnelCount.value = res
  }).catch((msg) => {
    ElMessage.error(msg)
  })

  store.dispatch('paper/getPaperNum').then((res) => {
    meetingCount.value = res
  }).catch((msg) => {
    ElMessage.error(msg)
  })
}

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

const searchInput = ref({
  name: ''
})

const handleSearch = () => {
  const curData = ref([])
  for (let index = 0; index < tableData.value.length; index++) {
    const element = tableData.value[index]
    if (searchInput.value.name === element.addr) {
      curData.value.push(element)
    }
  }
  pageData.value = curData.value
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

</style>
