

<template>
    <router-link v-if="permission" v-bind="$attrs" v-on="$listeners">
        <slot />
    </router-link>
    <span v-else v-cursor class="not-permission" @click="handleCheckPermission">
        <slot />
    </span>
</template>
<script>
    import {
        permissionDialog,
    } from '@/common/bkmagic';

    export default {
        name: 'AuthRouterLink',
        inheritAttrs: false,
        props: {
            permission: {
                type: Boolean,
                default: true,
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
        methods: {
            /**
             * @desc 无权限时弹框提示资源权限申请
             */
            handleCheckPermission () {
                permissionDialog({
                    operation: this.auth,
                    resourceId: this.resourceId,
                    scopeType: this.scopeType,
                    scopeId: this.scopeId,
                });
            },
        },
    };
</script>
<style lang='postcss' scoped>
    .not-permission {
        color: #c4c6cc;
        cursor: default;
    }
</style>
