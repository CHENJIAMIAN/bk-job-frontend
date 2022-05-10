<template>
    <div :class="{ 'variable-value-error': isError }">
        <bk-input
            ref="input"
            :value="value"
            :readonly="readonly"
            @change="handleChange"
            v-bk-tooltips="descPopover" />
        <p v-if="isError" class="variable-error">{{ '该变量的值必填' }}</p>
    </div>
</template>
<script>
    export default {
        props: {
            data: {
                type: Object,
                required: true,
            },
            placement: {
                type: String,
                required: true,
            },
            readonly: {
                type: Boolean,
                default: false,
            },
        },
        data () {
            return {
                showError: false,
                value: '',
            };
        },
        computed: {
            isError () {
                if (this.data.required !== 1) {
                    return false;
                }
                return !this.value;
            },
            descPopover () {
                return {
                    theme: 'light',
                    extCls: 'variable-desc-tippy',
                    trigger: 'click mouseenter',
                    hideOnClick: false,
                    content: this.data.description,
                    disabled: !this.data.description,
                };
            },
        },
        watch: {
            placement (newVal) {
                // eslint-disable-next-line no-underscore-dangle
                if (this.data.description) this.$refs.input.$el._tippy.set({ placement: newVal });
            },
        },
        created () {
            this.init();
        },
        methods: {
            init () {
                this.value = this.data.defaultValue || this.data.value;
            },
            handleChange (value) {
                this.value = value.trim();
                window.changeAlert = true;
            },
            reset () {
                this.init();
            },
            validate () {
                const { type, id, name } = this.data;
                const data = {
                    id,
                    name,
                    type,
                    value: this.value,
                    server: {},
                };
                return new Promise((resolve, reject) => {
                    if (this.isError) {
                        return reject(new Error('string error'));
                    }
                    resolve(data);
                });
            },
        },
    };
</script>
