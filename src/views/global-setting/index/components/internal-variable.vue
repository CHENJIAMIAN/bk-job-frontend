

<template>
    <div class="internal-variable-wrapper">
        <Icon type="close" class="close-dialog" @click.stop="handleClose(false)" />
        <header>{{ $t('setting.内置变量列表') }}</header>
        <bk-tab :active="variableType"
            type="unborder-card"
            class="variable-tab"
            :before-toggle="handleTabChange">
            <bk-tab-panel name="general" :label="$t('setting.通用变量')" />
            <bk-tab-panel name="job" :label="$t('setting.作业变量')" />
            <bk-tab-panel name="cron" :label="$t('setting.定时任务变量')" />
        </bk-tab>
        <bk-table class="variable-table" :data="renderList">
            <bk-table-column :label="$t('setting.变量名称')" prop="name" />
            <bk-table-column :label="$t('setting.含义')" prop="meaning" />
            <bk-table-column :label="$t('setting.示例')" :width="320" prop="examples" />
        </bk-table>
    </div>
</template>
<script>
    import {
        InternalVariables,
    } from './variables';

    export default {
        props: {
            handleClose: {
                type: Function,
            },
        },
        data () {
            return {
                variableType: 'general',
            };
        },
        computed: {
            renderList () {
                return InternalVariables[this.variableType];
            },
        },
        methods: {
            handleTabChange (tab) {
                this.variableType = tab;
            },
        },
    };
</script>

<style lang="postcss">
    .internal-variable-wrapper {
        height: 586px;
        padding-top: 16px;

        .close-dialog {
            position: absolute;
            top: 10px;
            right: 6px;
            font-size: 28px;
            color: #979ba5;
            cursor: pointer;
        }

        header {
            font-size: 20px;
            color: #313238;
        }

        .variable-tab {
            margin-top: 10px;

            .bk-tab-section {
                display: none;
            }
        }

        .variable-table {
            margin-top: 20px;
            border: none;
        }

        .bk-table-outer-border::after {
            display: none;
        }
    }
</style>
