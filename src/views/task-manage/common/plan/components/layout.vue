

<template>
    <div ref="layout" class="plan-action-layout" :style="layoutStyles">
        <div class="loading-wraper" :class="{ 'loading-hidden': showContent }">
            <div class="loading-content">
                <content-loader
                    :height="455"
                    :width="580"
                    :speed="2"
                    primary-color="#EBECF3"
                    secondary-color="#F6F7FB">
                    <rect x="0" y="0" width="128" height="16" rx="1" />
                    <rect x="0" y="148" width="128" height="16" rx="1" />
                    <rect x="0" y="180" width="620" height="42" rx="2" />
                    <rect x="0" y="232" width="620" height="42" rx="2" />
                    <rect x="0" y="284" width="620" height="42" rx="2" />
                    <rect x="0" y="336" width="620" height="42" rx="2" />
                    <rect x="0" y="388" width="620" height="42" rx="2" />
                    <rect x="0" y="28" width="128" height="16" rx="1" />
                    <rect x="0" y="56" width="200" height="50" rx="1" />
                    <rect x="210" y="56" width="200" height="50" rx="1" />
                    <rect x="420" y="56" width="200" height="50" rx="1" />
                </content-loader>
            </div>
        </div>
        <div class="layout-title">
            <slot name="title">
                <div class="title-text">{{ title }}</div>
            </slot>
            <div class="sub-title">
                <slot name="sub-title" />
            </div>
        </div>
        <div ref="content" class="content-wraper" :style="contentStyles">
            <slot />
        </div>
        <div class="layout-footer" :style="footerStyles">
            <slot name="footer" />
        </div>
        <back-top v-if="showContent" :target="getBackTopTarget" />
    </div>
</template>
<script>
    import _ from 'lodash';
    import { ContentLoader } from 'vue-content-loader';
    import { getOffset } from '@utils/assist';
    import BackTop from '@components/back-top';

    export default {
        name: '',
        components: {
            ContentLoader,
            BackTop,
        },
        props: {
            title: String,
            mode: String,
            planName: String,
            loading: {
                type: Boolean,
                default: false,
            },
            bottomOffset: {
                type: Number,
                default: 0,
            },
        },
        data () {
            return {
                showContent: !this.loading,
                layoutOffsetTop: 0,
                contentOffsetTop: 0,
                footerOffsetLeft: 0,
                isFooterFixed: false,
            };
        },
        computed: {
            layoutStyles () {
                return {
                    height: `calc(100vh - ${this.layoutOffsetTop}px - ${this.bottomOffset}px)`,
                };
            },
            contentStyles () {
                return {
                    'max-height': `calc(100vh - ${this.contentOffsetTop}px - 60px - ${this.bottomOffset}px)`,
                };
            },
            footerStyles () {
                const styles = {
                    'padding-left': `${this.footerOffsetLeft}px`,
                };
                if (!this.isFooterFixed) {
                    return styles;
                }
                return {
                    ...styles,
                    'box-shadow': '0px -2px 4px 0px rgba(0, 0, 0, 0.06)',
                };
            },
        },
        watch: {
            loading (loading) {
                if (loading) {
                    this.showContent = false;
                    this.time = Date.now();
                    return;
                }
                
                const spaceTime = Date.now() - this.time;
                setTimeout(() => {
                    this.showContent = true;
                }, spaceTime > 800 ? 0 : 1000 - spaceTime);
            },
        },
        created () {
            this.time = Date.now();
        },
        mounted () {
            window.addEventListener('resize', this.init);
            this.$once('hook:beforeDestroy', () => {
                window.removeEventListener('resize', this.init);
            });
            this.init();
        },
        updated: _.debounce(function () {
            this.init();
        }, 500),
        methods: {
            init () {
                if (!this.$refs.layout || !this.$refs.content || !document.querySelector('#templateStepRender')) {
                    return;
                }
                const offset = getOffset(this.$refs.layout);
                this.layoutOffsetTop = offset.top;
                this.contentOffsetTop = getOffset(this.$refs.content).top;
                setTimeout(() => {
                    const contentScrollHeight = this.$refs.content.scrollHeight;
                    const contentHeight = this.$refs.content.getBoundingClientRect().height;
                    this.isFooterFixed = contentScrollHeight > contentHeight;
                    const layoutOffsetLeft = this.$refs.layout.getBoundingClientRect().left;
                    const offsetTargetOffsetLeft = document.querySelector('#templateStepRender').getBoundingClientRect().left;
                    this.footerOffsetLeft = offsetTargetOffsetLeft - layoutOffsetLeft;
                });
            },
            getBackTopTarget () {
                return this.$refs.content;
            },
        },
    };
</script>
<style lang='postcss' scoped>
    @import "@/css/mixins/scroll";

    .plan-action-layout {
        position: relative;
        padding-right: 24px;
        padding-left: 24px;
        overflow: hidden;
        background: #fff;

        .loading-wraper {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 999;
            width: 100%;
            height: 100%;
            padding-top: 40px;
            padding-left: 40px;
            background: #fff;
            opacity: 100%;
            visibility: visible;

            &.loading-hidden {
                opacity: 0%;
                visibility: hidden;
                transition: visibility 0.7s linear, opacity 0.5s linear;
            }

            .loading-content {
                width: 580px;
            }
        }

        .layout-title {
            display: flex;
            padding-top: 30px;
            padding-bottom: 16px;
            color: #000;
            border-bottom: 1px solid #f0f1f5;

            .title-text {
                padding-bottom: 14px;
                font-size: 18px;
                line-height: 1;
            }

            .sub-title {
                margin-left: auto;
            }
        }

        .content-wraper {
            padding-top: 24px;
            padding-right: 40px;
            margin-right: 2px;
            overflow-y: auto;

            @mixin scroller;
        }

        .layout-footer {
            position: relative;
            display: flex;
            height: 60px;
            margin-right: -24px;
            margin-left: -24px;
            background: #fff;
            align-items: center;
        }
    }
</style>
