

<template>
    <div class="app-dashboard">
        <all-app ref="all" v-bind="$attrs" />
        <active-app ref="active" v-bind="$attrs" />
    </div>
</template>
<script>
    import AllApp from './all-app';
    import ActiveApp from './active-app';

    export default {
        name: '',
        components: {
            AllApp,
            ActiveApp,
        },
    };
</script>
<style lang='postcss'>
    @import "@/css/mixins/media";

    .app-dashboard {
        display: flex;

        .dashboard-card-layout {
            width: 260px;
            border: none;

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
                border-left: 1px solid #f0f1f5;
            }
        }
    }
</style>
