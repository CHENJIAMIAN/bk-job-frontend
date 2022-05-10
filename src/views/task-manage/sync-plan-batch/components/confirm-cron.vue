<template>
    <jb-dialog
        :value="isShow"
        fullscreen
        class="plan-confirm-cron-dialog"
        @cancel="handleClose">
        <div class="confirm-cron-wraper" v-bkloading="{ isLoading }" @keyup.esc="handleClose">
            <confirm-cron
                v-if="!isLoading"
                :template-info="templateInfo"
                :plan-id="planId"
                :cron-job-list="cronJobInfoList"
                @on-change="handleConfirmCron" />
        </div>
    </jb-dialog>
</template>
<script>
    import TaskManageService from '@service/task-manage';
    import ConfirmCron from '../../common/plan/confirm-cron';

    export default {
        name: '',
        components: {
            ConfirmCron,
        },
        props: {
            isShow: {
                type: Boolean,
                default: false,
            },
            templateId: {
                type: Number,
                required: true,
            },
            planId: {
                type: Number,
                required: true,
            },
            cronJobInfoList: {
                type: Array,
                default: () => [],
            },
        },
        data () {
            return {
                isShowDialog: false,
                isLoading: true,
                templateInfo: {},
            };
        },
        watch: {
            templateId (templateId) {
                if (templateId < 0) {
                    return;
                }
                this.fetchData();
            },
        },
        methods: {
            fetchData () {
                this.isLoading = true;
                TaskManageService.taskDetail({
                    id: this.templateId,
                }).then((data) => {
                    this.templateInfo = Object.freeze(data);
                })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            handleClose () {
                this.$emit('on-close');
            },
            handleConfirmCron (cronJonList) {
                this.$emit('on-change', cronJonList);
            },
        },
    };
</script>
<style lang='postcss'>
    .plan-confirm-cron-dialog {
        .bk-dialog-wrapper {
            .bk-dialog-body {
                padding: 0;
            }

            .bk-dialog.bk-dialog-fullscreen .bk-dialog-body {
                bottom: 0;
            }

            .bk-dialog-footer {
                display: none;
            }
        }

        .confirm-cron-wraper {
            min-height: 100vh;
        }

        .layout-left,
        .layout-right {
            height: 100vh;
        }
    }
</style>
