

<template>
    <div class="script-manage-sync-task-page" v-bkloading="{ isLoading }">
        <div class="retry-btn">
            <bk-button  @click="handleAllRetry">{{ '全部重试' }}</bk-button>
        </div>
        <div class="table-top">
            {{ '同步作业模板' }}
            <span class="version-sum">
                （{{ '共' }} {{ data.length }} {{ '个'}}）
            </span>
        </div>
        <bk-table :data="data" row-class-name="sync-script-record">
            <bk-table-column
                :label="'作业模板名称'"
                prop="name"
                sortable>
                <template slot-scope="{ row }">
                    <router-link
                        target="_blank"
                        :to="{
                            name: 'templateDetail',
                            params: {
                                id: 4 || row.templateId,
                            },
                        }">
                        {{ row.templateName }}
                        <Icon type="edit" class="template-link" />
                    </router-link>
                </template>
            </bk-table-column>
            <bk-table-column :label="'步骤名称'" prop="stepName" />
            <bk-table-column :label="'引用的版本号'" prop="version">
                <template slot-scope="{ row }">
                    <bk-button
                        text
                        @click="handleShowDetail(row.scriptVersionId)">
                        {{ row.scriptVersion }}
                    </bk-button>
                </template>
            </bk-table-column>
            <bk-table-column
                :label="'引用版本状态'"
                prop="status"
                :filters="statusFilters"
                :filter-method="statusFilterMethod"
                :filter-multiple="true">
                <template slot-scope="{ row }">
                    <span v-html="row.statusHtml" />
                </template>
            </bk-table-column>
            <bk-table-column
                :label="'状态'"
                width="350"
                prop="syncStatus">
                <template slot-scope="{ row, $index }">
                    <Icon :type="row.syncIcon" svg class="mr10" />
                    <span>{{ row.syncStatusMsg }}</span>
                    <bk-button
                        v-if="row.isSyncFailed"
                        :tippy-tips="row.failMsg"
                        text
                        style="margin-left: 15px;"
                        @click="handleRetry(row, $index)">
                        {{ '重试' }}
                    </bk-button>
                </template>
            </bk-table-column>
        </bk-table>
        <div class="footer-action">
            <bk-button
                class="w120"
                theme="primary"
                @click="handleFinish">
                {{ '完成' }}
            </bk-button>
        </div>
        <script-detail :is-show.sync="isShowDetail" :script-version-id="selectScriptVersionId" />
        <element-teleport v-if="lastVersionScriptInfo.version">
            <span> - {{ '同步至' }}</span>
            <span>{{ lastVersionScriptInfo.version }}</span>
        </element-teleport>
    </div>
</template>
<script>
       import {
        checkPublicScript,
        leaveConfirm,
    } from '@utils/assist';
    import ScriptService from '@service/script-manage';
    import PublicScriptService from '@service/public-script-manage';
    import TaskPlanService from '@service/task-plan';
    import ScriptDetail from './components/script-detail';

    export default {
        components: {
            ScriptDetail,
        },
        data () {
            return {
                data: [{},{},{}],
                isLoading: false,
                isShowDetail: false,
                selectScriptVersionId: 0,
                lastVersionScriptInfo: {},
            };
        },
        computed: {
            isRetryAllDisable () {
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < this.data.length; i++) {
                    if (this.data[i].isSyncFailed) {
                        return false;
                    }
                }
                return true;
            },
        },
        created () {
            this.statusFilters = [
                { value: 0, text: '未上线' },
                { value: 1, text: '已上线' },
                { value: 2, text: '已下线' },
                { value: 3, text: '已禁用' },
            ];
            this.publicScript = checkPublicScript(this.$route);
            this.serviceHandler = this.publicScript ? PublicScriptService : ScriptService;
            this.scriptId = this.$route.params.scriptId;
            this.scriptVersionId = this.$route.params.scriptVersionId;
            this.stepList = JSON.parse(localStorage.getItem('SYNC_TEMPLATE_STEP_SCRIPT'));
            if (this.stepList.length < 1) {
                this.messageError('请先选择作业模板步骤');
                return;
            }
            this.fetchData();
            this.fetchLastScriptVersionDetail();
        },
        methods: {
            /**
             * @desc 开始同步脚本
             */
            fetchData () {
                this.isLoading = true;
                this.serviceHandler.scriptVersionSync({
                    scriptId: this.scriptId,
                    scriptVersionId: this.scriptVersionId,
                    steps: this.stepList,
                }).then((data) => {
                    this.data = data;
                })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            /**
             * @desc 脚本的最新版本信息
             */
            fetchLastScriptVersionDetail () {
                this.serviceHandler.versionDetail({
                    id: this.$route.params.scriptVersionId,
                }).then((data) => {
                    this.lastVersionScriptInfo = Object.freeze(data);
                });
            },
            /**
             * @desc 脚本详情
             * @param { Number } id
             */
            handleShowDetail (id) {
                this.selectScriptVersionId = id;
                this.isShowDetail = true;
            },
            /**
             * @desc 全部重试
             */
            handleAllRetry () {
                this.fetchData();
            },
            /**
             * @desc 单个重试
             */
            handleRetry (row, index) {
                this.serviceHandler.scriptVersionSync({
                    scriptId: this.scriptId,
                    scriptVersionId: this.scriptVersionId,
                    steps: [
                        {
                            templateid: 4 || row.templateId,
                            stepid: 4 || row.stepId,
                        },
                    ],
                }).then((data) => {
                    this.data.splice(index, 1, data[0]);
                });
            },
            /**
             * @desc 数据过滤
             * @param {Number} value 选中的状态
             * @param {Object} row 单条数据
             */
            statusFilterMethod (value, row) {
                return row.scriptStatus === value;
            },
            /**
             * @desc 完成同步任务
             */
            handleFinish () {
                this.routerBack();
            },
            /**
             * @desc 路由回退
             */
            routerBack () {
                window.changeAlert = !this.isRetryAllDisable;
                this.isSyncPlanLoading = false;
                leaveConfirm('部分作业模板同步失败，请留意')
                    .then(() => {
                        this.$bkInfo({
                            title: '是否需要进行执行方案同步？',
                            closeIcon: false,
                            subHeader: (() => (
                                <div>
                                    <span>{ '点击' }</span>
                                    <span style="font-weight: bold"> { '“立即前往”' } </span>
                                    <span>{ '将进入关联的执行方案同步确认页面，点击' }</span>
                                    <span style="font-weight: bold"> { '“暂时不用”' } </span>
                                    <span>{ '结束本次操作并退出。' }</span>
                                </div>
                            ))(),
                            okText: '立即前往',
                            cancelText: '暂时不用',
                            // 获取同步的作业模板对应的执行方案列表，批量同步需要同步的执行方案
                            confirmFn: () => TaskPlanService.fetchBatchTaskPlan({
                                templateIds: this.stepList.map(({ templateId }) => templateId).join(','),
                            }).then((planList) => {
                                // 跳转批量同步执行方案页面
                                this.$router.push({
                                    name: 'syncPlanBatch',
                                    query: {
                                        planIds: planList.reduce((result, plan) => {
                                            if (plan.needUpdate) {
                                                result.push(plan.id);
                                            }
                                            return result;
                                        }, []).join(','),
                                    },
                                });
                            }),
                            cancelFn: () => {
                                const routerName = this.publicScript ? 'publicScriptVersion' : 'scriptVersion';
                                this.$router.push({
                                    name: routerName,
                                    params: {
                                        id: this.scriptId,
                                    },
                                });
                            },
                        });
                    });
            },
        },
    };
</script>
<style lang="postcss">
    .script-manage-sync-task-page {
        .sync-script-record {
            &:hover {
                .template-link {
                    opacity: 100%;
                }
            }
        }

        .template-link {
            font-size: 12px;
            opacity: 0%;
        }

        .retry-btn {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-bottom: 20px;
        }

        .table-top {
            height: 42px;
            padding: 0 20px;
            margin-top: 16px;
            font-size: 12px;
            line-height: 42px;
            background-color: #f0f1f5;
        }

        .version-sum {
            color: #a3a6af;
        }

        .status-action {
            display: inline-block;
            width: 46px;
            height: 16px;
            font-size: 12px;
            color: #9fa2ac;
            text-align: center;
            background-color: #f0f1f5;
        }

        .failed-sync-status {
            border-bottom: 1px dashed #c4c6cc;
        }

        .try-show {
            display: visible;
            padding-left: 10px;
        }

        .try-hide {
            display: none;
        }

        .footer-action {
            position: fixed;
            bottom: 0;
            left: 0;
            display: flex;
            width: 100%;
            height: 52px;
            padding-right: 24px;
            background: #fff;
            border-top: 1px solid #e2e2e2;
            align-items: center;
            justify-content: flex-end;
        }
    }
</style>
