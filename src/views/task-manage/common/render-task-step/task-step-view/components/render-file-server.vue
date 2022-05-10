<template>
    <div class="render-file-server">
        <div class="server-agent-text" v-html="data.serverDesc" @click="handlerView" />
        <jb-dialog
            v-model="isShowDetail"
            :width="1020"
            :ok-text="'关闭'"
            class="step-view-server-detail-dialog">
            <template #header>
                <div class="variable-title">
                    <span>{{ '服务器文件-服务器列表' }}</span>
                    <i class="server-detail-close bk-icon icon-close" @click="handleClose" />
                </div>
            </template>
            <div class="content-wraper">
                <scroll-faker>
                    <server-panel
                        detail-mode="dialog"
                        :host-node-info="hostNodeInfo" />
                </scroll-faker>
            </div>
        </jb-dialog>
    </div>
</template>
<script>
    import TaskHostNodeModel from '@model/task-host-node';
    import ScrollFaker from '@components/scroll-faker';
    import ServerPanel from '@components/choose-ip/server-panel';

    export default {
        name: '',
        components: {
            ScrollFaker,
            ServerPanel,
        },
        props: {
            data: {
                type: Object,
                required: true,
            },
        },
        data () {
            const { hostNodeInfo } = new TaskHostNodeModel({});
            return {
                isShowDetail: false,
                hostNodeInfo,
            };
        },

        methods: {
            handlerView () {
                this.hostNodeInfo = this.data.host.hostNodeInfo;
                this.isShowDetail = true;
            },
            handleClose () {
                this.isShowDetail = false;
            },
        },
    };
</script>
<style lang='postcss'>
    .render-file-server {
        min-height: 30px;
        padding: 5px;
        margin-left: -10px;
        cursor: pointer;

        &:hover {
            background: #f0f1f5;
        }

        .server-agent-text {
            white-space: pre;

            .sep-location {
                &::before {
                    content: "";
                }
            }
        }
    }

    .step-view-server-detail-dialog {
        .bk-dialog-tool {
            display: none;
        }

        .bk-dialog-header,
        .bk-dialog-footer {
            position: relative;
            z-index: 99999;
            background: #fff;
        }

        .bk-dialog-header {
            padding: 0;
        }

        .bk-dialog-wrapper .bk-dialog-header .bk-dialog-header-inner {
            font-size: 20px;
            color: #000;
            text-align: left;
        }

        .bk-dialog-wrapper .bk-dialog-body {
            padding: 0;

            .server-panel {
                height: 100%;

                &.show-detail {
                    overflow: hidden;
                }

                .host-detail.show {
                    padding-left: 20%;
                }
            }
        }

        .content-wraper {
            height: 450px;
            max-height: 450px;
            min-height: 450px;
            margin-top: -1px;
        }

        button[name="cancel"] {
            display: none;
        }

        .variable-title {
            position: relative;
            height: 68px;
            padding-top: 0;
            padding-bottom: 0;
            padding-left: 25px;
            font-size: 20px;
            line-height: 68px;
            color: #000;
            text-align: left;
            border-bottom: 1px solid #dcdee5;
        }

        .server-detail-close {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 32px;
            color: #c4c6cc;
            cursor: pointer;
            transition: all 0.15s;

            &:hover {
                transform: rotateZ(90deg);
            }
        }
    }
</style>
