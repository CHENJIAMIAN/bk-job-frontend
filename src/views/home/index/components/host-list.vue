<template>
    <div class="host-list-wrapper" v-bkloading="{ isLoading }">
        <bk-table
            ext-cls="host-table"
            :data="hostList"
            :pagination="pagination"
            width="100%"
            @page-change="handlePageChange"
            @page-limit-change="handleLimitChange">
            <bk-table-column prop="ip" label="IP" class-name="ip-item" />
            <bk-table-column :label="'云区域'">
                <template slot-scope="{ row }">{{ row.cloudAreaInfo.name || '--' }}</template>
            </bk-table-column>
            <bk-table-column :label="'主机名'">
                <template slot-scope="{ row }">{{ row.ipDesc || '--' }}</template>
            </bk-table-column>
            <bk-table-column :label="'操作系统名称'">
                <template slot-scope="{ row }">{{ row.os || '--' }}</template>
            </bk-table-column>
        </bk-table>
    </div>
</template>

<script>
    import HomeService from '@service/home';

    export default {
        props: {
            statusType: {
                type: String,
                default: '',
            },
        },
        data () {
            return {
                isLoading: false,
                hostList: [{},{},{}],
                pagination: {
                    count: 30,
                    current: 1,
                    limit: 10,
                },
            };
        },
        created () {
            this.fetchData();
        },
        methods: {
            fetchData () {
                const pageSize = this.pagination.limit;
                const start = parseInt(this.pagination.current - 1, 10) * pageSize;
                const params = {
                    agentStatus: this.statusType === 'fail' ? 0 : 1,
                    start,
                    pageSize,
                };
                this.$request(HomeService.fetchAgentStatus(params), () => {
                    this.isLoading = true;
                }).then((data) => {
                    this.hostList = data.data;
                    this.pagination = {
                        ...this.pagination,
                        count: data.total || 0,
                    };
                })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            handlePageChange (value) {
                this.pagination.current = value;
                this.fetchData();
            },
            handleLimitChange (value) {
                this.pagination.current = 1;
                this.pagination.limit = value;
                this.fetchData();
            },
        },
    };
</script>

<style lang="postcss">
    .host-list-wrapper {
        height: 100%;

        .host-table {
            height: 100%;
            overflow: auto;
            border: none;
        }

        .ip-item {
            padding-left: 40px;
        }
    }
</style>
