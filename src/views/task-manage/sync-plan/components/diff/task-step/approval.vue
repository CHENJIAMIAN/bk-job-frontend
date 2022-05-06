

<template>
    <div>
        <div class="row" :class="diff.approvalUser">
            <div class="label">{{ $t('template.确认人：') }}</div>
            <div class="value">
                <div class="approval-wraper">
                    <div v-for="role in renderRoleList" :key="role" class="item">
                        <Icon type="user-group-gray" class="approval-flag" />
                        {{ role }}
                    </div>
                    <div v-for="user in data.approvalUser.userList" :key="user" class="item">
                        <Icon type="user" class="approval-flag" />
                        {{ user }}
                    </div>
                </div>
            </div>
        </div>
        <div class="row" :class="diff.notifyChannel">
            <div class="label">{{ $t('template.通知方式：') }}</div>
            <div class="value">{{ renderChannel }}</div>
        </div>
        <div class="row" :class="diff.approvalMessage">
            <div class="label">{{ $t('template.确认描述：') }}</div>
            <div class="value">{{ data.approvalMessage || '-' }}</div>
        </div>
    </div>
</template>
<script>
    import QueryGlobalSettingService from '@service/query-global-setting';
    import NotifyService from '@service/notify';

    export default {
        name: '',
        inheritAttrs: false,
        props: {
            data: {
                type: Object,
                required: true,
            },
            diff: {
                type: Object,
                default: () => ({}),
            },
        },
        data () {
            return {
                renderRoleList: [{},{},{}],
                renderChannel: '',
            };
        },
        created () {
            Promise.all([
                this.fetchRoleList(),
                this.fetchAllChannel(),
            ]).finally(() => {
                this.isLoading = false;
            });
        },
        methods: {
            fetchRoleList () {
                NotifyService.fetchRoleList()
                    .then((data) => {
                        const roleMap = {};
                        data.forEach((role) => {
                            roleMap[role.code] = role.name;
                        });
                        this.renderRoleList = this.data.approvalUser.roleList.map(_ => roleMap[_]);
                    });
            },
            fetchAllChannel () {
                QueryGlobalSettingService.fetchActiveNotifyChannel()
                    .then((data) => {
                        const channelMap = {};
                        data.forEach((channel) => {
                            channelMap[channel.code] = channel.name;
                        });
                        this.renderChannel = this.data.notifyChannel.map(_ => channelMap[_]).join('，');
                    });
            },
        },
    };
</script>
<style lang='postcss' scoped>
    .approval-wraper {
        display: inline-flex;
        align-items: center;
        flex-wrap: wrap;
        margin-top: -10px;

        .item {
            display: flex;
            height: 20px;
            padding: 0 6px;
            margin-top: 10px;
            margin-right: 10px;
            font-size: 12px;
            color: #63656e;
            white-space: nowrap;
            background: #f0f1f5;
            border-radius: 2px;
            align-items: center;
        }

        .approval-flag {
            margin-right: 4px;
        }
    }
</style>
