<template>
    <div class="smart-style-item">
        <div class="smart-arrow" :style="arrowStyles" />
        <div class="smart-item-content">
            <slot />
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';

    export default {
        props: {
            sourceTypeList: {
                type: Array,
                default: () => [],
            },
            fileSourceType: {
                type: String,
                default: '',
            },
        },
        computed: {
            arrowStyles () {
                const index = _.findIndex(this.sourceTypeList, _ => _.code === this.fileSourceType);
                if (index < 0) {
                    return {
                        display: 'none',
                    };
                }
                return {
                    left: `${30 + (index + 1) * 120}px`,
                };
            },
        },
    };
</script>

<style lang="postcss">
    .smart-style-item {
        .smart-arrow {
            position: relative;
            width: 0;
            height: 0;
            border: 8px solid transparent;
            border-bottom-color: #f5f6fa;
        }

        .smart-item-content {
            padding: 15px 30px;
            margin: 0 -30px 10px;
            background-color: #f5f6fa;
        }
    }
</style>
