

<template>
    <div class="cron-item">
        <div class="triangle" :style="{ left: `${left}px` }" />
        <div>
            <slot />
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            left: String,
        },
    };
</script>
<style lang="postcss">
    .cron-item {
        position: relative;
        padding: 16px 20px;
        margin-top: 10px;
        background: #f0f1f5;

        .triangle {
            position: absolute;
            top: -7px;
            left: 84px;
            z-index: 1;
            width: 0;
            height: 0;
            border-right: 7px solid transparent;
            border-bottom: 7px solid #f0f1f5;
            border-left: 7px solid transparent;

            span {
                position: absolute;
                top: 2px;
                left: -9px;
                display: block;
                width: 0;
                height: 0;
                border-right: 6px solid transparent;
                border-bottom: 6px solid #fafbfd;
                border-left: 6px solid transparent;
            }
        }
    }
</style>
