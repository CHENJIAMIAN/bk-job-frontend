

<template>
    <div class="execute-dashboard">
        <div class="layout-left">
            <total-count v-bind="$attrs" />
            <fail-count v-bind="$attrs" />
        </div>
        <div class="layout-right">
            <statistics v-bind="$attrs" />
        </div>
    </div>
</template>
<script>
    import TotalCount from './total-count';
    import FailCount from './fail-count';
    import Statistics from './statistics';

    export default {
        name: '',
        components: {
            TotalCount,
            FailCount,
            Statistics,
        },
        data () {
            return {};
        },

        methods: {},
    };
</script>
<style lang='postcss'>
    @import "@/css/mixins/media";

    .execute-dashboard {
        display: flex;
        flex: 1;
        background: #fff;

        .layout-left {
            flex: 0 0 260px;
            border-right: 1px solid #f0f1f5;

            .dashboard-card-layout {
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

                &:nth-child(n+2) {
                    border-top: 1px solid #f0f1f5;
                }
            }
        }

        .layout-right {
            flex: 1;
        }
    }
</style>
