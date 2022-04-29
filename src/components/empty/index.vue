

<template>
    <div class="job-empty">
        <template v-if="type === 'search'">
            <img :style="styles" src="/static/images/search-empty.svg">
            <div class="job-empty-text">
                <slot>{{ $t('搜索结果为空') }}</slot>
            </div>
        </template>
        <template v-else>
            <img :style="styles" src="/static/images/empty.svg">
            <div class="job-empty-text">
                <slot>{{ title }}</slot>
                <slot name="desc" />
            </div>
        </template>
    </div>
</template>
<script>
    import I18n from '@/i18n';

    export default {
        name: 'Empty',
        props: {
            title: {
                type: String,
                default: I18n.t('数据为空'),
            },
            width: {
                type: Number,
                default: 120,
            },
            type: {
                type: String,
                default: 'empty',
            },
        },
        computed: {
            styles () {
                if (this.width > 0) {
                    return {
                        width: `${this.width}px`,
                    };
                }
                return {};
            },
        },
    };
</script>
<style lang='postcss'>
    .job-empty {
        display: flex;
        font-size: 12px;
        line-height: 1;
        color: #979ba5;
        text-align: center;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .job-empty-text {
            margin-top: 20px;

            * {
                font-size: 12px !important;
            }
        }
    }
</style>
