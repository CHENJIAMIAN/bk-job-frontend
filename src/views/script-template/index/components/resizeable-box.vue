

<template>
    <div ref="handle" class="resizeable-box" :style="styles">
        <slot />
        <div
            class="mouse-flag"
            @mousedown="handleMousedown">
            <Icon type="many-dot" />
        </div>
    </div>
</template>
<script>
    import _ from 'lodash';

    export default {
        props: {
            /**
             * @desc 父容器的宽度
             */
            parentWidth: {
                type: Number,
                default: window.innerWidth,
            },
            /**
             * @desc 可变容器的默认宽度
             */
            width: {
                type: Number,
                default: 400,
            },
        },
        data () {
            return {
                styles: {
                    width: `${this.width}px`,
                },
            };
        },
        created () {
            this.moveStartWidth = this.width;
            this.isResizeable = false;
            this.handleMousemove = _.throttle(this.eventMousemove, 30);
        },
        mounted () {
            document.body.addEventListener('mousemove', this.handleMousemove);
            document.body.addEventListener('mouseup', this.handleMouseup);
            this.$once('hook:beforeDestroy', () => {
                document.body.removeEventListener('mousemove', this.handleMousemove);
                document.body.removeEventListener('mouseup', this.handleMouseup);
            });
        },
        methods: {
            /**
             * @desc mousedown 事件，记录鼠标按下时容器的宽度
             * @param {Object} event
             */
            handleMousedown (event) {
                this.isResizeable = true;
                this.screenX = event.screenX;
                this.moveStartWidth = this.$refs.handle.getBoundingClientRect().width;
                document.body.style.userSelect = 'none';
            },
            /**
             * @desc mouseup 事件，取消可拖动特性
             */
            handleMouseup () {
                this.isResizeable = false;
                document.body.style.userSelect = '';
            },
            /**
             * @desc mousemove 事件，动态更新容器宽度
             * @param {Object} event
             */
            eventMousemove (event) {
                if (!this.isResizeable) {
                    return;
                }
                const MAX_WIDTH = Math.max(0.8 * this.parentWidth, this.parentWidth - 200);
                const MIN_WIDTH = Math.min(0.1 * this.parentWidth, 200);
                const { screenX } = event;
                const newWidth = this.screenX - screenX + this.moveStartWidth;
                if (newWidth > MAX_WIDTH || newWidth < MIN_WIDTH) {
                    return;
                }
                this.styles = {
                    width: `${newWidth}px`,
                };
                this.$emit('on-resize');
            },
        },
    };
</script>
<style lang='postcss'>
    .resizeable-box {
        position: relative;
        height: 100%;

        .mouse-flag {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 1;
            display: flex;
            width: 3px;
            padding-left: 3px;
            font-size: 23px;
            color: #63656e;
            cursor: col-resize;
            align-items: center;

            &:hover {
                background: gray;
            }
        }
    }
</style>
