<template>
    <div class="sleect-source-file">
        <list-action-layout>
            <jb-breadcrumb :width="645">
                <jb-breadcrumb-item>
                    <Icon type="folder-open" style="font-size: 20px;" />
                    <span>{{ '请选择文件源' }}</span>
                </jb-breadcrumb-item>
            </jb-breadcrumb>
            <template #right>
                <jb-input
                    :placeholder="'搜索“所有文件源”'"
                    right-icon="bk-icon icon-search"
                    style="width: 480px;"
                    @change="handleSearch" />
            </template>
        </list-action-layout>
        <bk-table
            :data="tableData"
            max-height="500"
            :highlight-current-row="true"
            v-bkloading="{ isLoading }">
            <bk-table-column width="50">
                <template slot-scope="{ row }">
                    <span v-html="row.publicFlagHtml" />
                </template>
            </bk-table-column>
            <bk-table-column
                :label="'文件源别名'"
                prop="alias"
                sortable>
                <template slot-scope="{ row }">
                    <auth-button
                        v-if="row.isAvailable"
                        auth="file_source/view"
                        :permission="row.canView"
                        :resource-id="row.id"
                        text
                        @click="handleGoBucket(row)">
                        {{ row.alias }}
                    </auth-button>
                    <span
                        v-else
                        v-bk-tooltips="'接入点异常，暂时不可用'">
                        <bk-button disabled text>{{ row.alias }}</bk-button>
                    </span>
                </template>
            </bk-table-column>
            <bk-table-column
                :label="'文件源标识'"
                prop="code"
                show-overflow-tooltip
                sortable />
            <bk-table-column
                :label="'状态'"
                prop="status">
                <template slot-scope="{ row }">
                    <Icon :type="row.statusIcon" svg />
                    {{ row.statusText }}
                </template>
            </bk-table-column>
            <bk-table-column
                :label="'类型'"
                prop="create_time">
                <template slot-scope="{ row }">
                    {{ row.storageTypeText }}
                </template>
            </bk-table-column>
            <bk-table-column
                :label="'更新人'"
                prop="creator" />
            <bk-table-column
                :label="'更新时间'"
                prop="lastModifyTime" />
        </bk-table>
    </div>
</template>
<script>
    import FileSourceManageService from '@service/file-source-manage';
    import ListActionLayout from '@components/list-action-layout';
    
    export default {
        components: {
            ListActionLayout,
        },
        data () {
            return {
                isLoading: false,
                tableData: [],
                searchParams: [],
            };
        },
        created () {
            this.fetchData();
        },
        methods: {
            /**
             * @desc 获取文件源数据列表
             */
            fetchData () {
                this.isLoading = true;
                FileSourceManageService.availableSourceList(this.searchParams).then(({ data }) => {
                    this.tableData = Object.freeze(data);
                })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },

            /**
             * @desc 过滤表格数据
             * @param {String} alias 列表筛选值
             *
             * 重新拉取数据
             */
            handleSearch (alias) {
                this.searchParams = {
                    alias,
                };
                this.fetchData();
            },

            /**
             * @desc 对话框页面显示跳转到bucket存储桶列表模板
             * @param {Object} fileSource 选中的文件源数据
             *
             * 选中数据与将要跳转的组件名称传递到父组件
             */
            handleGoBucket (fileSource) {
                this.$emit('on-source-change', fileSource);
            },
        },
    };
</script>
<style lang="postcss">
    .sleect-source-file {
        padding-top: 14px;

        .list-action-layout {
            margin-bottom: 14px;
        }
    }
</style>
