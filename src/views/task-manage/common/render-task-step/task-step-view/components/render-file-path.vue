

<template>
    <div class="render-file-path-box">
        <bk-popover placement="left">
            <div v-for="(item, fileIndex) in renderData" :key="fileIndex" class="path-text-row">
                {{ item }}
            </div>
            <div v-if="hasMore">...</div>
            <ul slot="content" class="source-file-tips-box">
                <li v-for="(item, fileIndex) in data" :key="fileIndex" class="row">
                    <span class="dot" />
                    {{ item }}
                </li>
            </ul>
        </bk-popover>
    </div>
</template>
<script>
    const DISPLAY_ROW_NUMS = 3;

    export default {
        name: '',
        props: {
            data: {
                type: Array,
                default: () => [],
            },
        },
        data () {
            return {};
        },
        computed: {
            renderData () {
                return this.data.slice(0, DISPLAY_ROW_NUMS);
            },
            hasMore () {
                return this.data.length > DISPLAY_ROW_NUMS;
            },
        },
    };
</script>
<style lang="postcss">
    @import "@/css/mixins/scroll";

    .render-file-path-box {
        padding: 6px 10px;
        margin-left: -10px;

        &:hover {
            background: #f0f1f5;
        }
    }

    .source-file-tips-box {
        max-width: 300px;
        max-height: 280px;
        min-width: 60px;
        overflow-y: auto;

        @mixin scroller;

        .row {
            word-break: break-all;
        }

        .dot {
            display: inline-block;
            width: 6px;
            height: 6px;
            background: currentColor;
            border-radius: 50%;
        }
    }
</style>
