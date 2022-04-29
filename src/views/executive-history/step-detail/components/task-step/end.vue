

<template functional>
    <div class="task-execute-bar-step end" :class="{ disabled: props.disable }">
        <div class="step-wraper">
            <div class="step-icon">
                <span>{{ parent.$t('history.终') }}</span>
            </div>
        </div>
    </div>
</template>
