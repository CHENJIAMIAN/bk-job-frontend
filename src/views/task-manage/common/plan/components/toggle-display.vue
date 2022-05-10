<template>
    <div class="toggle-display">
        <div class="action" @click="handleToggle">
            <template v-if="isOpen">
                <Icon type="angle-double-up" class="toggle-arrow" />
                <span>{{ '收起未引用的变量' }} ({{ count }})</span>
            </template>
            <template v-else>
                <Icon type="angle-double-down" class="toggle-arrow" />
                <span>{{ '展开未引用的变量' }} ({{ count }})</span>
            </template>
        </div>
        <div v-show="isOpen">
            <slot />
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ToggleDisplay',
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
            font-size: 14px;
            line-height: 19px;
            color: #3a84ff;
            cursor: pointer;
            user-select: none;
        }

        .toggle-arrow {
            margin-right: 3px;
            font-size: 12px;
        }
    }
</style>
