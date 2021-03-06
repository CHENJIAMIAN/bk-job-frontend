<template>
    <jb-collapse-item name="host">
        <span class="panel-title">
            <span>{{ '已选择'}}<span class="strong number">{{ data.length }}</span>{{ '台主机'}}</span>
            <span v-if="statisticsData.fail">（<span class="error number">{{ statisticsData.fail }}</span>{{ '台Agent异常' }}）</span>
        </span>
        <action-extend :list="list" copyable :invalid-list="invalidList">
            <template v-if="editable">
                <div class="action-item" @click="handleRemoveAll">{{ '移除全部' }}</div>
                <div class="action-item" @click="handleRemoveFail">{{ '移除异常' }}</div>
            </template>
        </action-extend>
        <template #content>
            <div v-bkloading="{ isLoading }">
                <host-table
                    v-if="!isRequestError"
                    :editable="editable"
                    :list="list"
                    :max-height="410"
                    :append-nums="invalidList.length"
                    :diff="diff"
                    @on-change="handleRemoveOne">
                    <tbody
                        v-if="invalidList.length > 0"
                        class="invalid-list"
                        slot="appendBefore">
                        <tr v-for="(row) in invalidList" :key="row.realId">
                            <td class="table-cell">
                                <span
                                    class="invalid"
                                    v-bk-tooltips="'指主机已不属于该业务，或已不存在'">
                                    {{ '无效' }}
                                </span>
                                <span>{{ row.ip }}</span>
                            </td>
                            <td>--</td>
                            <td>--</td>
                            <td>--</td>
                            <td>--</td>
                            <td v-if="editable" class="action-column">
                                <bk-button text @click="handleInvalidRemove(row)">{{ '移除' }}</bk-button>
                            </td>
                        </tr>
                    </tbody>
                </host-table>
                <bk-exception v-if="isRequestError" type="500" style="padding-bottom: 50px;">
                    <div style="display: flex; font-size: 14px;">
                        <span>数据拉取失败，请</span>
                        <bk-button text @click="handleRefresh">重试</bk-button>
                    </div>
                </bk-exception>
            </div>
        </template>
    </jb-collapse-item>
</template>
<script>
    import _ from 'lodash';
       import AppManageService from '@service/app-manage';
    import JbCollapseItem from '@components/jb-collapse-item';
    import ActionExtend from '../components/action-extend';
    import HostTable from '../components/host-table';
    import {
        sortHost,
        statisticsHost,
        generateHostRealId,
    } from '../components/utils';

    export default {
        name: 'ViewHost',
        components: {
            JbCollapseItem,
            ActionExtend,
            HostTable,
        },
        props: {
            data: {
                type: Array,
                required: true,
            },
            editable: {
                type: Boolean,
                default: false,
            },
            allPanel: {
                type: Boolean,
                default: false,
            },
            diff: {
                type: Object,
                default: () => ({}),
            },
        },
        data () {
            return {
                isLoading: false,
                isRequestError: false,
                list: [{},{},{}],
                invalidList: [{},{},{}], // 无效主机
            };
        },
        computed: {
            statisticsData () {
                return statisticsHost(this.list);
            },
        },
        watch: {
            data: {
                handler (data) {
                    if (this.isInnerChange) {
                        this.isInnerChange = false;
                        return;
                    }
                    if (data.length < 1) {
                        this.list = [];
                        return;
                    }
                    this.fetchHostOfHost();
                },
                immediate: true,
            },
        },
        created () {
            this.isInnerChange = false;
        },
        methods: {
            /**
             * @desc 通过ip和云区域获取主机信息
             */
            fetchHostOfHost () {
                this.isLoading = true;
                const ipList = [];
                const ipMap = {};

                // 处理初始值
                this.data.forEach((currentHost) => {
                    const realId = generateHostRealId(currentHost);
                    ipList.push(realId);
                    ipMap[realId] = Object.assign({ realId }, currentHost);
                });
                AppManageService.fetchHostOfHost({
                    ipList,
                })
                    .then((data) => {
                        const list = [];
                        this.invalidList = [];
                        // list用于收集有效的主机
                        data.forEach((currentHost) => {
                            const realId = generateHostRealId(currentHost);
                            if (ipMap[realId]) {
                                list.push(Object.assign({ realId }, currentHost));
                                delete ipMap[realId];
                            }
                        });
                        this.list = Object.freeze(sortHost(list));
                        // 剩余没被delete的主机是无效主机
                        this.invalidList = Object.freeze(Object.values(ipMap));
                        this.isRequestError = false;
                    })
                    .catch(() => {
                        this.isRequestError = true;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            /**
             * @desc 外部调用刷新主机状态
             */
            refresh: _.debounce(function () {
                this.fetchHostOfHost();
            }, 300),

            /**
             * @desc 外部调用获取所有主机
             */
            getAllHost () {
                return [
                    ...this.invalidList,
                    ...this.list,
                ];
            },

            /**
             * @desc 外部调用移除所有无效的主机
             */
            removeAllInvalidHost () {
                this.invalidList = [];
                this.triggerChange();
            },
            /**
             * @desc 外部调用获取所有无效的主机
             */
            getAllInvalidHost () {
                return this.invalidList;
            },

            triggerChange () {
                this.isInnerChange = true;
                this.$emit('on-change', [
                    ...this.invalidList,
                    ...this.list,
                ]);
            },
            /**
             * @desc 失败重试
             */
            handleRefresh () {
                this.fetchHostOfHost();
            },
            /**
             * @desc 移除无效主机
             * @prams host [Object] 移除主机
             */
            handleInvalidRemove (host) {
                const result = [];
                this.invalidList.forEach((currentHost) => {
                    if (host.realId !== currentHost.realId) {
                        result.push(currentHost);
                    }
                });
                this.invalidList = Object.freeze(result);
                this.triggerChange();
            },
            /**
             * @desc 移除所有主机
             */
            handleRemoveAll () {
                if (this.list.length < 1 && this.invalidList.length < 1) {
                    this.messageSuccess('没有可移除主机');
                    return;
                }
                this.invalidList = [];
                this.list = [];
                this.messageSuccess('移除全部主机成功');
                this.triggerChange();
            },
            /**
             * @desc 移除主机
             * @param {String} hostRealId 主机id
             */
            handleRemoveOne (hostRealId) {
                // 内部显示删除
                const result = [];
                this.list.forEach((currentHost) => {
                    if (currentHost.realId !== hostRealId) {
                        result.push(currentHost);
                    }
                });
                this.list = Object.freeze(result);
                this.triggerChange();
            },
            /**
             * @desc 移除异常主机
             */
            handleRemoveFail () {
                const effectiveIp = [];
                const failIp = [];
                this.list.forEach((currentHost) => {
                    if (currentHost.alive) {
                        effectiveIp.push(currentHost);
                    } else {
                        failIp.push(currentHost);
                    }
                });
                if (failIp.length < 1 && this.invalidList.length < 1) {
                    this.messageSuccess('没有可移除主机');
                    return;
                }
                this.invalidList = [];
                this.list = Object.freeze(effectiveIp);
                this.messageSuccess('移除异常主机成功');
                this.triggerChange();
            },
        },
    };
</script>
