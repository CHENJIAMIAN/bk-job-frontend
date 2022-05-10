<template>
    <div class="toggle-display">
        <div v-show="isOpen">
            <slot />
        </div>
        <bk-form-item label=" " style="margin-top: -10px;">
            <div class="action" @click="handleToggle">
                <template v-if="isOpen">
                    <Icon type="angle-double-up" class="toggle-arrow" />
                    <span>{{ '收起更多设置' }}</span>
                </template>
                <template v-else>
                    <Icon type="angle-double-down" class="toggle-arrow" />
                    <span>{{ '展开更多设置' }}</span>
                </template>
            </div>
        </bk-form-item>
    </div>
</template>
<script>
    export default {
        name: 'ToggleDisplay',
        data () {
            return {
                isOpen: false,
            };
        },
        methods: {
            handleToggle () {
                this.isOpen = !this.isOpen;
            },
        },
    };
</script>
<style lang='postcss' scoped>
    .toggle-display {
        .action {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #3a84ff;
            cursor: pointer;
        }

        .toggle-arrow {
            margin-right: 3px;
            font-size: 12px;
        }
    }
</style>
