<template>
    <el-input :placeholder="'search'" clearable v-model="searchQuery"></el-input>
    <el-card>
        <GridDemo :data="subscribed" :columns="gridColumn" :filter-key="searchQuery" :is-subscribed=true>
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
        gridColumn: ['addr','fullName', 'publicer', 'url', 'level', 'isConference', 'type'],
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