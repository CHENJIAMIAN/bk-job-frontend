

<template>
    <div class="exection-status-bar" :class="[data.displayStyle]">
        <component :is="themeCom" :data="data" :title-max-width="titleMaxWidth">
            <slot />
        </component>
    </div>
</template>
<script>
    import Task from './task';
    import Step from './step';

    export default {
        name: '',
        components: {
            Task,
            Step,
        },
        props: {
            type: {
                type: String,
                required: true,
            },
            data: {
                type: Object,
                default: () => ({}),
            },
        },
        data () {
            return {
                titleMaxWidth: 100,
                offsetRight: 'unset',
                initialStatusWidth: 0,
            };
        },
        computed: {
            themeCom () {
                const comMap = {
                    task: Task,
                    step: Step,
                };
                if (!Object.prototype.hasOwnProperty.call(comMap, this.type)) {
                    return 'div';
                }
                return comMap[this.type];
            },
        },
        mounted () {
            const $container = document.querySelector('#sitePageTitle');
            const containerWidth = $container.getBoundingClientRect().width;
            const $target = document.querySelector('#siteHeaderStatusBar');

            $target.appendChild(this.$el);
            const statusWidth = $target.getBoundingClientRect().width;
            if (!this.initialStatusWidth) {
                this.initialStatusWidth = statusWidth;
            }
            
            const titleMaxWidth = containerWidth - statusWidth - 40;
            this.titleMaxWidth = titleMaxWidth < 100 ? 100 : titleMaxWidth;

            this.$once('hook:beforeDestroy', () => {
                if (!this.$el) {
                    return;
                }
                try {
                    $target.removeChild(this.$el);
                } catch {}
            });
        },
    };
</script>
<style lang='postcss'>
    .exection-status-bar {
        flex: 1;
        font-size: 14px;
        color: #63656e;
        white-space: nowrap;

        &.fail,
        &.confirm-forced {
            .status-text {
                color: #ea3636;
            }
        }

        &.loading {
            .status-text {
                color: #3a84ff;
            }
        }

        &.ingore {
            .status-text {
                color: #abd88a;
            }
        }

        &.success,
        &.forced {
            .status-text {
                color: #2dcb8d;
            }
        }

        &.confirm {
            .status-text {
                color: #ff9c01;
            }
        }

        &.disable {
            .status-text {
                color: #c4c6cc;
            }
        }

        .title {
            display: flex;
            align-items: center;
            margin-right: 54px;
            font-size: 12px;

            .title-text {
                height: 21px;
            }
        }

        .status-box {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 500px;
            transform: translateX(-50%);
        }

        .status {
            margin-right: 30px;
        }

        .time {
            min-width: 120px;
            padding-right: 10px;

            .value {
                display: inline-block;
                color: #313238;
            }
        }

        .step-instance-action {
            margin-right: 0;
        }
    }
</style>
