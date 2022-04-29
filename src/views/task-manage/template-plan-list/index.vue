

<template>
    <div>
        <plan-list ref="list" />
        <element-teleport v-if="templateName">
            <div style="padding-left: 10px; font-size: 12px; color: #63656e;">（{{ templateName }}）</div>
        </element-teleport>
    </div>
</template>
<script>
    import TaskManageService from '@service/task-manage';
    import PlanList from '../common/plan/list';

    export default {
        name: '',
        components: {
            PlanList,
        },
        data () {
            return {
                templateName: '',
            };
        },
        computed: {
            isSkeletonLoading () {
                return this.$refs.list.isLoading;
            },
        },
        created () {
            this.templateId = this.$route.params.templateId;
            this.fetchData();
        },
        methods: {
            /**
             * @desc 获取作业模板名
             */
            fetchData () {
                TaskManageService.taskDetail({
                    id: this.templateId,
                }, {
                    permission: 'page',
                }).then((data) => {
                    this.templateName = data.name;
                });
            },
            /**
             * @desc 路由 回退
             */
            routerBack () {
                const { from } = this.$route.query;
                if (from === 'settingVar') {
                    this.$router.push({
                        name: 'settingVariable',
                        params: {
                            templateId: this.templateId,
                            id: this.$route.query.active,
                        },
                    });
                } else if (from === 'debugPlan') {
                    this.$router.push({
                        name: 'debugPlan',
                        params: {
                            id: this.templateId,
                        },
                    });
                } else if (from === 'cronJob') {
                    this.$router.push({
                        name: 'cronList',
                    });
                } else if (from === 'historyTask') {
                    this.$router.push({
                        name: 'historyTask',
                        params: {
                            id: this.$route.query.taskInstanceId,
                        },
                    });
                } else if (from === 'planList') {
                    this.$router.push({
                        name: 'planList',
                    });
                } else {
                    this.$router.push({
                        name: 'templateDetail',
                        params: {
                            id: this.templateId,
                        },
                    });
                }
            },
        },
    };
</script>
