

<template>
    <bk-dialog
        v-bind="$attrs"
        v-on="$listeners"
        :value="isShow"
        :width="renderWidth"
        :draggable="false"
        :show-footer="showFooter"
        :title="title"
        :before-close="beforeClose"
        @input="handleInputValue">
        <template v-if="isRender">
            <slot />
        </template>
        <template #footer v-if="showFooter">
            <slot name="footer">
                <div class="jb-dialog-footer">
                    <bk-button
                        theme="primary"
                        class="mr10"
                        :loading="isSubmiting"
                        @click="handleConfirm">
                        {{ okText }}
                    </bk-button>
                    <bk-button @click="handleCancel">{{ cancelText }}</bk-button>
                </div>
            </slot>
        </template>
    </bk-dialog>
</template>
<script>
       import { leaveConfirm } from '@utils/assist';

    export default {
        name: 'JbDialog',
        inheritAttrs: false,
        props: {
            value: Boolean,
            width: Number,
            title: String,
            media: {
                type: Array,
                default: () => [],
            },
            okText: {
                type: String,
                default: '保存',
            },
            cancelText: {
                type: String,
                default: '取消',
            },
            showFooter: {
                type: Boolean,
                default: true,
            },
        },
        data () {
            return {
                isShow: false,
                isRender: false,
                isSubmiting: false,
                renderWidth: this.width,
            };
        },
        watch: {
            value: {
                handler (val) {
                    // settimeout 解决 bk-dialog 默认显示没有遮罩的 bug
                    setTimeout(() => {
                        if (val) {
                            this.isRender = true;
                            this.pageChangeAlertMemo = window.changeAlert;
                            window.changeAlert = 'dialog';
                            this.calcMediaWidth();
                        }
                        this.isShow = val;
                    });
                },
                immediate: true,
            },
        },
        created () {
            this.pageChangeAlertMemo = false;
        },
        mounted () {
            window.addEventListener('resize', this.calcMediaWidth);
            this.$once('hook:beforeDestroy', () => {
                window.removeEventListener('resize', this.calcMediaWidth);
            });
        },
        methods: {
            /**
             * @desc 计算响应式宽度
             */
            calcMediaWidth () {
                let renderWidth = this.width;
                if (!this.media.length) {
                    renderWidth = this.width;
                } else {
                    const queryRange = [
                        1366, 1680, 1920, 2560,
                    ];
                    const { clientWidth } = document.documentElement;
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < queryRange.length; i++) {
                        if (queryRange[i] < clientWidth) {
                            renderWidth = this.media[i];
                        } else {
                            break;
                        }
                    }
                }

                this.renderWidth = renderWidth;
            },
            /**
             * @desc 检测提供给dialog的交互组件目标
             *
             * 判断条件为有没有提供submit方法
             */
            checkHandle () {
                // 可以绑定子组件的条件是子组件有提供submit methods
                const handle = {
                    submit: () => Promise.resolve(),
                    reset: () => Promise.resolve(),
                };
                const [{ $children }] = this.$children;
                $children.forEach((child) => {
                    if (typeof child.submit === 'function') {
                        handle.submit = child.submit;
                        if (typeof child.reset === 'function') {
                            handle.reset = child.reset;
                        }
                    }
                });
                return handle;
            },
            beforeClose () {
                return leaveConfirm();
            },
            /**
             * @desc 关闭弹框
             */
            close () {
                window.changeAlert = this.pageChangeAlertMemo;
                this.$emit('input', false);
                this.$emit('change', false);
            },
            /**
             * @desc 关闭弹框
             */
            handleCancel () {
                leaveConfirm()
                    .then(() => this.checkHandle().reset())
                    .then(() => this.close())
                    .catch(_ => _);
            },
            /**
             * @desc 弹框的确认操作
             */
            handleConfirm () {
                this.isSubmiting = true;
                // submit 有可能返回不是 Promise, 用 Promise 包裹兼容这种情况
                Promise.resolve(this.checkHandle().submit())
                    .then(() => {
                        window.changeAlert = false;
                        this.close();
                    })
                    .finally(() => {
                        this.isSubmiting = false;
                    });
            },
            handleInputValue () {
                this.close();
            },
        },
    };
</script>
