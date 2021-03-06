<template>
    <div class="render-related-script" v-bkloading="{ isLoading }">
        <div class="tab-wraper">
            <div
                class="tab-item"
                :class="{ active: listTab === 'template' }"
                @click="handleTabChange('template')">
                <div class="tab-name">{{ '作业模板引用' }}</div>
                <Icon
                    v-if="isLaunchLoading"
                    type="sync-pending"
                    svg
                    class="loading-flag" />
                <div v-else class="tab-nums">{{ launchNums }}</div>
            </div>
            <div
                class="tab-item"
                :class="{ active: listTab === 'plan' }"
                @click="handleTabChange('plan')">
                <div class="tab-name">{{ '执行方案引用' }}</div>
                <Icon
                    v-if="isUnlaunchLoading"
                    type="sync-pending"
                    svg
                    class="loading-flag" />
                <div v-else class="tab-nums">{{ unLaunchNums }}</div>
            </div>
        </div>
        <div class="search">
            <jb-search-select
                @on-change="handleSearch"
                :data="searchSelect"
                :popover-zindex="99999"
                :placeholder="'搜索名称，版本号'"
                style="width: 100%;" />
        </div>
        <bk-table :data="renderList">
            <!-- 执行方案引用 -->
            <bk-table-column
                v-if="isPlanRelated"
                :label="'执行方案'"
                align="left"
                show-overflow-tooltip>
                <template slot-scope="{ row }">
                    <bk-button
                        text
                        @click="handleGoPlanDetail(row)">
                        {{ row.taskPlanName }}
                    </bk-button>
                </template>
            </bk-table-column>
            <!-- 作业模板引用 -->
            <bk-table-column
                v-if="!isPlanRelated"
                :label="'作业模板'"
                align="left"
                show-overflow-tooltip>
                <template slot-scope="{ row }">
                    <bk-button
                        text
                        @click="handleGoTemplateDetail(row)">
                        {{ row.taskTemplateName }}
                    </bk-button>
                </template>
            </bk-table-column>
            <bk-table-column
                :label="'引用的版本号'"
                prop="scriptVersion"
                align="left" />
            <bk-table-column
                :label="'状态'"
                prop="scriptStatusDesc"
                align="left"
                width="120">
                <template slot-scope="{ row }">
                    <span v-html="row.statusHtml" />
                </template>
            </bk-table-column>
        </bk-table>
    </div>
</template>
<script>
    import ScriptService from '@service/script-manage';
    import PublicScriptService from '@service/public-script-manage';
       import {
        checkPublicScript,
        encodeRegexp,
    } from '@utils/assist';
    import JbSearchSelect from '@components/jb-search-select';

    export default {
        name: 'RenderRelatedScript',
        components: {
            JbSearchSelect,
        },
        props: {
            from: {
                type: String,
                validator (value) {
                    return [
                        'scriptList',
                        'scriptVersionList',
                    ].includes(value);
                },
                required: true,
            },
            mode: {
                type: String,
                validator (value) {
                    return [
                        'template',
                        'plan',
                    ].includes(value);
                },
                required: true,
            },
            info: {
                type: Object,
                required: true,
            },
        },
        data () {
            this.publicScript = checkPublicScript(this.$route);
            this.serviceHandler = this.publicScript ? PublicScriptService : ScriptService;
            
            return {
                isLoading: true,
                list: [{},{},{}],
                listTab: 'template',
                renderList: [{},{},{}],
            };
        },
        computed: {
            isPlanRelated () {
                return this.mode === 'plan';
            },
        },
        watch: {
            info: {
                handler (info) {
                    if (!info.id && !info.scriptVersionId) {
                        return;
                    }
                    this.fetchData();
                },
                immediate: true,
            },
        },
        created () {
            this.searchSelect = [
                {
                    name: '名称',
                    id: 'name',
                    default: true,
                },
                {
                    name: '版本号',
                    id: 'scriptVersion',
                },
            ];
        },
        methods: {
            /**
             * @desc 获取关联脚本列表
             */
            fetchData () {
                this.isLoading = true;
                const params = {
                    scriptId: this.info.id,
                };
                if (this.from === 'scriptVersionList') {
                    params.scriptVersionId = this.info.scriptVersionId;
                }
                this.serviceHandler.citeInfo(params)
                    .then(({ citedTaskPlanList, citedTemplateList }) => {
                        if (this.isPlanRelated) {
                            this.list = Object.freeze(citedTaskPlanList);
                        } else {
                            this.list = Object.freeze(citedTemplateList);
                        }
                        this.renderList = this.list;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            /**
             * @desc 本地搜索
             * @param {Object} payload 搜索条件
             */
            handleSearch (payload) {
                let { list } = this;
                Object.keys(payload).forEach((key) => {
                    const reg = new RegExp(encodeRegexp(payload[key]), 'i');
                    let realKey = key;
                    if (key === 'name') {
                        realKey = this.isPlanRelated ? 'taskPlanName' : 'taskTemplateName';
                    }
                    list = list.filter(item => reg.test(item[realKey]));
                });
                this.renderList = Object.freeze(list);
            },
            /**
             * @desc 查看引用脚本的执行方案详情
             * @param {Object} payload 应用字段数据
             *
             * 需要解析资源的 scopeType、scopeId
             */
            handleGoPlanDetail (payload) {
                const { href } = this.$router.resolve({
                    name: 'viewPlan',
                    params: {
                        templateId: payload.taskTemplateId,
                    },
                    query: {
                        viewPlanId: payload.taskPlanId,
                    },
                });
                window.open(href.replace(/^\/[^/]+\/\d+/, `/${payload.scopeType}/${payload.scopeId}`));
            },
            /**
             * @desc 查看引用脚本的作业模板详情
             * @param {Object} payload 应用字段数据
             *
             * 需要解析资源的 scopeType、scopeId
             */
            handleGoTemplateDetail (payload) {
                const { href } = this.$router.resolve({
                    name: 'templateDetail',
                    params: { id: payload.taskTemplateId },
                });
                window.open(href.replace(/^\/[^/]+\/\d+/, `/${payload.scopeType}/${payload.scopeId}`));
            },
        },
    };
</script>
<style lang='postcss' scoped>
    .render-related-script {
        .tab-wraper {
            display: flex;
            padding: 20px 30px 0;
            margin: -20px -30px 20px;
            background: #f5f6fa;
            border-bottom: 1px solid #dcdee5;

            .tab-item {
                display: flex;
                height: 32px;
                padding: 0 12px;
                margin-right: 20px;
                margin-bottom: -1px;
                font-size: 13px;
                line-height: 32px;
                color: #63656e;
                cursor: pointer;
                background: #e1e3eb;
                border: 1px solid #e1e3eb;
                border-bottom: none;
                border-top-right-radius: 4px;
                border-top-left-radius: 4px;
                transition: all 0.15s;
                align-items: center;

                &.active {
                    color: ##313238;
                    background: #fff;
                    border-color: #dcdee5;

                    .tab-nums {
                        color: #63656e;
                        background: #ebecf0;
                    }

                    .loading-flag {
                        color: #fff;
                    }
                }
            }

            .tab-name {
                margin-right: 4px;
            }

            .tab-nums {
                height: 16px;
                padding: 0 4px;
                font-size: 12px;
                line-height: 16px;
                color: #63656e;
                background: #ebecf0;
                border-radius: 8px;
                transition: all 0.15s;
            }

            .loading-flag {
                color: #3a84ff;
                animation: sync-fetch-loading 1s linear infinite;
            }
        }

        .search {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 20px;
        }
    }
</style>
