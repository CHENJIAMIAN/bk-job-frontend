

<template>
    <div class="server-search-panel">
        <div class="search-header">
            <span>
                <span>{{ '已筛选出' }}<span class="strong number">{{ list.length }}</span>{{ '个IP' }}</span>
                <span v-if="statisticsData.fail">（<span class="error">{{ statisticsData.fail }}</span>{{ '台Agent异常' }}）</span>
            </span>
            <action-extend :list="list" copyable>
                <template v-if="editable">
                    <div class="action-item" @click="handleRemoveAll">{{ '移除全部' }}</div>
                    <div class="action-item" @click="handleRemoveFail">{{ '移除异常' }}</div>
                </template>
            </action-extend>
        </div>
        <host-table :list="list" editable is-search @on-change="handleRemoveOne" />
    </div>
</template>
<script>
       import HostTable from '../components/host-table';
    import ActionExtend from '../components/action-extend';
    import {
        sortHost,
        statisticsHost,
    } from '../components/utils';
    
    export default {
        name: '',
        components: {
            HostTable,
            ActionExtend,
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
        },
        data () {
            return {
                list: [{},{},{}],
                statisticsData: {},
            };
        },
        computed: {
            classes () {
                return {
                    scroll: this.data.length > 10,
                };
            },
        },
        watch: {
            data: {
                handler (host) {
                    if (this.isInnerChange) {
                        this.isInnerChange = false;
                        return;
                    }
                    this.page = 1;
                    this.list = Object.freeze(sortHost(host));
                    this.statisticsData = statisticsHost(host);
                },
                immediate: true,
            },
        },

        methods: {
            /**
             * @desc 删除所有筛选得到的主机
             */
            handleRemoveAll () {
                if (this.list.length < 1) {
                    this.messageSuccess('没有可移除主机');
                    return;
                }
                const allList = this.list;
                this.list = [];
                this.isInnerChange = true;
                this.$emit('on-change', allList);
                this.messageSuccess('移除全部主机成功');
            },
            /**
             * @desc 删除筛选结果中的异常主机
             *
             * 抛出change事件通知那些主机被删除
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
                if (effectiveIp.length === this.list.length) {
                    this.messageSuccess('没有可移除主机');
                    return;
                }
                this.list = Object.freeze(effectiveIp);
                this.isInnerChange = true;
                this.$emit('on-change', failIp);
                this.messageSuccess('移除异常主机成功');
            },
            /**
             * @desc 删除单个主机
             * @param {Number} hostRealId 主机的唯一标识
             *
             * 抛出change事件通知那些主机被删除
             */
            handleRemoveOne (hostRealId) {
                // 内部显示删除
                const newList = [];
                let removeHost = null;
                this.list.forEach((currentHost) => {
                    if (currentHost.realId !== hostRealId) {
                        newList.push(currentHost);
                    } else {
                        removeHost = currentHost;
                    }
                });
                this.list = Object.freeze(newList);
                if (!removeHost) {
                    return;
                }
                
                this.isInnerChange = true;
                this.$emit('on-change', [
                    removeHost,
                ]);
            },
        },
    };
</script>
<style lang='postcss'>
    .server-search-panel {
        color: #63656e;
        border: 1px solid #dcdee5;

        .search-header {
            position: relative;
            height: 41px;
            padding-left: 60px;
            font-size: 12px;
            font-weight: bold;
            line-height: 41px;
            color: #63656e;
            background: #fafbfd;
            border-bottom: 1px solid #dcdee5;
        }

        .list-more {
            border-top: 1px solid #dcdee5;
        }

        .search-empty {
            height: 240px;
        }
    }
</style>
