

<template>
    <div class="diff-task-step" :class="classes" :id="`${type}_step_${data.id}`">
        <div class="name">
            <div class="type-flag">
                <Icon :type="data.icon" />
            </div>
            {{ data.name }}
        </div>
        <div class="info">
            <div class="row" :class="diffValue.type">
                <span class="label">{{ '步骤类型：' }}</span>
                <span class="value">{{ data.typeText }}</span>
            </div>
            <div class="row" :class="diffValue.name">
                <span class="label">{{ '步骤名称：' }}</span>
                <span class="value">{{ data.name }}</span>
            </div>
            <component
                :is="infoCom"
                :id="data.realId"
                :data="info"
                :diff="diffValue"
                v-bind="$attrs" />
        </div>
    </div>
</template>
<script>
    import TaskStepModel from '@model/task/task-step';
    import TypeScript from './script';
    import TypeFile from './file';
    import TypeApproval from './approval';

    const comMap = {
        [TaskStepModel.TYPE_SCRIPT]: TypeScript,
        [TaskStepModel.TYPE_FILE]: TypeFile,
        [TaskStepModel.TYPE_APPROVAL]: TypeApproval,
    };

    export default {
        name: 'DiffTaskStep',
        inheritAttrs: false,
        props: {
            data: {
                type: Object,
                required: true,
            },
            diff: {
                type: Object,
                default: () => ({}),
            },
            type: {
                type: String,
                default: '',
            },
        },
        computed: {
            infoCom () {
                return comMap[this.data.type];
            },
            info () {
                const fieldMap = {
                    [TaskStepModel.TYPE_SCRIPT]: 'scriptStepInfo',
                    [TaskStepModel.TYPE_FILE]: 'fileStepInfo',
                    [TaskStepModel.TYPE_APPROVAL]: 'approvalStepInfo',
                };
                return this.data[fieldMap[this.data.type]];
            },
            classes () {
                const diffKey = `${this.data.realId}`;
                if (this.diff[diffKey]) {
                    return this.diff[diffKey].type;
                }
                return '';
            },
            diffValue () {
                const diffKey = `${this.data.realId}`;
                if (this.diff[diffKey]) {
                    return this.diff[diffKey].value || {};
                }
                return {};
            },
        },
    };
</script>
<style lang='postcss'>
    html[lang="en-US"] {
        .diff-task-step {
            .info {
                .label {
                    flex-basis: 100px;
                }
            }
        }
    }

    .diff-task-step {
        color: #63656e;

        &.new {
            position: relative;

            .name {
                display: flex;
                align-items: center;

                &::after {
                    width: 28px;
                    height: 14px;
                    margin-left: 10px;
                    font-size: 12px;
                    line-height: 14px;
                    color: #fff;
                    text-align: center;
                    background: #ffa86e;
                    content: "new";
                }
            }
        }

        &.delete {
            color: #c4c6cc;
            text-decoration: line-through;
        }

        .changed {
            .value,
            .ip-text {
                padding: 0 3px;
                background: #fddfcb;
            }

            .sync-plan-step-variable {
                padding: 3px 5px;
                background: #fddfcb;

                .variable-flag {
                    background: #f0c581;
                }

                .variable-name {
                    border-color: #f0c581;
                }
            }

            .sync-plan-script-content {
                .sript-content-text {
                    padding: 0 3px;
                    background: #fddfcb;
                }
            }

            .value-inline-block {
                display: inline-block;
            }

            .value-block,
            .value-inline-block {
                position: relative;
                outline: 1px solid #f9c9a9;
            }
        }

        .name {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            font-size: 16px;
            line-height: 21px;
            color: #313238;

            .type-flag {
                display: flex;
                width: 24px;
                height: 24px;
                margin-right: 10px;
                font-size: 17px;
                color: #979ba5;
                background: #f0f2f5;
                border: 1px solid #979ba5;
                border-radius: 2px;
                align-items: center;
                justify-content: center;
            }
        }

        .info {
            padding-left: 34px;
            font-size: 14px;
            line-height: 24px;
            color: #b2b5bd;

            .row {
                display: flex;
                min-height: 32px;
                padding: 2px 0;
                align-items: flex-start;
            }

            .label {
                flex: 0 0 75px;
            }

            .value,
            .ip-text {
                min-width: 20px;
                color: #63656e;
                word-break: break-all;
            }
        }
    }
</style>
