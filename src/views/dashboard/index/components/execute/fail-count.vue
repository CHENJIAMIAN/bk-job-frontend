<template>
    <card-layout class="execute-fail-dashboard" :title="'累计执行失败次数'">
        <render-trend metric="FAILED_TASK_COUNT" :date="date" />
        <div slot="extend">
            <Icon
                type="line-chart-line"
                v-bk-tooltips="'查看趋势图'"
                @click="handleShowTrend" />
            <Icon
                type="table-line"
                v-bk-tooltips="'查看列表'"
                @click="handleShowList" />
        </div>
        <trend-dialog
            v-model="isShowTrend"
            metric="FAILED_TASK_COUNT"
            :title="'累计执行失败次数趋势图'"
            :name="'累计执行失败次数'"
            :date="date" />
        <lower-component level="custom" :custom="isShowList">
            <jb-dialog
                v-model="isShowList"
                :title="'累计执行失败次数列表'"
                :width="520"
                :show-footer="false"
                header-position="left">
                <div style="margin-top: 12px;" v-bkloading="{ isLoading, opacity: 0.8 }">
                    <bk-table :data="listData" :max-height="420">
                        <bk-table-column
                            :label="'业务名'"
                            prop="appName"
                            key="appName"
                            align="left" />
                        <bk-table-column
                            :label="'失败次数'"
                            prop="value"
                            key="value"
                            align="left" />
                        <bk-table-column
                            :label="'占比'"
                            prop="ratio"
                            key="ratio"
                            align="left" />
                    </bk-table>
                </div>
            </jb-dialog>
        </lower-component>
    </card-layout>
</template>
<script>
    import StatisticsService from '@service/statistics';
    import CardLayout from '../card-layout';
    import RenderTrend from '../common/render-trend';
    import TrendDialog from '../common/trend-dialog';

    export default {
        name: '',
        components: {
            CardLayout,
            RenderTrend,
            TrendDialog,
        },
        props: {
            date: {
                type: String,
                required: true,
            },
        },
        data () {
            return {
                isLoading: true,
                isShowTrend: false,
                isShowList: false,
                listData: [],
            };
        },
        methods: {
            handleShowTrend () {
                this.isShowTrend = true;
            },
            handleShowList () {
                this.isShowList = true;
                this.isLoading = true;
                StatisticsService.fetchListByPerAppMetrics({
                    metric: 'FAILED_TASK_COUNT',
                }).then((data) => {
                    this.listData = Object.freeze(data);
                })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        },
    };
</script>
<style lang='postcss'>
    .execute-fail-dashboard {
        .wraper {
            display: flex;
            flex-direction: column;
            margin-right: auto;
            font-size: 12px;
            line-height: 16px;
            color: #babcc2;

            .total {
                height: 32px;
                font-size: 24px;
                font-weight: bold;
                line-height: 32px;
                color: #63656e;
            }
        }
    }
</style>
