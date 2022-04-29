

<template>
    <jb-form-item :label="$t('执行账号')" required :property="field" :rules="rules">
        <account-select
            class="form-item-content"
            :value="formData[field]"
            :type="accountType"
            @change="handleChange" />
    </jb-form-item>
</template>
<script>
    import I18n from '@/i18n';
    import {
        formatScriptTypeValue,
    } from '@utils/assist';
    import AccountSelect from '@components/account-select';

    export default {
        components: {
            AccountSelect,
        },
        props: {
            field: {
                type: String,
                required: true,
            },
            scriptLanguageField: {
                type: String,
            },
            formData: {
                type: Object,
                required: true,
            },
        },
        computed: {
            accountType () {
                if (formatScriptTypeValue(this.formData[this.scriptLanguageField]) === 'SQL') {
                    return 'db';
                }
                return 'system';
            },
        },
        created () {
            this.rules = [
                {
                    required: true,
                    message: I18n.t('执行账号必填'),
                    trigger: 'blur',
                },
            ];
        },
        methods: {
            handleChange (value) {
                this.$emit('on-change', this.field, value);
            },
        },
    };
</script>
