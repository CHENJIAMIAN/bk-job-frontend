

<template>
    <div style="padding: 80px 22px 0;">
        <content-loader
            :height="400"
            :width="maxWidth"
            v-bind="$attrs">
            <rect fill="#D8D8D8" x="0" y="0" width="49" height="18" rx="2" />
            <!--  -->
            <rect fill="#D8D8D8" x="19" y="54" width="80" height="18" rx="2" />
            <rect fill="#D8D8D8" x="19" y="133" width="80" height="12" rx="2" />
            <rect fill="#D8D8D8" x="19" y="159" width="80" height="12" rx="2" />
            <rect fill="#D8D8D8" x="19" y="91" width="54" height="24" rx="2" />
            <rect fill="#D8D8D8" x="120" y="111" width="120" height="60" rx="2" />
            <!--  -->
            <rect fill="#D8D8D8" x="280" y="54" width="80" height="18" rx="2" />
            <rect fill="#D8D8D8" x="280" y="133" width="80" height="12" rx="2" />
            <rect fill="#D8D8D8" x="280" y="159" width="80" height="12" rx="2" />
            <rect fill="#D8D8D8" x="280" y="91" width="54" height="24" rx="2" />
            <rect fill="#D8D8D8" x="380" y="111" width="120" height="60" rx="2" />
            <!--  -->
            <rect fill="#D8D8D8" x="559" y="54" width="80" height="18" rx="2" />
            <rect fill="#D8D8D8" x="559" y="91" width="102" height="24" rx="2" />
            <rect fill="#D8D8D8" x="559" y="133" width="40" height="38" rx="2" />
            <!--  -->
            <rect fill="#D8D8D8" :x="559 + leftBlockOffset" y="54" width="80" height="18" rx="2" />
            <rect fill="#D8D8D8" :x="559 + leftBlockOffset" y="91" width="102" height="24" rx="2" />
            <rect fill="#D8D8D8" :x="559 + leftBlockOffset" y="133" width="40" height="38" rx="2" />
            <!--  -->
            <rect fill="#D8D8D8" :x="559 + leftBlockOffset * 2" y="54" width="80" height="18" rx="2" />
            <rect fill="#D8D8D8" :x="559 + leftBlockOffset * 2" y="91" width="102" height="24" rx="2" />
            <rect fill="#D8D8D8" :x="559 + leftBlockOffset * 2" y="133" width="40" height="38" rx="2" />
            <!--  -->
            <rect fill="#D8D8D8" :x="559 + leftBlockOffset * 3" y="54" width="80" height="18" rx="2" />
            <rect fill="#D8D8D8" :x="559 + leftBlockOffset * 3" y="91" width="102" height="24" rx="2" />
            <rect fill="#D8D8D8" :x="559 + leftBlockOffset * 3" y="133" width="40" height="38" rx="2" />
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
            leftBlockOffset () {
                return (this.maxWidth - 40 - 559) / 4;
            },
        },
    };
</script>
