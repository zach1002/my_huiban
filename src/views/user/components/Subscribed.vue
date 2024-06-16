<template>
    <el-input :placeholder="'search'" clearable v-model="searchQuery"></el-input>
    <el-card>
        <GridDemo :data="subscribed" :columns="gridColumn" :filter-key="searchQuery">
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
        gridColumn: ['name', 'addr', 'publicer', 'url', 'level', 'isConference', 'type'],
        // gridColumn: ['name', 'power'],
        gridData: [
            { id:1, name: 'Chuck Norris', power: Infinity },
            { id:1, name: 'Bruce Lee', power: 9000 },
            { id:1, name: 'Jackie Chan', power: 7000 },
            { id:1, name: 'Jet Li', power: 8000 }
        ]
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
                this.subscribed = res
            }).catch(err => {
                this.$message.error(err.message)
            })

        }
    },

}
</script>