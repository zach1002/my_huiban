<template>
    <el-input :placeholder="'search'" clearable v-model="searchQuery"></el-input>
    <el-card>
        <GridDemo :data="gridData" :columns="gridColumn" :filter-key="searchQuery">
        </GridDemo>
    </el-card>
</template>

<script>
import GridDemo from './Grid.vue'

export default {
    components: {
        GridDemo
    },
    data: () => ({
        subscribed: [],
        searchQuery: null,
        // gridColumns: ['name', 'addr', 'publicer', 'url', 'level', 'isConference', 'type'],
        gridColumn: ['name', 'power'],
        gridData: [
            { name: 'Chuck Norris', power: Infinity },
            { name: 'Bruce Lee', power: 9000 },
            { name: 'Jackie Chan', power: 7000 },
            { name: 'Jet Li', power: 8000 }
        ]
    }),
    methods: {
        update() {
            this.$store.dispatch('user/getsubscribedMeetings').then(res => {
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
                this.subscribed = res
            }).catch(err => {
                this.$message.error(err.message)
            })

        }
    },

}
</script>