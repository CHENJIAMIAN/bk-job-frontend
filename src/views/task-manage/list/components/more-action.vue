

<template>
    <bk-popover
        :placement="placement"
        :theme="theme"
        :trigger="trigger"
        :ref="id">
        <div :class="['job-more-action', triggerCls]">
            <Icon :type="icon" class="icon" />
        </div>
        <div slot="content" :class="['job-action-wrapper', actionCls]">
            <slot />
        </div>
    </bk-popover>
</template>
<script>
    import _ from 'lodash';

    export default {
        name: '',
        props: {
            displayKey: {
                type: String,
                default: 'name',
            },
            data: {
                type: Object,
                default () {
                    return {};
                },
            },
            icon: {
                type: String,
                default: 'more',
            },
            placement: {
                type: String,
                default: 'bottom',
            },
            theme: {
                type: String,
                default: 'light',
                validator (value) {
                    if (['light', 'dark'].indexOf(value) < 0) {
                        console.error(`theme property is not valid: '${value}'`);
                        return false;
                    }
                    return true;
                },
            },
            trigger: {
                type: String,
                default: 'click',
            },
            triggerCls: {
                type: String,
                default: '',
            },
            actionCls: {
                type: String,
                default: '',
            },
        },
        created () {
            this.id = `${_.random(1, 1000)}_${Date.now()}_PopoverRef`;
        },
        methods: {
            handleMoreAction (actionId, payload) {
                if (this.trigger === 'click') {
                    this.$refs[`${this.id}PopoverRef`].instance.hide();
                }
            },
        },
    };
</script>
<style lang='postcss'>
    .job-more-action {
        display: inline-block;
        width: 32px;
        height: 32px;
        margin-left: -14px;
        line-height: 30px;
        color: #868b97;
        text-align: center;
        cursor: pointer;
        background: transparent;
        border-radius: 50%;

        .icon {
            font-size: 14px;
        }

        &:hover {
            background: #dcdee5;

            .icon {
                color: #3a84ff;
            }
        }
    }

    .job-action-wrapper {
        .job-action-item {
            width: 35px;
            font-size: 14px;
            line-height: 32px;
            color: #868b97;
            text-align: center;
            cursor: pointer;

            &:hover {
                color: #3a84ff;
            }
        }
    }
</style>
