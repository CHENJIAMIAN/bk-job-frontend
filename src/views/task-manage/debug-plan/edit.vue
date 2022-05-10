<template>
    <div class="edit-execute-plan" v-bkloading="{ isLoading }">
        <bk-alert class="info" :title="'调试方案的特殊性：不可删除、始终与作业模板同步、不能被API调用、只能在作业平台使用'" />
        <smart-action offset-target="bk-form-content">
            <jb-form ref="editPlanForm" :model="formData" :rules="rules">
                <jb-form-item :label="'全局变量'">
                    <render-global-var
                        :list="variableList"
                        :select-value="selectedVariable"
                        mode="editOfPlan"
                        @on-change="handleGlobalVariableChange" />
                </jb-form-item>
                <jb-form-item :label="'执行步骤'" required property="enableSteps">
                    <render-task-step
                        :list="taskStepList"
                        :select-value="formData.enableSteps"
                        mode="select"
                        @on-select="handleSelectStep" />
                </jb-form-item>
            </jb-form>
            <template #action>
                <bk-button
                    theme="primary"
                    class="w120 mr10"
                    :loading="isSubmitLoading"
                    @click="handleSumbit">
                    {{ '保存' }}
                </bk-button>
                <bk-button @click="handleCancle">{{ '取消' }}</bk-button>
            </template>
        </smart-action>
    </div>
</template>
<script>
       import TaskPlanService from '@service/task-plan';
    import JbForm from '@components/jb-form';
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
            JbForm,
            RenderGlobalVar,
            RenderTaskStep,
        },
        data () {
            return {
                formData: getDefaultData(),
                variableList: [{},{},{}],
                taskStepList: [{},{},{}],
                isLoading: true,
                isSubmitLoading: false,
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
        },
        created () {
            this.rules = {
                enableSteps: [
                    {
                        validator: () => this.formData.enableSteps.length,
                        message: '执行步骤必填',
                        trigger: 'blur',
                    },
                ],
            };
            this.formData.templateId = Number(this.$route.params.id);
            this.fetchData();
        },
        methods: {
            fetchData () {
                this.$request(TaskPlanService.fetchDebugInfo({
                    templateId: this.formData.templateId,
                }, {
                    permission: 'page',
                }), () => {
                    this.isLoading = true;
                }).then((data) => {
                    this.variableList = Object.freeze(data.variableList);
                    this.taskStepList = Object.freeze(data.stepList);

                    this.formData.name = data.name;
                    this.formData.id = data.id;
                    this.formData.enableSteps = data.enableStepId;
                    this.formData.variables = data.variableList;
                })
                    .catch((error) => {
                        if ([1243027, 400].includes(error.code)) {
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

            handleGlobalVariableChange (payload) {
                this.formData.variables = payload.map((item) => {
                    const data = { ...item };
                    if (!data.delete) {
                        delete data.delete;
                    }
                    return data;
                });
            },

            handleSelectStep (payload) {
                const index = this.formData.enableSteps.findIndex(item => item === payload.id);

                if (index > -1) {
                    this.formData.enableSteps.splice(index, 1);
                    return;
                }

                this.formData.enableSteps.push(payload.id);

                if (this.formData.enableSteps.length) {
                    this.$refs.editPlanForm.clearError('enableSteps');
                }
            },

            handleSumbit () {
                this.isSubmitLoading = true;
                this.$refs.editPlanForm.validate()
                    .then(() => TaskPlanService.planUpdate(this.formData)
                        .then((data) => {
                            this.$bkMessage({
                                theme: 'success',
                                message: '操作成功',
                            });
                            this.$router.push({
                                name: 'debugPlan',
                                params: {
                                    id: this.formData.templateId,
                                },
                            });
                        }))
                    .finally(() => {
                        this.isSubmitLoading = false;
                    });
            },

            handleCancle () {
                this.routerBack();
            },

            routerBack () {
                this.$router.push({
                    name: 'debugPlan',
                    params: {
                        id: this.formData.templateId,
                    },
                });
            },
        },
    };
</script>
<style lang='postcss' scoped>
    .edit-execute-plan {
        .info {
            margin-bottom: 20px;
        }
    }
</style>
