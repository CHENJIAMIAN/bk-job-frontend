<template>
    <div style="padding: 20px;">
        <content-loader
            :height="716"
            :width="maxWidth"
            v-bind="$attrs">
            <rect x="0" y="0" width="274" height="20" rx="2" />
            <rect x="329" y="31.2272727" width="237" height="21.5454545" rx="2" />
            <rect x="329" y="116" width="60" height="20" rx="2" />
            <rect x="329" y="189" width="60" height="20" rx="2" />
            <rect x="409" y="466" width="120" height="20" rx="2" />
            <rect x="0" y="42" width="274" height="20" rx="2" />
            <rect x="0" y="83" width="274" height="20" rx="2" />
            <rect x="0" y="124" width="274" height="20" rx="2" />
            <rect x="409" y="100" width="160" height="50" rx="2" />
            <rect x="409" y="180" width="500" height="42" rx="2" />
            <rect x="409" y="232" width="500" height="42" rx="2" />
            <rect x="409" y="284" width="500" height="42" rx="2" />
            <rect x="409" y="336" width="500" height="42" rx="2" />
            <rect x="409" y="388" width="500" height="42" rx="2" />
            <rect x="579" y="100" width="160" height="50" rx="2" />
            <rect x="749" y="100" width="160" height="50" rx="2" />
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
