

<template>
    <jb-form-item :label="$t('错误处理')">
        <div class="error-handle-wraper">
            <bk-checkbox
                v-bk-tooltips="tips"
                :value="formData[field]"
                :true-value="1"
                :false-value="0"
                @change="handleChange">
                {{ $t('自动忽略错误') }}
            </bk-checkbox>
        </div>
    </jb-form-item>
</template>
<script>
    import I18n from '@/i18n';

    export default {
        name: '',
        props: {
            field: {
                type: String,
                required: true,
            },
            formData: {
                type: Object,
                default: () => ({}),
            },
        },
        created () {
            this.tips = {
                content: I18n.t('步骤有执行失败的目标，将会自动忽略并进入下一步'),
                width: 310,
                placement: 'right',
            };
        },
        methods: {
            handleChange (value) {
                this.$emit('on-change', this.field, value);
            },
        },
    };
</script>
<style lang="postcss">
    .error-handle-wraper {
        display: flex;
        align-items: center;
        height: 100%;

        .bk-checkbox-text {
            border-bottom: 1px dashed #c4c6cc;
        }
    }
</style>
