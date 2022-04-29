

<template>
    <jb-form-item ref="item" :label="$t('脚本内容')" required :property="contentField" :rules="rules">
        <ace-editor
            ref="aceEditor"
            v-bkloading="{ isLoading: isContentLoading, opacity: .2 }"
            :value="formData[contentField]"
            :lang="lang"
            :readonly="isReadonly"
            :constants="scriptVariables"
            :readonly-tips="$t('引用的脚本不支持编辑')"
            @on-mode-change="handleTypeChange"
            @change="handleChange" />
    </jb-form-item>
</template>
<script>
    import I18n from '@/i18n';
    import ScriptService from '@service/script-manage';
    import TaskStepModel from '@model/task/task-step';
    import AceEditor from '@components/ace-editor';
    import {
        formatScriptTypeValue,
    } from '@/utils/assist';

    export default {
        components: {
            AceEditor,
        },
        props: {
            contentField: {
                type: String,
                required: true,
            },
            scriptSourceField: {
                type: String,
                required: true,
            },
            languageField: {
                type: String,
                required: true,
            },
            formData: {
                type: Object,
                default: () => ({}),
            },
            scriptVariables: {
                type: Array,
                default: () => [],
            },
        },
        data () {
            return {
                lang: 'Shell',
                isReadonly: false,
            };
        },
        computed: {
            isContentLoading () {
                return this.formData.isScriptContentLoading;
            },
        },
        watch: {
            formData: {
                handler (newData) {
                    this.isReadonly = newData[this.scriptSourceField] !== TaskStepModel.scriptStep.TYPE_SOURCE_LOCAL;
                    this.lang = formatScriptTypeValue(newData[this.languageField]);
                    if (this.isReadonly) {
                        this.rules = [];
                    } else {
                        this.rules = [
                            {
                                required: true,
                                message: I18n.t('脚本内容必填'),
                                trigger: 'change',
                            },
                            {
                                validator: value => ScriptService.getScriptValidation({
                                    content: value,
                                    scriptType: newData[this.languageField],
                                }).then((data) => {
                                    // 高危语句报错状态需要全局保存
                                    this.$store.commit('setScriptCheckError', data.some(_ => _.isDangerous));
                                    return true;
                                }),
                                message: I18n.t('脚本内容检测失败'),
                                trigger: 'blur',
                            },
                        ];
                    }
                },
                deep: true,
                immediate: true,
            },
            'formData.content' (value) {
                if (value) {
                    this.$refs.item.clearValidator();
                }
            },
        },
        created () {
            this.rules = [];
        },
        methods: {
            handleTypeChange (lang) {
                this.$emit('on-change', this.languageField, formatScriptTypeValue(lang));
            },
            handleChange (value) {
                this.$emit('on-change', this.contentField, value);
            },
        },
    };
</script>
