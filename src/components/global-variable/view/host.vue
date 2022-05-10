<template>
    <div>
        <div v-if="data.isEmpty">--</div>
        <server-panel
            v-else
            :host-node-info="data.defaultTargetValue.hostNodeInfo"
            detail-fullscreen />
    </div>
</template>
<script>
    import ServerPanel from '@components/choose-ip/server-panel';

    export default {
        components: {
            ServerPanel,
        },
        props: {
            data: {
                type: Object,
                required: true,
            },
        },
    };
</script>
