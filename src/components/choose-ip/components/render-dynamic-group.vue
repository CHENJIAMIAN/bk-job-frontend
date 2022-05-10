<template>
    <div class="choose-ip-dynamic-group" v-bkloading="{ isLoading }">
        <div class="group-search">
            <bk-input
                :placeholder="'搜索分组名称'"
                right-icon="bk-icon icon-search"
                @input="handleGroupSearch" />
        </div>
        <template v-if="!isLoading">
            <div v-if="hasNotGroup" class="group-empty">
                {{ '无数据' }}，<a :href="CMDBCreateGroupUrl" target="_blank">{{ '去创建' }}</a>
            </div>
            <div v-else class="group-list">
                <host-table :list="renderList">
                    <thead>
                        <tr>
                            <th style="width: 80px;">
                                <div class="head-cell">
                                    <bk-checkbox
                                        v-bind="pageCheckInfo"
                                        @click.native="handleToggleWholeAll" />
                                </div>
                            </th>
                            <th style="width: 450px;">{{ '分组名称' }}</th>
                            <th>{{ '操作' }}</th>
                        </tr>
                    </thead>
                    <tbody v-if="renderList.length > 0">
                        <template v-for="group in renderList">
                            <tr class="group-row" :key="group.id">
                                <td @click="handleGroupCheck(group.id)">
                                    <bk-checkbox :checked="checkedMap[group.id]" />
                                </td>
                                <td @click="handleGroupCheck(group.id)">{{ group.name }}</td>
                                <td>
                                    <bk-button text @click="handlePreview(group)">{{ '预览' }}</bk-button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </host-table>
                <div v-if="pagination.pageSize > 0" style="padding: 16px 0;">
                    <bk-pagination
                        :count="pagination.total"
                        align="right"
                        show-total-count
                        :show-limit="false"
                        :limit="pagination.pageSize"
                        :current.sync="pagination.page"
                        :limit-list="[pagination.pageSize]"
                        @change="handlePageChange"
                        small />
                </div>
            </div>
        </template>
    </div>
</template>
<script>
    import _ from 'lodash';
    import AppService from '@service/app-manage';
    import QueryGlobalSettingService from '@service/query-global-setting';
    import {
        encodeRegexp,
    } from '@utils/assist';
    import HostTable from './host-table';
    
    export default {
        name: '',
        components: {
            HostTable,
        },
        inheritAttrs: false,
        props: {
            dynamicGroupList: {
                type: Array,
                required: true,
            },
            dialogHeight: {
                type: Number,
                required: true,
            },
        },
        data () {
            this.selfChange = false;
            return {
                isLoading: false,
                isEmpty: false,
                hasNotGroup: true,
                list: [{},{},{}],
                tempList: [{},{},{}],
                checkedMap: {},
                CMDBCreateGroupUrl: '',
                pagination: {
                    page: 1,
                    pageSize: 0,
                    total: 0,
                },
            };
        },
        computed: {
            renderList  () {
                const { page, pageSize } = this.pagination;
                return Object.freeze(this.tempList.slice((page - 1) * pageSize, page * pageSize));
            },
            pageCheckInfo () {
                const info = {
                    indeterminate: false,
                    checked: false,
                };
                const checkedNums = Object.keys(this.checkedMap).length;
                info.indeterminate = checkedNums > 0;
                info.checked = checkedNums > 0 && checkedNums >= this.pagination.total;
                return info;
            },
        },
        watch: {
            dynamicGroupList: {
                handler (dynamicGroupList) {
                    if (this.selfChange) {
                        this.selfChange = false;
                        return;
                    }
                    const checkedMap = {};
                    dynamicGroupList.forEach((groupId) => {
                        checkedMap[groupId] = true;
                    });
                    this.pagination.page = 1;
                    this.checkedMap = Object.freeze(checkedMap);
                },
                immediate: true,
            },
        },
        mounted () {
            this.calcPageSize();
            this.fetchDynamicGroup();
        },
        methods: {
            /**
             * @desc 获取动态分组列表
             *
             * 动态分组列表为空可以跳转 cmdb 创建
             */
            fetchDynamicGroup () {
                this.isLoading = true;
                AppService.fetchDynamicGroup()
                    .then((data) => {
                        this.list = Object.freeze(data);
                        this.tempList = Object.freeze(data);
                        this.pagination.total = data.length;
                        this.hasNotGroup = data.length < 1;
                        if (this.hasNotGroup) {
                            return this.fetchCMDBUrl();
                        }
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            /**
             * @desc 没有动态分组时可以去 cmdb 创建
             */
            fetchCMDBUrl () {
                return QueryGlobalSettingService.fetchRelatedSystemUrls()
                    .then((data) => {
                        this.CMDBCreateGroupUrl = `${data.BK_CMDB_ROOT_URL}/#/business/${window.PROJECT_CONFIG.SCOPE_ID}/custom-query`;
                    });
            },
            /**
             * @desc 计算PageSize
             */
            calcPageSize () {
                const topOffset = 154;
                const bottomOffset = 116;
                const pageSize = Math.floor((this.dialogHeight - topOffset - bottomOffset) / 40);
                this.pagination.pageSize = pageSize;
            },
            /**
             * @desc 动态分组值更新
             */
            trigger () {
                this.selfChange = true;
                this.$emit('on-change', 'dynamicGroupList', Object.keys(this.checkedMap));
            },
            /**
             * @desc 本地搜索动态分组
             * @param {String} value 搜索值
             */
            handleGroupSearch: _.debounce(function (value) {
                if (!value.trim()) {
                    this.tempList = this.list;
                } else {
                    const group = [];
                    const searchRule = new RegExp(encodeRegexp(value), 'i');
                    this.list.forEach((currentGroup) => {
                        if (searchRule.test(currentGroup.name)) {
                            group.push(currentGroup);
                        }
                    });
                    this.tempList = Object.freeze(group);
                }
                
                this.pagination.total = this.tempList.length;
            }, 300),
            /**
             * @desc 列表跨页全选切换
             */
            handleToggleWholeAll () {
                const checkedMap = {
                    ...this.checkedMap,
                };
                const hasAllChecked = this.pageCheckInfo.checked;
                this.tempList.forEach((current) => {
                    if (!hasAllChecked) {
                        checkedMap[current.id] = true;
                    } else {
                        delete checkedMap[current.id];
                    }
                });
                this.checkedMap = Object.freeze(checkedMap);
                this.trigger();
            },
            /**
             * @desc 选中单个分组
             * @param {Number} groupId
             */
            handleGroupCheck (groupId) {
                const checkedMap = {
                    ...this.checkedMap,
                };
                if (checkedMap[groupId]) {
                    delete checkedMap[groupId];
                } else {
                    checkedMap[groupId] = true;
                }
                this.checkedMap = Object.freeze(checkedMap);
                this.trigger();
            },
            /**
             * @desc 预览单个分组的主机详情
             * @param {Object} group
             */
            handlePreview (group) {
                this.$emit('on-group-preview', {
                    name: group.name,
                    id: group.id,
                });
            },
            /**
             * @desc 列表翻页
             * @param {Number} page
             */
            handlePageChange (page) {
                this.pagination.page = page;
            },
        },
    };
</script>
<style lang="postcss">
    .choose-ip-dynamic-group {
        min-height: 100%;
        padding: 20px 24px;

        .group-empty {
            margin-top: 180px;
            text-align: center;
        }

        .group-list {
            padding-top: 20px;

            table {
                th,
                td {
                    &:first-child {
                        padding-left: 15px;
                    }
                }
            }
        }

        .check-flag {
            font-size: 20px;
            color: #63656e;
        }

        .group-row {
            cursor: pointer;
        }
    }
</style>
