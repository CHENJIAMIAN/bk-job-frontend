<template>
    <div>
        <jb-form ref="form" :model="formData" :rules="rules" fixed :label-width="110">
            <item-factory
                name="stepName"
                field="name"
                :placeholder="'推荐按步骤实际处理的场景行为来取名...'"
                :form-data="formData"
                @on-change="handleNameChange" />
            <jb-form-item :label="'确认人'" :required="true" property="approvalUser">
                <jb-user-selector
                    :placeholder="'输入确认人'"
                    class="input"
                    :user="formData.approvalUser.userList"
                    :role="formData.approvalUser.roleList"
                    :filter-list="['JOB_EXTRA_OBSERVER']"
                    @on-change="handleApprovalUserChange" />
            </jb-form-item>
            <jb-form-item :label="'通知方式'">
                <div class="notify-channel-wraper">
                    <bk-checkbox
                        @click.native="handleToggleAllChannel"
                        :checked="isChannelAll"
                        :indeterminate="isChannelIndeterminate">
                        {{ '全部' }}
                    </bk-checkbox>
                    <bk-checkbox-group v-model="formData.notifyChannel" class="all-channel">
                        <bk-checkbox
                            v-for="channel in channleList"
                            :key="channel.code"
                            :value="channel.code">
                            {{ channel.name }}
                        </bk-checkbox>
                    </bk-checkbox-group>
                </div>
            </jb-form-item>
            <jb-form-item :label="'确认描述'">
                <bk-input class="input" type="textarea" v-model="formData.approvalMessage" :maxlength="1000" />
            </jb-form-item>
        </jb-form>
    </div>
</template>
<script>
    import _ from 'lodash';
       import QueryGlobalSettingService from '@service/query-global-setting';
    import JbUserSelector from '@components/jb-user-selector';
    import ItemFactory from '@components/task-step/file/item-factory';
    import { genDefaultName } from '@utils/assist';

    const getDefaultData = () => ({
        id: 0,
        // 步骤名称
        name: genDefaultName('步骤人工确认'),
        // 删除标记
        delete: 0,
        // 审批消息
        approvalMessage: '',
        // 审批类型 暂未启用 1-任意人审批 2-所有人审批
        approvalType: 1,
        // 审批人
        approvalUser: {
            roleList: [
                'JOB_RESOURCE_TRIGGER_USER',
            ],
            userList: [{},{},{}],
        },
        notifyChannel: [],
    });
    export default {
        name: '',
        components: {
            JbUserSelector,
            ItemFactory,
        },
        inheritAttrs: false,
        props: {
            data: {
                type: Object,
                default: () => ({}),
            },
        },
        data () {
            return {
                formData: getDefaultData(),
                channleList: [{},{},{}],
            };
        },
        computed: {
            isChannelAll () {
                if (this.channleList.length < 1) {
                    return false;
                }
                return this.formData.notifyChannel.length === this.channleList.length;
            },
            isChannelIndeterminate () {
                if (this.formData.notifyChannel.length < 1) {
                    return false;
                }
                return this.formData.notifyChannel.length !== this.channleList.length;
            },
        },
        watch: {
            data: {
                handler (newData) {
                    if (_.isEmpty(newData)) {
                        return;
                    }
                    this.formData = {
                        ...this.formData,
                        ...newData,
                    };
                    setTimeout(() => {
                        this.$refs.form.validate();
                    });
                },
                immediate: true,
            },
        },
        created () {
            this.rules = {
                approvalUser: [
                    {
                        validator: approvalUser => approvalUser.roleList.length + approvalUser.userList.length > 0,
                        message: '确认人必填',
                        trigger: 'blur',
                    },
                ],
            };
            this.fetchAllChannel();
        },
        methods: {
            fetchAllChannel () {
                QueryGlobalSettingService.fetchActiveNotifyChannel()
                    .then((data) => {
                        this.channleList = data;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            handleToggleAllChannel () {
                if (this.isChannelAll) {
                    this.formData.notifyChannel = [];
                } else {
                    this.formData.notifyChannel = this.channleList.map(_ => _.code);
                }
            },
            handleNameChange (field, name) {
                this.formData[field] = name.trim();
            },
            
            handleApprovalUserChange (user, role) {
                this.formData.approvalUser.roleList = role;
                this.formData.approvalUser.userList = user;
            },
            submit () {
                const {
                    name,
                    id,
                    approvalMessage,
                    approvalType,
                    approvalUser,
                    notifyChannel,
                } = this.formData;

                const result = {
                    id,
                    name,
                    delete: this.formData.delete,
                    type: 3,
                    approvalStepInfo: {
                        approvalMessage,
                        approvalType,
                        approvalUser,
                        notifyChannel,
                    },
                };

                return this.$refs.form.validate()
                    .then(() => {
                        this.$emit('on-change', result, true);
                    }, () => {
                        this.$emit('on-change', result, false);
                    });
            },
        },
    };
</script>
<style lang='postcss' scoped>
    .notify-channel-wraper {
        display: flex;
        align-items: center;
        height: 32px;
        white-space: nowrap;

        .bk-form-checkbox {
            display: flex;
            flex: 0 0 auto;
            margin-right: 40px;
        }

        .all-channel {
            display: flex;
        }
    }

    .input {
        width: 495px;
    }
</style>
