<template>
    <div class="page-global-set-up">
        <bk-tab :active="page" :before-toggle="handleTabChange" class="page-tab">
            <bk-tab-panel name="notify" :label="'通知设置'" />
            <!-- <bk-tab-panel name="strategy" :label="'存储策略'" /> -->
            <bk-tab-panel name="account" :label="'账号命名规则'" />
            <bk-tab-panel name="platform" :label="'平台信息'" />
            <bk-tab-panel name="fileUpload" :label="'文件上传设置'" />
        </bk-tab>
        <div class="set-up-wraper">
            <transition name="slide">
                <component ref="page" :is="pageCom" class="set-up-content" />
            </transition>
        </div>
    </div>
</template>
<script>
    import { leaveConfirm } from '@utils/assist';
    import NotifyManage from './pages/notify-manage';
    import StorageStrategy from './pages/storage-strategy';
    import AccountRule from './pages/account-rule';
    import PlatformInfo from './pages/platform-info';
    import FileUpload from './pages/file-upload';

    export default {
        name: '',
        components: {
            NotifyManage,
            StorageStrategy,
            AccountRule,
            PlatformInfo,
            FileUpload,
        },
        data () {
            return {
                page: 'notify',
            };
        },
        computed: {
            isSkeletonLoading () {
                return this.$refs.page.isLoading;
            },
            pageCom () {
                const pageMap = {
                    notify: NotifyManage,
                    strategy: StorageStrategy,
                    account: AccountRule,
                    platform: PlatformInfo,
                    fileUpload: FileUpload,
                };
                return pageMap[this.page];
            },
        },
        methods: {
            handleTabChange (value) {
                return leaveConfirm().then(() => {
                    this.page = value;
                });
            },
        },
    };
</script>
<style lang='postcss'>
    .page-global-set-up {
        .page-tab {
            .bk-tab-section {
                display: none;
            }
        }

        .set-up-wraper {
            width: 100%;
            min-height: 300px;
            overflow: hidden;
            background: #fff;
            border: 1px solid #dcdee5;
            border-top: none;
        }

        .set-up-content {
            position: relative;
            z-index: 2;
            width: 100%;
        }

        .block-title {
            margin-bottom: 14px;
            font-size: 14px;
            font-weight: bold;
            line-height: 1;
            color: #63656e;
        }

        .slide-enter {
            opacity: 0%;
            transform: translateX(200px);
        }

        .slide-enter-active, {
            transition: all 0.5s cubic-bezier(0, 0, 0.19, 1.16);
        }

        .slide-leave {
            display: none;
        }

        .slide-leave-active {
            display: none;
        }
    }
</style>
