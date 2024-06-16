<script setup>
import { ref, computed } from 'vue'
import { ElTable, ElTableColumn, ElButton } from 'element-plus'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

const store = useStore()

const props = defineProps({
  data: {
    type: Array,
    default: () => [] // 为data定义一个空数组作为默认值
  },
  columns: {
    type: Array,
    default: () => [] // 为columns定义一个空数组作为默认值
  },
  filterKey: {
    type: String,
    default: '' // 为filterKey定义一个空字符串作为默认值
  },
  titleMapper: {
    type: Object,
    default: () => ({}) // 为titleMapper定义一个空对象作为默认值
  },
  operateName: {
    type: String,
    default: '' // 为operateName定义一个空字符串作为默认值
  },
  defaultState: {
    type: Boolean,
    default: false // 为defaultState定义false作为默认值
  },
  operation: {
    type: Function,
    default: () => {} // 为operation定义一个空函数作为默认值
  }
})

const initData = computed(() => {
    const { defaultState } = props
    return props.data.map(item => ({ ...item, state: defaultState }))
})

const visibleColumns = computed(() => {
    return props.columns.filter(column => column !== 'id')
})

const sortKey = ref('')
const sortOrder = ref(null)

const filteredData = computed(() => {
    let data = initData.value
    let { filterKey } = props
    if (filterKey) {
        filterKey = filterKey.toLowerCase()
        data = data.filter((row) => {
            return Object.keys(row).some((key) => {
                return String(row[key]).toLowerCase().indexOf(filterKey) > -1
            })
        })
    }
    if (sortKey.value && sortOrder.value) {
        const key = sortKey.value
        const order = sortOrder.value === 'ascending' ? 1 : -1
        data = data.slice().sort((a, b) => {
            a = a[key]
            b = b[key]
            return (a === b ? 0 : a > b ? 1 : -1) * order
        })
    }
    return data
})

function handleSortChange({ prop, order }) {
    sortKey.value = prop
    sortOrder.value = order
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function handleOperation(row) {
    props.operation(row)
}

function getTitle(key){
    return props.titleMapper[key] || capitalize(key)
}
</script>

<template>
    <el-table :data="filteredData" @sort-change="handleSortChange" style="width: 100%">
        <el-table-column
            v-for="key in visibleColumns"
            :key="key"
            :prop="key"
            :label="getTitle(key)"
            sortable="custom">
        </el-table-column>
        <el-table-column v-if="props.operateName" :label="props.operateName" width="180">
            <template v-slot="scope">
                <el-button @click="handleOperation(scope.row)">
                    {{ scope.row.state ? 'undo' : 'do' }}
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<style scoped>
/* 根据需要调整样式 */
</style>