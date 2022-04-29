

<template>
    <div class="notify-collapse-item">
        <bk-collapse-item ref="collapseItem" v-bind="$attrs" v-on="$listeners" hide-arrow>
            <template #default>
                <Icon :type="iconType" style="color: #979ba5;" />
                <span style="display: none;">{{ iconType }}</span>
                <slot />
            </template>
            <template #content>
                <slot name="content" />
            </template>
        </bk-collapse-item>
    </div>
</template>
<script>
    export default {
        inject: ['collapse'],
        data () {
            return {
                iconType: 'arrow-full-right',
            };
        },
        mounted () {
            const unwatch = this.$watch(() => this.$refs.collapseItem.isActive, (newValue) => {
                this.iconType = newValue ? 'arrow-full-down' : 'arrow-full-right';
            }, {
                immediate: true,
            });
            this.$once('hook:beforeDestroy', () => {
                unwatch();
            });
        },
    };
</script>
<style lang='postcss'>
    .notify-collapse-item {
        .bk-collapse-item-header {
            font-size: 14px;
            font-weight: 600;
            color: #313238;
            border-bottom: 1px solid #dcdee5;
        }

        .bk-collapse-item .bk-collapse-item-content {
            min-height: 42px;
            padding: 40px 0 0 84px;
        }
    }
</style>
