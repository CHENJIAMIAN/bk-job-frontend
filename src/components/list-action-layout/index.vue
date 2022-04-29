

<template functional>
    <div class="list-action-layout">
        <div class="right-box">
            <slot />
        </div>
        <div class="left-box">
            <slot name="right" />
        </div>
    </div>
</template>
<style lang="postcss">
    .list-action-layout {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .right-box {
            display: flex;

            & > * {
                margin-right: 8px;
            }
        }

        .left-box {
            display: flex;
            margin-left: auto;

            & > * {
                margin-left: 8px;
            }
        }
    }
</style>
