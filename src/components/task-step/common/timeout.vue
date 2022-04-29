

<template>
    <div>
        <jb-form-item :label="$t('超时时长')">
            <div
                class="form-item-content"
                @mouseenter="handleMouseenter"
                @mouseleave="handleMouseleave">
                <bk-input
                    ref="input"
                    type="number"
                    :value="formData[field]"
                    :palceholder="$t('此处留空将默认为7200s')"
                    :min="1"
                    :max="86400"
                    :precision="0"
                    @focus="handleInputFocus"
                    @blur="handleInputBlur"
                    @change="handleChange">
                    <template slot="append">
                        <div class="group-text">s</div>
                    </template>
                </bk-input>
            </div>
        </jb-form-item>
        <div style="display: none;">
            <div
                ref="tips"
                @mouseleave="handleMouseleave"
                @mouseenter="handleTipsMouseenter">
                {{ $t('允许最小 1s，最大为 86400s') }}
            </div>
        </div>
    </div>
</template>
<script>
    import Tippy from 'bk-magic-vue/lib/utils/tippy';

    export default {
        props: {
            field: {
                type: String,
                required: true,
            },
            formData: {
                type: Object,
                default: () => ({}),
            },
        },
        methods: {
            /**
             * @desc 显示tips
             */
            showTips () {
                if (!this.popperInstance) {
                    this.popperInstance = Tippy(this.$refs.input.$el, {
                        arrow: true,
                        placement: 'right',
                        trigger: 'manual',
                        theme: 'light',
                        interactive: true,
                        hideOnClick: false,
                        animation: 'slide-toggle',
                        lazy: false,
                        size: 'small',
                        boundary: 'window',
                        distance: 20,
                        zIndex: window.__bk_zIndex_manager.nextZIndex(), // eslint-disable-line no-underscore-dangle
                    });
                    this.popperInstance.setContent(this.$refs.tips);
                }
                
                this.popperInstance.show();
            },
            /**
             * @desc 隐藏tips
             */
            hideTips () {
                if (this.isMouseenter) {
                    return;
                }
                this.popperInstance.hide();
            },
            /**
             * @desc 鼠标移入的时候显示tips
             */
            handleMouseenter () {
                clearTimeout(this.hideTimer);
                this.showTips();
            },
            /**
             * @desc 鼠标移出的时候隐藏tips
             */
            handleMouseleave () {
                this.isMouseenter = false;
                this.hideTimer = setTimeout(() => {
                    if (!this.isInputFocus) {
                        this.hideTips();
                    }
                }, 100);
            },
            /**
             * @desc 获得焦点是显示ips
             */
            handleInputFocus () {
                this.isInputFocus = true;
                this.showTips();
            },
            /**
             * @desc 失去焦点是显示ips
             */
            handleInputBlur () {
                this.isInputFocus = false;
                this.hideTips();
            },
            /**
             * @desc 鼠标在tips内部时取消隐藏tips定时器
             */
            handleTipsMouseenter () {
                clearTimeout(this.hideTimer);
                this.isMouseenter = true;
            },
            handleChange (value) {
                this.$emit('on-change', this.field, value);
            },
        },
    };
</script>
