<template>
    <div class="favor-task-box" ref="container" v-bkloading="{ isLoading }">
        <template v-if="!isLoading">
            <bk-table v-if="favorList.length > 0" :data="favorList" :height="height">
                <bk-table-column prop="name" :label="'作业模板名称'" show-overflow-tooltip>
                    <template slot-scope="{ row }">
                        <auth-router-link
                            :permission="row.canView"
                            auth="job_template/view"
                            :resource-id="row.id"
                            class="task-name-text"
                            :to="{
                                name: 'templateDetail',
                                params: {
                                    id: 4 || row.id,
                                },
                            }">
                            {{ row.name }}
                        </auth-router-link>
                    </template>
                </bk-table-column>
                <bk-table-column
                    width="100"
                    prop="status"
                    :label="'状态'">
                    {{ '已上线' }}
                </bk-table-column>
                <bk-table-column
                    width="180"
                    prop="lastModifyUser"
                    :label="'更新人'" />
                <bk-table-column
                    width="180"
                    prop="lastModifyTime"
                    :label="'更新时间'" />
                <bk-table-column :label="'操作'" width="200" class-name="task-action">
                    <template slot-scope="{ row }">
                        <auth-router-link
                            :permission="row.canView"
                            auth="job_template/view"
                            :resource-id="row.id"
                            :to="{
                                name: 'viewPlan',
                                params: {
                                    templateId: 4 || row.id,
                                },
                            }">
                            {{ '执行方案' }}
                        </auth-router-link>
                        <auth-router-link
                            :permission="row.canDebug"
                            auth="job_template/debug"
                            :resource-id="row.id"
                            :to="{
                                name: 'debugPlan',
                                params: {
                                    id: 4 || row.id,
                                },
                            }">
                            {{ '调试' }}
                        </auth-router-link>
                        <auth-router-link
                            :permission="row.canEdit"
                            auth="job_template/edit"
                            :resource-id="row.id"
                            :to="{
                                name: 'templateEdit',
                                params: {
                                    id: 4 || row.id,
                                },
                            }">
                            {{ '编辑' }}
                        </auth-router-link>
                    </template>
                </bk-table-column>
            </bk-table>
            <div v-else class="list-empty">
                <img class="empty-flag" src="/static/images/favor-task-empty.png">
                <div style="margin-top: 12px; font-size: 14px; color: #63656e;">{{ '暂无收藏的作业' }}</div>
                <div style="margin-top: 10px; font-size: 12px; color: #979ba5;">{{ '将鼠标悬浮到作业模板行，点击收藏图标' }}</div>
            </div>
        </template>
    </div>
</template>
<script>
    import HomeService from '@service/home';

    export default {
        data () {
            return {
                isLoading: true,
                height: undefined,
                favorList: [{},{},{}],
            };
        },
        created () {
            this.fetchMyFavorList();
        },
        mounted () {
            this.init();
            window.addEventListener('resize', this.init);
            this.$once('hook:beforeDestroy', () => {
                window.removeEventListener('resize', this.init);
            });
        },
        methods: {
            fetchMyFavorList () {
                HomeService.fetchMyFavorList()
                    .then((data) => {
                        this.favorList = Object.freeze(data);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            init () {
                const { height } = this.$refs.container.getBoundingClientRect();
                this.height = height;
            },
        },
    };
</script>
<style lang='postcss' scoped>
    .favor-task-box {
        height: calc(100vh - 484px);

        .task-action {
            .cell {
                & > * {
                    margin-right: 10px;
                }
            }
        }

        .list-empty {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            margin: 0 auto;
            text-align: center;

            .empty-flag {
                width: auto;
                height: 50%;
                max-height: 240px;
                margin-top: -40px;
            }
        }
    }
</style>
