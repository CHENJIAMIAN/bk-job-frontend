

<template>
    <div style="padding: 20px;">
        <content-loader
            :height="716"
            :width="maxWidth"
            v-bind="$attrs">
            <rect x="0" y="0" width="233" height="20" rx="2" />
            <rect x="0" y="42" width="233" height="20" rx="2" />
            <rect x="279" y="57" :width="blockWidth" height="20" rx="2" />
            <rect x="279" y="0" width="120" height="20" rx="2" />
            <rect :x="xPosition1" y="0" width="100" height="20" rx="2" />
            <rect :x="xPosition2" y="0" width="480" height="20" rx="2" />
            <rect x="0" y="83" width="233" height="20" rx="2" />
            <rect x="279" y="98" :width="blockWidth" height="20" rx="2" />
            <rect x="279" y="181" :width="blockWidth" height="20" rx="2" />
            <rect x="0" y="124" width="233" height="20" rx="2" />
            <rect x="279" y="139" :width="blockWidth" height="20" rx="2" />
            <rect x="279" y="222" :width="blockWidth" height="20" rx="2" />
            <rect x="279" y="264" :width="blockWidth" height="20" rx="2" />
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
            xPosition1 () {
                return this.maxWidth - 100;
            },
            xPosition2 () {
                return this.maxWidth - 590;
            },
            blockWidth () {
                return Math.abs(this.maxWidth - 279);
            },
        },
    };
</script>
