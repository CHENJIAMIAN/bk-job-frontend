<template>
    <component :is="com" v-bind="$attrs" v-on="$listeners" />
</template>
<script>
    import ExecuteBeforeNotify from './execute-before-notify';
    import FinishBeforeNotify from './finish-before-notify';
    import EndTime from './end-time';

    const itemMap = {
        executeBeforeNotify: ExecuteBeforeNotify,
        finishBeforeNotify: FinishBeforeNotify,
        endTime: EndTime,
    };

    export default {
        name: '',
        props: {
            name: {
                type: String,
                required: true,
            },
        },
        computed: {
            com () {
                if (!Object.prototype.hasOwnProperty.call(itemMap, this.name)) {
                    return 'div';
                }
                return itemMap[this.name];
            },
        },
    };
</script>
