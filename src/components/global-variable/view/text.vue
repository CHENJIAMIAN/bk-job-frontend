<template>
    <span>
        {{ data.defaultValue }}
    </span>
</template>
<script>
    export default {
        props: {
            data: {
                type: Object,
                required: true,
            },
        },
    };
</script>
