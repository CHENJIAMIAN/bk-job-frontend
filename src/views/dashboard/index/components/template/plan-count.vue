<template>
    <card-layout
        class="plan-count-dashboard"
        :title="'执行方案量'">
        <render-trend metric="TASK_PLAN_COUNT" :date="date" />
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
            metric="TASK_PLAN_COUNT"
            :title="'执行方案量趋势图'"
            :name="'执行方案量'"
            :date="date" />
        <lower-component level="custom" :custom="isShowList">
            <jb-dialog
                v-model="isShowList"
                :title="'执行方案量列表'"
                :width="520"
                :show-footer="false"
                header-position="left">
                <div
                    style="margin-top: 12px;"
                    v-bkloading="{ isLoading: isListLoading, opacity: 0.8 }">
                    <bk-table :data="listData" :max-height="420">
                        <bk-table-column
                            :label="'业务名'"
                            prop="appName"
                            key="appName"
                            align="left" />
                        <bk-table-column
                            :label="'执行方案量'"
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
                isListLoading: false,
                listData: [],
                isShowTrend: false,
                isShowList: false,
            };
        },
        methods: {
            handleShowTrend () {
                this.isShowTrend = true;
            },
            handleShowList () {
                this.isShowList = true;
                this.isListLoading = true;
                StatisticsService.fetchListByPerAppMetrics({
                    metric: 'TASK_PLAN_COUNT',
                }).then((data) => {
                    this.listData = Object.freeze(data);
                })
                    .finally(() => {
                        this.isListLoading = false;
                    });
            },
        },
    };
</script>
