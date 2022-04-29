

<template functional>
    <div class="card-box">
        <div class="card-title">{{ props.title }}</div>
        <slot />
    </div>
</template>

<style lang='postcss' scoped>
    .card-box {
        padding: 12px 20px 10px;

        /* box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1); */
        background: #fff;
        border: 1px solid #dde4eb;
    }

    .card-title {
        margin-bottom: 30px;
        font-size: 14px;
        font-weight: bold;
        line-height: 1;
        color: #63656e;
    }
</style>
