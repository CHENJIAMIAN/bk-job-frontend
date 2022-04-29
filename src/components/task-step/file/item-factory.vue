

<template>
    <component
        :is="itemCom"
        v-bind="$attrs"
        v-on="$listeners" />
</template>
<script>
    import ErrorHandle from '../common/error-handle';
    import StepName from '../common/name';
    import Timeout from '../common/timeout';
    import SourceFileOfExecution from './strategy/source-file-of-execution';
    import SourceFileOfTemplate from './strategy/source-file-of-template';
    import TargetPath from './strategy/target-path';
    import TransferMode from './strategy/transfer-mode';
    import ExecuteAccount from './strategy/execute-account';
    import TargetServerOfTemplate from './strategy/target-server-of-template';
    import TargetServerOfExecution from './strategy/target-server-of-execution';
    
    import SpeedLimit from './strategy/speed-limit';

    const comMap = {
        stepName: StepName,
        sourceFileOfExecution: SourceFileOfExecution,
        sourceFileOfTemplate: SourceFileOfTemplate,
        targetPath: TargetPath,
        errorHandle: ErrorHandle,
        transferMode: TransferMode,
        executeAccount: ExecuteAccount,
        targetServerOfTemplate: TargetServerOfTemplate,
        targetServerOfExecution: TargetServerOfExecution,
        timeout: Timeout,
        speedLimit: SpeedLimit,
    };

    export default {
        name: 'ExecuteFileItemFactory',
        inheritAttrs: false,
        props: {
            name: {
                type: String,
                default: '',
            },
        },
        computed: {
            itemCom () {
                if (!Object.prototype.hasOwnProperty.call(comMap, this.name)) {
                    return 'div';
                }
                return comMap[this.name];
            },
        },
    };
</script>
