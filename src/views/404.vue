

<template>
    <div class="exception-box">
        <img src="/static/images/404.png" alt="">
        <p>{{ '没找到页面！' }}</p>
    </div>
</template>
<style scoped lang="postcss">
    .exception-box {
        margin: auto;
        text-align: center;

        img {
            width: 300px;
            margin-top: 150px;
        }

        p {
            margin: 32px 0;
            font-size: 20px;
            font-weight: 400;
            color: #979797;
        }
    }
</style>
