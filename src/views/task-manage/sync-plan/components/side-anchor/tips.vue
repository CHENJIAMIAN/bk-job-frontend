

<template>
    <div class="sync-plan-side-anchor-tips" :style="styles" ref="tips">
        <div class="wraper" ref="content">
            {{ data.name }}
        </div>
    </div>
</template>
<script>
    import {
        getScrollParent,
    } from '@utils/assist';

    export default {
        props: {
            data: {
                type: Object,
                required: true,
            },
        },
        data () {
            return {
                position: 'left',
                top: 0,
                left: 0,
            };
        },
        computed: {
            styles () {
                return {
                    position: 'absolute',
                    top: `${this.top}px`,
                    left: `${this.left}px`,
                    'z-index': window.__bk_zIndex_manager.nextZIndex(), // eslint-disable-line no-underscore-dangle
                };
            },
        },
        mounted () {
            this.$target = document.querySelector('.sync-plan-side-anchor').querySelector(`[data-anchor="${this.data.target}"]`);
            const scrollParent = getScrollParent(this.$target);
            if (scrollParent) {
                scrollParent.addEventListener('scroll', this.calcPosition);
                this.$once('hook:beforeDestroy', () => {
                    scrollParent.removeEventListener('scroll', this.calcPosition);
                });
            }
            
            this.init();
        },
        beforeDestroy () {
            try {
                if (this.$refs.detail) {
                    document.body.removeChild(this.$refs.detail);
                }
            } catch (error) {}
        },
        methods: {
            init () {
                this.$nextTick(() => {
                    this.calcPosition();
                });
                document.body.appendChild(this.$refs.tips);
            },
            calcPosition () {
                const tipsHeight = this.$refs.tips.getBoundingClientRect().height;
                const { top, left, height } = this.$target.getBoundingClientRect();
                this.top = top - (tipsHeight - height) / 2;
                this.left = left;
            },
        },
    };
</script>
<style lang='postcss'>
    .sync-plan-side-anchor-tips {
        position: relative;
        margin-left: -10px;
        color: #fff;
        border-radius: 4px;
        transform: translateX(-100%);

        &.arrow-position-right {
            &::before {
                right: 128px;
                left: unset;
            }
        }

        &::after {
            position: absolute;
            top: 50%;
            right: -5px;
            width: 11px;
            height: 11px;
            background: #333;
            content: "";
            transform: translateY(-50%) rotateZ(45deg);
            box-shadow: 0 0 5px 0 rgb(0 0 0 / 9%);
        }

        .wraper {
            position: relative;
            padding: 7px 14px;
            font-size: 12px;
            white-space: nowrap;
            background: #333;
            border-radius: 4px;
        }
    }
</style>
