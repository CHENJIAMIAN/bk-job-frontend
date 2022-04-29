

<template>
    <div>
        <content-loader
            :height="439"
            :width="maxWidth"
            v-bind="$attrs">
            <rect x="0" y="0" width="100" height="40" rx="2" />
            <rect x="110" y="0" width="100" height="40" rx="2" />
            <rect x="220" y="0" width="100" height="40" rx="2" />
            <rect x="330" y="0" width="100" height="40" rx="2" />
            <rect x="440" y="0" width="100" height="40" rx="2" />
            <rect x="558" y="589" width="68" height="32" rx="2" />
            <rect :x="xPosition" y="78" width="152" height="20" rx="2" />
            <rect :x="xPosition" y="498" width="152" height="20" rx="2" />
            <rect :x="xPosition" y="589" width="120" height="32" rx="2" />
            <rect :x="xPosition" y="130" width="960" height="60" rx="2" />
            <rect :x="xPosition" y="222" width="960" height="20" rx="2" />
            <rect :x="xPosition" y="261" width="960" height="20" rx="2" />
            <rect :x="xPosition" y="304" width="960" height="20" rx="2" />
            <rect :x="xPosition" y="347" width="960" height="20" rx="2" />
            <rect :x="xPosition" y="388" width="960" height="20" rx="2" />
            <rect :x="xPosition" y="431" width="960" height="20" rx="2" />
            <rect :x="xPosition" y="537" width="960" height="20" rx="2" />
           
        </content-loader>
    </div>
</template>
<script>
    import {
        ContentLoader,
    } from 'vue-content-loader';
    export default {
        components: {
            ContentLoader,
        },
        props: {
            maxWidth: {
                type: Number,
                required: true,
            },
        },
        computed: {
            xPosition () {
                return (this.maxWidth - 960) / 2;
            },
        },
    };
</script>
