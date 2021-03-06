<template>
    <div>
        <jb-form ref="varHostForm" :model="formData" :rules="rules">
            <jb-form-item :label="'变量名称'" required :property="'name'">
                <jb-input
                    v-model="formData.name"
                    :maxlength="30"
                    :placeholder="'变量名仅支持大小写英文字母或下划线 [必填]'" />
            </jb-form-item>
            <jb-form-item
                ref="defaultTargetValue"
                :label="'初始值'"
                :desc="'仅作用于创建执行方案时的初始变量值，后续更改不会同步到执行方案'"
                property="defaultTargetValue">
                <div>
                    <bk-button class="mr10" @click="handleOpenChooseIp">
                        <Icon type="plus" />
                        {{ '选择主机' }}
                    </bk-button>
                    <bk-button v-if="isShowClear" @click="handleClearDefault">
                        {{ '清空' }}
                    </bk-button>
                </div>
                <server-panel
                    v-if="isShowClear"
                    class="view-server-panel"
                    :host-node-info="formData.defaultTargetValue.hostNodeInfo"
                    editable
                    detail-fullscreen
                    @on-change="handleHostChange" />
            </jb-form-item>
            <jb-form-item :label="'变量描述'">
                <bk-input
                    v-model="formData.description"
                    :placeholder="'这里可以备注变量的用途、使用说明等信息 [可选]'"
                    type="textarea"
                    maxlength="100" />
            </jb-form-item>
            <jb-form-item style="margin-bottom: 0;">
                <bk-checkbox v-model="formData.required" :true-value="1" :false-value="0">
                    {{ '执行时必填' }}
                </bk-checkbox>
            </jb-form-item>
        </jb-form>
        <choose-ip
            v-model="isShowChooseIp"
            :host-node-info="formData.defaultTargetValue.hostNodeInfo"
            @on-change="handleHostChange" />
    </div>
</template>
<script>
       import TaskGlobalVariableModel from '@model/task/global-variable';
    import TaskHostNodeModel from '@model/task-host-node';
    import {
        globalVariableNameRule,
    } from '@utils/validator';
    import JbInput from '@components/jb-input';
    import ChooseIp from '@components/choose-ip';
    import ServerPanel from '@components/choose-ip/server-panel';

    export default {
        name: 'VarHost',
        components: {
            JbInput,
            ChooseIp,
            ServerPanel,
        },
        props: {
            variable: {
                type: Array,
                default: () => [],
            },
            data: {
                type: Object,
                default: () => ({}),
            },
        },
        data () {
            return {
                formData: { ...this.data },
                isShowChooseIp: false,
            };
        },
        computed: {
            /**
             * @desc 显示清空按钮
             * @returns { Boolean }
             */
            isShowClear () {
                return !TaskHostNodeModel.isHostNodeInfoEmpty(this.formData.defaultTargetValue.hostNodeInfo);
            },
        },
        created () {
            this.rules = {
                name: [
                    {
                        required: true,
                        message: '变量名称必填',
                        trigger: 'blur',
                    },
                    {
                        validator: globalVariableNameRule.validator,
                        message: globalVariableNameRule.message,
                        trigger: 'blur',
                    },
                    {
                        validator: val => !this.variable.some(item => item.name === val),
                        message: '变量名称已存在，请重新输入',
                        trigger: 'blur',
                    },
                ],
            };
        },
        methods: {
            /**
             * @desc 编辑主机信息
             * @param { hostNodeInfo } 主机信息
             */
            handleHostChange (hostNodeInfo) {
                this.formData.defaultTargetValue.hostNodeInfo = hostNodeInfo;
            },
            /**
             * @desc 显示 IP 选择器
             */
            handleOpenChooseIp () {
                this.isShowChooseIp = true;
            },
            /**
             * @desc 清空主机信息
             */
            handleClearDefault () {
                const { hostNodeInfo } = new TaskHostNodeModel({});
                this.formData.defaultTargetValue.hostNodeInfo = hostNodeInfo;
            },
            /**
             * @desc 保存变量
             */
            submit () {
                return this.$refs.varHostForm.validate()
                    .then(() => {
                        this.$emit('on-change', {
                            ...this.formData,
                            type: TaskGlobalVariableModel.TYPE_HOST,
                        });
                    }, validator => Promise.reject(validator.content));
            },
        },
    };
</script>
<style lang="postcss" scoped>
    .view-server-panel {
        margin-top: 10px;
    }
</style>
