

<template>
    <layout
        class="task-plan-create-box"
        v-bind="$attrs"
        :loading="isLoading">
        <jb-form
            slot="title"
            ref="titleForm"
            style="width: 100%;"
            :model="formData">
            <jb-form-item
                :rules="rules.name"
                property="name"
                error-display-type="tooltips"
                style="margin-bottom: 0;">
                <jb-input
                    v-model="formData.name"
                    class="name-input"
                    behavior="simplicity"
                    :placeholder="'推荐按照该执行方案提供的使用场景来取名...'"
                    :maxlength="60"
                    :native-attributes="{
                        spellcheck: false,
                        autofocus: true,
                    }"
                    @change="handleNameChange" />
            </jb-form-item>
        </jb-form>
        <jb-form
            ref="createPlanForm"
            :model="formData"
            form-type="vertical">
            <jb-form-item style="margin-bottom: 40px;">
                <div class="section-title">
                    <span>{{ '全局变量' }}</span>
                    <span>（ {{ selectedVariable.length }} / {{ globalVariableList.length }} ）</span>
                </div>
                <render-global-var
                    :key="templateId"
                    :list="globalVariableList"
                    :select-value="selectedVariable"
                    mode="editOfPlan"
                    :default-field="'变量值'"
                    @on-change="handleVariableChange" />
            </jb-form-item>
            <jb-form-item
                :rules="rules.enableSteps"
                property="enableSteps">
                <div class="task-step-selection">
                    <div class="section-title">
                        <span>{{ '选择执行步骤' }}</span>
                        <span>（ {{ formData.enableSteps.length }} / {{ taskStepList.length }} ）</span>
                    </div>
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
                    :key="templateId"
                    :list="taskStepList"
                    :select-value="formData.enableSteps"
                    :variable="globalVariableList"
                    mode="select"
                    @on-select="handleSelectStep" />
            </jb-form-item>
        </jb-form>
        <template #footer>
            <span v-bk-tooltips="isSubmitDisable ? '请至少勾选一个执行步骤' : ''">
                <bk-button
                    theme="primary"
                    class="w120 mr10"
                    :loading="submitLoading"
                    
                    @click="handleSumbit"
                    v-test="{ type: 'button', value: 'createPlanSubmit' }">
                    {{ '提交' }}
                </bk-button>
            </span>
            <bk-button
                @click="handleReset"
                v-test="{ type: 'button', value: 'createPlanReset' }">
                {{ '重置' }}
            </bk-button>
        </template>
    </layout>
</template>
<script>
       import TaskManageService from '@service/task-manage';
    import ExecPlanService from '@service/task-plan';
    import {
        genDefaultName,
        findUsedVariable,
    } from '@utils/assist';
    import { planNameRule } from '@utils/validator';
    import JbForm from '@components/jb-form';
    import RenderGlobalVar from '../../common/render-global-var';
    import RenderTaskStep from '../../common/render-task-step';
    import Layout from './components/layout';
    
    const getDefaultData = () => ({
        id: 0,
        name: genDefaultName('执行方案'),
        enableSteps: [],
        templateId: 0,
        variables: [],
    });
    
    export default {
        name: '',
        components: {
            JbForm,
            Layout,
            RenderGlobalVar,
            RenderTaskStep,
        },
        props: {
            templateId: {
                type: [
                    Number,
                    String,
                ],
                required: true,
            },
            firstPlan: {
                type: Boolean,
                default: true,
            },
        },
        data () {
            return {
                formData: getDefaultData(),
                globalVariableList: [{},{},{}],
                taskStepList: [{},{},{}],
                isLoading: true,
                submitLoading: false,
            };
        },
        computed: {
            /**
             * @desc 查找步骤中已使用的变量
             * @return {Array}
             */
            selectedVariable () {
                const selectedSteps = this.taskStepList.filter(step => this.formData.enableSteps.includes(step.id));
                return findUsedVariable(selectedSteps);
            },
            /**
             * @desc 已选中所有步骤
             * @return {Boolean}
             */
            hasSelectAll () {
                return this.formData.enableSteps.length >= this.taskStepList.length;
            },
            /**
             * @desc 禁用提交按钮
             * @returns { Boolean }
             */
            isSubmitDisable () {
                return this.formData.enableSteps.length < 1;
            },
        },
        created () {
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
                        validator: name => ExecPlanService.planCheckName({
                            templateId: this.formData.templateId,
                            planId: this.formData.id,
                            name,
                        }),
                        message: '方案名称已存在，请重新输入',
                        trigger: 'blur',
                    },
                ],
                enableSteps: [
                    {
                        validator: () => this.formData.enableSteps.length > 0,
                        message: '执行步骤必填',
                        trigger: 'blur',
                    },
                ],
            };
            this.formData.templateId = this.templateId;
            this.generatorFormData = () => getDefaultData();
            this.fetchData();
        },
        methods: {
            /**
             * @desc 获取选中模板的信息
             *
             * 如果模板关联的执行方案为空，初始化执行方案的 name 为作业模板的 name
             */
            fetchData () {
                TaskManageService.taskDetail({
                    id: this.formData.templateId,
                }).then((data) => {
                    const { variables, stepList, name } = data;
                    this.globalVariableList = Object.freeze(variables);
                    this.taskStepList = Object.freeze(stepList);
                    
                    // 新建执行方案默认值处理
                    let planName = genDefaultName('执行方案');
                    if (this.firstPlan) {
                        // 第一个执行方案名默认和模板名相同
                        planName = name;
                    }
                    this.generatorFormData = () => ({
                        id: 0,
                        name: planName,
                        templateId: this.formData.templateId,
                        enableSteps: stepList.map(item => item.id),
                        variables: [
                            ...variables,
                        ],
                    });
                    this.$emit('on-name-change', planName);
                    // 初始化新建执行方案
                    this.formData = this.generatorFormData();
                })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            /**
             * @desc 外部调用——刷新接口数据
             */
            refresh () {
                this.fetchData();
            },
            /**
             * @desc 执行方案名更新
             * @param {String} name
             */
            handleNameChange (name) {
                this.formData.name = name;
                this.$emit('on-name-change', name);
            },
            /**
             * @desc 选中所有步骤
             */
            handleSelectAll () {
                this.formData.enableSteps = this.taskStepList.map(item => item.id);
            },
            /**
             * @desc 清空步骤的选中状态
             */
            handleDeselectAll () {
                this.formData.enableSteps = [];
            },
            /**
             * @desc 编辑执行方案的变量
             * @param {Array} variables
             */
            handleVariableChange (variables) {
                this.formData.variables = variables;
            },
            /**
             * @desc 选中步骤
             * @param {Object} stepData 步骤数据
             */
            handleSelectStep (stepData) {
                const index = this.formData.enableSteps.findIndex(item => item === stepData.id);

                if (index > -1) {
                    this.formData.enableSteps.splice(index, 1);
                    return;
                }

                this.formData.enableSteps.push(stepData.id);

                if (this.formData.enableSteps.length) {
                    this.$refs.createPlanForm.clearError('enableSteps');
                }
            },
            /**
             * @desc 提交新建执行方案
             */
            handleSumbit () {
                this.submitLoading = true;
                Promise.all([
                    this.$refs.titleForm.validate(),
                    this.$refs.createPlanForm.validate(),
                ]).then(() => ExecPlanService.planUpdate(this.formData)
                    .then((data) => {
                        window.changeAlert = false;
                        this.$bkMessage({
                            theme: 'success',
                            message: '操作成功',
                        });
                        this.$emit('on-create', data);
                    }))
                    .finally(() => {
                        this.submitLoading = false;
                    });
            },
            /**
             * @desc 重置表单数据
             */
            handleReset () {
                this.formData = this.generatorFormData();
                this.$refs.createPlanForm.clearError();
            },
        },
    };
</script>
<style lang="postcss">
    @import "@/css/mixins/media";

    .task-plan-create-box {
        .variable-batch-action {
            margin: 4px 0;
        }

        .layout-title {
            padding-bottom: 0 !important;
            border-bottom-color: transparent !important;

            .name-input {
                .bk-form-input {
                    font-size: 18px;
                    color: #313238;
                }

                .only-bottom-border {
                    padding-top: 9px;
                    padding-bottom: 16px;
                    padding-left: 0;
                }
            }
        }

        .section-title {
            font-size: 14px;
            line-height: 19px;
            color: #313238;
        }

        .task-step-selection {
            display: flex;
            width: 500px;
            margin-bottom: 14px;
            font-size: 16px;
            line-height: 21px;
            color: #313238;

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

            .step-check {
                margin-left: auto;
            }
        }
    }
</style>
