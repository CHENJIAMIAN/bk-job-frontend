

<template>
    <div v-if="isRender">
        <jb-form-item
            v-for="paramsItem in paramList"
            :key="paramsItem.name"
            :label="paramsItem.label"
            :required="paramsItem.required"
            :rules="calcRules(paramsItem)"
            property="fileSourceInfoMap">
            <bk-input
                :value="paramMap[paramsItem.name]"
                @change="value => handleChange(paramsItem.name, value)" />
        </jb-form-item>
    </div>
</template>
<script>
    import FileManageService from '@service/file-source-manage';
    
    export default {
        name: '',
        props: {
            fileSourceTypeCode: {
                type: String,
            },
            paramMap: {
                type: Object,
                required: true,
            },
        },
        data () {
            return {
                paramList: [],
            };
        },
        computed: {
            isRender () {
                return this.fileSourceTypeCode && this.paramList.length > 0;
            },
        },
        watch: {
            fileSourceTypeCode: {
                handler (fileSourceTypeCode) {
                    if (fileSourceTypeCode) {
                        this.fetchFileSourceParams();
                    }
                },
                immediate: true,
            },
        },
        methods: {
            /**
             * @desc 获取文件来源参数
             *
             * paramMap 为空使用默认值
             */
            fetchFileSourceParams () {
                FileManageService.fetchParams({
                    fileSourceTypeCode: this.fileSourceTypeCode,
                }).then((data) => {
                    this.paramList = Object.freeze(data);
                    if (Object.keys(this.paramMap).length < 1) {
                        const paramMap = data.reduce((result, item) => {
                            result[item.name] = item.default;
                            return result;
                        }, {});
                        this.$emit('on-change', paramMap);
                    }
                });
            },
            /**
             * @desc 验证规则
             * @param {Object} formItem 表单项数据
             */
            calcRules (formItem) {
                const rules = [];
                if (formItem.required) {
                    rules.push({
                        validator: fileSourceInfoMap => !!fileSourceInfoMap[formItem.name],
                        message: `${formItem.label}必填`,
                        trigger: 'blur',
                    });
                }
                return rules;
            },
            /**
             * @desc 编辑文件来源参数
             * @param {String} name 参数名
             * @param {String} value 参数值
             */
            handleChange (name, value) {
                this.$emit('on-change', {
                    ...this.paramMap,
                    [name]: value,
                });
            },
        },
    };
</script>
