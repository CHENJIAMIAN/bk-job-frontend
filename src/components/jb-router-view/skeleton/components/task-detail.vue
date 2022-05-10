<template>
    <div>
        <content-loader
            :height="439"
            :width="maxWidth"
            v-bind="$attrs">
            <rect x="0" y="135" width="60" height="20" rx="2" />
            <rect x="0" y="72" width="60" height="20" rx="2" />
            <rect x="0" y="36" width="60" height="20" rx="2" />
            <rect x="0" y="0" width="60" height="20" rx="2" />
            <rect x="80" y="0" width="330" height="20" rx="2" />
            <rect x="80" y="36" width="330" height="20" rx="2" />
            <rect x="80" y="72" width="330" height="20" rx="2" />
            <rect x="0" y="208" width="60" height="20" rx="2" />
            <rect x="80" y="419" width="120" height="20" rx="2" />
            <rect x="210" y="419" width="68" height="20" rx="2" />
            <rect x="288" y="419" width="68" height="20" rx="2" />
            <rect x="512" y="419" width="68" height="20" rx="2" />
            <rect x="80" y="119" width="160" height="50" rx="2" />
            <rect x="80" y="199" width="500" height="42" rx="2" />
            <rect x="80" y="251" width="500" height="42" rx="2" />
            <rect x="80" y="303" width="500" height="42" rx="2" />
            <rect x="80" y="355" width="500" height="42" rx="2" />
            <rect x="250" y="119" width="160" height="50" rx="2" />
            <rect x="420" y="119" width="160" height="50" rx="2" />
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
