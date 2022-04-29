

<template>
    <div>
        <content-loader
            :height="439"
            :width="maxWidth"
            v-bind="$attrs">
            <rect x="0" y="0" width="116" height="20" rx="2" />
            <rect x="58" y="70" width="58" height="20" rx="2" />
            <rect x="138" y="70" width="92" height="20" rx="2" />
            <rect x="138" y="119" width="92" height="20" rx="2" />
            <rect x="138" y="160" width="92" height="20" rx="2" />
            <rect x="255" y="160" width="601" height="20" rx="2" />
            <rect x="140" y="228" width="716" height="20" rx="2" />
            <rect x="140" y="269" width="716" height="20" rx="2" />
            <rect x="140" y="310" width="716" height="20" rx="2" />
            <rect x="140" y="351" width="716" height="20" rx="2" />
            <rect x="255" y="119" width="92" height="20" rx="2" />
            <rect x="371" y="119" width="92" height="20" rx="2" />
            <rect x="255" y="70" width="92" height="20" rx="2" />
            <rect x="58" y="119" width="58" height="20" rx="2" />
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
    };
</script>
