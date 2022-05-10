<template>
    <div ref="layout" class="plan-list-page-layout" :class="{ toggled: isOpen }">
        <div class="layout-left">
            <div class="left-wraper" :style="styles">
                <slot />
            </div>
            <div v-if="flod" class="toggle-button" @click="handleToggle">
                <Icon type="down-small" class="toggle-arrow" />
            </div>
        </div>
        <div v-if="flod" class="layout-right">
            <div class="right-wraper" :class="{ active: isShowRight }">
                <slot v-if="isShowRight" name="flod" />
            </div>
            <div class="close-btn" @click="handleClose">
                <Icon type="close-big" />
            </div>
        </div>
    </div>
</template>
<script>
    import {
        leaveConfirm,
    } from '@utils/assist';

    export default {
        name: '',
        props: {
            flod: {
                type: Boolean,
                default: false,
            },
        },
        data () {
            return {
                isShowRight: false,
                isOpen: false,
                layoutWidth: 'auto',
            };
        },
        computed: {
            styles () {
                if (this.flod) {
                    return {
                        width: '370px',
                    };
                }
                return {
                    width: this.layoutWidth,
                };
            },
        },
        watch: {
            flod: {
                handler (flod) {
                    if (flod) {
                        setTimeout(() => {
                            this.isShowRight = flod;
                        }, 110);
                    } else {
                        this.isShowRight = false;
                    }
                },
                immediate: true,
            },
        },
        mounted () {
            this.calcWidth();
            window.addEventListener('resize', this.calcWidth);
            this.$once('hook:beforeDestroy', () => {
                window.removeEventListener('resize', this.calcWidth);
            });
        },
        methods: {
            calcWidth () {
                const layoutWidth = this.$refs.layout.getBoundingClientRect().width;
                this.layoutWidth = `${layoutWidth}px`;
            },
            handleToggle () {
                this.isOpen = !this.isOpen;
            },
            handleClose () {
                leaveConfirm()
                    .then(() => {
                        this.isOpen = false;
                        this.$emit('on-flod');
                        this.$emit('update:flod', false);
                    });
            },
        },
    };
</script>
<style lang='postcss'>
    .plan-list-page-layout {
        display: flex;

        &.toggled {
            margin-left: -24px;

            .left-wraper {
                width: 0 !important;
            }

            .toggle-button {
                .toggle-arrow {
                    transform: rotateZ(-90deg);
                }
            }

            .layout-right {
                margin-left: 24px;
            }
        }

        .layout-left {
            position: relative;
            z-index: 9;
            background: #fff;
            border: 1px solid #dfe0e5;
            transition: all 0.15s;
            flex: 0 0 auto;

            .left-wraper {
                transition: all 0.1s;
            }

            .bk-table::before {
                content: unset;
            }

            .toggle-button {
                position: absolute;
                top: 50%;
                right: -14px;
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
            }

            .toggle-arrow {
                transform: rotateZ(90deg);
            }
        }

        .layout-right {
            position: relative;
            z-index: 1;
            margin-left: 10px;
            background: #fff;
            border: 1px solid #dfe0e5;
            border-radius: 2px;
            transition: all 0.15s;
            flex: 1;

            .right-wraper {
                opacity: 0%;
                transition: all 0.5s;

                &.active {
                    opacity: 100%;
                }
            }

            .close-btn {
                position: absolute;
                top: 8px;
                right: 8px;
                display: flex;
                width: 26px;
                height: 26px;
                font-size: 16px;
                color: #c4c6cc;
                cursor: pointer;
                border-radius: 50%;
                align-items: center;
                justify-content: center;

                &:hover {
                    background-color: #f0f1f5;
                }
            }
        }
    }
</style>
