

<template>
    <div class="task-import-step5" v-bkloading="{ isLoading }">
        <div class="flag">
            <img src="/static/images/import.svg">
        </div>
        <div class="title">
            <span v-if="isImportSuccess">{{ $t('template.作业导入完成！请及时检查。') }}</span>
            <template v-else>
                <span v-if="isImportFailed">{{ $t('template.作业导入出现异常，请稍后再试...') }}</span>
                <span v-else>{{ $t('template.正在导入作业，请稍候') }}<span class="loading" /></span>
            </template>
        </div>
        <div class="log-container">
            <div class="log-box" ref="log">
                <template v-for="(item, index) in log">
                    <div :key="index">
                        <span>[ {{ item.timestamp }} ]</span> {{ item.content }}
                        <span v-if="item.type === 4" class="action" @click="handleLocationTemplate(item)">
                            {{ $t('template.查看详情') }}
                            <Icon type="jump" />
                        </span>
                        <span v-if="item.type === 5" class="action" @click="handleLocationPlan(item)">
                            {{ $t('template.查看详情') }}
                            <Icon type="jump" />
                        </span>
                    </div>
                </template>
            </div>
            <Icon
                class="log-copy"
                :tippy-tips="$t('template.复制日志')"
                type="log-copy"
                @click="handleCopyLog" />
        </div>
        <action-bar>
            <bk-button
                class="w120"
                theme="primary"
                :disabled="!isImportSuccess"
                @click="handleFinish">
                {{ $t('template.完成') }}
            </bk-button>
        </action-bar>
    </div>
</template>
<script>
    import BackupService from '@service/backup';
    import { execCopy } from '@utils/assist';
    import { taskImport } from '@utils/cache-helper';
    import ActionBar from '../components/action-bar';

    const TASK_STATUS_DEFAULT = 0;
    const TASK_STATUS_PENDING = 5;
    const TASK_STATUS_SUCCESS = 6;
    const TASK_STATUS_FAILED = 7;
    const TASK_STATUS_CANCEL = 8;

    export default {
        name: '',
        components: {
            ActionBar,
        },
        data () {
            return {
                isLoading: true,
                status: 0,
                log: [],
            };
        },
        computed: {
            isImportSuccess () {
                return [
                    TASK_STATUS_SUCCESS,
                    TASK_STATUS_CANCEL,
                ].includes(this.status);
            },
            isImportFailed () {
                return [
                    TASK_STATUS_FAILED,
                ].includes(this.status);
            },
        },
        created () {
            this.id = taskImport.getItem('id');
            this.pollingQueue = [];
            taskImport.clearItem();
            this.fetchData();
            this.startTimer();
            this.$once('hook:beforeDestroy', () => {
                this.clearTimer();
            });
        },
        methods: {
            fetchData () {
                BackupService.fetchImportInfo({
                    id: this.id,
                }).then((data) => {
                    if (this.isClearTimer) {
                        return;
                    }
                    this.log = Object.freeze(data.log);
                    this.status = data.status;
                    if ([
                        TASK_STATUS_DEFAULT,
                        TASK_STATUS_PENDING,
                    ].includes(data.status)) {
                        this.pollingQueue.push(this.fetchData);
                    }
                })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            startTimer () {
                if (this.isClearTimer) {
                    return;
                }
                const lastTask = this.pollingQueue.pop();
                if (lastTask) {
                    lastTask();
                }
                setTimeout(() => {
                    this.startTimer();
                }, 2000);
            },
            clearTimer () {
                this.isClearTimer = true;
            },
            handleLocationTemplate (payload) {
                const { href } = this.$router.resolve({
                    name: 'templateDetail',
                    params: {
                        id: payload.templateId,
                    },
                });
                window.open(href);
            },
            handleLocationPlan (payload) {
                const { href } = this.$router.resolve({
                    name: 'viewPlan',
                    params: {
                        templateId: payload.templateId,
                    },
                    query: {
                        viewPlanId: payload.planId,
                    },
                });
                window.open(href);
            },
            handleCopyLog () {
                execCopy(this.$refs.log.innerText);
            },
            handleFinish () {
                this.$emit('on-cancle');
            },
        },
    };
</script>
<style lang='postcss'>
    @keyframes import-task-loading {
        0% {
            content: ".";
        }

        30% {
            content: "..";
        }

        60% {
            content: "...";
        }
    }

    .task-import-step5 {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100%;

        .flag {
            margin-top: 50px;
            margin-bottom: 16px;

            img {
                width: 143px;
            }
        }

        .title {
            font-size: 24px;
            line-height: 31px;
            color: #63656e;

            .loading {
                &::after {
                    display: inline-block;
                    content: ".";
                    animation: import-task-loading 2s linear infinite;
                }
            }
        }

        .log-container {
            position: relative;
            margin-top: 30px;
        }

        .log-box {
            width: 680px;
            max-height: calc(100vh - 460px);
            padding: 12px 16px;
            overflow-y: auto;
            font-size: 12px;
            line-height: 20px;
            color: #979ba5;
            background: #fafbfd;
            border: 1px solid #dcdee5;
            border-radius: 2px;

            &::-webkit-scrollbar {
                width: 13px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: #dcdee5;
            }

            .action {
                color: #3a84ff;
                cursor: pointer;
            }
        }

        .log-copy {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 16px;
            color: #979ba5;
            cursor: pointer;
        }
    }
</style>
