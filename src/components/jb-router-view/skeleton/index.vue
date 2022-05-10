<template>
    <transition name="skeleton">
        <div v-if="visiable" ref="wraper" class="jb-view-skeleton">
            <component
                :is="realCom"
                :max-width="width"
                :speed="2"
                primary-color="#EBECF3"
                secondary-color="#F6F7FB" />
        </div>
    </transition>
</template>
<script>
    import List from './components/list';
    import SetVariable from './components/set-variable';
    import TaskList from './components/task-list';
    import TaskDetail from './components/task-detail';
    import TaskExecutiveDetail from './components/task-execute-detail';
    import HistoryStep from './components/history-step';
    import TaskStepDetail from './components/task-step-detail';
    import ExecutePlan from './components/execute-plan';
    import Notify from './components/notify';
    import GlobalSetUp from './components/global-set-up';
    import Dashboard from './components/dashboard';
    import ScriptVersion from './components/script-version';

    const comMap = {
        list: List,
        taskList: TaskList,
        taskDetail: TaskDetail,
        taskExecutiveDetail: TaskExecutiveDetail,
        taskStepExecutiveDetail: TaskStepDetail,
        historyStep: HistoryStep,
        setVariable: SetVariable,
        executePlan: ExecutePlan,
        notify: Notify,
        globalSetUp: GlobalSetUp,
        dashboard: Dashboard,
        scriptVersion: ScriptVersion,
    };

    export default {
        name: '',
        props: {
            type: String,
            visiable: {
                type: Boolean,
                default: false,
            },
        },
        data () {
            return {
                width: 0,
            };
        },
        computed: {
            realCom () {
                if (!Object.prototype.hasOwnProperty.call(comMap, this.type)) {
                    return 'div';
                }
                return comMap[this.type];
            },
        },
        mounted () {
            this.init();
            window.addEventListener('resize', this.init);
            this.$once('hook:beforeDestroy', () => {
                window.removeEventListener('resize', this.init);
            });
        },
        methods: {
            init () {
                if (!this.$refs.wraper) {
                    return;
                }
                this.width = this.$refs.wraper.getBoundingClientRect().width;
            },
        },
    };
</script>
<style lang='postcss' scoped>
    .viewport-full {
        .jb-view-skeleton {
            padding: 0;
        }
    }

    .jb-view-skeleton {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 20px;
        left: 0;
        z-index: 1001;
        width: 100%;
        min-height: calc(100vh - 104px);
        padding: 20px 24px 0;
        overflow: hidden;
        background: #f5f7fa;
        opacity: 100%;
        visibility: visible;
    }

    .skeleton-leave-active {
        transition: visibility 0.7s linear, opacity 0.5s linear;
    }

    .skeleton-leave-to {
        opacity: 0%;
        visibility: hidden;
    }
</style>
