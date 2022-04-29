

<template>
    <div class="crontab-dashboard">
        <crontab-status v-bind="$attrs" />
        <crontab-type v-bind="$attrs" />
    </div>
</template>
<script>
    import CrontabStatus from './status';
    import CrontabType from './type';

    export default {
        name: '',
        components: {
            CrontabStatus,
            CrontabType,
        },
        data () {
            return {};
        },

        methods: {},
    };
</script>
<style lang='postcss'>
    @import "@/css/mixins/media";

    .crontab-dashboard {
        display: flex;

        .dashboard-card-layout {
            width: 260px;

            @media (--huge-viewports) {
                width: 400px;
            }

            @media (--large-viewports) {
                width: 300px;
            }

            @media (--medium-viewports) {
                width: 280px;
            }

            @media (--small-viewports) {
                width: 260px;
            }

            &:nth-child(n + 2) {
                border-left: 1px solid #f0f1f5;
            }
        }
    }
</style>
