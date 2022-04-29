

<template>
    <div style="width: 546px; padding-top: 27px; margin: 0 auto;">
        <content-loader
            :height="392"
            :width="546"
            v-bind="$attrs">
            <rect x="20" y="38" width="2" height="327" />
            <rect x="0" y="70" width="546" height="42" rx="21" />
            <rect x="0" y="140" width="546" height="42" rx="21" />
            <rect x="0" y="210" width="546" height="42" rx="21" />
            <rect x="0" y="280" width="546" height="42" rx="21" />
            <circle cx="21" cy="21" r="21" />
            <circle cx="21" cy="371" r="21" />
        </content-loader>
    </div>
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
