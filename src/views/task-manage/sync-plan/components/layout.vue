<template>
    <div class="sync-plan-layout" v-bkloading="{ isLoading: loading }">
        <div class="wraper" :class="{ loading }">
            <Empty v-if="empty" class="layout-empty">
                <div class="empty-text">{{ '暂无关联的定时任务' }}</div>
                <div>
                    <slot name="empty" />
                </div>
            </Empty>
            <template v-else>
                <slot />
            </template>
            <div class="layout-footer">
                <slot name="footer" />
            </div>
        </div>
    </div>
</template>
<script>
    import Empty from '@components/empty';

    export default {
        name: '',
        components: {
            Empty,
        },
        props: {
            loading: {
                type: Boolean,
                default: false,
            },
            empty: {
                type: Boolean,
                default: false,
            },
        },
    };
</script>
<style lang='postcss'>
    .sync-plan-layout {
        height: calc(100vh - 158px);

        .wraper {
            opacity: 100%;
            visibility: visible;
            transition: all 1s;

            &.loading {
                opacity: 0%;
                visibility: hidden;
            }
        }

        .layout-empty {
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
            font-size: 20px;
            line-height: 1;
            color: #63656e;
            background: #fff;

            .empty-flag {
                width: 200px;
            }

            .empty-text {
                padding-top: 18px;
                padding-bottom: 10px;
            }
        }

        .layout-footer {
            position: fixed;
            bottom: 0;
            left: 0;
            display: flex;
            width: 100%;
            height: 52px;
            padding-right: 24px;
            background: #fff;
            border-top: 1px solid #e2e2e2;
            align-items: center;
            justify-content: flex-end;

            .bk-button {
                margin-left: 10px;
            }
        }
    }
</style>
