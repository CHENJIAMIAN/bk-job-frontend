

<template>
    <card-layout
        class="script-type-dashboard"
        :title="$t('dashboard.脚本类型分布')"
        v-bkloading="{ isLoading, opacity: 0.8 }">
        <div class="wraper">
            <div ref="dashboard" style="width: 180px; height: 180px;" />
            <div class="item-list">
                <div
                    v-for="item in typeList"
                    :key="item"
                    class="item"
                    @mouseover="handleMouseover(item)">
                    <div :style="calcItemCircleStyles(item)" />
                    <div>{{ item }}</div>
                </div>
            </div>
        </div>
    </card-layout>
</template>
<script>
    import echarts from 'lib/echarts.min.js';
    import _ from 'lodash';
    import StatisticsService from '@service/statistics';
    import CardLayout from '../card-layout';
    import {
        chartsOptionsBase,
    } from '../common/assist';

    const colorMap = {
        Bat: '#3157A3',
        Shell: '#85CCA8',
        Perl: '#3786AD',
        Powershell: '#BCEBBC',
        Python: '#74C2C2',
        SQL: '#D4E6C1',
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
                    bat: 0,
                    perl: 0,
                    powershell: 0,
                    python: 0,
                    sql: 0,
                    shell: 0,
                },
            };
        },
        watch: {
            date () {
                this.fetchData();
            },
        },
        created () {
            this.typeList = [
                'Bat',
                'Shell',
                'Perl',
                'Powershell',
                'Python',
                'SQL',
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
                    metric: 'SCRIPT_TYPE',
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
                let maxType = this.typeList[0];// eslint-disable-line prefer-destructuring
                this.typeList.forEach((type) => {
                    const currentValue = this.data[type.toLowerCase()];
                    if (this.data[maxType.toLowerCase()] < currentValue) {
                        maxType = type;
                    }
                    data.push({
                        value: currentValue,
                        key: type,
                        name: type,
                        itemStyle: {
                            color: colorMap[type],
                        },
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
                this.myChart.dispatchAction({ type: 'highlight', name: maxType });
                this.myChart.on('mouseover', (params) => {
                    this.handleMouseover(params.data.name);
                });
            },
            calcItemCircleStyles (type) {
                return {
                    width: '8px',
                    height: '8px',
                    marginRight: '6px',
                    borderRadius: '50%',
                    backgroundColor: colorMap[type],
                };
            },
            handleMouseover (type) {
                const others = _.filter(this.typeList, _ => _ !== type);
                this.myChart.dispatchAction({ type: 'highlight', name: type });
                this.myChart.dispatchAction({ type: 'downplay', name: others });
            },
        },
    };
</script>
<style lang='postcss'>
    .script-type-dashboard {
        .wraper {
            display: flex;
            flex-direction: column;
            align-items: center;

            .item-list {
                display: flex;
                width: 180px;
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
