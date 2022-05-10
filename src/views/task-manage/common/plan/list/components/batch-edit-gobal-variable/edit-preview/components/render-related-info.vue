<template>
    <div class="preview-render-ralated">
        <div class="header" @click="handleToggle">
            <div class="toggle-flag">
                <Icon v-if="isShowRelateList" type="arrow-full-down" />
                <Icon v-else type="arrow-full-right" />
            </div>
            <div class="type">
                <Icon :type="globalVariableInfo.icon" />
            </div>
            <div class="name">{{ globalVariableInfo.name }}</div>
        </div>
        <table v-if="isShowRelateList">
            <thead>
                <tr>
                    <th style="width: 230px;">{{ '执行方案' }}</th>
                    <th style="width: 205px;">{{ '作业模板' }}</th>
                    <th style="width: 185px;">{{ '原始值' }}</th>
                    <th>{{ '更新值' }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="relateData in relateList" :key="relateData.id">
                    <td>
                        <div v-bk-overflow-tips class="cell-text">{{ relateData.plan.name }}</div>
                    </td>
                    <td>
                        <div v-bk-overflow-tips class="cell-text">{{ relateData.plan.templateName }}</div>
                    </td>
                    <td>
                        <div v-bk-overflow-tips class="cell-text">{{ relateData.globalVariable.valueText }}</div>
                    </td>
                    <td>
                        <div v-bk-overflow-tips class="cell-text">{{ latestValueText }}</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import GlobalVariableModel from '@model/task/global-variable';

    export default {
        name: '',
        props: {
            relateList: Array,
            latestValue: [String, Object],
        },
        data () {
            return {
                isShowRelateList: false,
            };
        },
        computed: {
            globalVariableInfo () {
                return this.relateList[0].globalVariable;
            },
            latestValueText () {
                const latestGlobalVariableData = { ...this.globalVariableInfo };
                if (this.globalVariableInfo.isHost) {
                    latestGlobalVariableData.defaultTargetValue = this.latestValue;
                } else {
                    latestGlobalVariableData.defaultValue = this.latestValue;
                }
                return new GlobalVariableModel(latestGlobalVariableData).valueText;
            },
        },
        methods: {
            handleToggle () {
                this.isShowRelateList = !this.isShowRelateList;
            },
        },
    };
</script>
<style lang='postcss' scoped>
    .preview-render-ralated {
        margin-top: 13px;
        border-radius: 2px;

        .header {
            display: flex;
            height: 42px;
            padding: 0 10px;
            color: #979ba5;
            cursor: pointer;
            background: #dcdee5;
            align-items: center;

            .toggle-flag {
                display: flex;
                width: 24px;
                height: 24px;
                font-size: 16px;
                align-items: center;
                justify-content: center;
            }

            .type {
                font-size: 19px;
            }

            .name {
                padding-left: 5px;
                font-size: 14px;
                font-weight: bold;
                color: #63656e;
            }
        }

        table {
            width: 100%;
            color: #63656e;
            border: 1px solid #dcdee5;
            border-radius: 2px;

            thead {
                background: #fafbfd;
            }

            td,
            th {
                height: 40px;
                padding: 0 10px;
                text-align: left;
            }

            th {
                font-weight: normal;
                color: #313238;
            }

            td {
                border-top: 1px solid #dcdee5;
            }

            .cell-text {
                /* stylelint-disable value-no-vendor-prefix */
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
                white-space: normal;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
            }
        }
    }
</style>
