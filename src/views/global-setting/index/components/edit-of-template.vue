<template>
    <div>
        <div class="detail-layout-wrapper">
            <div class="channel-detail-layout">
                <div class="layout-left">
                    <div class="detail-item">
                        <label>{{ '渠道类型：' }}</label>
                        <span>{{ formData.name }}</span>
                    </div>
                    <div class="detail-item">
                        <label>{{ '消息类型：' }}</label>
                        <span>{{ formData.messageTypeLabel }}</span>
                    </div>
                </div>
                <div class="layout-right">
                    <div class="detail-item">
                        <label>{{ '最近修改人：' }}</label>
                        <span>{{ formData.lastModifier }}</span>
                    </div>
                    <div class="detail-item">
                        <label>{{ '最近修改时间：' }}</label>
                        <span>{{ formData.lastModifyTime }}</span>
                    </div>
                </div>
            </div>
        </div>
        <jb-form class="notify-template-form" ref="templateForm" :model="formData" form-type="vertical" :rules="rules">
            <jb-form-item v-if="formData.code === 'mail'" :label="'邮件主题'" required :property="'title'">
                <bk-input
                    v-model="formData.title"
                    @change="value => handleChange(value, 'title')" />
            </jb-form-item>
            <jb-form-item :label="'模板内容'" required :property="'content'">
                <bk-button text @click="toggleShowVariable(true)">{{ '内置变量' }}</bk-button>
                <bk-input
                    v-model="formData.content"
                    type="textarea"
                    @change="value => handleChange(value, 'content')" />
            </jb-form-item>
        </jb-form>
        <div class="message-preview">
            <bk-button text @click="isShowPreviewSend = !isShowPreviewSend">{{ '消息预览' }}</bk-button>
            <render-strategy left="20" v-if="isShowPreviewSend">
                <div class="send-message-content">
                    <jb-user-selector
                        :placeholder="'请输入接收消息预览的用户名（请确保接受人对应的账号配置正常）'"
                        class="input"
                        :user="reciverList"
                        :show-role="false"
                        @on-change="handleApprovalUserChange" />
                    <bk-button
                        theme="primary"
                        :loading="isLoading"
                        
                        @click="handleSend">
                        {{ '发送' }}
                    </bk-button>
                </div>
            </render-strategy>
        </div>
        <jb-dialog
            v-model="isShowVariable"
            class="internal-variable-dialog"
            :width="960"
            :show-footer="false">
            <internalVariable :handle-close="toggleShowVariable" />
        </jb-dialog>
    </div>
</template>

<script>
       import GlobalSettingService from '@service/global-setting';
    import RenderStrategy from '@components/render-strategy';
    import InternalVariable from './internal-variable';
    import JbUserSelector from '@components/jb-user-selector';

    const getDefaultData = () => ({
        // 渠道code
        code: '',
        // 消息模板正文
        content: '',
        // 最近修改人
        lastModifier: '',
        // 最近修改时间
        lastModifyTime: '',
        // 消息类型
        messageTypeCode: '',
        // 消息类型名称
        messageTypeLabel: '',
        // 渠道名称
        name: '',
        // 消息模板标题
        title: '',
    });

    export default {
        components: {
            RenderStrategy,
            InternalVariable,
            JbUserSelector,
        },
        props: {
            data: {
                type: Object,
                default: () => ({}),
            },
        },
        data () {
            return {
                isShowPreviewSend: false,
                isShowVariable: false,
                isLoading: false,
                reciverList: [{},{},{}],
                formData: getDefaultData(),
            };
        },
        watch: {
            data (newVal) {
                if (newVal) this.formData = newVal;
            },
        },
        created () {
            this.formData = this.data || {};
            this.rules = {
                content: [
                    { required: true, message: '模板内容必填', trigger: 'blur' },
                ],
            };
            if (this.formData.code === 'mail') {
                this.rules.title = [
                    { required: true, message: '邮件主题必填', trigger: 'blur' },
                ];
            }
        },
        methods: {
            toggleShowVariable (isShow) {
                this.isShowVariable = isShow;
            },
            handleChange (value) {
                this.$emit('on-change', value);
            },
            handleApprovalUserChange (user, role) {
                this.reciverList = user;
            },
            handleSend () {
                const { code, messageTypeCode, content, title } = this.formData;
                const params = {
                    channelCode: code,
                    messageTypeCode,
                    content,
                    title,
                    receiverStr: this.reciverList.join(','),
                };
                this.isLoading = true;
                GlobalSettingService.sendNotifyPreview(params)
                    .then((data) => {
                        this.messageSuccess('发送成功');
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        },
    };
</script>

<style lang="postcss">
    .channel-detail-layout {
        display: flex;

        .layout-left,
        .layout-right {
            flex: 1;
        }

        .detail-item {
            margin-bottom: 20px;
            font-size: 14px;

            label {
                color: #b2b5bd;
                word-break: keep-all;
                white-space: pre;
            }

            span {
                color: #63656e;
            }
        }

        .detail-label {
            justify-content: flex-start;
        }
    }

    .notify-template-form {
        position: relative;
        margin-top: 20px;

        .bk-form-textarea {
            max-height: 400px;
            min-height: 280px;
        }

        .bk-button-text {
            position: absolute;
            top: -32px;
            right: 0;
        }
    }

    .message-preview {
        margin-bottom: 20px;
    }

    .send-message-content {
        display: flex;

        .bk-button {
            margin-left: 10px;
        }
    }

    .internal-variable-dialog {
        .bk-dialog-tool {
            display: none;
        }
    }
</style>
