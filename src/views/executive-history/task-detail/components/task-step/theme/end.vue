

<template functional>
    <div class="execution-step-box theme-end" :class="{ disabled: !props.finished }">
        <div class="step-icon">{{ parent.$t('history.终') }}</div>
    </div>
</template>
