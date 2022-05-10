<template>
    <execute-target
        v-bind="$attrs"
        property="targetServers"
        mode="onlyHost"
        :task-host-node="formData[field]"
        @on-change="handleTargetChange" />
</template>
<script>
    import ExecuteTarget from '../../common/execute-target';

    export default {
        components: {
            ExecuteTarget,
        },
        inheritAttrs: false,
        props: {
            field: {
                type: String,
                required: true,
            },
            formData: {
                type: Object,
                default: () => ({}),
            },
        },
        methods: {
            handleTargetChange (taskHostNode) {
                this.$emit('on-change', this.field, Object.freeze(taskHostNode));
            },
        },
    };
</script>
