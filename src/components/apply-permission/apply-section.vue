<template>
    <div v-if="isNotPermission" class="apply-permission-page">
        <div class="page-main">
            <ask-permission :permission-list="authResult.requiredPermissions" />
            <div class="footer">
                <bk-button theme="primary" class="mr10" @click="handleApply" v-if="isAppleFlag">{{ applyText }}</bk-button>
                <bk-button theme="primary" @click="handleReload" v-else>{{ appliedText }}</bk-button>
            </div>
        </div>
    </div>
    <div v-else>
        <slot />
    </div>
</template>
<script>
    import EventBus from '@utils/event-bus';
       import AskPermission from './index';

    export default {
        components: {
            AskPermission,
        },
        data () {
            return {
                isAppleFlag: true,
                isNotPermission: false,
            };
        },
        created () {
            this.applyText = '去申请';
            this.appliedText = '已申请';
            EventBus.$once('permission-catch', this.permissionHold);
            this.$once('hook:beforeDestroy', () => {
                EventBus.$off('permission-catch', this.permissionHold);
            });
        },
        methods: {
            /**
             * @desc 捕获权限异常
             */
            permissionHold (authResult) {
                this.isNotPermission = true;
                this.authResult = authResult;
            },
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
        display: flex;
        align-items: center;
        height: 100%;
        margin-top: -30px;

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
