

<template>
    <div class="global-variable-edit-box" ref="varBox" :class="boxClasses">
        <div class="variable-name" ref="varName">
            <span class="name-text">{{ data.name }}</span>
        </div>
        <div class="variable-value" ref="varValue">
            <component
                ref="target"
                :is="typeCom"
                :data="data"
                :placement="placement"
                v-bind="$attrs"
                v-on="$listeners" />
        </div>
    </div>
</template>
<script>
    import VariableModel from '@model/task/global-variable';
    import TypeString from './string';
    import TypeNamespace from './namespace';
    import TypeHost from './host';
    import TypePassword from './password';
    import TypeArray from './array';

    export default {
        props: {
            type: {
                type: Number,
                required: true,
            },
            data: {
                type: Object,
                required: true,
            },
            layout: {
                type: String,
                default: 'horizontal', // 水平：horizontal；垂直：vertical
            },
        },
        data () {
            return {
                isError: false,
                placement: '',
            };
        },
        computed: {
            typeCom () {
                const comMap = {
                    1: TypeString,
                    2: TypeNamespace,
                    3: TypeHost,
                    4: TypePassword,
                    5: TypeArray,
                    6: TypeArray,
                };
                if (!Object.prototype.hasOwnProperty.call(comMap, this.type)) {
                    return 'div';
                }
                
                return comMap[this.type];
            },
            boxClasses () {
                const classes = {
                    'variable-required': this.data.required === 1,
                };
                if (this.layout === 'vertical') {
                    classes.vertical = true;
                }
                return classes;
            },
        },
        mounted () {
            if (this.type === VariableModel.TYPE_HOST) {
                this.placement = 'right';
                return;
            }
            const containerWidth = this.$refs.varBox.clientWidth;
            const labelWith = this.$refs.varName.clientWidth;
            const valueWith = this.$refs.varValue.clientWidth;
            this.placement = labelWith + valueWith + 220 > containerWidth ? 'top' : 'right';
        },
        methods: {
            /**
             * @desc 外部调用——移除主机变量中的无效主机
             */
            removeAllInvalidHost () {
                this.$refs.target.removeAllInvalidHost && this.$refs.target.removeAllInvalidHost();
            },
            /**
             * @desc 外部调用——移除主机变量中的无效主机
             */
            reset () {
                this.$refs.target.reset();
            },
            validate () {
                return this.$refs.target.validate()
                    .then((data) => {
                        this.isError = false;
                        return Promise.resolve(data);
                    })
                    .catch((err) => {
                        this.isError = true;
                        document.querySelector('.variable-value-error').scrollIntoView();
                        return Promise.reject(err);
                    });
            },
        },
    };
</script>
<style lang='postcss'>
    .global-variable-edit-box {
        display: flex;
        flex: 1;
        margin-bottom: 20px;

        &.variable-required {
            .variable-name {
                white-space: normal;

                .name-text {
                    margin-right: -10px;

                    &::after {
                        width: 10px;
                        margin-left: 0.2em;
                        color: #ea3636;
                        content: "*";
                    }
                }
            }
        }

        .variable-name {
            padding-right: 28px;
            font-size: 14px;
            line-height: 32px;
            color: #666;
            text-align: right;
            box-sizing: content-box;

            .name-text {
                white-space: nowrap;
            }
        }

        .variable-value {
            flex: 1;
            max-width: 960px;
        }

        .variable-value-error {
            .bk-form-input {
                color: #ff5656;
                border-color: #ff5656;
            }
        }

        .variable-error {
            margin-top: 4px;
            margin-bottom: -6px;
            font-size: 12px;
            line-height: 1;
            color: #ea3636;
        }
    }

    .variable-desc-tippy {
        .tippy-content {
            max-width: 200px;
            white-space: normal;
        }
    }
</style>
