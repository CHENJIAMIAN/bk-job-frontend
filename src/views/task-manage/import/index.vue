<template>
    <div class="task-import-page" v-bkloading="{ isLoading }">
        <div class="header">
            <bk-steps :steps="steps" :cur-step.sync="currentStep" />
        </div>
        <div class="content">
            <scroll-faker>
                <component
                    :is="pageCom"
                    @on-change="handleStepChange"
                    @on-cancle="handleCancle" />
            </scroll-faker>
        </div>
    </div>
</template>
<script>
       import BackupService from '@service/backup';
    import { taskImport } from '@utils/cache-helper';
    import Step1 from './pages/step1';
    import Step2 from './pages/step2';
    import Step3 from './pages/step3';
    import Step4 from './pages/step4';
    import Step5 from './pages/step5';

    export default {
        name: '',
        data () {
            const step = parseInt(this.$route.query.step, 10);
            return {
                isLoading: true,
                currentStep: step || 1,
            };
        },
        computed: {
            pageCom () {
                if (this.isLoading) {
                    return 'div';
                }
                const comMap = {
                    1: Step1,
                    2: Step2,
                    3: Step3,
                    4: Step4,
                    5: Step5,
                };
                return comMap[this.currentStep];
            },
        },
        created () {
            this.steps = [
                { title: '用户须知.header', icon: 1 },
                { title: '文件包上传', icon: 2 },
                { title: '导入内容确认', icon: 3 },
                { title: '导入设置', icon: 4 },
                { title: '开始导入', icon: 5 },
            ];
            this.fetchData();
        },
        methods: {
            fetchData () {
                this.isLoading = true;
                BackupService.fetchInfo()
                    .then((data) => {
                        const { importJob } = data;
                        if (importJob.length > 0) {
                            // 有导入任务，直接显示第5步日志信息
                            this.handleStepChange(5);
                            taskImport.clearItem();
                            taskImport.setItem('id', importJob[0].id);
                        } else {
                            const taskImportInfo = taskImport.getItem();
                            // 没有作业导入信息，回到第一步开始
                            if (!taskImportInfo) {
                                this.handleStepChange(1);
                                return;
                            }
                            // 没有作业导入任务，回到第一步开始
                            if (!taskImportInfo.id) {
                                this.handleStepChange(1);
                                return;
                            }
                            // 没有作业选择信息，回到第3步
                            if (!taskImportInfo.templateInfo && this.currentStep > 3) {
                                this.handleStepChange(3);
                            }
                        }
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            handleStepChange (step) {
                this.currentStep = step;
                const searchParams = new URLSearchParams(window.location.search);
                searchParams.set('step', step);
                window.history.replaceState({}, '', `?${searchParams.toString()}`);
            },
            handleCancle () {
                this.routerBack();
            },
            routerBack () {
                this.$router.push({
                    name: 'taskList',
                });
            },
        },
    };
</script>
<style lang='postcss'>
    .task-import-page {
        background: #fff;

        .header {
            display: flex;
            align-items: center;
            height: 49px;
            padding: 0 57px;
            border: 1px solid #dcdee5;
        }

        .content {
            height: calc(100vh - 205px);
        }
    }
</style>
