

<template>
    <jb-form-item :label="'执行账号'" required :property="field" :rules="rules">
        <account-select
            class="form-item-content"
            :value="formData[field]"
            type="system"
            @change="handleChange" />
    </jb-form-item>
</template>
<script>
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
            formData: {
                type: Object,
                required: true,
            },
        },
        created () {
            this.rules = [
                {
                    required: true,
                    message: '执行账号必填',
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
