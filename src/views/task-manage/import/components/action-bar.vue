

<template functional>
    <div class="import-action-bar">
        <slot />
    </div>
</template>
<style lang='postcss' scoped>
    .import-action-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        display: flex;
        width: 100%;
        height: 52px;
        padding-right: 24px;
        background: #fff;
        border-top: 1px solid #e2e2e2;
        align-items: center;
        justify-content: flex-end;
    }
</style>
