
<template>
    <div
        ref="target"
        class="step-execution-history-select">
        <span>{{ retryCountText }}</span>
        <Icon type="down-small" style="font-size: 16px;" />
        <div ref="content" class="dropdown-menu">
            <div
                v-for="item in executionList"
                :key="item.createTime"
                class="menu-item"
                :class="{
                    active: item.retryCount === retryCount,
                }"
                @click="handleSelectRetryCount(item.retryCount)">
                <div class="retry-count">{{ item.text }}</div>
                <div class="time">{{ item.createTime }}</div>
            </div>
        </div>
    </div>
</template>
<script>
    import _ from 'lodash';
    import TaskExecuteService from '@service/task-execute';

    const ordinalSuffixOf = (i) => {
        const j = i % 10;
        const k = i % 100;
        if (j === 1 && k !== 11) {
            return `${i} st`;
        }
        if (j === 2 && k !== 12) {
            return `${i} nd`;
        }
        if (j === 3 && k !== 13) {
            return `${i} rd`;
        }
        return `${i} th`;
    };

    export default {
        name: '',
        props: {
            stepInstanceId: {
                type: Number,
                required: true,
            },
            retryCount: {
                type: [Number, String],
                default: 0,
            },
        },
        data () {
            return {
                isNeedRender: false,
                executionList: [{}, {}, {}],
            };
        },
        computed: {
            retryCountText () {
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < this.executionList.length; i++) {
                    if (this.executionList[i].retryCount === this.retryCount) {
                        return this.executionList[i].text;
                    }
                }
                return 'LATEST';
            },
        },
        watch: {
            stepInstanceId: {
                handler (stepInstanceId) {
                    this.popperDestroy();
                    if (!stepInstanceId) {
                        return;
                    }
                    this.fetchStepExecutionHistory();
                },
                immediate: true,
            },
        },
        created () {
            this.fetchStepExecutionHistory();
        },
        beforeDestroy () {
            this.popperDestroy();
        },
        methods: {
            /**
             * @desc 组件外部调用api，刷新数据
             */
            reLoading () {
                this.fetchStepExecutionHistory();
            },
            /**
             * @desc 获取步骤执行历史
             *
             * retryCount的最大值显示为LATEST
             * 如果重试次数大于0，显示retryCount切换列表
             */
            fetchStepExecutionHistory () {
                // TaskExecuteService.fetchStepExecutionHistory({
                //     stepInstanceId: this.stepInstanceId,
                // }).then((data) => {
                const data = [{
                    retryCount: 5,
                    createTime: '2018-01-01 12:00:00',
                }];
                const max = _.max(data.map(_ => _.retryCount));
                const result = data.map((item) => {
                    const {
                        retryCount,
                        createTime,
                    } = item;

                    const realIndex = retryCount + 1;
                    return {
                        retryCount,
                        createTime,
                        text: retryCount !== max ? ordinalSuffixOf(realIndex) : 'LATEST',
                    };
                });
                this.executionList = Object.freeze(result);
                // 重试次数大于1才需要显示
                this.isNeedRender = this.executionList.length > 1;
                if (this.isNeedRender) {
                    this.$nextTick(() => {
                        if (!this.popperInstance) {
                            this.popperInstance = this.$bkPopover(this.$el, {
                                theme: 'light step-execution-history-menu',
                                arrow: false,
                                interactive: true,
                                placement: 'bottom-start',
                                content: this.$refs.content,
                                animation: 'slide-toggle',
                                trigger: 'click',
                                width: '240px',
                            });
                        }
                    });
                } else {
                    this.popperDestroy();
                }
                // });
            },
            /**
             * @desc 销毁popover实例
             */
            popperDestroy () {
                if (this.popperInstance) {
                    this.popperInstance.destroy();
                    this.popperInstance = null;
                }
            },
            /**
             * @desc 切换重试次数
             * @param retryCount [Number] 重试记录
             *
             * 切换成功后需要将retryCount的最新值更新到url上
             */
            handleSelectRetryCount (retryCount) {
                debugger;
                this.selectRetryCount = retryCount;
                this.popperInstance && this.popperInstance.hide();
                this.$emit('on-change', retryCount);
                const searchParams = new URLSearchParams(window.location.search);
                searchParams.set('retryCount', retryCount);
                window.history.replaceState({}, '', `?${searchParams.toString()}`);
            },
        },
    };
</script>
<style lang='postcss'>
    .step-execution-history-select {
        position: relative;
        display: flex;
        height: 20px;
        padding-right: 2px;
        padding-left: 10px;
        margin-left: 8px;
        color: #63656e;
        cursor: pointer;
        background: #e6e7eb;
        border-radius: 2px;
        align-items: center;
    }

    .step-execution-history-menu-theme {
        .menu-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 32px;
            padding: 0 10px;
            font-size: 12px;
            color: #979ba5;
            cursor: pointer;

            &:hover {
                background: #f4f6fa;
            }

            &.active {
                background: #eaf3ff;

                .retry-count {
                    color: #3a84ff;
                }
            }

            .retry-count {
                color: #63656e;
            }
        }

        .tippy-content {
            margin: 0 -0.6rem;
        }
    }
</style>
