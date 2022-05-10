<template>
    <div class="task-execute-bar-step-description-popover">
        <div>
            {{ data.typeDesc }}:<span class="value">{{ data.name }}</span>
        </div>
        <div>
            {{ '步骤状态' }}:<span class="value" :class="[data.displayStyle]">{{ data.statusDesc }}</span>
        </div>
        <div>
            {{ '步骤耗时' }}:<span class="value">{{ data.totalTimeText }}</span>
        </div>
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
        },
    };
</script>
<style lang='postcss'>
    .task-execute-bar-step-description-popover {
        padding: 0.3rem 0.6rem;

        &::before {
            position: absolute;
            top: 50%;
            left: -6px;
            width: 10px;
            height: 10px;
            margin-top: -8px;
            background: #fff;
            border: none;
            border: 1px solid #dcdee5;
            border-right: none;
            border-bottom: none;
            content: "";
            transform: translateY(-50%) rotateZ(-45deg);
        }

        .value {
            margin-left: 1em;

            &.loading {
                color: #3a84ff;
            }

            &.success {
                color: #2dcb9d;
            }

            &.disabled {
                color: #c4c6cc;
            }

            &.fail,
            &.forced {
                color: #ff5656;
            }

            &.confirm {
                color: #ff9c01;
            }
        }
    }
</style>
