

<template>
    <div class="execution-step-box theme-approval"
        :class="[data.displayStyle]"
        @click="choose">
        <div class="step-desc">
            <div class="step-icon">
                <Icon :type="data.icon" />
            </div>
            <div>{{ data.name }}</div>
            <div class="confirm-flag">{{ '已确认' }}</div>
        </div>
        <div class="approval-container">
            <div class="approval-info">
                <div v-if="data.roleNameList.length || data.userList.length" class="approval-person">
                    <span class="persion-label">{{ '确认人' }}：</span>
                    <div v-for="item in data.roleNameList" :key="`role_${item}`" class="person">
                        <Icon type="user-group-gray" class="role-flag" />
                        {{ item }}
                    </div>
                    <div v-for="item in data.userList" :key="`user_${item}`" class="person">
                        <Icon type="user" class="role-flag" />
                        {{ item }}
                    </div>
                </div>
                <div v-if="data.notifyChannelNameList.length > 0" class="approval-channel">
                    {{ '通知方式' }}：<span>{{ data.notifyChannelNameList.join('，') }}</span>
                </div>
            </div>
            <div v-if="data.confirmMessage" class="step-message">{{ data.confirmMessage }}</div>
            <bk-input
                v-if="data.isApprovaling"
                v-model="confirmReason"
                class="confirm-reason"
                type="textarea"
                :rows="3"
                :maxlength="100"
                :placeholder="'可在此处输入确认或终止的因由'" />
            <div v-else-if="data.operator" class="confirm-reason-text">
                <div class="person">{{ data.operator }}</div>
                <span v-html="data.confirmReasonHtml" />
            </div>
            <div class="step-action" @click.stop="">
                <step-action
                    v-for="action in data.actions"
                    :name="action"
                    :key="action"
                    :confirm-handler="operationCode => handleChangeStatus(operationCode, confirmReason)" />
            </div>
        </div>
        <Icon :type="data.lastStepIcon" svg class="step-process" />
    </div>
</template>
<script>
    import StepAction from '../../../../common/step-action';

    export default {
        components: {
            StepAction,
        },
        props: {
            data: {
                type: Object,
                required: true,
            },
            choose: {
                type: Function,
                default: () => {},
            },
            handleChangeStatus: {
                type: Function,
                default: () => {},
            },
        },
        data () {
            return {
                confirmReason: '',
            };
        },
    };
</script>
