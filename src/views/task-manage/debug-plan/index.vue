<template>
    <div>
        <smart-action class="edit-execute-plan" offset-target="detail-content">
            <detail-layout mode="see">
                <detail-item :label="'全局变量：'" class="gloval-var-item">
                    <render-global-var
                        :list="variableList"
                        :select-value="selectedVariable"
                        mode="editOfPlan" />
                </detail-item>
                <detail-item label="" class="task-step-item">
                    <div class="task-step-selection">
                        <!-- eslint-disable-next-line max-len -->
                        <div>{{ '选择要调试的步骤' }}（ {{ formData.enableSteps.length }} / {{ taskStepList.length }} ）</div>
                        <div class="step-check">
                            <bk-button
                                v-if="hasSelectAll"
                                text
                                @click="handleDeselectAll">
                                {{ '取消全选' }}
                            </bk-button>
                            <bk-button
                                v-else
                                text
                                @click="handleSelectAll">
                                {{ '全选' }}
                            </bk-button>
                        </div>
                    </div>
                    <render-task-step
                        :list="taskStepList"
                        :select-value="formData.enableSteps"
                        mode="select"
                        @on-select="handleSelectStep" />
                </detail-item>
            </detail-layout>
            <template #action>
                <div class="action-wraper">
                    <bk-button
                        theme="primary"
                        class="w120 mr10"
                        
                        @click="handleSubmitExec">
                        {{ '去执行' }}
                    </bk-button>
                    <bk-button @click="handleCancle">{{ '取消' }}</bk-button>
                    <bk-button
                        
                        class="plan-save"
                        @click="handleSavePlan">
                        {{ '另存为' }}
                    </bk-button>
                </div>
            </template>
        </smart-action>
        <back-top />
        <jb-dialog
            v-model="isShowSave"
            class="save-debug-plan-dialog"
            :title="'另存为执行方案'"
            header-position="left"
            render-directive="if"
            :mask-close="false"
            :esc-close="false"
            :width="480">
            <jb-form ref="editPlanForm" :model="planFormData" form-type="vertical" :rules="rules">
                <jb-form-item :label="'执行方案名称'" required property="name">
                    <bk-input
                        v-model="planFormData.name"
                        :native-attributes="{ autofocus: 'autofocus' }"
                        :placeholder="'请输入执行方案名称'"
                        @keydown="handleEnter" />
                </jb-form-item>
            </jb-form>
            <div slot="footer" class="setting-password-footer">
                <bk-button
                    theme="primary"
                    class="mr10"
                    :loading="isPlanCreating"
                    @click="handleSubmitCreatePlan">
                    {{ '确定' }}
                </bk-button>
                <bk-button @click="handleCloseSave">{{ '取消' }}</bk-button>
            </div>
        </jb-dialog>
    </div>
</template>
<script>
       import TaskExecuteService from '@service/task-execute';
    import ExecPlanService from '@service/task-plan';
    import BackTop from '@components/back-top';
    import DetailLayout from '@components/detail-layout';
    import DetailItem from '@components/detail-layout/item';
    import {
        planNameRule,
    } from '@utils/validator';
    import {
        findUsedVariable,
    } from '@utils/assist';
    import RenderGlobalVar from '../common/render-global-var';
    import RenderTaskStep from '../common/render-task-step';

    const getDefaultData = () => ({
        id: 0,
        name: '',
        enableSteps: [],
        templateId: 0,
        variables: [],
    });

    export default {
        name: '',
        components: {
            BackTop,
            DetailLayout,
            DetailItem,
            RenderGlobalVar,
            RenderTaskStep,
        },
        data () {
            return {
                formData: getDefaultData(),
                planFormData: {
                    name: '',
                },
                variableList: [{},{},{}],
                taskStepList: [{},{},{}],
                isLoading: true,
                isShowSave: false,
                isPlanCreating: false,
            };
        },
        computed: {
            isSkeletonLoading () {
                return this.isLoading;
            },
            selectedVariable () {
                const selectedSteps = this.taskStepList.filter(step => this.formData.enableSteps.includes(step.id));
                return findUsedVariable(selectedSteps);
            },
            hasSelectAll () {
                return this.formData.enableSteps.length >= this.taskStepList.length;
            },
            enableStepsNotEmpty () {
                return this.formData.enableSteps.length > 0;
            },
        },
        created () {
            this.formData.templateId = Number(this.$route.params.id);

            this.fetchData();

            this.rules = {
                name: [
                    {
                        required: true,
                        message: '方案名称必填',
                        trigger: 'blur',
                    },
                    {
                        validator: planNameRule.validator,
                        message: planNameRule.message,
                        trigger: 'blur',
                    },
                    {
                        validator: this.checkName,
                        message: '方案名称已存在，请重新输入',
                        trigger: 'blur',
                    },
                ],
            };
        },
        methods: {
            /**
             * @desc 获取调试数据
             */
            fetchData () {
                ExecPlanService.fetchDebugInfo({
                    templateId: this.formData.templateId,
                }).then((data) => {
                    this.variableList = Object.freeze(data.variableList);
                    this.taskStepList = Object.freeze(data.stepList);

                    this.formData.name = data.name;
                    this.formData.id = data.id;
                    this.formData.enableSteps = data.stepList.map(item => item.id);
                    this.formData.variables = data.variableList;
                })
                    .catch((error) => {
                        if ([
                            1243027,
                            400,
                        ].includes(error.code)) {
                            setTimeout(() => {
                                this.$router.push({
                                    name: 'taskList',
                                });
                            }, 3000);
                        }
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            /**
             * @desc 执行调试任务
             */
            taskExecution () {
                this.isExecuting = true;
                TaskExecuteService.taskExecution({
                    taskId: this.formData.id,
                    taskVariables: [],
                }).then(({ taskInstanceId }) => {
                    this.$bkMessage({
                        theme: 'success',
                        message: '操作成功',
                    });
                    this.$router.push({
                        name: 'historyTask',
                        params: {
                            id: taskInstanceId,
                        },
                    });
                })
                    .finally(() => {
                        this.isExecuting = false;
                    });
            },
            /**
             * @desc 检测任务名是否重名
             * @param {String} name 任务名
             */
            checkName (name) {
                return ExecPlanService.planCheckName({
                    templateId: this.formData.templateId,
                    planId: this.formData.id,
                    name,
                });
            },
            /**
             * @desc 选择模板步骤
             * @param {String} payload 模板步骤
             */
            handleSelectStep (payload) {
                const index = this.formData.enableSteps.findIndex(item => item === payload.id);
                if (index > -1) {
                    this.formData.enableSteps.splice(index, 1);
                } else {
                    this.formData.enableSteps.push(payload.id);
                }
            },
            /**
             * @desc 选择模板的所有步骤
             */
            handleSelectAll () {
                this.formData.enableSteps = this.taskStepList.map(item => item.id);
            },
            /**
             * @desc 情况模板步骤选择
             */
            handleDeselectAll () {
                this.formData.enableSteps = [];
            },
            /**
             * @desc 开始执行
             *
             * 1，任务没有全局变量时直接执行任务
             * 2，任务没有选举变量时需要先设置变量
             */
            handleSubmitExec () {
                this.isExecuting = true;
                ExecPlanService.planUpdate(this.formData)
                    .then(() => {
                        if (this.variableList.length < 1) {
                            this.$bkInfo({
                                title: '确认执行？',
                                subTitle: '未设置全局变量，点击确认将直接执行。',
                                confirmFn: () => {
                                    this.taskExecution();
                                },
                            });
                        } else {
                            this.$router.push({
                                name: 'settingVariable',
                                params: {
                                    id: this.formData.id,
                                    templateId: this.formData.templateId,
                                    debug: 1,
                                },
                                query: {
                                    from: 'debugPlan',
                                },
                            });
                        }
                    })
                    .finally(() => {
                        this.isExecuting = false;
                    });
            },
            /**
             * @desc 显示另存为确认框
             */
            handleSavePlan () {
                this.isShowSave = true;
            },
            /**
             * @desc 取消另存为操作
             */
            handleCloseSave () {
                this.isShowSave = false;
                this.planFormData.name = '';
            },
            /**
             * @desc enter触发提交
             */
            handleEnter (value, event) {
                if (event.isComposing) {
                    // 跳过输入发复合时间
                    return;
                }
                if (event.keyCode !== 13) {
                    // 非enter键
                    return;
                }
                this.handleSubmitCreatePlan();
            },
            /**
             * @desc 另存为执行方案
             */
            handleSubmitCreatePlan () {
                this.isPlanCreating = true;
                this.$refs.editPlanForm.validate()
                    .then(() => {
                        const findTemplateStepIds = () => {
                            const enableStepsMap = this.formData.enableSteps.reduce((result, item) => {
                                result[item] = true;
                                return result;
                            }, {});
                            return this.taskStepList.reduce((result, item) => {
                                if (enableStepsMap[item.id]) {
                                    result.push(item.templateStepId);
                                }
                                return result;
                            }, []);
                        };
                        return ExecPlanService.planUpdate({
                            id: 0,
                            name: this.planFormData.name,
                            templateId: this.formData.templateId,
                            enableSteps: findTemplateStepIds(),
                            variables: this.formData.variables,
                        }).then((newPlanId) => {
                            window.changeAlert = false;
                            this.isShowSave = false;
                            this.planFormData.name = '';

                            let confirmInfo = null;
                            const handleGoDebug = () => {
                                confirmInfo.close();
                            };
                            const handleGoPlanDetail = () => {
                                confirmInfo.close();
                                this.$router.push({
                                    name: 'viewPlan',
                                    params: {
                                        templateId: this.formData.templateId,
                                    },
                                    query: {
                                        viewPlanId: newPlanId,
                                        from: 'debugPlan',
                                    },
                                });
                            };
                            const subHeader = () => {
                                /* eslint-disable no-unused-vars */
                                const h = this.$createElement;
                                return (
                                <div>
                                    <bk-button style={{ marginRight: '10px' }} text onClick={handleGoDebug}>
                                        {'返回继续调试'}
                                    </bk-button>
                                    <bk-button text onClick={handleGoPlanDetail}>
                                        {'立即前往查看'}
                                    </bk-button>
                                </div>
                                );
                            };
                            confirmInfo = this.$bkInfo({
                                type: 'success',
                                title: '另存执行方案成功',
                                showFooter: false,
                                subHeader: subHeader(),
                            });
                        });
                    })
                    .finally(() => {
                        this.isPlanCreating = false;
                    });
            },
            /**
             * @desc 取消调试
             */
            handleCancle () {
                this.routerBack();
            },
            /**
             * @desc 路由回退
             */
            routerBack () {
                const { from } = this.$route.query;
                if (from === 'taskList') {
                    this.$router.push({
                        name: 'taskList',
                    });
                    return;
                }
                this.$router.push({
                    name: 'templateDetail',
                    params: {
                        id: this.formData.templateId,
                    },
                });
            },
        },
    };
</script>
<style lang='postcss'>
    @import "@/css/mixins/media";

    .edit-execute-plan {
        padding-bottom: 20px;

        .gloval-var-item {
            margin-top: 20px;
        }

        .task-step-item {
            margin-top: 20px;
            margin-bottom: 20px;
        }

        .task-step-selection {
            display: flex;
            width: 500px;
            margin-bottom: 14px;
            font-size: 16px;
            line-height: 21px;
            color: #313238;

            .step-check {
                margin-left: auto;
            }
        }

        .task-step-selection,
        .action-wraper {
            @media (--small-viewports) {
                width: 500px;
            }

            @media (--medium-viewports) {
                width: 560px;
            }

            @media (--large-viewports) {
                width: 620px;
            }

            @media (--huge-viewports) {
                width: 680px;
            }
        }

        .action-wraper {
            display: flex;

            .plan-save {
                margin-left: auto;
            }
        }
    }

    .save-debug-plan-dialog {
        .bk-dialog-header {
            padding-bottom: 0 !important;
        }

        .bk-form-item:last-child {
            margin-bottom: 0 !important;
        }
    }
</style>
