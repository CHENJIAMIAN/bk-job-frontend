

<template>
    <jb-form :model="formData" :rules="rules" ref="varNamespaceForm">
        <jb-form-item :label="$t('template.变量名称')" required :property="'name'">
            <jb-input
                v-model="formData.name"
                :placeholder="$t('template.变量名仅支持大小写英文字母或下划线 [必填]')"
                :maxlength="30" />
        </jb-form-item>
        <jb-form-item
            :label="$t('template.初始值')"
            :desc="$t('template.仅作用于创建执行方案时的初始变量值，后续更改不会同步到执行方案')"
            property="defaultValue">
            <bk-input v-model="formData.defaultValue" :placeholder="$t('template.请输入变量的初始值 [可选]')" />
        </jb-form-item>
        <jb-form-item :label="$t('template.变量描述')">
            <bk-input
                v-model="formData.description"
                :placeholder="$t('template.这里可以备注变量的用途、使用说明等信息 [可选]')"
                type="textarea"
                maxlength="100" />
        </jb-form-item>
        <jb-form-item style="margin-bottom: 0;">
            <bk-checkbox v-model="formData.required" :true-value="1" :false-value="0">
                {{ $t('template.执行时必填') }}
            </bk-checkbox>
        </jb-form-item>
    </jb-form>
</template>
<script>
    import I18n from '@/i18n';
    import {
        globalVariableNameRule,
    } from '@utils/validator';
    import JbInput from '@components/jb-input';

    export default {
        name: 'VarNamespace',
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
                        message: I18n.t('template.变量名称必填'),
                        trigger: 'blur',
                    },
                    {
                        validator: globalVariableNameRule.validator,
                        message: globalVariableNameRule.message,
                        trigger: 'blur',
                    },
                    {
                        validator: val => !this.variable.some(item => item.name === val),
                        message: I18n.t('template.变量名称已存在，请重新输入'),
                        trigger: 'blur',
                    },
                ],
            };
        },
        methods: {
            submit () {
                return this.$refs.varNamespaceForm.validate()
                    .then(() => {
                        this.$emit('on-change', {
                            ...this.formData,
                            type: 2,
                        });
                    }, validator => Promise.reject(validator.content));
            },
        },
    };
</script>
