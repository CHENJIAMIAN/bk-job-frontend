

<template functional>
    <div class="step-exection-status-bar">
        <div v-if="props.data.name" class="title">
            （<div class="title-text">{{ props.data.name }}</div>）
        </div>
        <div class="status-box">
            <div class="status">
                <span>{{ '状态'}}：</span>
                <span class="status-text">{{ props.data.statusDesc }}</span>
            </div>
            <div class="time">
                <span>{{ '总耗时' }}：</span>
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
