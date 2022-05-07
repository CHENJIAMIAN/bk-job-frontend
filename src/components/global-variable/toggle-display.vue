

<template>
    <div class="toggle-display">
        <div
            class="action"
            :class="{
                open: isOpen,
            }"
            @click="handleToggle">
            <template v-if="isOpen">
                <Icon type="angle-double-up" class="toggle-arrow" />
                <span>{{ '收起未引用的变量' }} ({{ count }})</span>
            </template>
            <template v-else>
                <Icon type="angle-double-down" class="toggle-arrow" />
                <span>{{ '展开未引用的变量' }} ({{ count }})</span>
            </template>
        </div>
        <div v-if="isOpen">
            <slot />
        </div>
    </div>
</template>
<script>
    export default {
        name: 'globalVariableToggleDisplay',
        props: {
            count: {
                type: Number,
                required: true,
            },
        },
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
            height: 32px;
            font-size: 14px;
            color: #3a84ff;
            cursor: pointer;
            border-radius: 2px;
            user-select: none;

            &.open {
                padding-left: 8px;
                background: #e1ecff;
            }
        }

        .toggle-arrow {
            margin-right: 3px;
            font-size: 12px;
        }
    }
</style>
