<template>
    <span class="statistics-text">
        <template v-if="data.success > 0">
            {{ '正常' }}:<span class="success number">{{ data.success }}</span>
        </template>
        <template v-if="data.fail > 0">
            <span v-if="data.success > 0" style="padding-left: 16px;" />
            {{ '异常' }}:<span class="error number">{{ data.fail }}</span>
        </template>
    </span>
</template>
<script>
    export default {
        props: {
            data: {
                type: Object,
                require: true,
            },
        },
    };
</script>
<style lang='postcss'>
    .statistics-text {
        display: flex;
        font-size: 12px;
        font-weight: normal;
        color: #63656e;

        .strong {
            color: #3a84ff;
        }

        .error {
            color: #ea3636;
        }

        .success {
            color: #3fc06d;
        }

        .number {
            padding: 0 4px;
            font-weight: bold;
        }
    }
</style>
