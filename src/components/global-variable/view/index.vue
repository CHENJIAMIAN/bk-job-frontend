<template>
    <div class="global-variable-detail" :class="classes">
        <div class="variable-name">
            <span>{{ data.name }}：</span>
        </div>
        <div class="variable-value">
            <component
                ref="value"
                :is="typeCom"
                :data="data"
                v-bind="$attrs"
                v-on="$listeners" />
        </div>
    </div>
</template>
<script>
    import TypeText from './text';
    import TypeHost from './host';

    export default {
        props: {
            type: {
                type: Number,
                required: true,
            },
            valueWidth: {
                type: String,
                default: '500px',
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
                isEmpty: false,
            };
        },
        computed: {
            typeCom () {
                const comMap = {
                    1: TypeText,
                    2: TypeText,
                    3: TypeHost,
                    4: TypeText,
                    5: TypeText,
                    6: TypeText,
                };
                if (!Object.prototype.hasOwnProperty.call(comMap, this.type)) {
                    return 'div';
                }
                
                return comMap[this.type];
            },
            classes () {
                const classes = {};
                if (this.isEmpty) {
                    return classes;
                }
                if (this.layout === 'vertical') {
                    classes.vertical = true;
                }
                return classes;
            },
        },
        mounted () {
            const unWatch = this.$watch(() => this.$refs.value.isEmpty, (value) => {
                this.isEmpty = Boolean(value);
            }, {
                immediate: true,
            });
            this.$once('hook:beforeDestroy', () => {
                unWatch();
            });
        },
    };
</script>
<style lang='postcss'>
    .global-variable-detail {
        display: flex;
        flex: 1;
        font-size: 14px;
        line-height: 36px;

        &.vertical {
            flex-direction: column;
        }

        .variable-name {
            padding-right: 2px;
            color: #b2b5bd;
            text-align: right;
            white-space: normal;
            box-sizing: content-box;
        }

        .variable-value {
            flex: 1 0;
            color: #63656e;
        }
    }
</style>
