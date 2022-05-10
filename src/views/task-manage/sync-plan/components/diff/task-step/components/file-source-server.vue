<template>
    <ip-detail :pre-host="realPreHost" :last-host="realLastHost" />
</template>
<script>
    import TaskHostNodeModel from '@model/task-host-node';
    import IpDetail from '../../common/ip-detail';

    const generatorHost = () => new TaskHostNodeModel({});

    export default {
        name: 'SyncPlanFileSourceServer',
        components: {
            IpDetail,
        },
        props: {
            preHost: {
                type: Object,
                default: () => ({}),
            },
            lastHost: {
                type: Object,
                default: () => ({}),
            },
        },
        created () {
            if (!this.preHost || !this.preHost.hostNodeInfo) {
                this.realPreHost = generatorHost();
            } else {
                this.realPreHost = this.preHost;
            }
            if (!this.lastHost || !this.lastHost.hostNodeInfo) {
                this.realLastHost = generatorHost();
            } else {
                this.realLastHost = this.lastHost;
            }
        },
    };
</script>
