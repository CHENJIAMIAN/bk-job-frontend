

<template>
    <jb-collapse-item name="node">
        <span class="panel-title">
            <span>{{ '已选择'}}</span>
            <span class="strong number">{{ data.length }}</span>
            <span>{{ '个节点'}}</span>
        </span>
        <action-extend v-if="editable">
            <div class="action-item" @click="handleRemoveAll">{{ '移除全部' }}</div>
        </action-extend>
        <template #content>
            <div class="server-panel-node-view" v-bkloading="{ isLoading }">
                <host-table
                    v-if="!isRequestError"
                    :max-height="410"
                    :list="list"
                    :append-nums="invalidList.length">
                    <tbody
                        v-if="invalidList.length > 0"
                        class="invalid-list"
                        slot="appendBefore">
                        <tr v-for="(row, index) in invalidList" :key="`invalid_${index}`">
                            <td class="table-cell">
                                <span class="invalid" v-bk-tooltips="'该节点在配置平台已被删除'">
                                    {{ '无效' }}
                                </span>
                                <span>{{ row.type }}#{{ row.id }}</span>
                            </td>
                            <td colspan="2">--</td>
                            <td v-if="editable" class="action-column">
                                <bk-button
                                    text
                                    @click="handleInvalidRemove(index)">
                                    {{ '移除' }}
                                </bk-button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody class="valid-list">
                        <tr
                            v-for="(row, index) in list"
                            :key="row.key"
                            :class="diff[row.key]">
                            <td
                                style="width: 40%; cursor: pointer;"
                                @click="handleViewHostList(row.key)">
                                <div class="cell-text">
                                    {{ wholePathMap[row.key] || row.name }}
                                </div>
                            </td>
                            <td style="width: 150px;">
                                <Icon
                                    v-if="row.isHostLoading"
                                    class="loading-status"
                                    svg
                                    type="sync-pending" />
                                <div
                                    v-else
                                    class="cell-text">
                                    <span>{{ '共' }}</span>
                                    <span class="number strong">{{ row.total }}</span>
                                    <span>{{ '台主机'}}</span>
                                </div>
                            </td>
                            <td @click="handleViewHostList(row.key)">
                                <statistics-text
                                    v-if="!row.isHostLoading"
                                    style="cursor: pointer;"
                                    :data="row" />
                            </td>
                            <td v-if="editable" class="action-column">
                                <bk-button
                                    text
                                    @click="handleRemoveOne(index)">
                                    {{ '移除' }}
                                </bk-button>
                            </td>
                        </tr>
                    </tbody>
                </host-table>
                <bk-exception
                    v-if="isRequestError"
                    type="500"
                    style="padding-bottom: 50px;">
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
    import AppService from '@service/app-manage';
       import JbCollapseItem from '@components/jb-collapse-item';
    import ActionExtend from '../components/action-extend';
    import HostTable from '../components/host-table';
    import StatisticsText from '../components/statistics-text';
    import {
        statisticsHost,
    } from '../components/utils';

    const genNodeKey = ({ objectId, instanceId }) => `#${objectId}#${instanceId}`;

    export default {
        name: 'ViewNode',
        components: {
            JbCollapseItem,
            ActionExtend,
            HostTable,
            StatisticsText,
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
            diff: {
                type: Object,
                default: () => ({}),
            },
        },
        data () {
            return {
                isLoading: false,
                isNodeListLoading: true,
                list: [{},{},{}],
                invalidList: [{},{},{}],
                wholePathMap: {},
                isRequestError: false,
            };
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
                    this.fetchNodeDetail();
                },
                immediate: true,
            },
        },
        created () {
            this.isInnerChange = false;
            // 缓存数据用查看节点的主机详情
            this.nodeMap = {};
        },
        methods: {
            /**
             * 获取节点的信息
             */
            fetchNodeDetail () {
                this.isLoading = true;
                this.isNodeListLoading = true;
                const wholeNodeMap = this.data.reduce((result, node) => {
                    result[`#${node.type}#${node.id}`] = node;
                    return result;
                }, {});
                
                AppService.fetchNodePath(this.data)
                    .then((data) => {
                        this.nodeMap = {};
                        const list = [];
                        data.forEach((pathStack) => {
                            // 无效节点对应的拓扑路径信息为 null
                            if (!pathStack) {
                                return;
                            }
                            const wholePath = pathStack.map(({ instanceName }) => instanceName).join(' / ');
                            const currentNode = _.last(pathStack);
                            const {
                                objectId: type,
                                instanceId: id,
                            } = currentNode;
                            const key = genNodeKey(currentNode);
                            // 删除有返回结果的节点缓存
                            delete wholeNodeMap[key];
                            list.push({
                                key,
                                id,
                                name: wholePath,
                                type,
                            });
                        });
                        // 没有查询到节点信息为无效节点
                        this.invalidList = Object.freeze(Object.values(wholeNodeMap));
                        // 有效节点列表
                        this.list = Object.freeze(list);
                        this.fetchHostOfNode();
                    })
                    .catch(() => {
                        this.isRequestError = true;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            /**
             * 获取节点的主机信息
             */
            fetchHostOfNode () {
                const nodeMap = this.list.reduce((result, item) => {
                    result[item.key] = Object.assign({}, item, {
                        isHostLoading: true,
                    });
                    return result;
                }, {});
                // 更新节点主机列表的loading状态
                this.list = Object.freeze(Object.values(nodeMap));
                AppService.fetchNodeInfo(this.list.map(({ id, type }) => ({
                    id,
                    type,
                })))
                    .then((data) => {
                        this.nodeMap = {};
                        data.forEach((item) => {
                            const {
                                nodeType: type,
                                id,
                                ipListStatus = [],
                            } = item;
                            const key = `#${type}#${id}`;

                            const statisticsResult = statisticsHost(ipListStatus);

                            nodeMap[key] = Object.assign({}, nodeMap[key], {
                                ...statisticsResult,
                                isHostLoading: false,
                            });

                            this.nodeMap[key] = Object.assign({}, nodeMap[key], {
                                ...statisticsResult,
                                host: Object.freeze(ipListStatus),
                            });
                        });
                        this.list = Object.freeze(Object.values(nodeMap));
                    })
                    .finally(() => {
                        this.isNodeListLoading = false;
                    });
            },
            /**
             * @desc 外部调用刷新节点的主机状态
             */
            refresh: _.debounce(function () {
                if (this.isNodeListLoading) {
                    return;
                }
                this.fetchHostOfNode();
            }, 300),
            /**
             * @desc 外部调用获取所有节点下的主机
             */
            getAllHost () {
                const stack = [];
                for (const nodeId in this.nodeMap) {
                    stack.push(...this.nodeMap[nodeId].host);
                }
                return stack;
            },
            /**
             * @desc 外部调用移除所有无效的分组
             */
            removeAllInvalidHost () {
                this.invalidList = [];
                this.triggerChange();
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
                this.fetchNodeDetail();
            },
            /**
             * @desc 移除无效节点
             * @param {Number} index 节点索引
             */
            handleInvalidRemove (index) {
                const invalidList = [
                    ...this.invalidList,
                ];
                invalidList.splice(index, 1);
                this.invalidList = Object.freeze(invalidList);
                this.triggerChange();
            },
            /**
             * @desc 移除所有节点
             */
            handleRemoveAll () {
                if (this.data.length < 1) {
                    this.messageSuccess('你还未选择节点');
                    return;
                }
                // 内部显示删除
                this.list = [];
                this.nodeMap = {};
                this.invalidList = [];
                this.triggerChange();
                this.messageSuccess('移除成功');
            },
            /**
             * @desc 移除节点
             * @param {Number} index 节点索引
             */
            handleRemoveOne (index) {
                // 内部显示删除
                const currentNode = this.list[index];
                const list = [...this.list];
                list.splice(index, 1);
                this.list = Object.freeze(list);
                delete this.nodeMap[currentNode.id];
                this.triggerChange();
                this.messageSuccess('移除成功');
            },
            /**
             * @desc 查看阶段的主机详情
             * @param {String} key 节点key
             */
            handleViewHostList (key) {
                if (this.isNodeListLoading) {
                    this.messageError('节点主机列表加载中');
                    return;
                }
                this.$emit('on-view', Object.freeze(this.nodeMap[key]));
            },
        },
    };
</script>
<style lang="postcss">
    .server-panel-node-view {
        .cell-text {
            display: block !important;
            height: 20px;
            text-align: left;
            white-space: nowrap !important;
            direction: rtl;
            -webkit-line-clamp: 1 !important;
        }
    }
</style>
