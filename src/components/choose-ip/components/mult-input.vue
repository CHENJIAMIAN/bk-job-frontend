<template>
    <div class="mult-input">
        <div
            ref="input"
            class="input-text-area"
            contenteditable="true"
            :style="stylees"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @paste="handlePaste" />
        <div v-if="showPlaceholder" class="mult-input-placeholder" @click="handleInputFocus">{{ placeholder }}</div>
    </div>
</template>
<script>
    export default {
        name: '',
        props: {
            value: {
                type: String,
                default: '',
            },
            placeholder: String,
        },
        data () {
            return {
                localValue: this.value,
                focused: false,
            };
        },
        computed: {
            stylees () {
                const styles = {};
                if (this.focused) {
                    styles['z-index'] = 9999;
                } else {
                    styles.height = '30px';
                    styles.overflow = 'hidden';
                    styles['white-space'] = 'pre';
                    styles['text-overflow'] = 'ellipsis';
                }
                return styles;
            },
            showPlaceholder () {
                if (this.focused) {
                    return false;
                }
                return !this.localValue;
            },
        },
        methods: {
            handleInputFocus () {
                this.$refs.input.focus();
                setTimeout(() => {
                    this.$refs.input.selectionStart = this.localValue.length;
                    this.$refs.input.selectionEnd = this.localValue.length;
                });
            },
            handleInput (event) {
                const value = event.target.outerText;
                this.localValue = value;
                this.$emit('input', value);
                this.$emit('change', value);
            },
            handleFocus () {
                this.focused = true;
            },
            handleBlur () {
                this.focused = false;
                this.$refs.input.scrollTop = 0;
            },
            handlePaste (e) {
                e.preventDefault();
                e.stopPropagation();
                let text = '';
                const event = (e.originalEvent || e);
                if (event.clipboardData && event.clipboardData.getData) {
                    text = event.clipboardData.getData('text/plain');
                } else if (window.clipboardData && window.clipboardData.getData) {
                    text = window.clipboardData.getData('Text');
                }
                if (document.queryCommandSupported('insertText')) {
                    document.execCommand('insertText', false, text);
                } else {
                    document.execCommand('paste', false, text);
                }
            },
        },
    };
</script>
<style lang='postcss'>
    .mult-input {
        position: relative;
        height: 30px;
        padding: 0 10px;
        font-size: 12px;
        line-height: 1.5;
        word-break: break-all;
        cursor: pointer;
        background: #fff;

        .input-text-area {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            max-height: 300px;
            min-height: 32px;
            padding: 6px 10px;
            overflow-y: scroll;
            font-size: 12px;
            color: #63656e;
            background: inherit;
            border: 1px solid #c4c6cc;
            border-radius: 2px;
            outline: none;
        }

        .mult-input-placeholder {
            position: absolute;
            top: 1px;
            right: 1px;
            bottom: 1px;
            left: 1px;
            padding: 6px 10px;
            color: #c4c6cc;
            background: inherit;
        }
    }
</style>
