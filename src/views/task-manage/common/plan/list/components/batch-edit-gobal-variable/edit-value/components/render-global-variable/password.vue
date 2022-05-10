<template>
    <div>
        <div class="name">
            <span>{{ data.name }}</span>
            <span class="remove-flag" @click="handleRemove">
                <Icon type="reduce-fill" />
            </span>
        </div>
        <bk-input type="password" :value="value" @change="handleChange" />
    </div>
</template>
<script>
    export default {
        name: '',
        props: {
            data: {
                type: Object,
                required: true,
            },
            value: {
                type: String,
            },
        },
        methods: {
            handleRemove () {
                this.$emit('on-remove');
            },
            handleChange (value) {
                this.$emit('on-change', value);
            },
        },
    };
</script>
