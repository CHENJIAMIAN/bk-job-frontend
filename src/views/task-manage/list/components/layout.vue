

<template>
    <div ref="handler" class="task-layout">
        <div
            :class="{
                'layout-left': true,
                expended: isOpen,
            }">
            <scroll-faker :style="styles">
                <div>
                    <slot name="tag" />
                </div>
            </scroll-faker>
        </div>
        <div class="layout-right">
            <div class="toggle-button" @click="handleToggle">
                <Icon type="down-small" class="toggle-arrow" :class="{ open: isOpen }" />
            </div>
            <slot />
        </div>
    </div>
</template>
<script>
    import { getOffset } from '@utils/assist';
    const TASK_TAG_PANEL_TOGGLE = 'task_tag_panel_toggle';

    export default {
        data () {
            let isOpen = localStorage.getItem(TASK_TAG_PANEL_TOGGLE);
            if (!isOpen) {
                isOpen = true;
            } else {
                isOpen = JSON.parse(isOpen);
            }
            
            return {
                isOpen,
                styles: {},
            };
        },
        mounted () {
            const {
                top,
            } = getOffset(this.$refs.handler);
            this.styles = {
                height: `calc(100vh  - ${top}px)`,
            };
        },
        methods: {
            handleToggle () {
                this.isOpen = !this.isOpen;
                localStorage.setItem(TASK_TAG_PANEL_TOGGLE, JSON.stringify(this.isOpen));
            },
        },
    };
</script>
<style lang='postcss'>
    @import "@/css/mixins/media";

    .task-layout {
        display: flex;

        .layout-left {
            position: relative;
            width: 0;
            background: #fafbfd;
            border-right: 1px solid #ecedf3;
            transition: width 0.2s linear;

            &.expended {
                @media (--small-viewports) {
                    width: 200px;
                }

                @media (--medium-viewports) {
                    width: 240px;
                }

                @media (--large-viewports) {
                    width: 280px;
                }

                @media (--huge-viewports) {
                    width: 280px;
                }
            }
        }

        .layout-right {
            position: relative;
            width: calc(100% - 280px);
            padding: 24px;
            background: #fff;
            box-sizing: border-box;
            flex: 1 0 auto;

            .toggle-button {
                position: absolute;
                top: 50%;
                left: -1px;
                display: flex;
                width: 14px;
                height: 64px;
                font-size: 24px;
                color: #fff;
                cursor: pointer;
                background: #dcdee5;
                border-top-right-radius: 6px;
                border-bottom-right-radius: 6px;
                transform: translateY(-50%);
                align-items: center;
                justify-content: center;

                &:hover {
                    background: #c4c6cc;
                }

                .toggle-arrow {
                    transform: rotateZ(-90deg);

                    &.open {
                        transform: rotateZ(90deg);
                    }
                }
            }
        }
    }
</style>
