

<template>
    <jb-form :model="formData" :rules="rules" ref="varStringForm">
        <jb-form-item :label="'变量名称'" required property="name">
            <jb-input
                v-model="formData.name"
                :placeholder="'变量名仅支持大小写英文字母或下划线 [必填]'"
                :maxlength="30" />
        </jb-form-item>
        <jb-form-item
            ref="defaultValue"
            :label="'初始值'"
            :desc="'仅作用于创建执行方案时的初始变量值，后续更改不会同步到执行方案'"
            property="defaultValue">
            <bk-input
                class="var-default-value"
                :placeholder="'请输入变量的初始值 [可选]'"
                v-model="formData.defaultValue" />
        </jb-form-item>
        <jb-form-item :label="'变量描述'">
            <bk-input
                v-model="formData.description"
                type="textarea"
                :placeholder="'这里可以备注变量的用途、使用说明等信息 [可选]'"
                maxlength="100" />
        </jb-form-item>
        <jb-form-item ext-cls="changeable-cls">
            <bk-checkbox
                v-model="formData.changeable"
                :true-value="1"
                :false-value="0"
                v-bk-tooltips.right="'变量的值在执行中可变'">
                {{ '赋值可变' }}
            </bk-checkbox>
        </jb-form-item>
        <jb-form-item style="margin-bottom: 0;">
            <bk-checkbox
                v-model="formData.required"
                :true-value="1"
                :false-value="0">
                {{ '执行时必填' }}
            </bk-checkbox>
        </jb-form-item>
    </jb-form>
</template>
<script>
       import {
        globalVariableNameRule,
    } from '@utils/validator';
    import JbInput from '@components/jb-input';

    export default {
        name: 'VarString',
        components: {
            JbInput,
        },
        props: {
            variable: {
                type: Array,
                default () {
                    return [];
                },
            },
            data: {
                type: Object,
                default: () => ({}),
            },
        },
        data () {
            return {
                formData: { ...this.data },
            };
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
            submit () {
                return this.$refs.varStringForm.validate()
                    .then(() => {
                        this.$emit('on-change', {
                            ...this.formData,
                            type: 1,
                        });
                    }, validator => Promise.reject(validator.content));
            },
        },
    };
</script>
<style lang='postcss'>
    .changeable-cls {
        .bk-form-checkbox .bk-checkbox-text {
            padding-bottom: 2px;
            border-bottom: 1px dashed #c4c6cc;
        }
    }
</style>
