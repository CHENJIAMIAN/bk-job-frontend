<template>
    <jb-collapse-item name="group">
        <!-- eslint-disable-next-line max-len -->
        <span class="panel-title">
            <span>{{ '已选择'}}</span>
            <span class="strong number">{{ data.length }}</span>
            <span>{{ '个动态分组' }}</span>
        </span>
        <action-extend v-if="editable">
            <div class="action-item" @click="handleRemoveAll">{{ '移除全部' }}</div>
        </action-extend>
        <template #content>
            <div v-bkloading="{ isLoading }">
                <host-table
                    v-if="!isRequestError"
                    :max-height="410"
                    :list="list"
                    :append-nums="invalidList.length">
                    <tbody
                        v-if="invalidList.length > 0"
                        class="invalid-list"
                        slot="appendBefore">
                        <tr
                            v-for="(row, index) in invalidList"
                            :key="`invalid_${index}`">
                            <td class="table-cell">
                                <span
                                    class="invalid"
                                    :tippy-tips="'该分组在配置平台已被删除'">{{ '无效' }}</span>
                                <span>{{ row }}</span>
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
                            :key="index"
                            :class="diff[row.id]">
                            <td style="width: 40%; cursor: pointer;" @click="handleView(row.id)">
                                {{ row.name }}
                            </td>
                            <td style="width: 150px;">
                                <div class="cell-text">共<span class="number strong">{{ row.total }}</span>台主机</div>
                            </td>
                            <td @click="handleView(row.id)">
                                <statistics-text style="cursor: pointer;" :data="row" />
                            </td>
                            <td v-if="editable" class="action-column">
                                <bk-button
                                    text
                                    @click="handleRemove(index)">
                                    {{ '移除' }}
                                </bk-button>
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
    import AppService from '@service/app-manage';
       import JbCollapseItem from '@components/jb-collapse-item';
    import ActionExtend from '../components/action-extend';
    import HostTable from '../components/host-table';
    import StatisticsText from '../components/statistics-text';
    import {
        statisticsHost,
    } from '../components/utils';

    export default {
        name: 'ViewGroup',
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
                list: [{},{},{}],
                invalidList: [{},{},{}],
                isLoading: false,
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
                    this.fetchDynamicGroup();
                },
                immediate: true,
            },
        },
        created () {
            this.isInnerChange = false;
            // 缓存数据用查看分组的主机详情
            this.groupMap = {};
        },
        methods: {
            /**
             * @desc 获取分组的主机信息
             */
            fetchDynamicGroup () {
                this.isLoading = true;
                const allGroupMap = this.data.reduce((result, groupId) => {
                    result[groupId] = groupId;
                    return result;
                }, {});
                
                AppService.fetchHostOfDynamicGroup({
                    id: this.data.join(','),
                }).then((data) => {
                    const list = [];
                    this.groupMap = {};
                    data.forEach((item) => {
                        const { id, name, ipListStatus } = item;
                        const statisticsResult = statisticsHost(ipListStatus);

                        delete allGroupMap[id];

                        list.push({
                            id,
                            name,
                            ...statisticsResult,
                        });
                        this.groupMap[id] = {
                            id,
                            name,
                            ...statisticsResult,
                            host: Object.freeze(ipListStatus),
                        };
                    });
                    this.list = Object.freeze(list);
                    // 还存在allNodeMap中的节点是无效节点
                    this.invalidList = Object.freeze(Object.values(allGroupMap));
                })
                    .catch(() => {
                        this.isRequestError = true;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            /**
             * @desc 外部调用刷新分组的主机状态
             *
             */
            refresh: _.debounce(function () {
                this.fetchDynamicGroup();
            }, 300),
            /**
             * @desc 外部调用获取所有分组下的主机
             *
             */
            getAllHost () {
                const stack = [];
                for (const groupId in this.groupMap) {
                    stack.push(...this.groupMap[groupId].host);
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
                // 所有分组id
                const groupIdList = [...this.invalidList];
                this.list.forEach((group) => {
                    groupIdList.push(group.id);
                });
                this.$emit('on-change', groupIdList);
            },
            /**
             * @desc 失败重试
             */
            handleRefresh () {
                this.fetchDynamicGroup();
            },
            /**
             * @desc 移除无效分组
             * @param {Number} index 分组的索引
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
             * @desc 移除所有分组
             *
             */
            handleRemoveAll () {
                if (this.data.length < 1) {
                    this.messageSuccess('你还未选择动态分组');
                    return;
                }
                this.list = [];
                this.groupMap = {};
                this.invalidList = [];
                this.triggerChange();
                this.messageSuccess('移除成功');
            },
            /**
             * @desc 移除分组
             * @param {Number} index 分组的索引
             */
            handleRemove (index) {
                const currentNode = this.list[index];
                const list = [...this.list];
                list.splice(index, 1);
                this.list = Object.freeze(list);
                delete this.groupMap[currentNode.id];
                this.triggerChange();
                this.messageSuccess('移除成功');
            },
            /**
             * @desc 查看分组的主机详情
             * @param {String} id 分组的id
             */
            handleView (id) {
                this.$emit('on-view', Object.freeze(this.groupMap[id]));
            },
        },
    };
</script>
