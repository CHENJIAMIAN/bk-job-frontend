

<template>
    <div :class="classes" v-test="{ type: 'navigation', value: index }" @click="handleClick">
        <slot />
    </div>
</template>
<script>
    export default {
        name: 'JbMenuItem',
        inject: ['jbMenu'],
        props: {
            index: {
                type: String,
                required: true,
            },
        },
        data () {
            return {};
        },
        computed: {
            active () {
                return this.index === this.jbMenu.activeIndex;
            },
            classes () {
                return {
                    'jb-menu-item': true,
                    active: this.index === this.jbMenu.activeIndex,
                    flod: this.jbMenu.flod,
                };
            },
        },
        watch: {
            $route: {
                handler  (route) {
                    route.matched.forEach((currentMatch) => {
                        if (currentMatch.name === this.index) {
                            this.jbMenu.activeIndex = this.index;
                        }
                    });
                },
                immediate: true,
            },
        },
        mounted () {
            this.jbMenu.addItem(this);
        },
        methods: {
            handleClick () {
                this.jbMenu.$emit('item-click', this);
                this.$emit('click', this);
            },
        },
    };
</script>
