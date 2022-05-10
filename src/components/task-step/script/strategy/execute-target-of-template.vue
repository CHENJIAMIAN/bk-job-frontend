<template>
    <execute-target
        v-bind="$attrs"
        property="executeTarget"
        :task-host-node="formData[field]"
        @on-change="handleTargetChange" />
</template>
<script>
    import ExecuteTarget from '../../common/execute-target';

    export default {
        components: {
            ExecuteTarget,
        },
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
