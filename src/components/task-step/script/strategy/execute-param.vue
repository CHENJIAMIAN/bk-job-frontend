

<template>
    <jb-form-item :label="$t('脚本参数')">
        <div class="muti-item">
            <jb-input
                :placeholder="$t('脚本执行时传入的参数，同脚本在终端执行时的传参格式，如：./test.sh xxxx xxx xxx')"
                @change="handleParamChange" :value="formData[paramField]" />
        </div>
    </jb-form-item>
</template>
<script>
    import JbInput from '@components/jb-input';

    export default {
        components: {
            JbInput,
        },
        props: {
            paramField: {
                type: String,
                required: true,
            },
            formData: {
                type: Object,
                default: () => ({}),
            },
        },
        methods: {
            handleParamChange (value) {
                this.$emit('on-change', this.paramField, value);
            },
        },
    };
</script>
<style lang='postcss'>
    .muti-item {
        display: flex;
        width: 100%;

        .bk-form-control {
            flex: 1;
        }
    }
</style>
