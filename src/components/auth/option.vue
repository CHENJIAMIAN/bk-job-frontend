<template>
    <bk-option v-bind="$attrs" v-on="$listeners" :name="name">
        <auth-component
            :permission="permission"
            :resource-id="resourceId"
            :auth="auth"
            :scope-type="scopeType"
            :scope-id="scopeId">
            <slot>
                {{ name }}
            </slot>
            <div slot="forbid" class="jb-select-option-permission">
                <slot>
                    {{ name }}
                </slot>
            </div>
        </auth-component>
    </bk-option>
</template>
<script>
    export default {
        name: '',
        inheritAttrs: false,
        props: {
            permission: {
                type: [Boolean, String],
                default: '',
            },
            auth: {
                type: String,
                required: true,
            },
            resourceId: {
                type: [Number, String],
            },
            scopeType: String,
            scopeId: String,
            name: {
                type: [Number, String],
            },
        },
    };
</script>
<style lang='postcss'>
    .jb-select-option-permission {
        &.permission {
            color: #c4c6cc;
        }
    }
</style>
