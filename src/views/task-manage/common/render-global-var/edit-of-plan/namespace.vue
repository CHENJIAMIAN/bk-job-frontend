<template>
    <jb-form :model="formData" ref="varNamespaceForm">
        <jb-form-item :label="'变量名称'">
            <bk-input v-model="formData.name" disabled />
        </jb-form-item>
        <jb-form-item :label="'变量值'">
            <bk-input
                v-model="formData.defaultValue"
                :native-attributes="{ autofocus: 'autofocus' }" />
        </jb-form-item>
        <jb-form-item :label="'变量描述'">
            <bk-input
                v-model="formData.description"
                disabled
                type="textarea"
                :row="5"
                maxlength="100" />
        </jb-form-item>
        <jb-form-item>
            <bk-checkbox
                v-model="formData.required"
                disabled
                :true-value="1"
                :false-value="0">
                {{ '必填' }}
            </bk-checkbox>
        </jb-form-item>
    </jb-form>
</template>
<script>
    const getDefaultData = () => ({
        id: 0,
        delete: 0,
        // 变量名
        name: '',
        // 默认值
        defaultValue: '',
        // 变量描述
        description: '',
        // 必填 0-非必填 1-必填
        required: 0,
    });
    export default {
        name: 'VarNamespace',
        props: {
            data: {
                type: Object,
                default () {
                    return {};
                },
            },
        },
        data () {
            return {
                formData: getDefaultData(),
            };
        },
        watch: {
            data: {
                handler (value) {
                    if (Object.keys(value).length) {
                        const { name, defaultValue, description, required, id } = value;
                        const del = value.delete;
                        this.formData = { name, defaultValue, description, required, id };
                        this.formData.delete = del;
                    }
                },
                immediate: true,
            },
        },
        methods: {
            submit () {
                return Promise.resolve({
                    ...this.formData,
                    type: 2,
                });
            },

            reset () {
                this.formData = getDefaultData();
            },
        },
    };
</script>
