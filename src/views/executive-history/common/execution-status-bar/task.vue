

<template functional>
    <div class="task-exection-status-bar">
        <div v-if="props.data.name" class="title">
            （<div class="title-text">{{ props.data.name }}</div>）
        </div>
        <div class="status-box">
            <div class="status">
                <span>{{ parent.$t('history.状态.execute') }}：</span>
                <span class="status-text">{{ props.data.statusDesc }}</span>
            </div>
            <div class="time">
                <span>{{ parent.$t('history.总耗时') }}：</span>
                <span
                    class="value"
                    :style="{
                        width: `${((props.data.totalTimeText && props.data.totalTimeText.length) || 1) * 9}px`,
                    }">
                    {{ props.data.totalTimeText }}
                </span>
            </div>
            <div class="action">
                <slot />
            </div>
        </div>
    </div>
</template>
<style lang='postcss'>
    .task-exection-status-bar {
        .step-instance-action {
            border: 1px solid #c4c6cc;

            &:hover {
                border-color: #ea3636;
            }
        }
    }
</style>
