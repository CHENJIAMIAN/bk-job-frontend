

<template>
    <div class="template-dashboard">
        <div class="layout-left">
            <template-count v-bind="$attrs" />
            <plan-count v-bind="$attrs" />
        </div>
        <div class="layout-right">
            <template-step v-bind="$attrs" />
        </div>
    </div>
</template>
<script>
    import TemplateCount from './template-count';
    import PlanCount from './plan-count';
    import TemplateStep from './template-step';

    export default {
        name: '',
        components: {
            TemplateCount,
            PlanCount,
            TemplateStep,
        },
        data () {
            return {};
        },

        methods: {},
    };
</script>
<style lang='postcss' scoped>
    @import "@/css/mixins/media";

    .template-dashboard {
        display: flex;

        .layout-left {
            display: flex;
            flex-direction: column;
            border-right: 1px solid #f0f1f5;

            .dashboard-card-layout {
                &:nth-child(n+2) {
                    border-top: 1px solid #f0f1f5;
                }
            }
        }

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
        }
    }
</style>
