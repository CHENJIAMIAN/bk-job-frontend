<template>
    <div class="server-panel-dropdown-menu" @click.stop="" @mouseleave="handleHide">
        <slot />
        <div class="server-dropdown-menu-content" ref="popoverContent" @mouseover="handleShow" @mouseleave="handleClose">
            <slot name="menu" />
        </div>
    </div>
</template>
<script>
    const instanceMap = {};

    export default {
        name: 'JbPopoverConfirm',
        created () {
            this.id = `dropdown_menu_${Math.random()}_${Math.random()}`;
        },
        mounted () {
            this.init();
        },
        beforeDestroy () {
            instanceMap[this.id].hide();
            delete instanceMap[this.id];
        },
        methods: {
            init () {
                instanceMap[this.id] = this.$bkPopover(this.$el, {
                    theme: 'server-panel-dropdown-menu-popover',
                    interactive: true,
                    placement: 'bottom-start',
                    content: this.$refs.popoverContent,
                    trigger: 'mouseover',
                    arrow: true,
                    onShow: () => {
                        Object.keys(instanceMap).forEach((key) => {
                            if (key !== this.id) {
                                instanceMap[key].hide();
                            }
                        });
                    },
                });
            },
            handleHide () {
                this.leaveTimer = setTimeout(() => {
                    instanceMap[this.id].hide();
                }, 2000);
            },
            handleShow () {
                clearTimeout(this.leaveTimer);
            },
            handleClose () {
                instanceMap[this.id].hide();
            },
        },
    };
</script>
<style lang="postcss">
    .server-panel-dropdown-menu {
        display: inline-flex;
        align-items: center;
        font-size: 20px;
        cursor: pointer;
    }

    .server-panel-dropdown-menu-popover-theme {
        padding: 0 !important;

        .tippy-arrow {
            display: none;
        }

        .server-dropdown-menu-content {
            width: 93px;
            padding: 10px 0;
            font-size: 14px;
            line-height: 32px;
            color: #63656e;
            text-align: center;
            background: #fff;
            border: 1px solid #f0f1f5;
            box-shadow: 0 1px 1px 0 rgb(185 203 222 / 50%);

            .dropdown-menu-item {
                cursor: pointer;

                &:hover,
                &.active {
                    color: #3a84ff;
                    background: #e5efff;
                }
            }
        }
    }

</style>
