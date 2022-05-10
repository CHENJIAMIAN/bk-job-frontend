<template>
    <div class="script-dashboard">
        <div class="layout-left">
            <script-count v-bind="$attrs" />
            <script-relate v-bind="$attrs" />
            <script-version-use v-bind="$attrs" />
        </div>
        <div class="layout-center">
            <script-type v-bind="$attrs" />
        </div>
        <div class="layout-right">
            <script-version-status v-bind="$attrs" />
        </div>
    </div>
</template>
<script>
    import ScriptCount from './count';
    import ScriptRelate from './releate';
    import ScriptType from './type';
    import ScriptVersionUse from './version-use';
    import ScriptVersionStatus from './version-status';

    export default {
        name: '',
        components: {
            ScriptCount,
            ScriptRelate,
            ScriptType,
            ScriptVersionUse,
            ScriptVersionStatus,
        },
        data () {
            return {};
        },

        methods: {},
    };
</script>
<style lang='postcss' scoped>
    @import "@/css/mixins/media";

    .script-dashboard {
        display: flex;

        .layout-left {
            flex: 1;
            display: flex;
            flex-direction: column;
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

        .layout-center {
            flex: 2;
        }

        .layout-right {
            flex: 2;
            border-left: 1px solid #f0f1f5;
        }
    }
</style>
