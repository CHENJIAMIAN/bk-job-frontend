

<template>
    <div class="distro-file-view" :class="{ loading: isLoading }" v-bkloading="{ isLoading }">
        <detail-item :label="'超时时长：'">{{ stepInfo.timeout }} (s)</detail-item>
        <detail-item :label="'错误处理：'">{{ stepInfo.ignoreErrorText }}</detail-item>
        <detail-item :label="'上传限速：'">{{ stepInfo.uploadSpeedLimitText }}</detail-item>
        <detail-item :label="'下载限速：'">{{ stepInfo.downloadSpeedLimitText }}</detail-item>
        <detail-item :label="'文件来源：'" layout="vertical">
            <render-source-file
                v-if="!isLoading"
                :data="stepInfo.fileSourceList"
                :variable="variable"
                :account="account" />
        </detail-item>
        <detail-item :label="'目标路径：'">{{ stepInfo.fileDestination.path }}</detail-item>
        <detail-item :label="'传输模式：'">{{ stepInfo.transferModeText }}</detail-item>
        <detail-item :label="'执行帐号：'">{{ executeAccountText }}</detail-item>
        <detail-item v-if="stepInfo.fileDestination.server.variable" :label="'执行目标：'">
            <render-global-variable
                :type="'执行目标'"
                :data="variable"
                :name="stepInfo.fileDestination.server.variable" />
        </detail-item>
        <detail-item v-else :label="'执行目标：'" layout="vertical">
            <server-panel
                detail-fullscreen
                :host-node-info="stepInfo.fileDestination.server.hostNodeInfo" />
        </detail-item>
    </div>
</template>
<script>
    import AccountManageService from '@service/account-manage';
    import ServerPanel from '@components/choose-ip/server-panel';
    import RenderSourceFile from './components/render-source-file';
    import DetailItem from '@components/detail-layout/item';
    import RenderGlobalVariable from './components/render-global-variable';

    export default {
        name: '',
        components: {
            ServerPanel,
            RenderSourceFile,
            RenderGlobalVariable,
            DetailItem,
        },
        props: {
            data: {
                type: Object,
                default: () => ({}),
            },
            variable: {
                type: Array,
                default: () => [],
            },
        },
        data () {
            return {
                isLoading: true,
                stepInfo: {},
                executeAccountText: '',
                account: [],
            };
        },
        created () {
            this.stepInfo = Object.freeze(this.data.fileStepInfo);
            this.fetchAccount();
        },
        methods: {
            fetchAccount () {
                this.isLoading = true;
                AccountManageService.fetchAccountWhole()
                    .then((data) => {
                        this.account = data;
                        const accountData = data.find(item => item.id === this.stepInfo.fileDestination.account);
                        if (accountData) {
                            this.executeAccountText = accountData.alias;
                        } else {
                            this.executeAccountText = '--';
                        }
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        },
    };
</script>
<style lang="postcss" scoped>
    .distro-file-view {
        &.loading {
            height: calc(100vh - 100px);
        }

        .detail-item {
            margin-bottom: 0;
        }
    }
</style>
