<script setup>
import { ref, computed } from 'vue'
import { ElTable, ElTableColumn, ElButton } from 'element-plus'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

const store = useStore()

const props = defineProps({
    data: Array,
    columns: Array,
    filterKey: String,
    isSubscribed: Boolean
})

// 初始化时，为每个数据项添加subscribed属性
const initData = computed(() => {
    const { isSubscribed } = props
    return props.data.map(item => ({ ...item, subscribed: isSubscribed }))
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

function handleButtonClick(row) {
    const action = row.subscribed ? 'unsubscribeMeeting' : 'subscribeMeeting'
    const message = row.subscribed ? 'Unsubscribe successfully' : 'Subscribe successfully'
    store.dispatch(`user/${action}`, row.id).then(() => {
        row.subscribed = !row.subscribed
        ElMessage({
            message: message,
            type: 'success',
            duration: 1000
        })
    }).catch((msg) => {
        ElMessage.error(msg)
    })
}

</script>

<template>
    <el-table :data="filteredData" @sort-change="handleSortChange" style="width: 100%">
        <el-table-column
            v-for="key in visibleColumns"
            :key="key"
            :prop="key"
            :label="capitalize(key)"
            sortable="custom">
        </el-table-column>
        <el-table-column label="操作" width="180">
            <template v-slot="scope">
                <el-button @click="handleButtonClick(scope.row)">
                    {{ scope.row.subscribed ? '取消订阅' : '订阅' }}
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<style scoped>
/* 根据需要调整样式 */
</style>