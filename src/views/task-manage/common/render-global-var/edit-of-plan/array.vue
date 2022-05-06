

<template>
    <jb-form :model="formData" ref="varArrayForm">
        <jb-form-item :label="$t('template.数组类型')">
            <div class="array-type-group">
                <bk-radio-group :value="arrayType">
                    <bk-radio-button
                        class="item"
                        :value="5"
                        >
                        {{ $t('template.关联数组') }}
                    </bk-radio-button>
                    <bk-radio-button
                        class="item"
                        :value="6"
                        >
                        {{ $t('template.索引数组') }}
                    </bk-radio-button>
                </bk-radio-group>
            </div>
        </jb-form-item>
        <jb-form-item :label="$t('template.变量名称')">
            <bk-input v-model="formData.name" disabled />
        </jb-form-item>
        <jb-form-item :label="$t('template.变量值')">
            <bk-input
                v-model="formData.defaultValue"
                :native-attributes="{ autofocus: 'autofocus' }" />
        </jb-form-item>
        <jb-form-item :label="$t('template.变量描述')">
            <bk-input v-model="formData.description" disabled type="textarea" :row="5" maxlength="100" />
        </jb-form-item>
        <jb-form-item>
            <bk-checkbox
                v-model="formData.changeable"
                disabled
                :true-value="1"
                :false-value="0">
                {{ $t('template.赋值可变') }}
            </bk-checkbox>
        </jb-form-item>
        <jb-form-item>
            <bk-checkbox
                v-model="formData.required"
                disabled
                :true-value="1"
                :false-value="0">
                {{ $t('template.必填') }}
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
        // 赋值可变 0-不可变 1-可变
        changeable: 0,
        // 必填 0-非必填 1-必填
        required: 0,
    });
    export default {
        name: 'VarString',
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
                arrayType: 5,
                formData: getDefaultData(),
            };
        },
        watch: {
            data: {
                handler (value) {
                    if (Object.keys(value).length) {
                        const { name, defaultValue, description, changeable, required, id, type } = value;
                        this.formData = {
                            name,
                            defaultValue,
                            description,
                            changeable,
                            required,
                            id,
                            delete: value.delete,
                        };
                        this.arrayType = type;
                    }
                },
                immediate: true,
            },
        },
        methods: {
            submit () {
                return Promise.resolve({
                    ...this.formData,
                    type: this.arrayType,
                });
            },

            reset () {
                this.formData = getDefaultData();
            },
        },
    };
</script>
<style lang='postcss'>
    .array-type-group {
        position: relative;
        z-index: 1;

        .item {
            .bk-radio-button-text {
                width: 108px;
            }
        }
    }
</style>
