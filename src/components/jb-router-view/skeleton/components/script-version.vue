

<template>
    <div>
        <content-loader
            :height="476"
            :width="maxWidth"
            v-bind="$attrs">
            <rect x="0" y="0" :width="maxWidth" height="96" rx="2" />
            <rect x="0" y="108" width="88" height="32" rx="2" />
            <rect :x="position" y="108" width="480" height="32" rx="2" />
            <rect x="0" y="160" :width="maxWidth" height="22" rx="2" />
            <rect x="0" y="202" :width="maxWidth" height="22" rx="2" />
            <rect x="0" y="244" :width="maxWidth" height="22" rx="2" />
            <rect x="0" y="286" :width="maxWidth" height="22" rx="2" />
            <rect x="0" y="328" :width="maxWidth" height="22" rx="2" />
            <rect x="0" y="370" :width="maxWidth" height="22" rx="2" />
            <rect x="0" y="412" :width="maxWidth" height="22" rx="2" />
            <rect x="0" y="454" :width="maxWidth" height="22" rx="2" />
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
            position () {
                return Math.abs(this.maxWidth - 480);
            },
        },
    };
</script>
