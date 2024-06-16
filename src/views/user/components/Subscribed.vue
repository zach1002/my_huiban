<template>
    <el-input :placeholder="'search'" clearable v-model="searchQuery"></el-input>
    <el-card>
        <GridDemo :data="subscribed" :columns="columns" :filter-key="searchQuery" :default-state=true
            :title-mapper="titleMapper" operate-name="订阅" :operation="handleButtonClick">
        </GridDemo>
    </el-card>
</template>

<script>
import GridDemo from '@/components/Grid.vue'
import { ElMessage } from 'element-plus'

export default {
    components: {
        GridDemo
    },
    data: () => ({
        subscribed: [],
        searchQuery: null,
        columns: ['addr', 'fullName', 'publicer', 'url', 'level', 'isConference', 'typeName'],
        titleMapper: {
            addr: '简称',
            fullName: '全称',
            publicer: '出版社',
            url: '官网',
            level: '级别',
            isConference: '类型',
            typeName: '类别',
        }

    }),
    methods: {
        update() {
            this.$store.dispatch('user/getsubscribedMeetings').then(res => {
                console.log(res)
                if (res.length === 0) {
                    this.$message(
                        {
                            message: 'You have not subscribed to any meetings',
                            type: 'warning',
                            duration: 1000
                        }
                    )
                    return
                }
                // 类型映射
                const typeMapping = {
                    1: '计算机体系结构/并行与分布计算/存储系统',
                    2: '计算机网络',
                    3: '网络与信息安全',
                    4: '软件工程/系统软件/程序设计语言',
                    5: '数据库/数据挖掘/内容检索',
                    6: '计算机科学理论',
                    7: '计算机图形学与多媒体',
                    8: '人工智能',
                    9: '人机交互与普适计算',
                    10: '交叉/综合/新兴'
                };

                // 为res中的每个元素添加typeName属性
                this.subscribed = res.map(item => ({
                    ...item,
                    typeName: typeMapping[item.type] || '未知类型'
                }));
            }).catch(err => {
                this.$message.error(err.message)
            })
        },
        handleButtonClick(row) {
            const action = row.state ? 'unsubscribeMeeting' : 'subscribeMeeting'
            const message = row.state ? 'Unsubscribe successfully' : 'Subscribe successfully'
            this.$store.dispatch(`user/${action}`, row.id).then(() => {
                row.state = !row.state
                ElMessage({
                    message: message,
                    type: 'success',
                    duration: 1000
                })
            }).catch((msg) => {
                ElMessage.error(msg)
            })
        }
    },

}
</script>