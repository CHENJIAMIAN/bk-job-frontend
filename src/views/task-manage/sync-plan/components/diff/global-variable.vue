<template>
    <div class="diff-global-variable" :class="classes" :id="`${type}_variable_${data.id}_${data.name}`">
        <div class="name">
            <div class="type-flag">
                <Icon :type="data.icon" />
            </div>
            <span>{{ data.name }}</span>
        </div>
        <div class="info">
            <div :class="diffValue.type">
                <span class="label">{{ '变量类型：' }}</span>
                <span class="value">{{ data.typeText }}</span>
            </div>
            <div :class="diffValue.name">
                <span class="label">{{ '变量名称：' }}</span>
                <span class="value">{{ data.name }}</span>
            </div>
            <template v-if="data.isHost">
                <div :class="diffValue.defaultTargetValue">
                    <span class="label">{{ '变量值：' }}</span>
                    <span class="value">{{ data.valueText }}</span>
                    <host-detail
                        class="host-value-detail"
                        :diff-enable="diffValue.defaultTargetValue === 'changed'"
                        :data="data.defaultTargetValue"
                        :name="data.name" />
                </div>
            </template>
            <template v-else>
                <div :class="diffValue.defaultValue">
                    <span class="label">{{ '变量值：' }}</span>
                    <span class="value">{{ data.valueText }}</span>
                </div>
            </template>
            <div :class="diffValue.description">
                <span class="label">{{ '变量描述：' }}</span>
                <span class="value">{{ data.description || '-' }}</span>
            </div>
            <div :class="diffValue.changeable">
                <span class="label">{{ '赋值可变：' }}</span>
                <span class="value">{{ data.changeableText }}</span>
            </div>
            <div :class="diffValue.required">
                <span class="label">{{ '必填：' }}</span>
                <span class="value">{{ data.requiredText }}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import HostDetail from './host-detail';

    export default {
        name: '',
        components: {
            HostDetail,
        },
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
        .diff-global-variable {
            .info {
                .label {
                    flex-basis: 100px;
                }
            }
        }
    }

    .diff-global-variable {
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
            text-decoration: line-through;
        }

        .changed {
            .value {
                padding: 3px;
                background: #fddfcb;
            }
        }

        .name {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            font-size: 16px;
            font-weight: bold;
            line-height: 24px;
            color: #313238;

            .type-flag {
                display: flex;
                width: 24px;
                height: 24px;
                margin-right: 10px;
                font-size: 17px;
                color: #fff;
                background: #979ba5;
                border-radius: 2px;
                align-items: center;
                justify-content: center;
            }
        }

        .info {
            padding-left: 34px;
            font-size: 0;
            line-height: 32px;
            color: #b2b5bd;

            & > div {
                display: flex;
            }

            .label {
                font-size: 14px;
                flex: 0 0 75px;
            }

            .value {
                min-width: 20px;
                font-size: 14px;
                color: #63656e;
                word-break: break-all;
            }

            .host-value-detail {
                margin-left: 4px;
                font-size: 17px;
                color: #3a84ff;
                cursor: pointer;
            }
        }
    }
</style>
