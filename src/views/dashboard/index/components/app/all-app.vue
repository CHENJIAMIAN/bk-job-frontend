

<template>
    <card-layout
        class="app-item"
        :title="$t('dashboard.接入业务量')"
        :title-tips="$t('dashboard.在 JOB有任意执行过一次任务记录的业务')">
        <render-trend ref="trend" metric="APP_COUNT" :date="date" />
        <template slot="extend">
            <Icon
                type="line-chart-line"
                v-bk-tooltips="$t('dashboard.查看趋势图')"
                @click="handleShowTrend" />
            <Icon
                type="table-line"
                v-bk-tooltips="$t('dashboard.查看列表')"
                @click="handleShowList" />
        </template>
        <trend-dialog
            v-model="isShowTrend"
            metric="APP_COUNT"
            :title="$t('dashboard.接入业务量趋势图')"
            :name="$t('dashboard.接入业务量')"
            :date="date" />
        <!-- lower-component 用于在custom为true时才渲染子组件 -->
        <lower-component level="custom" :custom="isShowList">
            <jb-dialog
                v-model="isShowList"
                :title="$t('dashboard.接入业务量列表')"
                :width="520"
                :show-footer="false"
                header-position="left">
                <div style="margin-top: 12px;" v-bkloading="{ isLoading: isListLoading, opacity: 0.8 }">
                    <bk-table :data="listData" :max-height="420">
                        <bk-table-column
                            :label="$t('dashboard.业务名')"
                            prop="appName"
                            key="appName" />
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
                    metric: 'APP_COUNT',
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
