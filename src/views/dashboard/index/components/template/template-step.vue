

<template>
    <card-layout
        class="template-step-card"
        :title="'作业步骤类型使用占比'"
        v-bkloading="{ isLoading, opacity: 0.8 }">
        <div class="wraper">
            <div ref="dashboard" style="width: 180px; height: 180px;" />
            <div class="data-info">
                <div class="row">
                    <div class="data-label" @mouseover="handleMouseover('文件分发')">
                        <div :style="calcItemCircleStyles('fileStep')" />
                        <div>{{ '文件分发' }}</div>
                    </div>
                    <div class="data-content">
                        <div class="content-item" @mouseover="handleMouseover('本地文件源')">
                            <div class="local-file-dot" />
                            <div>{{ '本地文件源' }}</div>
                        </div>
                        <div class="content-item" @mouseover="handleMouseover('服务器文件源')">
                            <div class="server-file-dot" />
                            <div>{{ '服务器文件源' }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="data-label" @mouseover="handleMouseover('脚本执行')">
                        <div :style="calcItemCircleStyles('scriptStep')" />
                        <div>{{ '脚本执行' }}</div>
                    </div>
                    <div class="data-content">
                        <div class="content-item" @mouseover="handleMouseover('手工录入')">
                            <div class="local-script-dot" />
                            <div>{{ '手工录入' }}</div>
                        </div>
                        <div class="content-item" @mouseover="handleMouseover('脚本引用')">
                            <div class="refer-script-dot" />
                            <div>{{ '脚本引用' }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="data-label" @mouseover="handleMouseover('人工确认')">
                        <div :style="calcItemCircleStyles('confirmStep')" />
                        <div>{{ '人工确认' }}</div>
                    </div>
                </div>
            </div>
        </div>
    </card-layout>
</template>
<script>
    import _ from 'lodash';
    import echarts from 'lib/echarts.min.js';
       import StatisticsService from '@service/statistics';
    import CardLayout from '../card-layout';
    import {
        chartsOptionsBase,
    } from '../common/assist';

    const colorMap = {
        fileStep: '#3157A3',
        scriptStep: '#85CCA8',
        confirmStep: '#D4E6C1',
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
                    CONFIRM: 32,
                    FILE_LOCAL: 68,
                    FILE_SERVER: 32,
                    SCRIPT_MANUAL: 32,
                    SCRIPT_REF: 32,
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
                '文件分发',
                '本地文件源',
                '服务器文件源',
                '脚本执行',
                '手工录入',
                '脚本引用',
                '人工确认',
            ];
            this.fetchData();
        },
        methods: {
            fetchData () {
                this.isLoading = true;
                StatisticsService.fetchDistributionMetrics({
                    date: this.date,
                    metric: 'STEP_TYPE',
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
                const option = {
                    ...chartsOptionsBase,
                    series: [
                        {
                            name: '作业步骤',
                            type: 'pie',
                            label: {
                                show: false,
                            },
                            selectedMode: 'single',
                            radius: [
                                0,
                                '50px',
                            ],
                            hoverOffset: 6,
                            avoidLabelOverlap: false,
                            data: [
                                {
                                    value: this.data.FILE_LOCAL + this.data.FILE_SERVER,
                                    name: '文件分发',
                                    itemStyle: {
                                        color: colorMap.fileStep,
                                    },
                                },
                                {
                                    value: this.data.SCRIPT_MANUAL + this.data.SCRIPT_REF,
                                    name: '脚本执行',
                                    itemStyle: {
                                        color: colorMap.scriptStep,
                                    },
                                },
                                {
                                    value: this.data.CONFIRM,
                                    name: '人工确认',
                                    itemStyle: {
                                        color: colorMap.confirmStep,
                                    },
                                },
                            ],
                        },
                        {
                            name: '作业步骤',
                            type: 'pie',
                            label: {
                                show: false,
                            },
                            radius: [
                                '60px',
                                '80px',
                            ],
                            hoverOffset: 8,
                            avoidLabelOverlap: false,
                            data: [
                                {
                                    value: this.data.FILE_LOCAL,
                                    name: '本地文件源',
                                    itemStyle: {
                                        color: '#2E2E99',
                                    },
                                },
                                {
                                    value: this.data.FILE_SERVER,
                                    name: '服务器文件源',
                                    itemStyle: {
                                        color: '#3786AD',
                                    },
                                },
                                {
                                    value: this.data.SCRIPT_MANUAL,
                                    name: '手工录入',
                                    itemStyle: {
                                        color: '#74C2C2',
                                    },
                                },
                                {
                                    value: this.data.SCRIPT_REF,
                                    name: '脚本引用',
                                    itemStyle: {
                                        color: '#9AD69A',
                                    },
                                },
                                {
                                    value: this.data.CONFIRM,
                                    name: '人工确认',
                                    itemStyle: {
                                        color: '#D4E6C1',
                                    },
                                },
                            ],
                        },
                    ],
                };
                this.myChart.setOption(option);
                let maxValueItem = {
                    value: -1,
                };
                option.series.forEach((series) => {
                    series.data.forEach((item) => {
                        if (maxValueItem.value < item.value) {
                            maxValueItem = item;
                        }
                    });
                });
                this.myChart.dispatchAction({ type: 'highlight', name: maxValueItem.name });
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
            handleMouseover (label) {
                const others = _.filter(this.list, _ => _ !== label);
                this.myChart.dispatchAction({ type: 'highlight', name: label });
                this.myChart.dispatchAction({ type: 'downplay', name: others });
            },
        },
    };
</script>
<style lang='postcss' scoped>
    .template-step-card {
        width: 260px;

        .wraper {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .data-info {
            display: flex;
            flex-direction: column;
            font-size: 12px;
            line-height: 18px;
            color: #979ba5;
            white-space: nowrap;

            .row {
                display: flex;
                align-items: flex-start;
                margin-top: 6px;
            }

            .data-label {
                display: flex;
                align-items: center;
                padding-right: 14px;
                cursor: pointer;
            }

            .data-content {
                position: relative;
                padding-left: 14px;

                &::before {
                    position: absolute;
                    top: 9px;
                    left: -14px;
                    width: 14px;
                    height: 1px;
                    background: #f0f1f5;
                    content: "";
                }
            }

            .content-item {
                position: relative;
                display: flex;
                align-items: center;
                cursor: pointer;

                &:nth-child(n+2) {
                    margin-top: 4px;

                    &::after {
                        position: absolute;
                        top: -13px;
                        left: -14px;
                        width: 1px;
                        height: 22px;
                        background: #f0f1f5;
                        content: "";
                    }
                }

                &::before {
                    position: absolute;
                    top: 9px;
                    left: -14px;
                    width: 14px;
                    height: 1px;
                    background: #f0f1f5;
                    content: "";
                }
            }

            .local-file-dot,
            .server-file-dot,
            .local-script-dot,
            .refer-script-dot {
                width: 8px;
                height: 8px;
                margin-right: 6px;
                border-radius: 50%;
            }

            .local-file-dot {
                background: rgb(35 35 148 / 40%);
                border: 2px solid #232394;
            }

            .server-file-dot {
                background: rgb(55 134 173 / 40%);
                border: 2px solid #3786ad;
            }

            .local-script-dot {
                background: rgb(116 194 194 / 40%);
                border: 2px solid #74c2c2;
            }

            .refer-script-dot {
                background: rgb(154 214 154 / 40%);
                border: 2px solid #9ad69a;
            }
        }
    }
</style>
