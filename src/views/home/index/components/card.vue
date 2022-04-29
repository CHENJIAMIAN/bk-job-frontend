

<template>
    <div>
        <div class="home-card-layout">
            <div v-if="title" class="card-title">{{ title }}</div>
            <slot />
        </div>
    </div>
</template>
<script>
    export default {
        name: '',
        props: {
            title: String,
        },
    };
</script>
<style lang='postcss'>
    .home-card-layout {
        width: 100%;
        height: 100%;
        padding: 18px 20px;
        font-size: 12px;
        color: #63656e;
        background: #fff;
        border-radius: 2px;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);

        .card-title {
            margin-bottom: 20px;
            font-size: 14px;
            font-weight: bold;
            line-height: 1;
            color: #313238;
        }
    }
</style>
