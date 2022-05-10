<template>
    <bk-form-item
        ref="bkFormItem"
        :class="classes"
        :label="label"
        :error-display-type="errorDisplayType"
        v-bind="$attrs"
        v-on="$listeners">
        <div class="jb-form-item-content">
            <slot />
        </div>
    </bk-form-item>
</template>
<script>
    export default {
        name: 'JbFormItem',
        inheritAttrs: false,
        props: {
            label: {
                type: String,
                default: '',
            },
            layout: {
                type: String,
                default: '',
            },
            errorDisplayType: {
                type: String,
                default: 'normal',
            },
        },
        
        computed: {
            classes () {
                const classes = {
                    'jb-form-item': true,
                    'label-miss': !this.label,
                };
                if (this.layout) {
                    classes[`layout-${this.layout}`] = true;
                }
                return classes;
            },
        },
        
        methods: {
            clearValidator () {
                this.$refs.bkFormItem.clearValidator();
            },
        },
    };
</script>
<style lang='postcss'>
    .jb-form-item {
        &.label-miss {
            .bk-label {
                height: 0;
                min-height: 0;
                font-size: 0;
            }
        }

        &.layout-inline {
            flex-direction: row !important;
        }

        &.layout-vertical {
            flex-direction: column !important;
        }

        .jb-form-item-content {
            flex: 1;
        }

        .bk-label {
            height: 32px;
        }
    }
</style>
