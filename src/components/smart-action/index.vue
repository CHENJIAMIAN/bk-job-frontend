
<template>
    <!-- 内容+下面两个按钮(action区) -->
    <div ref="root">
        <div>
            <slot />
        </div>
        <div
            ref="placeholder"
            :style="placeholderStyles"
            role="placeholder">
            <div
                ref="action"
                v-show="isPlaceholderShow"
                :class="dymaicClasses"
                :style="dymaicStyles"
                role="action">
                <div :style="actionContentstyles">
                    <slot name="action" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import _ from 'lodash';

    export default {
        props: {
            offsetTarget: {
                type: String,
            },
            fill: {
                type: Number,
                default: 0,
            },
        },
        data () {
            return {
                isPlaceholderShow: false,
                isFixed: false,
                paddingLeft: 0,
                offsetLeft: 0,
            };
        },
        computed: {
            /**
             * @desc 操作按钮站位区域的样式
             * @returns {Object}
            */
            placeholderStyles () {
                return {
                    height: this.isFixed ? '50px' : 'auto',
                };
            },
            /**
             * @desc 动态定位块的 class
             * @returns {String}
            */
            dymaicClasses () {
                return this.isFixed ? 'smart' : '';
            },
            /**
             * @desc 动态定位块的 style
             * @returns {Object}
            */
            dymaicStyles () {
                return {
                    'padding-left': this.isFixed ? `${this.paddingLeft}px` : '0',
                };
            },
            /**
             * @desc 内容区的 style
             * @returns {Object}
            */
            actionContentstyles () {
                return {
                    'padding-left': `${this.offsetLeft + this.fill}px`,
                };
            },
        },
        mounted () {
            window.addEventListener('resize', this.smartPosition);
            const observer = new MutationObserver(() => {
                this.calcOffsetLeft();
                this.smartPosition();
            });
            observer.observe(document.querySelector('body'), {
                subtree: true,
                childList: true,
                attributeName: true,
                characterData: true,
            });
            this.$once('hook:beforeDestroy', () => {
                observer.takeRecords();
                observer.disconnect();
                window.removeEventListener('resize', this.smartPosition);
            });
            this.calcOffsetLeft();
            this.smartPosition();
        },
        beforeDestroy () {
            if (this.$refs.action) {
                this.$refs.action.parentNode.removeChild(this.$refs.action);
            }
        },
        methods: {
            /**
             * @desc action 内容区相对 offsetTarget 的偏移位置
            */
            calcOffsetLeft: _.debounce(function () {
                if (!this.offsetTarget || !this.$refs.placeholder) {
                    return;
                }
                const $target = document.querySelector(`.${this.offsetTarget}`);
                if (!$target) {
                    return;
                }
                const placeholderLeft = this.$refs.placeholder.getBoundingClientRect().left;
                const offsetTargetLeft = $target.getBoundingClientRect().left;
                this.offsetLeft = offsetTargetLeft - placeholderLeft;
            }, 50),
            /**
             * @desc 当 placeholder 块是 fixed 效果时，修正左边位置的 paddingLeft
            */
            smartPosition: _.throttle(function () {
                if (!this.$refs.placeholder) {
                    return;
                }
                const {
                    height,
                    top,
                    left,
                } = this.$refs.placeholder.getBoundingClientRect();
                this.isFixed = height + top + 20 > window.innerHeight;
                this.paddingLeft = left;
                setTimeout(() => {
                    this.isPlaceholderShow = true;
                    if (this.isFixed) {
                        if (this.$refs.action.parentNode !== document.body) {
                            document.body.appendChild(this.$refs.action);
                        }
                    } else {
                        if (this.$refs.action.parentNode !== this.$refs.placeholder) {
                            this.$refs.placeholder.appendChild(this.$refs.action);
                        }
                    }
                });
            }, 300),
        },
    };
</script>
<style lang="postcss" scoped>
    .smart {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 998;
        display: flex;
        height: 52px;
        background: #fff;
        box-shadow: 0 -2px 4px 0 rgb(0 0 0 / 6%);
        align-items: center;
    }
</style>
