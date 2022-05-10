<template>
    <component
        ref="item"
        :is="itemCom"
        v-bind="$attrs"
        v-on="$listeners" />
</template>
<script>
    import ScriptName from '../common/name';
    import ErrorHandle from '../common/error-handle';
    import ScriptTimeout from '../common/timeout';
    import ScriptSourceOfExecution from './strategy/script-source-of-execution';
    import ScriptSourceOfTemplate from './strategy/script-source-of-template';
    import ScriptContent from './strategy/script-content';
    import ScriptParam from './strategy/script-param';
    import ExecuteAccount from './strategy/execute-account';
    import ExecuteTargetOfTemplate from './strategy/execute-target-of-template';
    import ExecuteTargetOfExecution from './strategy/execute-target-of-execution';

    export default {
        name: 'ExecuteScriptItemFactory',
        props: {
            name: {
                type: String,
                required: true,
            },
        },
        computed: {
            itemCom () {
                const comMap = {
                    scriptName: ScriptName,
                    scriptSourceOfExecution: ScriptSourceOfExecution,
                    scriptSourceOfTemplate: ScriptSourceOfTemplate,
                    errorHandle: ErrorHandle,
                    scriptContent: ScriptContent,
                    scriptParam: ScriptParam,
                    scriptTimeout: ScriptTimeout,
                    scriptAccount: ExecuteAccount,
                    executeTargetOfTemplate: ExecuteTargetOfTemplate,
                    executeTargetOfExecution: ExecuteTargetOfExecution,
                };
                if (!Object.prototype.hasOwnProperty.call(comMap, this.name)) {
                    return 'div';
                }
                return comMap[this.name];
            },
        },
    };
</script>
