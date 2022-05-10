<template>
    <jb-form form-type="vertical">
        <jb-form-item
            :label="'变量类型'"
            required
            :desc="nametips">
            <div class="variable-type-wraper">
                <bk-radio-group v-model="globalType">
                    <bk-radio-button
                        class="item"
                        value="string"
                        
                        :name="'字符串'"
                        v-bk-tooltips="'普通的字符串变量，可跨主机、跨步骤使用'">
                        {{ '字符串' }}
                    </bk-radio-button>
                    <bk-radio-button
                        class="item"
                        value="namespace"
                        
                        v-bk-tooltips="'同一主机对象的共享变量，无法跨主机使用'">
                        {{ '命名空间' }}
                    </bk-radio-button>
                    <bk-radio-button
                        class="item"
                        value="host"
                        
                        v-bk-tooltips="'通过拓扑、动态分组或属性筛选的主机对象'">
                        {{ '主机列表' }}
                    </bk-radio-button>
                    <bk-radio-button
                        class="item"
                        value="password"
                        
                        v-bk-tooltips="'经过加密处理的变量，不会以明文形式外显'">
                        {{ '密文' }}
                    </bk-radio-button>
                    <bk-radio-button
                        class="item"
                        value="array"
                        
                        v-bk-tooltips="'Array 格式的字符串，支持关联或索引数组'">
                        {{ '数组' }}
                    </bk-radio-button>
                </bk-radio-group>
            </div>
        </jb-form-item>
        <component
            ref="handler"
            :is="globalVarCom"
            :data="formData"
            v-bind="$attrs"
            v-on="$listeners" />
    </jb-form>
</template>
<script>
       import VarString from './string';
    import VarNamespace from './namespace';
    import VarHost from './host';
    import VarPassword from './password';
    import VarArray from './array';
    import { createVariable } from '../util';

    export default {
        name: 'GlobalVar',
        components: {
            VarString,
            VarNamespace,
            VarHost,
            VarPassword,
            VarArray,
        },
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
                globalType: 'string',
                formData: {},
            };
        },
        computed: {
            globalVarCom () {
                const globalVarMap = {
                    string: VarString,
                    namespace: VarNamespace,
                    host: VarHost,
                    password: VarPassword,
                    array: VarArray,
                };
                if (!Object.prototype.hasOwnProperty.call(globalVarMap, this.globalType)) {
                    return 'div';
                }
                return globalVarMap[this.globalType];
            },
            isTypeDisabled () {
                return !!Object.keys(this.data).length;
            },
        },
        watch: {
            data: {
                handler (data) {
                    if (data.name) {
                        // 编辑变量
                        this.formData = data;
                    } else {
                        // 新建变量
                        // 初始化默认值
                        this.formData = createVariable(null, '');
                    }
                    this.globalType = this.formData.typeDescription;
                },
                immediate: true,
            },
        },
        created () {
            this.nametips = {
                theme: 'dark',
                content: '在步骤参数或脚本内使用 ${变量名} 即可获取到变量值',
                width: 200,
            };
        },
        methods: {
            submit () {
                return this.$refs.handler.submit && this.$refs.handler.submit();
            },
            reset () {
                return this.$refs.handler.reset && this.$refs.handler.reset().then(() => {
                    this.globalType = '';
                });
            },
        },
    };
</script>
<style lang="postcss">
    .variable-type-wraper {
        .item {
            .bk-radio-button-text {
                width: 108px;
            }
        }
    }
</style>
