

<template>
    <ip-detail :pre-host="preHost" :last-host="lastHost" />
</template>
<script>
    import {
        findParent,
    } from '@utils/vdom';
    import IpDetail from '../../common/ip-detail';
    import {
        findStep,
    } from '../../common/utils';

    export default {
        name: 'SyncPlanScriptExecuteTarget',
        components: {
            IpDetail,
        },
        data () {
            return {
                preHost: {},
                lastHost: {},
            };
        },
        created () {
            const dataSourceParent = findParent(this, 'SyncPlanStep2');
            const currentStep = findParent(this, 'DiffTaskStep');
            const currentStepId = currentStep.data.realId;
            const currentPlanStep = findStep(dataSourceParent.planStepList, currentStepId);
            const currentTemplateStep = findStep(dataSourceParent.templateStepList, currentStepId);
                
            this.preHost = Object.freeze(currentPlanStep.scriptStepInfo.executeTarget);
            this.lastHost = Object.freeze(currentTemplateStep.scriptStepInfo.executeTarget);
        },
    };
</script>
