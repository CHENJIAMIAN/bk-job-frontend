

<template>
    <div class="render-related-script">
        <div class="tab-wraper">
            <div
                class="tab-item"
                :class="{ active: listTab === 'template' }"
                @click="handleTabChange('template')">
                <div class="tab-name">{{ '作业模板引用' }}</div>
                <div class="tab-nums">{{ info.relatedTaskTemplateNum }}</div>
            </div>
            <div
                class="tab-item"
                :class="{ active: listTab === 'plan' }"
                @click="handleTabChange('plan')">
                <div class="tab-name">{{ '执行方案引用' }}</div>
                <div class="tab-nums">{{ info.relatedTaskPlanNum }}</div>
            </div>
        </div>
        <component
            :is="listCom"
            :params="params" />
    </div>
</template>
<script>
    import TemplateList from './template-list.vue';
    import PlanList from './plan-list.vue';

    export default {
        name: 'RenderRelatedScript',
        
        props: {
            mode: {
                type: String,
                validator (value) {
                    return [
                        'scriptList',
                        'scriptVersionList',
                    ].includes(value);
                },
                default: 'scriptList',
            },
            info: {
                type: Object,
                required: true,
            },
        },
        data () {
            return {
                listTab: 'template',
            };
        },
        computed: {
            listCom () {
                const componentMap = {
                    template: TemplateList,
                    plan: PlanList,
                };
                return componentMap[this.listTab];
            },
            params () {
                const params = {
                    scriptId: this.info.id,
                };
                if (this.mode === 'scriptVersionList') {
                    params.scriptVersionId = this.info.scriptVersionId;
                }
                return params;
            },
        },
        methods: {
            handleTabChange (tab) {
                this.listTab = tab;
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
    }
</style>
