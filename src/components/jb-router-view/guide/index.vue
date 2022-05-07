
<template>
    <div v-test="{ type: 'asdf',value: 'gfc' }">
        <component class="guide-page" :is="com" />
    </div>
</template>
<script>
    import EventBus from '@utils/event-bus';
    import TaskList from './task-list';
    import ScriptList from './script-list';
    import CrontabList from './corntab-list';

    const comMap = {
        taskList: TaskList,
        scriptList: ScriptList,
        cronList: CrontabList,
    };

    export default {
        name: '',
        data () {
            return {
                isEmpty: false,
                page: '',
            };
        },
        computed: {
            com () {
                if (!this.isEmpty) {
                    return '';
                }
                return Object.prototype.hasOwnProperty.call(comMap, this.page) ? comMap[this.page] : '';
            },
        },
        watch: {
            $route: {
                handler  (route) {
                    this.page = route.name;
                    this.isEmpty = false;
                },
                immediate: true,
            },
        },
        created () {
            EventBus.$on('page-empty', () => {
                this.isEmpty = true;
            });
        },
    };
</script>
<style lang="postcss">
    .guide-page {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1000;
        min-height: calc(100vh - 104px);
        background: #fff;
    }
</style>
