<template>
    <div class="server-panel-action-extend" @click.stop="" @mouseleave="handleHide">
        <Icon type="more" />
        <div
            ref="popoverContent"
            class="server-action-extend-content"
            @click="handleWraperClick"
            @mouseover="handleShow"
            @mouseleave="handleClose">
            <template v-if="copyable">
                <div class="action-item" @click="handleCopyAll">{{ '复制全部IP' }}</div>
                <div class="action-item" @click="handleCopyFail">{{ '复制异常IP' }}</div>
            </template>
            <slot />
        </div>
    </div>
</template>
<script>
    import {
        execCopy,
    } from '@utils/assist';
   
    const instanceMap = {};

    export default {
        name: 'ChooseIpExtendAction',
        props: {
            list: {
                type: Array,
                default: () => [],
            },
            invalidList: {
                type: Array,
                default: () => [],
            },
            copyable: {
                type: Boolean,
                default: false,
            },
        },
        created () {
            this.id = `action_extend_${Math.random()}_${Math.random()}`;
        },
        mounted () {
            this.init();
        },
        beforeDestroy () {
            instanceMap[this.id].hide();
            delete instanceMap[this.id];
        },
        methods: {
            /**
             * @desc 弹层面板初始化
             */
            init () {
                instanceMap[this.id] = this.$bkPopover(this.$el, {
                    theme: 'server-panel-action-extend-popover',
                    interactive: true,
                    placement: 'bottom',
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
            /**
             * @desc 隐藏弹层面板
             */
            handleWraperClick () {
                this.handleClose();
            },
            /**
             * @desc 鼠标操作隐藏弹层面板
             */
            handleHide () {
                this.leaveTimer = setTimeout(() => {
                    this.handleClose();
                }, 3000);
            },
            /**
             * @desc 复制所有主机
             */
            handleCopyAll () {
                if (this.list.length < 1 && this.invalidList.length < 1) {
                    this.messageWarn('你还未选择主机');
                    return;
                }
                let allIP = this.list.map(host => host.ip);
                const allInvalidList = this.invalidList.map(host => host.ip);
                allIP = [
                    ...allIP, ...allInvalidList,
                ];
                execCopy(allIP.join('\n'), `${'复制成功'}（${allIP.length}${'个IP'}）`);
            },
            /**
             * @desc 复制异常主机
             */
            handleCopyFail () {
                if (this.list.length < 1 && this.invalidList.length < 1) {
                    this.messageWarn('你还未选择主机');
                    return;
                }
                let allFailIp = [];
                this.list.forEach((currentHost) => {
                    if (!currentHost.alive) {
                        allFailIp.push(currentHost.ip);
                    }
                });
                if (allFailIp.length < 1 && this.invalidList.length < 1) {
                    this.messageWarn('暂无异常主机');
                    return;
                }
                const allInvalidList = this.invalidList.map(host => host.ip);
                allFailIp = [
                    ...allFailIp, ...allInvalidList,
                ];
                execCopy(allFailIp.join('\n'), `${'复制成功'}（${allFailIp.length}${'个异常IP'}）`);
            },
            handleShow () {
                clearTimeout(this.leaveTimer);
            },
            handleClose () {
                instanceMap[this.id] && instanceMap[this.id].hide();
            },
        },
    };
</script>
<style lang="postcss">
    html[lang="en-US"] {
        .server-action-extend-content {
            width: 154px;
        }
    }

    .server-panel-action-extend {
        position: absolute;
        top: 50%;
        right: 16px;
        z-index: 9;
        display: flex;
        width: 30px;
        height: 30px;
        font-size: 16px;
        font-weight: normal;
        color: #979ba5;
        cursor: pointer;
        border-radius: 50%;
        transform: translateY(-50%);
        user-select: none;
        align-items: center;
        justify-content: center;

        &:hover,
        &.tippy-active {
            z-index: 10;
            color: #3a84ff;
            background: #dcdee5;
        }
    }

    .server-panel-action-extend-popover-theme {
        padding: 0 !important;

        .tippy-arrow {
            display: none;
        }

        .server-action-extend-content {
            width: 93px;
            font-size: 14px;
            line-height: 32px;
            color: #63656e;
            background: #fff;
            border: 1px solid #f0f1f5;
            box-shadow: 0 2px 1px 0 rgb(185 203 222 / 50%);

            .action-item {
                padding-left: 15px;
                cursor: pointer;

                &:hover {
                    color: #3a84ff;
                    background: #e5efff;
                }
            }
        }
    }

</style>
