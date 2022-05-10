<template>
    <card-layout
        class="app-item"
        :title="'活跃业务量'"
        :title-tips="'3 天内至少执行过一次任务的业务（定时任务除外）'">
        <render-trend metric="ACTIVE_APP_COUNT" :date="date" />
        <div slot="extend">
            <Icon type="line-chart-line" v-bk-tooltips="'查看趋势图'" @click="handleShowTrend" />
            <Icon type="table-line" v-bk-tooltips="'查看列表'" @click="handleShowList" />
        </div>
        <trend-dialog
            v-model="isShowTrend"
            metric="ACTIVE_APP_COUNT"
            :title="'活跃业务量趋势图'"
            :name="'活跃业务量'"
            :date="date" />
        <lower-component level="custom" :custom="isShowList">
            <jb-dialog
                v-model="isShowList"
                :title="'活跃业务量列表'"
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
                    metric: 'ACTIVE_APP_COUNT',
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
