

<template>
    <plan-list ref="list" />
</template>
<script>
    import PlanList from '../common/plan/list';

    export default {
        name: '',
        components: {
            PlanList,
        },
        computed: {
            isSkeletonLoading () {
                return this.$refs.list.isLoading;
            },
        },
    };
</script>
