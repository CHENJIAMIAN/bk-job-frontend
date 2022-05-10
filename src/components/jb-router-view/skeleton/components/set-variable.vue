<template>
    <content-loader
        :width="maxWidth"
        :height="716"
        v-bind="$attrs">
        <rect x="0" y="22" width="960" height="32" rx="2" />
        <rect x="0" y="106" width="960" height="32" rx="2" />
        <rect x="0" y="190" width="960" height="32" rx="2" />
        <rect x="0" y="274" width="960" height="32" rx="2" />
        <rect x="0" y="0" width="105" height="16" rx="1" />
        <rect x="0" y="84" width="207" height="16" rx="1" />
        <rect x="0" y="168" width="145" height="16" rx="1" />
        <rect x="0" y="252" width="207" height="16" rx="1" />
    </content-loader>
</template>
<script>
    import { ContentLoader } from 'vue-content-loader';
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
