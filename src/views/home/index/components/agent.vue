<template>
    <div class="agent-box" v-bkloading="{ isLoading }">
        <div class="agent-statistics">
            <div ref="agentStatistics" style="width: 126px; height: 126px;" />
        </div>
        <div class="agent-statistics-detail">
            <div class="detail-item normal"
                @mouseover="handlePieScale('正常')"
                @click="handleShowAgentDetail('normal', agentInfo.normalNum)">
                <span>{{ '正常' }}</span>
                <span class="detail-value">{{ agentInfo.normalNum }}</span>
            </div>
            <div class="detail-item fail"
                @mouseover="handlePieScale('异常')"
                @click="handleShowAgentDetail('fail', agentInfo.normalNum)">
                <span>{{ '异常' }}</span>
                <span class="detail-value">{{ agentInfo.abnormalNum }}</span>
            </div>
        </div>
        <sideslider-box :value="isShow" @change="handleClose">
            <div slot="title">{{ listTitle }}</div>
            <div slot="desc">
                <action-extend>
                    <div class="action-item" @click="handleCopyAll">{{ '复制全部' }}</div>
                </action-extend>
            </div>
            <host-list :status-type="statusType" />
        </sideslider-box>
    </div>
</template>
<script>
       import echarts from 'lib/echarts.min.js';
    import HomeService from '@service/home';
    import SidesliderBox from '@components/choose-ip/components/sideslider-box';
    import ActionExtend from '@components/choose-ip/components/action-extend';
    import HostList from './host-list';
    import {
        execCopy,
    } from '@utils/assist';

    export default {
        name: '',
        components: {
            SidesliderBox,
            ActionExtend,
            HostList,
        },
        data () {
            return {
                isLoading: false,
                isShow: false,
                statusType: '',
                allHostList: [{},{},{}],
                agentInfo: {},
            };
        },
        computed: {
            listTitle () {
                const statusListMap = {
                    normal: 'Agent 正常的机器列表：',
                    fail: 'Agent 异常的机器列表：',
                };
                return statusListMap[this.statusType];
            },
            defaultHighlight () {
                return (this.agentInfo.abnormalNum || !this.agentInfo.normalNum)
                    ? '异常'
                    : '正常';
            },
        },
        created () {
            this.fetchStatisticsAgent();
        },
        methods: {
            fetchStatisticsAgent () {
                this.$request(HomeService.fetchStatisticsAgent(), () => {
                    this.isLoading = true;
                }).then((data) => {
                    this.agentInfo = data;
                    this.initAgentStatistics();
                })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            handleShowAgentDetail (status, count) {
                if (!count) {
                    return;
                }
                this.isShow = true;
                this.statusType = status;
                this.fetchAllAgentStatus();
            },
            handleClose () {
                this.isShow = false;
            },
            handleCopyAll () {
                const allIP = this.allHostList.map(_ => _.split(':').pop());
                execCopy(allIP.join('\n'), `${'复制成功'}（${allIP.length}${'个IP'}）`);
            },
            fetchAllAgentStatus () {
                const agentStatus = this.statusType === 'fail' ? 0 : 1;
                HomeService.fetchAllAgentStatus({
                    agentStatus,
                }).then((data) => {
                    this.allHostList = data.data;
                });
            },
            handlePieScale (curName) {
                const statusMap = [
                    '正常',
                    '异常',
                ];
                const selectItem = [
                    curName,
                ];
                const unSelectItems = statusMap.filter(item => item !== selectItem[0]);
                this.myChart.dispatchAction({ type: 'highlight', name: selectItem });
                this.myChart.dispatchAction({ type: 'downplay', name: unSelectItems });
            },
            initAgentStatistics () {
                this.myChart = echarts.init(this.$refs.agentStatistics);
                const option = {
                    series: [
                        {
                            type: 'pie',
                            radius: [
                                '43',
                                '53',
                            ],
                            selectedMode: 'single',
                            hoverOffset: 5,
                            selectedOffset: 0,
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center',
                                },
                                emphasis: {
                                    show: true,
                                    label: {
                                        fontSize: '12',
                                        fontWeight: 'bold',
                                    },
                                    formatter: [
                                        '{value|{d}%}',
                                        '{b}',
                                    ].join('\n'),

                                    rich: {
                                        name: {
                                            fontSize: 12,
                                            lineHieght: 16,
                                        },
                                        value: {
                                            fontSize: 20,
                                            fontWeight: 600,
                                            lineHeight: 26,
                                            color: '#000',
                                        },
                                    },
                                },
                            },
                            labelLine: {
                                normal: {
                                    show: false,
                                },
                            },
                            data: [
                                {
                                    value: this.agentInfo.normalNum,
                                    key: 'normal',
                                    name: '正常',
                                    itemStyle: {
                                        color: '#2DCB9D',
                                    },
                                    emphasis: {
                                        label: {
                                            show: true,
                                        },
                                    },
                                },
                                {
                                    value: this.agentInfo.abnormalNum,
                                    key: 'fail',
                                    name: '异常',
                                    itemStyle: {
                                        color: '#FF565C',
                                    },
                                },
                            ],
                        },
                    ],
                };
                this.myChart.setOption(option);
                this.myChart.on('click', (params) => {
                    this.handleShowAgentDetail(params.data.key, params.data.value);
                });
                this.myChart.on('mouseover', (params) => {
                    this.handlePieScale(params.data.name);
                });
                this.myChart.dispatchAction({
                    type: 'highlight',
                    name: this.defaultHighlight,
                });
            },
        },
    };
</script>
<style lang='postcss' scoped>
    .agent-box {
        display: flex;
        justify-content: center;

        .agent-statistics {
            margin-top: -10px;
        }

        .agent-statistics-detail {
            width: 102px;
            margin-left: 7.4%;
            font-size: 12px;
            line-height: 30px;
        }

        .detail-item {
            display: flex;
            align-items: center;
            color: #63656e;
            cursor: pointer;

            &::before {
                display: block;
                width: 12px;
                height: 3px;
                margin-right: 8px;
                content: "";
            }

            &.normal {
                &::before {
                    background: #2dcb9d;
                }
            }

            &.fail {
                &::before {
                    background: #ff565c;
                }
            }

            &.uninstalled {
                &::before {
                    background: #dcdee5;
                }
            }

            .detail-value {
                margin-left: auto;
                font-weight: bold;
            }
        }
    }
</style>
