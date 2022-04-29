

<template>
    <div class="apply-permission-page">
        <div class="page-main">
            <ask-permission :permission-list="authResult.requiredPermissions" />
            <div class="footer">
                <bk-button
                    v-if="isAppleFlag"
                    theme="primary"
                    class="mr10"
                    @click="handleApply">
                    {{ applyText }}
                </bk-button>
                <bk-button
                    v-else
                    theme="primary"
                    @click="handleReload">
                    {{ appliedText }}
                </bk-button>
            </div>
        </div>
    </div>
</template>
<script>
    import I18n from '@/i18n';
    import AskPermission from './index';

    export default {
        components: {
            AskPermission,
        },
        props: {
            authResult: {
                type: Object,
                default: () => ({}),
            },
        },
        data () {
            return {
                isAppleFlag: true,
            };
        },
        created () {
            this.applyText = I18n.t('去申请');
            this.appliedText = I18n.t('已申请');
        },
        methods: {
            /**
             * @desc 跳转权限中心
             */
            handleApply () {
                window.open(this.authResult.applyUrl, '_blank');
                this.isAppleFlag = false;
            },
            /**
             * @desc 已申请刷新页面
             */
            handleReload () {
                location.reload();
            },
        },
    };
</script>
<style lang='postcss' scoped>
    .apply-permission-page {
        .page-main {
            width: 768px;
            padding: 24px;
            margin: 60px auto;
            background-color: #fff;
            border-radius: 2px;
            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
        }

        .footer {
            margin: 24px auto 6px;
            text-align: center;
        }
    }
</style>
