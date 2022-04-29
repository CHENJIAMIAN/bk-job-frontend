

<template>
    <div style="width: 546px; padding-top: 27px; margin: 0 auto;">
        <content-loader
            :height="392"
            :width="546"
            v-bind="$attrs">
            <rect id="矩形" x="0" y="0" width="51" height="14" rx="2" />
            <rect id="矩形备份" x="0" y="28" width="240" height="20" rx="2" />
            <rect id="矩形备份-5" x="0" y="132" width="205" height="20" rx="2" />
            <rect id="矩形" x="220" y="132" width="1101" height="580" rx="2" />
            <rect id="矩形备份-6" x="0" y="172" width="205" height="20" rx="2" />
            <rect id="矩形备份-7" x="0" y="212" width="205" height="20" rx="2" />
            <rect id="矩形备份-8" x="0" y="252" width="205" height="20" rx="2" />
            <rect id="矩形备份-9" x="0" y="292" width="205" height="20" rx="2" />
            <rect id="矩形备份-2" x="17" y="83" width="90" height="20" rx="2" />
            <rect id="矩形备份-3" x="143" y="83" width="90" height="20" rx="2" />
            <rect id="矩形备份-4" x="269" y="83" width="90" height="20" rx="2" />
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
