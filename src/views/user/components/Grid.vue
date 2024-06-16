<script setup>
import { ref, computed } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'

const props = defineProps({
    data: Array,
    columns: Array,
    filterKey: String
})

const sortKey = ref('')
const sortOrder = ref(null) // Element UI使用单一排序，这里我们只需要一个排序状态

const filteredData = computed(() => {
    let { data, filterKey } = props
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
</script>

<template>
    <el-table :data="filteredData" @sort-change="handleSortChange" style="width: 100%">
        <el-table-column
            v-for="key in columns"
            :key="key"
            :prop="key"
            :label="capitalize(key)"
            sortable="custom">
        </el-table-column>
    </el-table>
    <!-- <p v-if="!filteredData.length">No matches found.</p> -->
</template>

<style scoped>
/* 根据需要调整样式 */
</style>