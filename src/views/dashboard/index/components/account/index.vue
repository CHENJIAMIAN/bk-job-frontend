<template>
    <div class="account-dashboard" v-bkloading="{ isLoading, opacity: 0.8 }">
        <card-layout :title="'Linux 账号数'">
            <div class="item-content">
                <div class="nums">{{ data.LINUX }}</div>
                <div
                    ref="LINUX"
                    class="dashboard"
                    v-bk-tooltips.right="calcPercentage(data.LINUX)"
                    style="width: 24px; height: 24px;" />
            </div>
            <Icon type="linux" class="type-flag" style="font-size: 37px;" />
        </card-layout>
        <card-layout :title="'Windows 账号数'">
            <div class="item-content">
                <div class="nums">{{ data.WINDOWS | formatNumber }}</div>
                <div
                    ref="WINDOWS"
                    class="dashboard"
                    v-bk-tooltips.right="calcPercentage(data.WINDOWS)"
                    style="width: 24px; height: 24px;" />
            </div>
            <Icon type="windows" class="type-flag" style="font-size: 36px;" />
        </card-layout>
        <card-layout :title="'DB 账号数'">
            <div class="item-content">
                <div class="nums">{{ data.DB | formatNumber }}</div>
                <div
                    ref="DB"
                    class="dashboard"
                    v-bk-tooltips.right="calcPercentage(data.DB)"
                    style="width: 24px; height: 24px;" />
            </div>
            <Icon type="db" class="type-flag" style="font-size: 27px;" />
        </card-layout>
    </div>
</template>
<script>
    import echarts from 'lib/echarts.min.js';
    import StatisticsService from '@service/statistics';
    import {
        formatNumber,
    } from '@utils/assist';
    import CardLayout from '../card-layout';

    export default {
        name: '',
        components: {
            CardLayout,
        },
        filters: {
            formatNumber (value) {
                return formatNumber(value);
            },
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
                data: {
                    DB: 0,
                    LINUX: 0,
                    WINDOWS: 0,
                },
            };
        },
        watch: {
            date () {
                this.fetchData();
            },
        },
        mounted () {
            this.fetchData();
        },
        methods: {
            fetchData () {
                this.isLoading = true;
                StatisticsService.fetchDistributionMetrics({
                    date: this.date,
                    metric: 'ACCOUNT_TYPE',
                }).then((data) => {
                    this.data = data.labelAmountMap;
                    this.init();
                })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            init () {
                const typeList = [
                    'LINUX',
                    'WINDOWS',
                    'DB',
                ];
                
                typeList.forEach((typeItem) => {
                    if (!this.$refs.LINUX) {
                        return;
                    }
                    const other = typeList.reduce((result, item) => {
                        if (item === typeItem) {
                            return result;
                        }
                        return result + this.data[item];
                    }, 0);

                    const myChart = echarts.init(this.$refs[typeItem]);
                    myChart.setOption({
                        series: [
                            {
                                type: 'pie',
                                radius: [
                                    '8',
                                    '12',
                                ],
                                hoverOffset: 0,
                                label: {
                                    show: false,
                                },
                                data: [
                                    {
                                        value: this.data[typeItem],
                                        itemStyle: {
                                            color: '#85CCA8',
                                        },
                                    },
                                    {
                                        value: other,
                                        itemStyle: {
                                            color: '#EBECF0',
                                        },
                                        emphasis: {
                                            itemStyle: {
                                                color: '#F0F1F5',
                                            },
                                        },
                                    },
                                ],
                            },
                        ],
                    });
                });
            },
            calcPercentage (value) {
                const total = parseInt(this.data.DB, 10)
                    + parseInt(this.data.LINUX, 10) + parseInt(this.data.WINDOWS, 10);
                if (!total) {
                    return '0 %';
                }
                return `${Math.round(value / total * 100).toFixed(2)} %`;
            },
        },
    };
</script>
<style lang='postcss'>
    @import "@/css/mixins/media";

    .account-dashboard {
        .dashboard-card-layout {
            border: none;

            &:nth-child(n+2) {
                border-top: 1px solid #f0f1f5;
            }

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

        .item-content {
            position: relative;
            display: flex;
            align-items: center;
            font-size: 24px;
            font-weight: bold;
            line-height: 32px;
            color: #63656e;

            .dashboard {
                margin-left: 10px;
            }
        }

        .type-flag {
            position: absolute;
            right: 24px;
            bottom: 24px;
            color: #e5e6eb;
        }
    }
</style>
