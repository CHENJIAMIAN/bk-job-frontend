<template>
    <div style="padding: 24px 30px;">
        <content-loader
            :height="684"
            :width="maxWidth"
            v-bind="$attrs">
            <rect x="298" y="109" :width="blockWidth" height="575" rx="2" />
            <rect x="78" y="109" width="200" height="20" rx="2" />
            <rect x="78" y="5" width="82" height="20" rx="2" />
            <rect x="78" y="63" width="82" height="20" rx="2" />
            <rect :x="xPosition1" y="63" width="113" height="20" rx="2" />
            <rect :x="xPosition2" y="63" width="507" height="20" rx="2" />
            <rect x="198" y="5" width="82" height="20" rx="2" />
            <rect x="318" y="5" width="82" height="20" rx="2" />
            <rect x="78" y="151" width="200" height="20" rx="2" />
            <rect x="78" y="192" width="200" height="20" rx="2" />
            <rect x="78" y="233" width="200" height="20" rx="2" />
            <rect x="78" y="274" width="200" height="20" rx="2" />
            <rect x="78" y="314" width="200" height="20" rx="2" />
            <rect x="78" y="355" width="200" height="20" rx="2" />
            <rect x="78" y="397" width="200" height="20" rx="2" />
            <circle cx="17" cy="17" r="17" />
            <circle cx="17" cy="78" r="17" />
            <circle cx="17" cy="139" r="17" />
            <circle cx="17" cy="200" r="17" />
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
                return this.maxWidth - 113;
            },
            xPosition2 () {
                return this.maxWidth - 630;
            },
            blockWidth () {
                return Math.abs(this.maxWidth - 298);
            },
        },
    };
</script>
