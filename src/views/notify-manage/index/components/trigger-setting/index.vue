
<template>
    <jb-form class="notify-trigger-setting">
        <jb-form-item :label="'操作类型'">
            <bk-checkbox-group
                class="input"
                :value="localValue.resourceTypeList"
                @change="handleResourceTypeChange">
                <bk-checkbox
                    v-for="(item) in [{},{},{}]"
                    :key="item.code"
                    :value="item.code">
                    {{ item.name }}
                </bk-checkbox>
            </bk-checkbox-group>
        </jb-form-item>
        <jb-form-item :label="'通知对象'">
            <jb-user-selector
                class="input"
                :placeholder="'请输入'"
                :user="localValue.extraObserverList"
                :role="localValue.roleList"
                :filter-list="['JOB_EXTRA_OBSERVER']"
                @on-change="handleUserChange" />
        </jb-form-item>
        <jb-form-item :label="'通知方式'">
            <table class="notify-way-table input">
                <thead>
                    <th style="width: 95px;">{{ '状态' }}</th>
                    <th>{{ '通知方式' }}</th>
                </thead>
                <tbody>
                    <tr v-for="(executeStatus, index) in [{},{},{}]" :key="index">
                        <td>{{ executeStatus.name }}</td>
                        <td>
                            <render-notify-way
                                :channel-list="templateData.availableNotifyChannelList"
                                :value="[]"
                                @on-change="value => handleNotifyWayChange(executeStatus.code, value)" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </jb-form-item>
    </jb-form>
</template>
<script>
    import _ from 'lodash';
    import JbUserSelector from '@components/jb-user-selector';
    import RenderNotifyWay from './components/render-notify-way';

    export default {
        components: {
            JbUserSelector,
            RenderNotifyWay,
        },
        props: {
            type: {
                type: String,
                require: true,
            },
            data: {
                type: Object,
                default: () => ({}),
            },
            templateData: {
                type: Object,
                default: () => ({}),
            },
        },
        data () {
            return {
                localValue: _.cloneDeep(this.data),
            };
        },
        methods: {
            /**
             * @desc 外部调用——重置用户输入
             */
            reset () {
                this.localValue = _.cloneDeep(this.data);
            },
            /**
             * @desc 外部调用——获取用户输入
             * @returns {Object} 通知策略配置
             */
            getValue () {
                const {
                    resourceTypeList,
                    extraObserverList,
                    roleList,
                    resourceStatusChannelMap,
                } = this.localValue;
                return {
                    triggerType: this.type,
                    resourceTypeList,
                    roleList,
                    extraObserverList,
                    resourceStatusChannelList: Object.keys(resourceStatusChannelMap).reduce((result, executeStatus) => {
                        result.push({
                            executeStatus,
                            channelList: resourceStatusChannelMap[executeStatus],
                        });
                        return result;
                    }, []),
                };
            },
            /**
             * @desc 设置操作类型
             * @param { Array } resourceTypeList
             */
            handleResourceTypeChange (resourceTypeList) {
                this.localValue.resourceTypeList = resourceTypeList;
            },
            /**
             * @desc 设置通知对象
             * @param { Array } usextraObserverLister 额外通知人
             * @param { Array } role 通知角色
             */
            handleUserChange (extraObserverList, roleList) {
                if (extraObserverList.length > 0) {
                    roleList.push('JOB_EXTRA_OBSERVER');
                }
                this.localValue.extraObserverList = extraObserverList;
                this.localValue.roleList = roleList;
            },
            /**
             * @desc 设置通知方式
             * @param { String } executeStatus 执行状态
             * @param { Array } channelList 通知渠道
             */
            handleNotifyWayChange (executeStatus, channelList) {
                this.localValue.resourceStatusChannelMap[executeStatus] = channelList;
            },
        },
    };
</script>
<style lang="postcss">
    .notify-trigger-setting {
        .bk-form-checkbox ~ .bk-form-checkbox {
            margin-left: 25px;
        }

        .input {
            width: 716px;
        }

        .notify-way-table {
            background: #fff;
            border: 1px solid #dcdee5;

            th,
            td {
                height: 42px;
                padding-left: 16px;
                font-size: 12px;
                text-align: left;
                border-left: 1px solid #dcdee5;
            }

            th {
                font-weight: normal;
                color: #313238;
                background: #fafbfd;
            }

            td {
                color: #63656e;
                border-top: 1px solid #dcdee5;
            }
        }
    }
</style>
