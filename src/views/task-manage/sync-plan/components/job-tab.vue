<template>
    <div class="job-tab">
        asdasd
        <Icon type="check" class="job-check" />
        <bk-switcher class="job-switch" size="min" theme="primary" />
    </div>
</template>
<script>
    export default {
        name: '',

        data () {
            return {};
        },

        methods: {},
    };
</script>
<style lang='postcss' scoped>
    .job-tab {
        display: flex;
        height: 40px;
        padding: 0 13px 0 24px;
        align-items: center;
        font-size: 14px;
        color: #63656e;
        border-right: 1px solid #dcdee5;
        border-bottom: 1px solid #dcdee5;

        .job-check {
            margin-left: auto;
            font-size: 24px;
            color: #2dcb56;
        }

        .job-switch {
            margin-left: 20px;
        }
    }
</style>
