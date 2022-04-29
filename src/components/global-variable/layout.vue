

<template>
    <div ref="layout" :class="classes">
        <slot />
    </div>
</template>
<script>
    export default {
        name: 'GlobalVariableLayout',

        props: {
            type: {
                type: String,
                default: 'horizontal', // 水平：horizontal；垂直：vertical
            },
        },
        computed: {
            classes () {
                const classes = {
                    'global-variable-layout': true,
                };
                if (this.type !== 'horizontal') {
                    classes.vertical = true;
                }
                return classes;
            },
        },
        updated () {
            const childrenNum = this.$slots.default;
            if (this.childrenNum !== childrenNum) {
                this.childrenNum = childrenNum;
                this.init();
            }
        },
        mounted  () {
            if (this.type === 'horizontal') {
                this.init();
            }
        },
        methods: {
            init () {
                const isShowLayout = this.$refs.layout.getBoundingClientRect().width > 0;
                if (!isShowLayout) {
                    return;
                }
                const $formEle = this.$refs.layout;
                let max = 0;
                const $labelEleList = $formEle.querySelectorAll('.variable-name');
                $labelEleList.forEach((item) => {
                    const { width } = item.querySelector('span').getBoundingClientRect();
                    max = Math.max(max, width);
                });
                $labelEleList.forEach((item) => {
                    item.style.width = `${max}px`;
                });
            },
        },
    };
</script>
<style lang='postcss'>
    .global-variable-layout {
        display: flex;
        flex-direction: column;

        &.vertical {
            .global-variable-edit-box {
                flex-direction: column;
            }

            .variable-name {
                text-align: left;
            }
        }
    }
</style>
