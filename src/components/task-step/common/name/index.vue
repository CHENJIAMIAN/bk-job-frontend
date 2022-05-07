

<template>
    <jb-form-item :label="label" required :property="field" :rules="rules">
        <jb-input
            class="form-item-content"
            :placeholder="placeholder"
            @change="handleChange"
            :value="formData[field]"
            :maxlength="60" />
    </jb-form-item>
</template>
<script>
       import JbInput from '@components/jb-input';

    export default {
        components: {
            JbInput,
        },
        props: {
            field: {
                type: String,
                required: true,
            },
            formData: {
                type: Object,
                default: () => ({}),
            },
            label: {
                type: String,
                default: '步骤名称',
            },
            placeholder: {
                type: String,
                default: '请输入步骤名称',
            },
        },
        created () {
            this.rules = [
                {
                    required: true,
                    message: `${this.label}${'必填'}`,
                    trigger: 'blur',
                },
                
                {
                    validator: value => /^[^\\|/:*<>"?]{1,60}$/.test(value),
                    message: `${this.label}${'不允许包含'}\\ | / : * < > " ?`,
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
