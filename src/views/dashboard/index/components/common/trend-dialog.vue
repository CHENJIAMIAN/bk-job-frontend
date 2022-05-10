<template>
    <lower-component level="custom" :custom="value">
        <jb-dialog
            v-bind="$attrs"
            :value="value"
            class="data-trend-dialog"
            :width="1000"
            :show-footer="false"
            mask-close
            @input="handleInput">
            <div v-bkloading="{ isLoading }">
                <div class="trend-daterang-picker">
                    <bk-date-picker
                        ref="datePicker"
                        :placeholder="'选择日期'"
                        :shortcuts="shortcuts"
                        :value="defaultDateRang"
                        type="daterange"
                        :shortcut-close="true"
                        :use-shortcut-text="true"
                        :clearable="false"
                        :options="datePickerOptions"
                        placement="bottom-end"
                        @change="handleDateChange" />
                </div>
                <div ref="trend" style="width: 100%; height: 384px;" />
            </div>
        </jb-dialog>
    </lower-component>
</template>
<script>
    import echarts from 'lib/echarts.min.js';
    import _ from 'lodash';
       import StatisticsService from '@service/statistics';
    import {
        formatNumber,
        prettyDateFormat,
    } from '@utils/assist';

    const styleMap = {
        up: {
            itemStyle: {
                color: '#4BC7AD',
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(75, 199, 173, 0.32)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(75, 199, 173, 0)',
                    },
                ]),
            },
        },
        down: {
            itemStyle: {
                color: '#FF5656',
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(255, 86, 86, 0.28)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(255, 86, 86, 0)',
                    },
                ]),
            },
        },
    };

    export default {
        name: '',
        inheritAttrs: false,
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            metric: {
                type: String,
                required: true,
            },
            date: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
        },
        data () {
            return {
                isLoading: true,
            };
        },
        watch: {
            date: {
                handler (date) {
                    this.endDate = date;
                    this.startDate = prettyDateFormat(new Date(date) - 6 * 86400000);
                    this.defaultDateRang = [
                        this.startDate,
                        this.endDate,
                    ];
                    this.shortcuts = [
                        {
                            text: '今天',
                            value () {
                                const start = new Date(date);
                                return [
                                    start,
                                    start,
                                ];
                            },
                        },
                        {
                            text: '昨天',
                            value () {
                                const end = new Date(date);
                                const start = new Date();
                                start.setTime(end - 86400000);
                                return [
                                    start,
                                    end,
                                ];
                            },
                        },
                        {
                            text: '最近3天',
                            value () {
                                const end = new Date(date);
                                const start = new Date();
                                start.setTime(end - 2 * 86400000);
                                return [
                                    start,
                                    end,
                                ];
                            },
                        },
                        {
                            text: '最近7天',
                            value () {
                                const end = new Date(date);
                                const start = new Date();
                                start.setTime(end - 6 * 86400000);
                                return [
                                    start,
                                    end,
                                ];
                            },
                        },
                        {
                            text: '最近30天',
                            value () {
                                const end = new Date(date);
                                const start = new Date();
                                start.setTime(end - 30 * 86400000);
                                return [
                                    start,
                                    end,
                                ];
                            },
                        },
                    ];
                },
                immediate: true,
            },
            value (value) {
                if (value) {
                    this.fetchData();
                }
            },
        },
        created () {
            this.datePickerOptions = {
                disabledDate: date => date.getTime() > Date.now(),
            };
        },
        methods: {
            fetchData () {
                this.isLoading = true;
                StatisticsService.fetchTrendsMetrics({
                    endDate: this.endDate,
                    startDate: this.startDate,
                    metric: this.metric,
                }).then((data) => {
                    this.initTrend(data || []);
                })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            initTrend (data) {
                if (!this.myChart) {
                    this.myChart = echarts.init(this.$refs.trend);
                }
                const dateList = [];
                const valueList = [];
                data.forEach(({ date, value }) => {
                    dateList.push(date);
                    valueList.push(value);
                });

                const styles = _.head(valueList) <= _.last(valueList) ? 'up' : 'down';
                this.myChart.clear();

                const options = {
                    grid: {
                        top: 20,
                        right: 72,
                        bottom: 110,
                        left: 120,
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line',
                            lineStyle: {
                                width: 30,
                                color: '#63656E',
                                opacity: 0.16,
                            },
                        },
                        backgroundColor: 'rgba(0,0,0,0.8)',
                    },
                    xAxis: {
                        type: 'category',
                        name: '',
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: '#DCDEE5',
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            color: '#979BA5',
                            margin: 2,
                            rotate: 45,
                        },
                        boundaryGap: false,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#DCDEE5',
                            },
                        },
                        data: dateList,
                    },
                    yAxis: {
                        type: 'value',
                        min: 'dataMin',
                        name: this.name,
                        nameLocation: 'middle',
                        nameTextStyle: {
                            color: '#63656E',
                        },
                        nameGap: 50,
                        axisLine: {
                            onZero: true,
                            color: '#F0F1F5',
                            lineStyle: {
                                color: '#F0F1F5',
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            color: '#C4C6CC',
                            formatter: value => formatNumber(value, true),
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#DCDEE5',
                            },
                        },
                    },
                    series: [
                        {
                            name: this.name,
                            type: 'line',
                            sampling: 'average',
                            ...styleMap[styles],
                            data: valueList,
                        },
                    ],
                };
                if (valueList.length > 28) {
                    const rate = 27 / valueList.length * 100;
                    const start = Math.floor((100 - rate) / 2);
                    options.dataZoom = [
                        {
                            show: true,
                            realtime: true,
                            start,
                            end: start + rate,
                        },
                    ];
                }
                this.myChart.setOption(options);
            },
            handleDateChange (value) {
                const [
                    startDate,
                    endDate,
                ] = value;
                this.startDate = startDate;
                this.endDate = endDate;
                this.fetchData();
            },
            handleInput (value) {
                this.$emit('input', value);
                this.$emit('change', value);
            },
        },
    };
</script>
<style lang='postcss'>
    .data-trend-dialog {
        .trend-daterang-picker {
            display: flex;
            justify-content: flex-end;
            padding-right: 72px;
            margin-top: -28px;
        }

        .bk-dialog-wrapper .bk-dialog-body {
            padding: 0;
        }
    }
</style>
