<template>
    <div class="list-operation-extend">
        <Icon type="more" class="icon" />
        <div
            ref="content"
            class="list-operation-extend-wrapper"
            @click="handleClick">
            <slot />
        </div>
    </div>
</template>
<script>
    import _ from 'lodash';

    const instanceMap = {};

    export default {
        created () {
            this.id = `${_.random(1, 1000)}_${Date.now()}_PopoverRef`;
            this.timer = '';
        },
        mounted () {
            this.init();
        },
        methods: {
            init () {
                instanceMap[this.id] = this.$bkPopover(this.$el, {
                    theme: 'list-operation-extend-popover light',
                    interactive: true,
                    placement: 'bottom',
                    content: this.$refs.content,
                    trigger: 'click',
                    arrow: true,
                    size: 'small',
                    onShow: () => {
                        Object.keys(instanceMap).forEach((key) => {
                            if (key !== this.id) {
                                instanceMap[key].hide();
                            }
                        });
                    },
                });
            },
            handleClick () {
                instanceMap[this.id].hide();
            },
        },
    };
</script>
<style lang='postcss'>
    .list-operation-extend {
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

    .list-operation-extend-wrapper {
        display: flex;
        flex-direction: column;

        .action-item {
            font-size: 14px;
            line-height: 32px;
            color: #868b97;
            text-align: center;
            cursor: pointer;

            &:hover {
                color: #3a84ff;
            }

            &.disabled {
                color: #dcdee5;
                cursor: not-allowed;
            }
        }
    }
</style>
