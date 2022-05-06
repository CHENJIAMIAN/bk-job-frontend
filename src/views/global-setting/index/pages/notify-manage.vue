

<template>
    <div class="notify-set-manange" v-bkloading="{ isLoading }">
        <jb-form v-if="!isLoading" :model="formData" class="wraper">
            <div class="block-title">{{ $t('setting.用户可选择的通知渠道') }}：</div>
            <notify-channel
                :channle-list="channleList"
                :channel-code="formData.channelCode"
                :handle-toggle-channel="handleToggleChannel"
                :handle-edit-template="handleEditTemplate" />
            <div class="backlist block-title">
                <span v-bk-tooltips="backlistConfig">{{ $t('setting.通讯黑名单') }}:</span>
            </div>
            <div>
                <jb-user-selector
                    :placeholder="$t('setting.请输入')"
                    :user="formData.users"
                    :show-role="false"
                    @on-change="handleBlackListChange" />
            </div>
            <div class="action-box">
                <bk-button
                    theme="primary"
                    :loading="isSubmiting"
                    class="w120 mr10"
                    @click="handleSave">
                    {{ $t('setting.保存') }}
                </bk-button>
                <bk-button @click="handleReset">{{ $t('setting.重置') }}</bk-button>
            </div>
        </jb-form>
        <jb-sideslider :is-show.sync="showTemplateEdit" :title="$t('setting.消息模板编辑')" :width="680">
            <edit-of-template ref="editTemplate" :data="templateDetail" @on-change="handleNotifyContent" />
            <template #footer>
                <bk-button
                    theme="primary"
                    class="slider-action"
                    :loading="isSaveLoading"
                    @click="handleTriggerSave">
                    {{ $t('setting.保存') }}
                </bk-button>
                <bk-button class="slider-action" @click="handleTriggerReset">{{ $t('setting.重置') }}</bk-button>
                <bk-button class="slider-action" @click="handleTriggerInit">{{ $t('setting.初始化') }}</bk-button>
            </template>
        </jb-sideslider>
    </div>
</template>
<script>
    import I18n from '@/i18n';
    import _ from 'lodash';
    import GlobalSettingService from '@service/global-setting';
    import NotifyChannel from '../components/notify-channel-table';
    import JbSideslider from '@components/jb-sideslider';
    import editOfTemplate from '../components/edit-of-template';
    import JbUserSelector from '@components/jb-user-selector';

    export default {
        name: 'NotifyManage',
        components: {
            JbUserSelector,
            NotifyChannel,
            JbSideslider,
            editOfTemplate,
        },
        data () {
            return {
                isLoading: true,
                isSubmiting: false,
                isSaveLoading: false,
                showTemplateEdit: false,
                formData: {
                    channelCode: [],
                    users: [],
                },
                templateDetail: {},
                currentTemplate: {},
                currentDefaultTemplate: {},
                channleList: [{},{},{}],
                channelCode: [],
                users: [],
            };
        },
        created () {
            this.backlistConfig = {
                width: 202,
                placement: 'top',
                content: I18n.t('setting.「通讯黑名单」的人员将不会接收到任何来自作业平台的消息'),
            };
            this.fetchAllChannelConfig();
            this.fetchAllUserBlacklist();
            this.channelCodeMemo = [];
            this.usersMemo = [];
        },
        methods: {
            fetchAllChannelConfig () {
                GlobalSettingService.fetchAllNotifyChannelConfig({}, {
                    permission: 'page',
                }).then((data) => {
                    this.channleList = data;
                    this.formData.channelCode = data.reduce((result, item) => {
                        if (item.isActive) {
                            result.push(item.code);
                        }
                        return result;
                    }, []);
                    this.channelCodeMemo = [...this.channelCode];
                })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            fetchAllUserBlacklist () {
                GlobalSettingService.fetchAllUserBlacklist({}, {
                    permission: 'page',
                }).then((data) => {
                    this.formData.users = data.map(item => item.username);
                    this.usersMemo = [...this.users];
                });
            },
            handleBlackListChange (user, role) {
                this.formData.users = user;
            },
            handleToggleChannel (code) {
                const index = this.formData.channelCode.indexOf(code);
                if (index > -1) {
                    this.formData.channelCode.splice(index, 1);
                } else {
                    this.formData.channelCode.push(code);
                }
            },
            handleEditTemplate (channel, template) {
                GlobalSettingService.fetchChannelTemplate({
                    channelCode: channel,
                    messageTypeCode: template,
                }).then((data) => {
                    const { currentTemplate, defaultTemplate } = data;
                    this.templateDetail = _.cloneDeep(currentTemplate || defaultTemplate);
                    this.currentTemplate = _.cloneDeep(currentTemplate || defaultTemplate);
                    this.currentDefaultTemplate = _.cloneDeep(defaultTemplate);
                })
                    .finally(() => {
                        this.showTemplateEdit = true;
                    });
            },
            handleSave () {
                this.isSubmiting = true;
                Promise.all([
                    GlobalSettingService.updateNotifyChannel({
                        channelCodeStr: this.formData.channelCode.join(','),
                    }).catch(() => {
                        this.messageError(I18n.t('setting.保存通知渠道失败'));
                    }),
                    GlobalSettingService.updateUserBlacklist({
                        usersStr: this.formData.users.join(','),
                    }).catch(() => {
                        this.messageError(I18n.t('setting.保存黑名单失败'));
                    }),
                ]).then(() => {
                    window.changeAlert = false;
                    this.messageSuccess(I18n.t('setting.保存成功'));
                })
                    .finally(() => {
                        this.isSubmiting = false;
                    });
            },
            handleReset () {
                this.formData.channelCode = [...this.channelCodeMemo];
                this.formData.users = [...this.usersMemo];
            },
            handleNotifyContent (value, filed) {
                this.templateDetail[filed] = value;
            },
            handleTriggerSave () {
                this.$refs.editTemplate.$refs.templateForm.validate().then(() => {
                    const { code, messageTypeCode, content, title } = this.templateDetail;
                    const params = {
                        channelCode: code,
                        messageTypeCode,
                        content,
                        title,
                    };
                    GlobalSettingService.updateNotifyTemplate(params)
                        .then((data) => {
                            this.showTemplateEdit = false;
                            this.messageSuccess(I18n.t('setting.保存成功'));
                        })
                        .finally(() => {
                            this.isSaveLoading = false;
                        });
                });
            },
            handleTriggerReset () {
                this.templateDetail = _.cloneDeep(this.currentTemplate);
            },
            handleTriggerInit () {
                this.templateDetail = _.cloneDeep(this.currentDefaultTemplate);
            },
        },
    };
</script>
<style lang='postcss'>
    .notify-set-manange {
        display: flex;
        justify-content: center;
        padding-top: 40px;
        padding-bottom: 40px;

        .wraper {
            width: 960px;
        }

        .block-title {
            margin-bottom: 12px;
        }

        .backlist {
            margin-top: 38px;

            span {
                border-bottom: 1px dashed #c4c6cc;
            }
        }

        .action-box {
            margin-top: 30px;
        }
    }

    .member-item {
        &.disabled {
            color: #c4c6cc;
        }

        .job-icon-user {
            margin-right: 8px;
        }
    }

    .slider-action {
        margin-right: 10px;
    }
</style>
