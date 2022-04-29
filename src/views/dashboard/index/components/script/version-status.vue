

<template>
    <card-layout
        class="script-version-dashboard"
        :title="$t('dashboard.脚本版本状态分布')"
        v-bkloading="{ isLoading, opacity: 0.8 }">
        <div class="wraper">
            <div ref="dashboard" style="width: 180px; height: 180px;" />
            <div class="item-list">
                <div
                    v-for="item in list"
                    :key="item.key"
                    class="item"
                    @mouseover="handleMouseover(item.label)">
                    <div :style="calcItemCircleStyles(item.key)" />
                    <div>{{ item.label }}</div>
                </div>
            </div>
        </div>
    </card-layout>
</template>
<script>
    import _ from 'lodash';
    import echarts from 'lib/echarts.min.js';
    import I18n from '@/i18n';
    import StatisticsService from '@service/statistics';
    import CardLayout from '../card-layout';
    import {
        chartsOptionsBase,
    } from '../common/assist';

    const colorMap = {
        ONLINE: '#85CCA8',
        DISABLED: '#FFDDDD',
        OFFLINE: '#D4E6C1',
        DRAFT: '#DCDEE6',
    };

    export default {
        name: '',
        components: {
            CardLayout,
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
                    DISABLED: '',
                    OFFLINE: '',
                    ONLINE: '',
                    DRAFT: '',
                },
            };
        },
        watch: {
            date () {
                this.fetchData();
            },
        },
        created () {
            this.list = [
                {
                    label: I18n.t('dashboard.已上线'),
                    key: 'ONLINE',
                },
                {
                    label: I18n.t('dashboard.禁用'),
                    key: 'DISABLED',
                },
                {
                    label: I18n.t('dashboard.已下线'),
                    key: 'OFFLINE',
                },
                {
                    label: I18n.t('dashboard.未上线'),
                    key: 'DRAFT',
                    emphasis: {
                        itemStyle: {
                            color: '#E6E8F0',
                        },
                    },
                },
            ];
        },
        mounted () {
            this.fetchData();
        },
        methods: {
            fetchData () {
                this.isLoading = true;
                StatisticsService.fetchDistributionMetrics({
                    date: this.date,
                    metric: 'SCRIPT_VERSION_STATUS',
                }).then((data) => {
                    this.data = data.labelAmountMap;
                    this.init();
                })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            init () {
                this.myChart = echarts.init(this.$refs.dashboard);
                const data = [];
                let maxItem = this.list[0];// eslint-disable-line prefer-destructuring
                this.list.forEach((item) => {
                    const currentValue = this.data[item.key];
                    if (this.data[maxItem.key] < currentValue) {
                        maxItem = item;
                    }
                    data.push({
                        value: currentValue,
                        key: item.key,
                        name: item.label,
                        itemStyle: {
                            color: colorMap[item.key],
                        },
                        emphasis: item.emphasis || {},
                    });
                });
                const options = {
                    ...chartsOptionsBase,
                    series: [
                        {
                            type: 'pie',
                            radius: [
                                '60',
                                '80',
                            ],
                            selectedMode: 'single',
                            hoverOffset: 8,
                            selectedOffset: 0,
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center',
                                },
                                emphasis: {
                                    show: true,
                                    formatter: [
                                        '{value|{d}%}',
                                        '{b}',
                                    ].join('\n'),

                                    rich: {
                                        name: {
                                            fontSize: 12,
                                            lineHieght: 16,
                                            color: '#63656E',
                                        },
                                        value: {
                                            fontSize: 26,
                                            fontWeight: 600,
                                            lineHeight: 42,
                                            color: '#63656E',
                                        },
                                    },
                                },
                            },
                            
                            data,
                        },
                    ],
                };
                
                this.myChart.setOption(options);
                this.myChart.dispatchAction({ type: 'highlight', name: maxItem.label });
                this.myChart.on('mouseover', (params) => {
                    this.handleMouseover(params.data.name);
                });
            },
            calcItemCircleStyles (value) {
                return {
                    width: '8px',
                    height: '8px',
                    marginRight: '6px',
                    borderRadius: '50%',
                    backgroundColor: colorMap[value],
                };
            },
            handleMouseover (label) {
                const others = _.filter(this.list, _ => _.label !== label).map(_ => _.label);
                this.myChart.dispatchAction({ type: 'highlight', name: label });
                this.myChart.dispatchAction({ type: 'downplay', name: others });
            },
        },
    };
</script>
<style lang='postcss'>
    .script-version-dashboard {
        .wraper {
            display: flex;
            flex-direction: column;
            align-items: center;

            .item-list {
                display: flex;
                width: 160px;
                margin-top: 30px;
                font-size: 12px;
                line-height: 18px;
                color: #979ba5;
                flex-wrap: wrap;
                justify-content: space-around;

                .item {
                    display: flex;
                    padding: 5px 0;
                    padding-left: 10px;
                    cursor: pointer;
                    flex: 1 1 50%;
                    align-items: center;
                }
            }
        }
    }
</style>
