

<template>
    <jb-dialog
        v-model="isShowDialog"
        class="apply-permission-dialog"
        :mask-close="false"
        :esc-close="false"
        :width="768">
        <ask-permission
            v-if="isShowDialog"
            :loading="isLoading"
            :permission-list="permissionList"
            :max-height="360" />
        <template #footer>
            <template v-if="!isLoading">
                <bk-button
                    theme="primary"
                    class="mr10"
                    @click="handleApply"
                    v-if="isAppleFlag">
                    {{ applyText }}
                </bk-button>
                <bk-button
                    theme="primary"
                    class="mr10"
                    @click="handleHasApplyed"
                    v-else>
                    {{ appliedText }}
                </bk-button>
            </template>
            <bk-button @click="handleCancle">{{ cancelText }}</bk-button>
        </template>
    </jb-dialog>
</template>
<script>
    import PermissionCheckService from '@service/permission-check';
    import I18n from '@/i18n';
    import AskPermission from './index';

    export default {
        components: {
            AskPermission,
        },
        data () {
            return {
                isLoading: false,
                isShowDialog: false,
                isAppleFlag: true,
                authParams: null,
                authResult: {},
            };
        },
        computed: {
            permissionList () {
                if (this.isLoading) {
                    return [];
                }
                if (this.authResult.requiredPermissions) {
                    return this.authResult.requiredPermissions;
                }
                return [];
            },
        },
        created () {
            this.applyText = I18n.t('去申请');
            this.appliedText = I18n.t('已申请');
            this.cancelText = I18n.t('取消');
        },
        methods: {
            /**
             * @desc 申请资源权限
             */
            fetchPermission () {
                this.isLoading = true;
                PermissionCheckService.fetchPermission({
                    ...this.authParams,
                    scopeType: this.authParams.scopeType || window.PROJECT_CONFIG.SCOPE_TYPE,
                    scopeId: this.authParams.scopeId || window.PROJECT_CONFIG.SCOPE_ID,
                    returnPermissionDetail: true,
                }).then((data) => {
                    this.authResult = data;
                })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            /**
             * @desc 供外部调用，显示权限申请弹框
             */
            show () {
                this.isShowDialog = true;
                if (this.authParams && !this.authResult.requiredPermissions) {
                    this.fetchPermission();
                }
            },
            /**
             * @desc 跳转权限中心
             */
            handleApply () {
                window.open(this.authResult.applyUrl, '_blank');
                this.isAppleFlag = false;
            },
            /**
             * @desc 权限已申请刷新页面
             */
            handleHasApplyed () {
                this.handleCancle();
                window.location.reload();
            },
            handleCancle () {
                this.isAppleFlag = true;
                this.isShowDialog = false;
                this.authResult = {};
            },
        },
    };
</script>
