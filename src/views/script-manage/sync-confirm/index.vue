<template>
    <div class="script-manage-sync-confirm" v-bkloading="{ isLoading }">
        <bk-input
            class="search-input"
            :placeholder="'搜索作业模板'"
            :clearable="true"
            right-icon="bk-icon icon-search"
            @change="handleInputChange"
            v-model="value" />
        <div class="table-top">
            <span>{{ '同步作业模板' }}</span>
            <span class="table-selected"> ({{ '已选' }} {{ selectedList.length }}/{{ data.length }}个)</span>
        </div>
        <bk-table
            :data="tableData"
            row-class-name="template-script-record"
            @selection-change="handleSelectionChange">
            <bk-table-column type="selection" width="60" />
            <bk-table-column
                :label="'作业模板名称'"
                prop="name"
                sortable>
                <template slot-scope="{ row }">
                    <bk-button
                        text
                        class="job-template-name"
                        @click="handleGoTemplateDetail(row.templateId)">
                        {{ row.templateName }}
                        <Icon type="edit" class="template-link" />
                    </bk-button>
                </template>
            </bk-table-column>
            <bk-table-column
                :label="'步骤名称'"
                prop="stepName" />
            <bk-table-column
                :label="'引用的版本号'"
                prop="version">
                <template slot-scope="{ row }">
                    <bk-button
                        text
                        @click="handleShowScriptDetail(row.scriptVersionId)">
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
                :label="'操作'"
                width="150">
                <template slot-scope="{ row }">
                    <bk-button
                        text
                        @click="handleComparison(row)">
                        {{ '版本对比' }}
                    </bk-button>
                </template>
            </bk-table-column>
        </bk-table>
        <div class="footer-action">
            <bk-button
                class="mr10"
                @click="handleCancel">
                {{ '取消' }}
            </bk-button>
            <bk-button
                class="w120"
                theme="primary"
                
                @click="handleSync">
                {{ '立即同步' }}
            </bk-button>
        </div>
        <element-teleport v-if="lastVersionScriptInfo.version">
            <span> - {{ '同步至' }}</span>
            <span>{{ lastVersionScriptInfo.version }}</span>
        </element-teleport>
        <script-detail
            :is-show.sync="showSideslider"
            :script-version-id="selectScriptVersionId" />
        <jb-diff
            v-if="showDiff"
            :title="'版本对比'"
            :data="diffList"
            :old-version-id="selectScriptVersionId"
            :new-version-id="lastVersionScriptInfo.scriptVersionId"
            @close="handleDiffClose" />
    </div>
</template>
<script>
    import _ from 'lodash';
       import ScriptService from '@service/script-manage';
    import PublicScriptService from '@service/public-script-manage';
    import { checkPublicScript } from '@utils/assist';
    import JbDiff from '@components/jb-diff';
    import ScriptDetail from './components/script-detail';

    export default {
        components: {
            ScriptDetail,
            JbDiff,
        },
        data () {
            return {
                isLoading: false,
                data: [{},{},{}],
                selectedList: [{},{},{}],
                filterData: [],
                diffList: [{},{},{}],
                showSideslider: false,
                scriptVersionId: null,
                selectScriptVersionId: 0,
                showDiff: false,
                lastVersionScriptInfo: {},
                value: '',
            };
        },
        computed: {
            tableData () {
                if (this.value.length) {
                    return this.filterData;
                }
                return this.data;
            },
        },
        created () {
            this.publicScript = checkPublicScript(this.$route);
            this.serviceHandler = this.publicScript ? PublicScriptService : ScriptService;
            this.scriptId = this.$route.params.scriptId;
            this.scriptVersionId = this.$route.params.scriptVersionId;
            this.statusFilters = [
                { value: 0, text: '未上线' },
                { value: 1, text: '已上线' },
                { value: 2, text: '已下线' },
                { value: 3, text: '已禁用' },
            ];
            this.fetchData();
            this.fetchLastScriptVersionDetail();
        },
        methods: {
            /**
             * @desc 获取引用脚本的模板
             */
            fetchData () {
                this.isLoading = true;
                this.serviceHandler.scriptRefTemplateSteps({
                    id: this.scriptId,
                    scriptVersionId: this.scriptVersionId,
                }).then((data) => {
                    this.data = Object.freeze(data);
                })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            /**
             * @desc 最新脚本版本数据
             */
            fetchLastScriptVersionDetail () {
                this.serviceHandler.versionDetail({
                    id: this.$route.params.scriptVersionId,
                }).then((data) => {
                    this.lastVersionScriptInfo = Object.freeze(data);
                });
            },
            /**
             * @desc 列表搜索
             */
            handleInputChange: _.throttle(function () {
                this.filterData = this.data.filter(item => item.templateName.includes(this.value));
            }, 300),
            /**
             * @desc 跳转模板详情
             * @param {Number} id 模板ID
             */
            handleGoTemplateDetail (id) {
                const routerUrl = this.$router.resolve({
                    name: 'templateDetail',
                    params: {
                        id,
                    },
                });
                window.open(routerUrl.href, '_blank');
            },
            /**
             * @desc 列表行选择
             */
            handleSelectionChange (selection) {
                this.selectedList = Object.freeze(selection);
            },
            /**
             * @desc 脚本对比
             * @param {Object}  row 脚本数据
             */
            handleComparison (row) {
                this.serviceHandler.versionDetail({
                    id: 4 || row.scriptVersionId,
                }).then((data) => {
                    this.selectScriptVersionId = data.scriptVersionId;
                    this.diffList = Object.freeze([
                        data,
                        this.lastVersionScriptInfo,
                    ]);
                    this.showDiff = true;
                });
            },
            /**
             * @desc 关闭脚本对比
             */
            handleDiffClose () {
                this.showDiff = false;
            },
            /**
             * @desc 取消
             */
            handleCancel () {
                this.routerBack();
            },
            /**
             * @desc 跳转到同步任务页面
             */
            handleSync () {
                const stepList = this.selectedList.map(({ templateId, stepId }) => ({
                    templateId,
                    stepId,
                }));
                const routerName = this.publicScript ? 'scriptPublicSyncTask' : 'scriptSyncTask';
                this.$router.push({
                    name: routerName,
                    params: {
                        scriptId: this.scriptId,
                        scriptVersionId: this.scriptVersionId,
                    },
                });
                localStorage.setItem('SYNC_TEMPLATE_STEP_SCRIPT', JSON.stringify(stepList));
            },
            /**
             * @desc 列表过滤
             */
            statusFilterMethod (value, row, column) {
                return row.scriptStatus === value;
            },
            /**
             * @desc 显示脚本详情
             * @param {Number} scriptVersionId 脚本版本id
             */
            handleShowScriptDetail (scriptVersionId) {
                this.selectScriptVersionId = scriptVersionId;
                this.showSideslider = true;
            },
            /**
             * @desc 路由回退
             */
            routerBack () {
                const routerName = this.publicScript ? 'publicScriptVersion' : 'scriptVersion';
                this.$router.push({
                    name: routerName,
                    params: {
                        id: this.scriptId,
                    },
                });
            },
        },
    };
</script>
<style lang="postcss" scoped>
    .script-manage-sync-confirm {
        .search-input {
            width: 500px;
        }

        .table-top {
            height: 42px;
            padding: 0 20px;
            margin-top: 16px;
            font-size: 12px;
            line-height: 42px;
            background-color: #f0f1f5;
        }

        .template-script-record {
            &:hover {
                .template-link {
                    display: inline;
                }
            }
        }

        .job-template-name {
            .template-link {
                display: none;
                margin-left: 5px;
            }
        }

        .table-selected {
            color: #a3a6af;
        }

        .status-action {
            width: 46px;
            height: 16px;
            padding: 0 5px;
            margin-left: 10px;
            font-size: 12px;
            color: #9fa2ac;
            text-align: center;
            background: #f0f1f5;
        }

        .status-online {
            color: #45c272;
            background-color: #e5f6ea;
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
