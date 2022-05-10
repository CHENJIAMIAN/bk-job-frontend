<template>
    <div class="jb-menu-item-group">
        <div class="title">
            <slot v-if="!isFlod" name="title" />
            <slot v-if="isFlod" name="flod-title" />
        </div>
        <slot />
    </div>
</template>
<script>
    export default {
        name: 'JbMenuItemGroup',
        inject: ['jbMenu'],
        computed: {
            isFlod () {
                return this.jbMenu.flod;
            },
        },
    };
</script>
