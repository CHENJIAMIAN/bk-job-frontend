

<template>
    <jb-form-item :label="'脚本参数'">
        <div class="muti-item">
            <jb-input
                :placeholder="'脚本执行时传入的参数，同脚本在终端执行时的传参格式，如：./test.sh xxxx xxx xxx'"
                @change="handleParamChange"
                :type="paramType"
                :value="formData[paramField]"
                :maxlength="5000" />
            <bk-checkbox
                class="muti-checkbox"
                :value="formData[secureField]"
                :true-value="1"
                :false-value="0"
                @change="handleSecureParam">
                {{ '敏感参数' }}
            </bk-checkbox>
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
            secureField: {
                type: String,
                required: true,
            },
            formData: {
                type: Object,
                default: () => ({}),
            },
        },
        computed: {
            paramType () {
                return this.formData[this.secureField] ? 'password' : 'text';
            },
        },
        methods: {
            handleParamChange (value) {
                this.$emit('on-change', this.paramField, value);
            },
            handleSecureParam (value) {
                this.$emit('on-change', this.secureField, value);
            },
        },
    };
</script>
<style lang='postcss'>
    .muti-item {
        display: flex;
        width: 100%;

        .jb-input {
            flex: 1;
        }

        .muti-checkbox {
            display: flex;
            align-items: center;
            flex: 0 0 auto;
            margin-left: 10px;
        }
    }
</style>
