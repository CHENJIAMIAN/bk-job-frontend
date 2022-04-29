

<template>
    <jb-form ref="form" :model="formData" :rules="rules" form-type="vertical">
        <jb-form-item :label="$t('ticket.SecretKey')" required property="value1">
            <bk-input v-model="formData.value1" />
        </jb-form-item>
        <jb-form-item :label="$t('ticket.描述')">
            <bk-input
                v-model="formData.description"
                type="textarea"
                maxlength="100" />
        </jb-form-item>
    </jb-form>
</template>

<script>
    import I18n from '@/i18n';

    export default {
        name: 'SecretKey',
        props: {
            data: {
                type: Object,
                defaule: () => ({}),
            },
            type: {
                type: String,
                default: '',
            },
        },
        data () {
            return {
                formData: {
                    value1: this.data.value1,
                    description: this.data.description,
                },
            };
        },
        created () {
            if (this.type !== 'SECRET_KEY') {
                this.formData.value1 = '';
            }
            this.rules = {
                value1: [
                    {
                        required: true,
                        message: I18n.t('ticket.SecretKey必填'),
                        trigger: 'blur',
                    },
                ],
            };
        },
        methods: {
            /**
             * @desc 校验表单
             *
             * 校验成功传递表单数据到父组件
             */
            getData () {
                return this.$refs.form.validate()
                    .then(validator => this.formData, validator => Promise.reject(validator.content));
            },
        },
    };
</script>
