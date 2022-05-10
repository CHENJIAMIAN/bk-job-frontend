<template>
    <div class="jb-menu">
        <slot />
    </div>
</template>
<script>
    export default {
        name: 'JbMenu',
        provide () {
            return {
                jbMenu: this,
            };
        },
        props: {
            defaultActive: String,
            flod: {
                type: Boolean,
                default: false,
            },
        },
        data () {
            return {
                activeIndex: this.defaultActive,
            };
        },
        watch: {
            defaultActive (defaultActive) {
                if (!this.items[defaultActive]) {
                    this.activeIndex = null;
                }
            },
        },
        created () {
            this.items = {};
            this.$on('item-click', this.handleItemClick);
        },
        mounted () {
            
        },
        methods: {
            addItem (item) {
                this.items[item.index] = item;
            },
            handleItemClick (item) {
                this.activeIndex = item.index;
                this.$emit('select', item.index);
            },
        },
    };
</script>
<style lang='postcss'>
    .jb-menu {
        font-size: 14px;
        white-space: nowrap;
    }

    .jb-menu-item-group {
        .title {
            height: 40px;
            padding-left: 18px;
            font-size: 12px;
            line-height: 40px;
            color: #66748f;
        }

        &:nth-child(n+2) {
            margin-top: 16px;
        }
    }

    .jb-menu-item {
        height: 38px;
        padding-left: 22px;
        line-height: 38px;
        color: #acb9d1;
        cursor: pointer;

        &:hover {
            color: #acb9d1;
            background: #253047;
        }

        &.active {
            color: #fff;
            background: #3a84ff;

            .job-icon {
                color: #fff;
            }
        }

        &.flod {
            width: 100%;
            overflow: hidden;
        }

        .job-icon {
            margin-right: 19px;
            font-size: 16px;
            color: #b0bdd5;
        }
    }
</style>
