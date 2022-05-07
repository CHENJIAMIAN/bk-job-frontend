

<template>
    <render-list ref="list" ignore-url :data-source="fetchUnlaunchHistory">
        <bk-table-column
            :label="'唤起时间'"
            prop="scheduledTime"
            key="scheduledTime"
            width="180"
            align="left" />
        <bk-table-column
            :label="'执行人'"
            prop="executor"
            key="executor"
            width="180"
            align="left" />
        <bk-table-column
            :label="'原因'"
            prop="errorMsg"
            key="errorMsg"
            align="left">
            <template slot-scope="{ row }">
                {{ row.errorMsg || '--' }}
            </template>
        </bk-table-column>
    </render-list>
</template>
<script>
    import TimeTaskService from '@service/time-task';
    import RenderList from '@components/render-list';

    export default {
        name: '',
        components: {
            RenderList,
        },
        props: {
            data: {
                type: Object,
                required: true,
            },
        },
        data () {
            return {
                searchParams: {},
            };
        },
        created () {
            this.searchParams.cronTaskId = this.data.id;
            this.fetchUnlaunchHistory = TimeTaskService.fetchUnlaunchHistory;
        },
        mounted () {
            this.fetchData();
        },
        methods: {
            fetchData () {
                this.$refs.list.$emit('onFetch', this.searchParams);
            },
        },
    };
</script>
