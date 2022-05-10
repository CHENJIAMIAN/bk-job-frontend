<template>
    <div class="dashboard-card-layout">
        <div class="card-title">
            <span
                :tippy-tips="titleTips"
                class="card-title-text"
                :class="{
                    'hover-tips': needRenderTips,
                }">
                {{ title }}
            </span>
        </div>
        <div class="card-content">
            <slot />
        </div>
        <div class="card-extend">
            <slot name="extend" />
        </div>
    </div>
</template>
<script>
   
    export default {
        name: '',
        props: {
            title: {
                type: String,
                default: '接入业务量',
            },
            titleTips: {
                type: String,
            },
        },
        data () {
            return {};
        },
        computed: {
            needRenderTips () {
                return !!this.titleTips;
            },
        },
        methods: {},
    };
</script>
<style lang='postcss' scoped>
    .dashboard-card-layout {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 16px 20px 20px;
        background: #fff;

        .card-title {
            margin-bottom: 16px;
            font-size: 13px;
            line-height: 18px;
            color: #63656e;
        }

        .card-title-text {
            position: relative;

            &.hover-tips {
                cursor: pointer;

                &::after {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    margin-bottom: -3px;
                    border-bottom: 1px dashed #dcdee5;
                    content: "";
                }
            }
        }

        .card-extend {
            position: absolute;
            top: 18px;
            right: 20px;
            display: flex;
            color: #c4c6cc;

            & > * {
                cursor: pointer;
            }

            .job-icon {
                &:hover {
                    color: #3a84ff;
                }

                & ~ .job-icon {
                    margin-left: 10px;
                }
            }
        }
    }
</style>
