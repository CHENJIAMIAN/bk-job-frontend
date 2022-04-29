
<template>
    <bk-button v-bind="$attrs" v-on="$listeners">
        <slot />
    </bk-button>
    <!-- <bk-button v-if="showRaw" v-bind="$attrs" v-on="$listeners">
        <slot />
    </bk-button>
    <bk-button
        v-else
        v-cursor
        v-bind="$attrs"
        :loading="isLoading"
        class="permission-disable"
        @click.stop="handleRequestPermission">
        <slot />
    </bk-button> -->
</template>
<script>
    import PermissionCheckService from '@service/permission-check';
    import {
        permissionDialog,
    } from '@/common/bkmagic';

    export default {
        name: 'AuthButton',
        inheritAttrs: false,
        props: {
            permission: {
                type: [
                    Boolean, String,
                ],
                default: '',
            },
            auth: {
                type: String,
                required: true,
            },
            resourceId: {
                type: [
                    Number, String,
                ],
            },
            scopeType: String,
            scopeId: String,
        },
        data () {
            return {
                isLoading: false,
                hasPermission: false,
            };
        },
        computed: {
            showRaw () {
                if (this.permission) {
                    return true;
                }
                if (this.hasPermission) {
                    return true;
                }
                return false;
            },
        },
        watch: {
            // resourceId (resourceId) {
            //     if (!resourceId) {
            //         return;
            //     }
            //     this.checkPermission();
            // },
        },
        created () {
            // this.checkPermission();
            this.authResult = {};
        },
        methods: {
            /**
             * @desc 主动鉴权，指定资源和资源权限
             */
            fetchPermission () {
                this.isLoading = true;
                PermissionCheckService.fetchPermission({
                    operation: this.auth,
                    resourceId: this.resourceId,
                    scopeType: window.PROJECT_CONFIG.SCOPE_TYPE,
                    scopeId: window.PROJECT_CONFIG.SCOPE_ID,
                    returnPermissionDetail: true,
                }).then((data) => {
                    this.hasPermission = data.pass;
                    this.authResult = data;
                })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            /**
             * @desc 判断预鉴权逻辑
             */
            checkPermission () {
                if (this.permission === '' && this.auth) {
                    this.fetchPermission();
                }
            },
            /**
             * @desc 无权限时弹框提示资源权限申请
             */
            handleRequestPermission () {
                if (this.isLoading) {
                    return;
                }
                permissionDialog({
                    operation: this.auth,
                    resourceId: this.resourceId,
                    scopeType: this.scopeType,
                    scopeId: this.scopeId,
                }, this.authResult);
            },
        },
    };
</script>
<style lang='postcss' scoped>
    .permission-disable {
        color: #fff !important;
        background-color: #dcdee5 !important;
        border-color: #dcdee5 !important;

        &.bk-button-text {
            color: #c4c6cc !important;
            background: none !important;
        }
    }
</style>
