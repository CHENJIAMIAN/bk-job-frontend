<template>
    <jb-form form-type="vertical">
        <jb-form-item
            :label="'变量类型'"
            required
            :desc="nametips">
            <bk-radio-group v-model="globalType">
                <bk-radio-button
                    class="item"
                    value="string"
                    
                    :name="'字符串'">
                    {{ '字符串' }}
                </bk-radio-button>
                <bk-radio-button
                    class="item"
                    value="namespace"
                    >
                    {{ '命名空间' }}
                </bk-radio-button>
                <bk-radio-button
                    class="item"
                    value="host"
                    >
                    {{ '主机列表' }}
                </bk-radio-button>
                <bk-radio-button
                    class="item"
                    value="password"
                    >
                    {{ '密文' }}
                </bk-radio-button>
                <bk-radio-button
                    class="item"
                    value="array"
                    >
                    {{ '数组' }}
                </bk-radio-button>
            </bk-radio-group>
        </jb-form-item>
        <component
            ref="handler"
            :is="globalVarCom"
            :variable="variable"
            :data="data" />
    </jb-form>
</template>
<script>
       import VarString from './string';
    import VarNamespace from './namespace';
    import VarHost from './host';
    import VarPassword from './password';
    import VarArray from './array';

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
            variable: {
                type: Array,
                default () {
                    return [];
                },
            },
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
                handler (value) {
                    if (Object.keys(value).length) {
                        this.globalType = value.typeDescription;
                    }
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
                return this.$refs.handler.submit()
                    .then((data) => {
                        this.$emit('on-change', data);
                    });
            },
            reset () {
                this.globalType = 1;
                return this.$refs.handler.reset();
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
